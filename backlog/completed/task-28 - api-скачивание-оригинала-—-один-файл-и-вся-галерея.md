---
id: TASK-28
title: 'api: скачивание оригинала — один файл и вся галерея'
status: Done
assignee: []
created_date: '2026-09-04 12:41'
updated_date: '2026-09-04 12:46'
labels:
  - from-chief
milestone: m-5
dependencies: []
priority: high
type: feat
ordinal: 32000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Оригинал (original_key) сейчас никак не отдаётся наружу — галерея показывает только превью. Добавить два GET-маршрута рядом с существующими в src/media/gallery.ts: подписанная ссылка на оригинал одного файла и список ссылок на все оригиналы воспоминания разом (для «скачать всю галерею одним действием»). Права — как у самой галереи: любой участник, включая viewer; не участник — 404. Закрывает doc-07 Gallery Download со стороны api.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 GET /memories/:memoryId/media/:mediaId/download за app.authenticate + app.requireMembership отдаёт { url } — подписанную ссылку на ОРИГИНАЛ (original_key, не thumbnail/preview), TTL как у прочих ссылок на скачивание (downloadTtlSeconds из ./config.ts). Роль не проверяется — viewer получает так же, как остальные
- [x] #2 Запись в статусе pending_upload, чужая память, несуществующий id или не-uuid — один и тот же 404 {"error":"not found"} (домашнее правило семейства маршрутов)
- [x] #3 GET /memories/:memoryId/media/download за теми же preHandler'ами отдаёт список [{ id, kind, url }] по всем медиа воспоминания кроме pending_upload, в том же порядке, что и обычная галерея (coalesce(captured_at, created_at), id). Не участник — 404
- [x] #4 Оба маршрута отвечают 503 { error: "storage not configured" }, когда storageConfigured() лжив — как остальные media-маршруты
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
architecture.md: «Хранилище и медиа-пайплайн» (оригинал тянется по подписанной ссылке только по явному «скачать»), «Проверка прав» (viewer скачивает). downloadUrl() и downloadTtlSeconds() уже есть (r2.ts, config.ts) — используются в текущем /media для превью, здесь та же функция на original_key. Маршруты монтируются в galleryRoutes(), рядом с GET /media и DELETE /media/:mediaId.

Указание CHIEF (смена порядка по m-5): ревью и тестировщик на этой вехе не запускаются, новых тестов специально не заводим. Если новый код естественно задевает место, где тест уже есть — не ломать существующий; писать новый живой тест сюда не нужно.
<!-- SECTION:NOTES:END -->
