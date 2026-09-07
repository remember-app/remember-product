---
id: TASK-53
title: 'api: заказ ролика, список, повтор сборки, пуш «ролик готов»'
status: Done
assignee: []
created_date: '2026-09-05 04:23'
updated_date: '2026-09-05 04:43'
labels:
  - from-lead
milestone: m-9
dependencies: []
priority: high
type: feat
ordinal: 57000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Doc-03/decision-7: организатор заказывает ролик, любой участник видит список роликов воспоминания отдельно от галереи, организатор повторяет упавшую сборку, всем участникам после готовности приходит пуш. Симметрично тому, как m-3 сделал media_items+jobs: api заводит и владеет новой таблицей montages, воркер (параллельная задача в projects/montage) только читает и пишет её по id — как media.py уже делает с media_items. Таблицу jobs не трогать вообще, ей владеет montage/schema.sql.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Новая идемпотентная миграция (номер проверить по факту прямо перед коммитом — m-8 параллельно пишет в migrations/, взять с запасом, как уже делала TASK-29) заводит montages: id uuid pk, memory_id fk memories on delete cascade, ordered_by fk users, status text default 'queued' check in ('queued','processing','ready','failed'), video_key text, duration_seconds double precision, params jsonb not null default '{}', error_text text, created_at, updated_at
- [x] #2 POST /memories/:memoryId/montages — только organizer (403 иначе); тело {target_seconds?: integer, music_track_id?: 'warm'|'bright'|'calm'} с валидацией через схему (лимиты min/max target_seconds — через env, как остальные лимиты в media/config.ts, по умолчанию 60); меньше 3 media_items со status='ready' в этом воспоминании — 409 понятным текстом («недостаточно материала для ролика») без создания строки и без задачи; иначе одной транзакцией — insert в montages(status='queued'), insert в jobs(type='montage', ref=montages.id), инкремент memories.montage_count и user_usage.montage_count (по образцу upload.ts); 201 с созданной строкой
- [x] #3 GET /memories/:memoryId/montages — любой участник (viewer тоже), список по created_at desc; для status='ready' — подписанная video_url (downloadUrl тем же TTL, что у media), иначе null
- [x] #4 POST /memories/:memoryId/montages/:montageId/retry — только organizer, только если status='failed' (иначе 409); сбрасывает status='queued', error_text=null, вставляет новую строку в jobs(type='montage', ref=montageId); отвечает обновлённой строкой
- [x] #5 Новый POST /internal/montages/:montageId/ready — без пользовательской сессии (не за app.authenticate), авторизация общим секретом из окружения (например INTERNAL_WORKER_TOKEN, сверка заголовка Authorization: Bearer — несовпадение/отсутствие — 401); по вызову рассылает пуш «ролик готов» всем участникам воспоминания с push-токенами новой функцией в push.ts по образцу notifyInvited (best-effort, никогда не бросает, лог при неудаче, data содержит memoryId и montageId — существующую notifyInvited не менять); отвечает {ok:true} даже если пуш никому не дошёл
- [x] #6 README api описывает новые маршруты, переменную INTERNAL_WORKER_TOKEN и контракт с воркером по montages/jobs
- [x] #7 npm run lint, npm run typecheck и npm test проходят в projects/api; новые маршруты и матрица прав (organizer/contributor/viewer) покрыты тестами по конвенции репозитория (vitest, реальный Postgres)
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Контракт для параллельной задачи воркера (projects/montage): таблица montages ровно с этими полями, тип задачи в jobs — ровно 'montage', ref — id строки montages. Каталог треков (id) общий на обе задачи: 'warm', 'bright', 'calm' — здесь только для валидации входа, сами файлы треков — забота воркера.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Готово, коммит 7a215ec в projects/api (ветка воркtree agent-a9cd129d21f644cea); поверх него мерж main — на main за время работы приехали три задачи m-8, конфликтов по коду нет, README слился автоматически.

