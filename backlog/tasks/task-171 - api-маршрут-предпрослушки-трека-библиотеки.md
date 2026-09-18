---
id: TASK-171
title: 'api: маршрут предпрослушки трека библиотеки'
status: Done
assignee: []
created_date: '2026-09-18 16:12'
updated_date: '2026-09-18 16:30'
labels:
  - from-chief
milestone: m-23
dependencies:
  - TASK-170
priority: medium
type: feat
ordinal: 178000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
design/screens/MontageMusic.html: у каждого трека кнопка «Послушать» — часть шага мастера (решение chief). Нужен маршрут, отдающий подписанную ссылку на файл трека в R2 — ключ tracks/<id>.mp3, куда TASK-170 (montage) загружает пять треков библиотеки. Свой трек организатора (music_uploads) уже отдаёт подписанные ссылки похожим образом в этом файле — тот же принцип signed URL, что и downloadUrl у медиа.

Библиотека общая, не привязана к воспоминанию — доступна любому вошедшему участнику, не только организатору и не только участнику конкретного воспоминания.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Новый маршрут отдаёт подписанную ссылку на tracks/<trackId>.mp3 в R2 для любого из пяти id библиотеки (musicTracks)
- [x] #2 Неизвестный id — понятная ошибка 404
- [x] #3 Доступен любому аутентифицированному участнику, не завязан на конкретное воспоминание или роль
- [x] #4 Автотесты на все пять id и на отказ по неизвестному id
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Маршрут: GET /music/tracks/:trackId, src/montages/music.ts (в конце musicRoutes) — рядом со «своим треком», та же музыка, тот же R2, обратное направление. Ветка task-171-music-library-preview в worktree api, коммит 9046bbf.

- За одним app.authenticate, вне /memories/:memoryId: библиотека общая на весь продукт, членства и роли не проверяются (AC#3).
- Ключ tracks/<trackId>.mp3, ссылка подписывается downloadUrl + downloadTtlSeconds (15 мин) — тем же кодом, что и медиа. Ответ {"url":"…"} — форма как у GET /memories/:memoryId/media/:mediaId/download.
- Список id — musicTracks из src/montages/montages.ts, теперь export: один список на заказ и на прослушку, разойтись не могут. Неизвестный id — 404 {"error":"not found"} (не enum в схеме params: тот дал бы 400, а трека попросту нет). Не заданы R2_* — 503, как у соседей.
- Тесты: src/montages/music.test.ts, «every track on the shelf can be listened to, and nothing else can» — все пять id (id выписаны в тесте руками, не читаются из исходника), путь ключа и подпись в ссылке, четыре отказа по неизвестному id (включая bright.mp3 и BRIGHT), 401 без токена; плюс 503 в тесте про отсутствующий бакет. npm test 100/100, tsc --noEmit чисто, biome по затронутым файлам чисто.
- Проверено вживую: подписанная ссылка на tracks/bright.mp3 отдаёт из локального MinIO настоящий mp3 (200).
- README: раздел «GET /music/tracks/:trackId» и абзац про каталог треков обновлены — приложение читает контракт оттуда.
<!-- SECTION:NOTES:END -->
