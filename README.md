# Remember

Мобильное приложение, в котором создаются воспоминания в виде папок: приглашённые участники
загружают туда фото и видео со смартфона, а организатор монтирует из собранного материала ролик.

Это корневой репозиторий продукта. Кода здесь нет — три сервиса подключены сабмодулями:

| Сабмодуль | Что это | Стек |
|---|---|---|
| `projects/api` | единственная точка входа для приложения | TypeScript, Fastify, Postgres |
| `projects/mobile` | единственный клиент, iOS + Android | Expo / React Native |
| `projects/montage` | фоновый обработчик очереди задач | Python |

Технические решения по MVP — в [`architecture.md`](architecture.md). Продуктовый план — в `backlog/`.

## Что нужно на машине

- **Docker** — только для локальных Postgres и хранилища
- **Node 22.18+** — для `api` и `mobile`
- **Python 3.11+** — для `montage`
- **iOS-симулятор (Xcode) или Android-эмулятор**, либо **Expo Go** на телефоне

## Клонирование

Сабмодули не подтянутся сами — нужен `--recursive`:

```sh
git clone --recursive ssh://git@git.dapp-devs.com:2222/nox-labs/nox/remember/remember-product.git
cd remember-product
```

Если репозиторий уже склонирован без сабмодулей:

```sh
git submodule update --init --recursive
```

## Подъём с нуля

Ниже — полный путь от чистой машины до трёх соединённых сервисов. Порядок важен: Postgres
и хранилище → API → воркер → приложение. Каждый шаг заканчивается тем, что видно глазами.

Когда всё уже поставлено, те же команды короче через `make` в корне — `make help` покажет список.
Makefile ничего своего не делает, только зовёт команды сервисов, описанные ниже.

### 1. Postgres и хранилище

Канонный `docker-compose.yml` живёт у API и поднимает сразу две вещи — они одни на `api` и на
`montage`, своих поднимать не нужно:

- **Postgres**, порт **5432**;
- **MinIO**, порт **9000** (веб-консоль — **9001**) — локальный дублёр Cloudflare R2 с тем же
  S3-протоколом. Бакет `remember` создаётся сам при старте.

```sh
cd projects/api
docker compose up -d --wait
```

**Ожидаемо:** `docker compose ps` показывает оба контейнера в статусе `Up (healthy)`. База,
пользователь и пароль — все три `remember`; ключи к хранилищу — `remember` и `remember-secret`,
они уже прописаны в `.env.example` обоих сервисов, заводить ничего руками не надо.

Если порт 5432 занят чужим Postgres, освободите его:

```sh
docker rm -f remember-pg remember-pg-test 2>/dev/null || true
```

**В проде MinIO нет.** Бакет Cloudflare R2 и пару ключей к нему заводит человек руками в панели
Cloudflare — ни один скрипт и ни одна миграция этого не делают. Полученные значения кладутся в
`projects/api/.env` и `projects/montage/.env` локально, а на хостинге — в переменные окружения
сервиса. Имена одинаковые у обоих сервисов, так что один набор значений подходит и API, и воркеру.

### 2. API

Из `projects/api`:

```sh
npm install
cp .env.example .env
npm run migrate
npm run dev
```

Миграции — **postgrator**, файлы в `migrations/`, накатываются на чистую базу с нуля.

**Ожидаемо:** `npm run migrate` печатает `applied: 1 init` (на уже накатанной базе —
`already up to date`), `npm run dev` пишет `Server listening at http://127.0.0.1:3000`.

Проверка в другом терминале:

```sh
curl -i localhost:3000/health
```

**Ожидаемо:** `HTTP/1.1 200 OK` и тело `{"status":"ok"}`.

`.env.example` уже содержит и базу, и ключи к локальному MinIO из шага 1 — `cp` достаточно.

Для запуска обязателен по-прежнему один `DATABASE_URL`. Четвёрка `R2_ENDPOINT`, `R2_BUCKET`,
`R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY` нужна для медиа: без неё сервер поднимется, но загрузка
и галерея ответят `503`. Пара `RESEND_API_KEY` и `MAIL_FROM` нужна только для настоящих писем: без
неё вне боевого режима вход всё равно работает — `POST /auth/email/start` отдаёт ссылку прямо в
ответе; `503 {"error":"mail not configured"}` он ответит только при `NODE_ENV=production`. Всё
остальное необязательно — TTL подписанных ссылок, размер куска загрузки, числа лимитов из
`architecture.md` (1 ГиБ на файл, видео 5 минут, 10 ГиБ и 1000 файлов на воспоминание) и переменные
входа, добавленные m-3. Все имена со значениями по умолчанию перечислены в
[`projects/api/.env.example`](projects/api/.env.example) и
[`projects/api/README.md`](projects/api/README.md).

