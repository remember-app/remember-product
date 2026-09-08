---
id: TASK-116
title: >-
  api: у смонтированного ролика есть постер — хранить ключ и отдавать
  подписанную ссылку
status: Done
assignee: []
created_date: '2026-09-08 18:12'
updated_date: '2026-09-08 18:20'
labels:
  - from-lead
milestone: m-16
dependencies: []
priority: medium
type: feat
ordinal: 120000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
TASK-112: у готового ролика в приложении нет превью. Корень — таблица montages вообще не хранит постер: воркер пишет только video_key, api отдаёт только video_url. Добавить столбец под ключ постера (миграция) и отдавать подписанный poster_url в ответе на готовый ролик тем же образцом, что video_url — null, пока постера нет.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Миграция добавляет столбец под ключ постера в montages
- [x] #2 Ответ api на ролик несёт подписанный poster_url тем же образцом, что video_url (null, пока не готов)
- [x] #3 Тесты на новое поле
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Столбец назван **`poster_key`** — `text`, nullable, в таблице `montages`, рядом с `video_key`. Это то имя, в которое пишет воркер (TASK-117).

Что сделано в projects/api (коммит `67e2698`):

- `migrations/040.do.montage-poster.sql` / `040.undo.montage-poster.sql` — пара do/undo, `ALTER TABLE montages ADD COLUMN IF NOT EXISTS poster_key text` (идемпотентно, как все миграции здесь). Номер 040 — следующий свободный после 030.
- `src/montages/montages.ts` — в типе `Montage` появилось `poster_key: string | null`; `view()` снимает со строки оба ключа и подписывает оба одним локальным хелпером: `poster_url` считается ровно как `video_url` — `downloadUrl(key, ttl)` при `status === "ready"` и непустом ключе, иначе `null`. TTL общий, `R2_DOWNLOAD_TTL_SECONDS`. Наружу по-прежнему уходят только ссылки, ключи — нет.
- `src/montages/montages.test.ts` — фикстура готового ролика пишет и `poster_key`; добавлена фикстура ready-ролика без постера (так выглядит всё, что смонтировано до TASK-117: `video_url` есть, `poster_url` навсегда `null`). Проверено: подпись постера (путь, `X-Amz-Signature`, `X-Amz-Expires=900`), `poster_url: null` у `queued`/`failed`/повтора, `poster_key` не утекает в ответ.
- README: контракт с воркером, примеры ответов и раздел про `poster_url` обновлены.

Тесты api зелёные: 8 файлов, 79 тестов. `tsc --noEmit` и biome по тронутым файлам чисто.

Логику ролика (сборка, статусы, права, пуш) не трогал — только новое поле.
<!-- SECTION:NOTES:END -->
