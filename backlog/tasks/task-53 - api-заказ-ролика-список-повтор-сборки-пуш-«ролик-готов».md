---
id: TASK-53
title: 'api: заказ ролика, список, повтор сборки, пуш «ролик готов»'
status: To Do
assignee: []
created_date: '2026-09-05 04:23'
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
- [ ] #1 Новая идемпотентная миграция (номер проверить по факту прямо перед коммитом — m-8 параллельно пишет в migrations/, взять с запасом, как уже делала TASK-29) заводит montages: id uuid pk, memory_id fk memories on delete cascade, ordered_by fk users, status text default 'queued' check in ('queued','processing','ready','failed'), video_key text, duration_seconds double precision, params jsonb not null default '{}', error_text text, created_at, updated_at
- [ ] #2 POST /memories/:memoryId/montages — только organizer (403 иначе); тело {target_seconds?: integer, music_track_id?: 'warm'|'bright'|'calm'} с валидацией через схему (лимиты min/max target_seconds — через env, как остальные лимиты в media/config.ts, по умолчанию 60); меньше 3 media_items со status='ready' в этом воспоминании — 409 понятным текстом («недостаточно материала для ролика») без создания строки и без задачи; иначе одной транзакцией — insert в montages(status='queued'), insert в jobs(type='montage', ref=montages.id), инкремент memories.montage_count и user_usage.montage_count (по образцу upload.ts); 201 с созданной строкой
- [ ] #3 GET /memories/:memoryId/montages — любой участник (viewer тоже), список по created_at desc; для status='ready' — подписанная video_url (downloadUrl тем же TTL, что у media), иначе null
- [ ] #4 POST /memories/:memoryId/montages/:montageId/retry — только organizer, только если status='failed' (иначе 409); сбрасывает status='queued', error_text=null, вставляет новую строку в jobs(type='montage', ref=montageId); отвечает обновлённой строкой
- [ ] #5 Новый POST /internal/montages/:montageId/ready — без пользовательской сессии (не за app.authenticate), авторизация общим секретом из окружения (например INTERNAL_WORKER_TOKEN, сверка заголовка Authorization: Bearer — несовпадение/отсутствие — 401); по вызову рассылает пуш «ролик готов» всем участникам воспоминания с push-токенами новой функцией в push.ts по образцу notifyInvited (best-effort, никогда не бросает, лог при неудаче, data содержит memoryId и montageId — существующую notifyInvited не менять); отвечает {ok:true} даже если пуш никому не дошёл
- [ ] #6 README api описывает новые маршруты, переменную INTERNAL_WORKER_TOKEN и контракт с воркером по montages/jobs
- [ ] #7 npm run lint, npm run typecheck и npm test проходят в projects/api; новые маршруты и матрица прав (organizer/contributor/viewer) покрыты тестами по конвенции репозитория (vitest, реальный Postgres)
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Контракт для параллельной задачи воркера (projects/montage): таблица montages ровно с этими полями, тип задачи в jobs — ровно 'montage', ref — id строки montages. Каталог треков (id) общий на обе задачи: 'warm', 'bright', 'calm' — здесь только для валидации входа, сами файлы треков — забота воркера.
<!-- SECTION:NOTES:END -->