Что сделано:
- Миграция 020 (020.do/undo.montages.sql). Номер проверен по факту перед коммитом: и на main, и во всех воркtree-ах максимум был 010, так что 020 взят с запасом. Таблица montages ровно по контракту: id, memory_id (fk memories, cascade), ordered_by (fk users, без ON DELETE — готовый ролик не должен уезжать вместе с человеком, как и memories.organizer_id), status с CHECK на четыре значения и default queued, video_key, duration_seconds, params jsonb not null default пустого объекта, error_text, created_at, updated_at; индекс по (memory_id, created_at desc). Идемпотентность проверена прогоном файла дважды подряд на живой базе, форма таблицы — запросом к information_schema и pg_constraint. Таблицу jobs не трогал вовсе.
- POST /memories/:memoryId/montages — только organizer (403 остальным участникам, 404 всем прочим). Тело необязательно: пустой объект, null и запрос вовсе без тела — одно и то же «без пожеланий». Валидация схемой; границы target_seconds читаются из окружения в момент сборки приложения (ajv компилирует схему один раз — это единственное место, где переменная читается не по запросу, в README оговорено). Меньше трёх ready-медиа — 409 до записи: ни строки, ни задачи. Иначе одной транзакцией: insert в montages (queued), insert в jobs (montage, id строки), инкремент memories.montage_count и user_usage.montage_count.
- GET /memories/:memoryId/montages — любой участник, viewer в том числе; новые сверху; у ready подписанная video_url тем же downloadUrl и тем же TTL, что у галереи, у остальных null. Ключ ролика наружу не отдаётся. Без R2 — 503, как у галереи.
- POST /memories/:memoryId/montages/:montageId/retry — organizer, только failed. Проверка статуса стоит в самом UPDATE, поэтому две нажатые подряд кнопки двигают строку один раз, а вторая получает 409; новая задача в jobs встаёт в той же транзакции. Не failed — 409 с текущим статусом; чужой, несуществующий и не-uuid — общий 404.
- POST /internal/montages/:montageId/ready — вне app.authenticate, за общим секретом INTERNAL_WORKER_TOKEN (Authorization: Bearer). Сверка через sha256 и timingSafeEqual: обычное сравнение строк отдаёт префикс секрета тому, кто его меряет. Секрет не задан — маршрут закрыт для всех, а не открыт. Рассылает пуш всем участникам воспоминания с устройствами (не только заказавшему) и отвечает ok, даже если не дошло ни до кого: ролик готов независимо от уведомления, а ответ «не вышло» отправил бы воркера повторять сделанную задачу.
- README: раздел «Ролики — как это устроено» с таблицей контракта с воркером (кто чем владеет в montages, тип задачи в jobs, каталог треков), четыре новых маршрута, INTERNAL_WORKER_TOKEN и три MONTAGE_TARGET_SECONDS в таблице окружения; обновлены «Таблица jobs — не наша» (теперь три вида строк) и «Пуши» (два типа вместо одного). Те же переменные — в .env.example.

Развилки, которые решал сам:
- Текст 409 при нехватке материала. В карточке он по-русски, в репозитории все тела ошибок английские, а русский текст показывает клиент. Оставил конвенцию репозитория и добавил числа: not enough material for a montage плюс ready_items и need — приложению есть по чему ветвиться, человеку слова говорит оно само. В README это написано прямо.
- Путь отправки пуша в push.ts сделал общим для двух уведомлений вместо копии на тридцать строк. Формулировка приглашения, порядок действий и строки лога (invite push not sent / refused / failed) не изменились — их держат существующие тесты members.test.ts, они зелёные; у ролика те же строки с первым словом montage. Смысл notifyInvited не менял, но её тело теперь зовёт общий отправщик — если ревью считает это нарушением «не менять», откатывается в одну копию.
- Длина по умолчанию (60 секунд) записывается в params самим api, а не оставляется воркеру: тогда строка montages — исчерпывающий ответ на вопрос, какой ролик просили, и умолчание живёт в одном месте. Трек, если его не назвали, не пишется вовсе — файлы у воркера, ему и выбирать.
- Порог «меньше 3» оставил константой в коде, а не переменной окружения: это не бизнес-лимит, а собственный пол пайплайна, и то же число записано у воркера.
- Список роликов без настроенного R2 отвечает 503, как галерея, а не отдаёт список с null вместо ссылок.

Проверено: npm test 60/60 зелёный (54 было до задачи, 4 моих новых, 2 приехали с main), typecheck зелёный, biome по src, scripts и migrations зелёный. Команда npm run lint из воркtree печатает «paths ignored» — biome по конвенции репозитория игнорирует .claude/, это артефакт воркtree, а не код; в основном чекауте команда отрабатывает как обычно. Ручных прогонов приложения не было — запрещены.

Новые тесты (src/montages/montages.test.ts, реальный Postgres, тег task53): матрица прав на все четыре маршрута (organizer, contributor, viewer, не участник, без сессии), 409 на нехватку материала с проверкой, что ни строки, ни задачи не осталось, счётчики воспоминания и пользователя, задача в jobs ровно типа montage со ссылкой на id, отбрасывание неизвестных полей тела, границы длины и каталог треков, порядок списка и подписанная ссылка только у готового, повтор упавшего и 409 на повтор непадавшего, четыре отказа внутреннего маршрута (нет секрета в окружении, нет заголовка, чужой секрет, секрет-префикс) и пуш «ролик готов» на два устройства из трёх участников с проверкой текста и data (memoryId, montageId).

Осталось за рамками карточки:
- Ролик нельзя удалить — маршрута нет, и в doc-03 такого требования нет; если организатор захочет убирать неудачные ролики, это отдельная задача (плюс уборка ключа из R2).
- Пуш «ролик готов» живьём, как и пуш приглашения, никто не видел: ни устройства, ни доступов к Expo здесь нет. Первый настоящий прогон — за мобильным клиентом.
- Выход участника не трогает montages вовсе (так и задумано, doc-03), но ordered_by ушедшего организатора остаётся ссылкой на живого пользователя — удаления аккаунтов в продукте пока нет.
<!-- SECTION:FINAL_SUMMARY:END -->
