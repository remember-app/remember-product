---
id: TASK-47
title: 'api: превью последних кадров для карточек в списке воспоминаний'
status: Done
assignee: []
created_date: '2026-09-04 16:01'
updated_date: '2026-09-05 04:25'
labels:
  - from-human
milestone: m-8
dependencies: []
priority: low
ordinal: 51000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Список /memories отдаёт только media_count, без ссылок на превью — карточка воспоминания в приложении не может показать фото внутри себя, только счётчик. Нужно решить и добавить отдачу нескольких URL последних кадров на воспоминание (или отдельный батч-эндпоинт).
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Определён формат: сколько превью на воспоминание, где они лежат в ответе (в /memories или отдельным вызовом)
- [x] #2 Мобильное приложение может нарисовать хвост из настоящих кадров на карточке воспоминания без N+1 запроса на каждую
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Заведено по прямому запросу человека 2026-09-04 в вехе m-7 (App skin) — сама веха api не трогает, это отдельная работа на стороне api. Не реализовывать в рамках m-7.

Сделано в m-8 (коммит fd8f902 в projects/api). GET /memories отдаёт в каждом воспоминании recent_thumbnail_urls — до двух подписанных ссылок на превью (thumbnail_key записей в статусе ready), самое свежее первым: order by coalesce(captured_at, created_at) desc, id desc, то есть порядок галереи с конца. Собирается подзапросом-array с limit 2 внутри того же запроса списка — ни отдельного эндпоинта, ни запроса на карточку; подпись — локальный HMAC (src/media/r2.ts downloadUrl), TTL общий с галереей (R2_DOWNLOAD_TTL_SECONDS). Не заданы R2_* — поле пустое, а не 503. POST /memories отдаёт то же поле пустым, чтобы формы ответов совпадали. Тест: src/memories/memories.test.ts, воспоминания с 0, 1 и пятью записями в одном ответе. Мобильную сторону подключает TASK-48.
<!-- SECTION:NOTES:END -->
