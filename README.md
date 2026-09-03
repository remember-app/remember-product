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

- **Docker** — только для локального Postgres
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

Ниже — полный путь от чистой машины до трёх соединённых сервисов. Порядок важен: Postgres → API →
воркер → приложение. Каждый шаг заканчивается тем, что видно глазами.

### 1. Postgres

Канонная локальная база живёт в `docker-compose.yml` у API — она одна на `api` и на `montage`,
отдельную поднимать не нужно. Занимает порт **5432**.

```sh
cd projects/api
docker compose up -d --wait
```

**Ожидаемо:** `docker compose ps` показывает контейнер в статусе `Up (healthy)`. База, пользователь
и пароль — все три `remember`.

Если порт 5432 занят чужим Postgres, освободите его:

```sh
docker rm -f remember-pg remember-pg-test 2>/dev/null || true
```

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

m-3 добавил в API необязательные переменные — `SESSION_TTL_DAYS`, `EMAIL_LOGIN_TTL_MINUTES`,
`EMAIL_LOGIN_RATE_MAX`, `EMAIL_LOGIN_RATE_MAX_PER_IP`, `EMAIL_LOGIN_RATE_WINDOW_MINUTES`,
`APPLE_CLIENT_ID`, `GOOGLE_CLIENT_ID`. Подъём от этого не меняется: обязательная по-прежнему
одна, `DATABASE_URL`. Таблица со значениями по умолчанию — в
[`projects/api/README.md`](projects/api/README.md).

### 3. Воркер (montage)

В другом терминале, из `projects/montage`. База — та же, что подняли в шаге 1:

```sh
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

export DATABASE_URL='postgres://remember:remember@localhost:5432/remember'

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

Вход по email-ссылке (m-3) проверяется без почты: API печатает ссылку себе в лог. В Expo Go
открывайте её как `exp://127.0.0.1:8081/--/auth/email?token=…` — схема `remember://` требует
dev-билда. Подробности — в [`projects/mobile/README.md`](projects/mobile/README.md).

Если симулятор не открылся сам, откройте ссылку в нём вручную:

```sh
xcrun simctl openurl booted "exp://127.0.0.1:8081"
```

## Соединено, когда

- `curl localhost:3000/health` → `200 {"status":"ok"}`
- воркер: задача 1 в `done`, задача 2 в `failed` после трёх попыток
- после входа по email-ссылке приложение открывает список воспоминаний (на чистой базе пустой)

Подробности по каждому сервису — в его собственном README: [`api`](projects/api/README.md),
[`mobile`](projects/mobile/README.md), [`montage`](projects/montage/README.md).
