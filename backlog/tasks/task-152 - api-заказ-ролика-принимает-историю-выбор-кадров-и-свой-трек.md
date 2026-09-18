---
id: TASK-152
title: 'api: заказ ролика принимает историю, выбор кадров и свой трек'
status: Done
assignee: []
created_date: '2026-09-18 13:06'
updated_date: '2026-09-18 13:25'
labels:
  - from-chief
milestone: m-23
dependencies: []
priority: high
type: feat
ordinal: 159000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Часть вехи m-23 (doc-03, Components: «Выбор медиа для ролика», «История ролика текстом», музыка «и возможность добавить свою»). Экраны мастера заказа ждут, пока веха Afisha (m-21) сольёт библиотеку деталей, — эта задача только про api, без UI.

Тело POST /memories/:memoryId/montages (src/montages/montages.ts, orderBody) сейчас принимает target_seconds, music_track_id, orientation и кладёт их в montages.params, которые читает воркер. Тем же путём, без новой таблицы:
- story_text — необязательная строка, история ролика текстом.
- include_media_ids / exclude_media_ids — необязательные списки id из media_items этого же воспоминания; id, которого нет в воспоминании или который не ready, — понятная ошибка, а не тихий пропуск. Пересечение двух списков — тоже ошибка (нельзя одновременно включить и исключить один кадр).
- свой трек: организатор загружает аудиофайл обычным путём загрузки (как media_items — тот же intent → upload → ready), и заказ ссылается на него вместо music_track_id полем music_track_key. Ровно одно из music_track_id / music_track_key может быть указано; указаны оба сразу — ошибка (отсутствие обоих — трек по умолчанию, как сейчас).

Значения прозрачно уходят в montages.params и возвращаются в ответе на заказ и в списке роликов, как уже устроено для orientation (TASK-126.1 — тот же паттерн).
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 story_text, include_media_ids, exclude_media_ids, music_track_key принимаются телом заказа, сохраняются в montages.params и видны в ответе на заказ и в списке роликов
- [ ] #2 id в include/exclude, которых нет в этом воспоминании или которые не ready, отклоняются понятной ошибкой; пересечение списков — тоже ошибка
- [ ] #3 music_track_id и music_track_key взаимоисключающие — оба сразу отклоняются понятной ошибкой
- [ ] #4 Свой трек грузится тем же способом, что медиа (upload intent → готов); эндпоинт может быть переиспользован или зеркален по образцу медиа-загрузки
- [ ] #5 Заказ без всех новых полей ведёт себя как раньше — поведение не изменилось
- [ ] #6 Автотесты обновлены и зелёные; если понадобилась миграция — взят следующий свободный номер на main на момент слияния
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Ветка worktree-agent-ad9426b18036e3279 в сабмодуле projects/api, коммит 2ae69af. Слияние в main — за лидом.

Заказ ролика (src/montages/montages.ts): в orderBody добавлены story_text (строка до 2000 символов, обрезается по краям), include_media_ids / exclude_media_ids (списки uuid, uniqueItems, потолок — MEMORY_MAX_FILES) и music_track_key (строка до 200 символов). Все значения уходят в montages.params тем же способом, что orientation: пустая строка и пустой список ключа не пишут. Проверки в обработчике, после счёта материала: пересечение списков — 400 a media item cannot be both included and excluded с перечнем id; id не из этого воспоминания или не ready — 400 no such ready media in this memory с перечнем; music_track_id вместе с music_track_key — 400 mutually exclusive; ключ не из этого воспоминания или трек не ready — 400 no such uploaded music track. Id приводятся к нижнему регистру (база отдаёт их так), иначе клиент получал бы отказ на собственный кадр.

Свой трек (src/montages/music.ts, миграция 060 — таблица music_uploads): POST /memories/:memoryId/music (только organizer) отдаёт multipart-план с ключом music/<id>, POST .../music/:trackId/complete собирает объект, сверяет реальный размер с MEDIA_MAX_FILE_BYTES и переводит запись в ready; ответ несёт key, который затем идёт в music_track_key. Схема тела колбэка переиспользована из src/media/upload.ts.

Решения: отдельная таблица вместо третьего kind в media_items — трек не материал воспоминания, иначе пришлось бы учить исключению галерею, счёт трёх готовых файлов и очередь превью. Перевыдачи ссылок для трека нет (файл небольшой, ссылка живёт час) — при протухании заводится новая заявка. Размер трека не идёт в счётчики воспоминания: вернуть их назад некому, трек не удаляется; помечено ponytail-комментарием.

Номер миграции 060 — следующий свободный на момент работы (последняя была 050). Перед слиянием стоит перепроверить, не занят ли он параллельной веткой.

Проверки: npm test — 89 тестов, 10 файлов, зелено (новый src/montages/music.test.ts гоняет реальную загрузку в MinIO); tsc --noEmit чисто; biome check чисто по изменённым файлам. Одна давняя претензия форматтера в src/memories/memories.test.ts есть и на main — не трогал.

README обновлён: контракт заказа, раздел «Свой трек — как это устроено» с двумя маршрутами, строка про music_uploads в контракте с воркером.
<!-- SECTION:NOTES:END -->