**Почты в `.env.example` нет** — только закомментированные заглушки, и локального дублёра у неё,
в отличие от MinIO, тоже нет. Аккаунт в [Resend](https://resend.com), подтверждённый там домен
отправителя и ключ API человек заводит руками — ни один скрипт этого не делает. Ключ кладётся в
`RESEND_API_KEY`, адрес отправителя вида `Remember <no-reply@ваш-домен>` — в `MAIL_FROM`; локально
это `projects/api/.env`, на хостинге — переменные окружения сервиса. Отправителя на
неподтверждённом домене провайдер отвергнет, и запрос ссылки ответит
`502 {"error":"mail delivery failed"}`. Воркеру почта не нужна — только API.

### 3. Воркер (montage)

В другом терминале, из `projects/montage`. База и хранилище — те же, что подняли в шаге 1:

```sh
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

cp .env.example .env             # та же база и то же хранилище, что у API
set -a && . ./.env && set +a     # своего чтения .env у воркера нет

python worker.py init            # создать таблицу jobs
python worker.py enqueue dummy       # доедет до done
python worker.py enqueue dummy fail  # упадёт и уйдёт в повторы
python worker.py run             # цикл разбора очереди, Ctrl-C для остановки
```

**Ожидаемо:** задача 1 сразу уходит в `done`; задача 2 падает и откладывается — 30 с, потом 60 с, —
а после третьей попытки встаёт в `failed`. В логе это выглядит так:

```
INFO    job 1 (dummy) done
WARNING job 2 (dummy) failed on attempt 1/3: dummy job was asked to fail — retrying in 30s
WARNING job 2 (dummy) failed on attempt 2/3: dummy job was asked to fail — retrying in 60s
WARNING job 2 (dummy) failed on attempt 3/3: dummy job was asked to fail — given up
```

Весь цикл занимает ~90 секунд. Это и есть доказательство, что очередь вертится и повторы работают.

> Тесты `montage` (`pytest`) **чистят таблицу `jobs`** в базе из `DATABASE_URL` — не запускайте их
> против базы, в которой что-то нужное.

### 4. Приложение

В третьем терминале, из `projects/mobile`. API из шага 2 должен быть запущен:

```sh
npm install
EXPO_PUBLIC_API_URL=http://localhost:3000 npx expo start
```

Дальше в запущенном Expo CLI — `i` (iOS-симулятор), `a` (Android-эмулятор) или QR-код в Expo Go.

**Ожидаемо:** приложение открывается на экране входа «Sign in». Дальше — вход по email-ссылке
(описан ниже); на чистой базе первый вход попросит придумать ник, а после этого откроется главный
экран «Remember» со списком воспоминаний — пока пустым: «No memories yet».

`localhost` работает только с симулятора/эмулятора. **С телефона через Expo Go** подставьте IP
машины в локальной сети: `EXPO_PUBLIC_API_URL=http://192.168.1.10:3000`. Переменная вшивается в
бандл на сборке — после её изменения перезапустите `expo start`.

Вход по email-ссылке: с `RESEND_API_KEY` и `MAIL_FROM` из шага 2 на указанный адрес приходит
настоящее письмо со ссылкой `remember://auth/email?token=…` — её и открываете. В Expo Go схема
`remember://` не работает (она требует dev-билда), поэтому там подставьте токен из письма в
`exp://127.0.0.1:8081/--/auth/email?token=…`. Подробности — в
[`projects/mobile/README.md`](projects/mobile/README.md).

Без этих двух переменных письма не будет, но вход не заблокирован: вне боевого режима
`POST /auth/email/start` отдаёт ту же ссылку прямо в ответе, и экран входа проходит по ней сам —
адрес, кнопка, вы внутри. Подробности и то, чем этот путь выключается, — в разделе
«Как добыть токен в разработке» в [`projects/api/README.md`](projects/api/README.md).

Если симулятор не открылся сам, откройте ссылку в нём вручную:

```sh
xcrun simctl openurl booted "exp://127.0.0.1:8081"
```

### Что нужно на хостинге

Деплой-конфига в репозитории пока нет — PaaS не выбран (открытый вопрос в
[`architecture.md`](architecture.md)). Когда он появится, обязательный минимум переменных в нём
такой:

| Сервис | Обязательно |
|---|---|
| `api` | `DATABASE_URL`, `R2_ENDPOINT`, `R2_BUCKET`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `RESEND_API_KEY`, `MAIL_FROM` |
| `montage` | `DATABASE_URL` и та же четвёрка `R2_*` — одни и те же имена и одни и те же значения; почта воркеру не нужна |

Бакет и ключи под них человек заводит руками в Cloudflare (см. шаг 1), ключ Resend и адрес
отправителя — тоже руками (см. шаг 2). Остальное — TTL ссылок, размер куска загрузки, числа
лимитов — необязательно: значения по умолчанию зашиты в код и перечислены в
[`projects/api/.env.example`](projects/api/.env.example).

## Соединено, когда

- `curl localhost:3000/health` → `200 {"status":"ok"}`
- воркер: задача 1 в `done`, задача 2 в `failed` после трёх попыток
- после входа по email-ссылке приложение открывает список воспоминаний (на чистой базе пустой)

Подробности по каждому сервису — в его собственном README: [`api`](projects/api/README.md),
[`mobile`](projects/mobile/README.md), [`montage`](projects/montage/README.md).
