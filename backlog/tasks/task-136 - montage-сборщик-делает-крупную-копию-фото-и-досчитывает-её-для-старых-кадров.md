---
id: TASK-136
title: 'montage: сборщик делает крупную копию фото и досчитывает её для старых кадров'
status: Done
assignee: []
created_date: '2026-09-09 09:20'
updated_date: '2026-09-09 09:29'
labels:
  - from-lead
milestone: m-19
dependencies: []
type: feat
ordinal: 143000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Сейчас `media_preview()` в `media.py` для `kind == "photo"` делает только маленький эскиз (640px, `thumbnail_key`) — крупной копии нет вообще, поэтому полноэкранный просмотр показывает мыло. Для видео крупная копия уже делается (`preview_key`, 720p mp4) — фото должно получить симметричный путь.

Сервер и API уже готовы: столбец `preview_key` в `media_items` существует, `GET /memories/:id/media` (src/media/gallery.ts) уже отдаёт `preview_url`, если `preview_key` заполнен — независимо от `kind`. Мобильное приложение тоже уже готово принять его (`openFrameOf` в mobile/src/frames.ts берёт `preview_url` с откатом на `thumbnail_url`, уже покрыто тестами). Ни api, ни mobile в этой задаче трогать не нужно.

Сделать:
1. В `media_preview()` для фото — рядом с эскизом сделать вторую, крупную JPEG-копию: длинная сторона ≤ 2048px (меньше — не увеличивать), тем же приёмом, что уже используется для эскиза и видео-превью (`ffmpeg`, `_upload`). Залить в R2 под `previews/{ref}.jpg`, записать в `preview_key` тем же `UPDATE`, что сейчас пишет только `thumbnail_key`.
2. Автодогонка старых кадров: до этой правки у всех фото `preview_key IS NULL`. Добавить в `worker.py` (`run()`) периодический self-heal по образцу уже существующего `sweep_stale_uploads` (раз при старте, потом раз в `SWEEP_INTERVAL_SECONDS`): найти `media_items` с `kind='photo' AND status='ready' AND preview_key IS NULL`, у которых нет уже идущей (`queued`/`running`) задачи `media_preview`, и поставить им такую задачу. От пользователя догрузки не требуется — досчитывается фоном на уже лежащих в хранилище оригиналах.

Окружение: на хосте может быть поднят dev-стенд (`make up`) — его `worker.py run` дерётся с тестами за таблицу `jobs` (та же база). Прецедент — TASK-117: воркер на время прогона `pytest` был приостановлен (SIGSTOP), после — возобновлён (SIGCONT), стенд целиком не гасился. Сделай так же (или `make down`/`make up`, если проще) — главное, верни как было.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Фото после media_preview имеет непустой preview_key — JPEG, длинная сторона = min(2048, длинная сторона оригинала); проверено тестом через ffprobe (как для видео в test_a_video_gets_a_poster_and_a_720p_preview)
- [x] #2 Тест test_a_photo_gets_a_thumbnail_and_goes_ready обновлён под новое поведение (сейчас там написано и проверено, что у фото preview нет)
- [x] #3 Тест: фото ready без preview_key, заведённое как «до этой вехи» — после прогона self-heal (без ручной загрузки) получает preview_key
- [x] #4 Тест: фото с уже идущей задачей media_preview self-heal не дублирует
- [x] #5 make test-montage зелёный, дев-стенд на хосте (если был поднят) не оставлен в отличающемся от исходного состоянии
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Готово, коммит 72e268b в montage (ветка worktree-agent-a5242420639f08b3d).

Крупная копия фото: в media_preview рядом с миниатюрой 640 теперь делается вторая JPEG-копия — PHOTO_PREVIEW_SCALE, то есть коробка min(2048,iw)×min(2048,ih) с force_original_aspect_ratio=decrease, так что кап ложится на длинную сторону в любой ориентации, а фото меньше 2048 не растягивается. Качество -q:v 3 (весь смысл файла в том, что он чёткий). Ключ previews/<id>.jpg пишется в preview_key тем же единственным UPDATE, что и thumbnail_key, — путь симметричен видео. Api и mobile не тронуты.

Догонка старых кадров: worker.sweep_photos_without_previews — один INSERT ... SELECT, находит kind=photo + status=ready + preview_key IS NULL без уже идущей (queued/running) задачи media_preview и ставит её. Вызывается из run() рядом с media.sweep_stale_uploads: цикл по кортежу SWEEPS, у каждого свой try/except, чтобы один sweep не уносил другой. Раз при старте, дальше по SWEEP_INTERVAL_SECONDS.

Побочная правка, которую потребовала догонка: media.give_up теперь не роняет в failed строку, которая уже ready. Догоняющая задача бежит по фото, неделями лежащим в галерее; три неудачных попытки сделать одну лишнюю копию не должны убирать у всех рабочий кадр. Покрыто параметризацией существующего теста: processing → failed, ready → ready.

Тесты (test_media.py): photo-фикстура принимает размер; test_a_photo_gets_a_thumbnail_and_goes_ready переписан и переименован в test_a_photo_gets_a_thumbnail_and_a_2048px_copy — оригинал 3000×2000, ffprobe скачанной копии даёт mjpeg 2048 по длинной стороне (по короткой допуск ±2 пикселя: разные ffmpeg округляют до чётного в разные стороны — 8.1 дал 1366, старые дают 1364). Плюс test_the_sweep_catches_up_a_photo_that_has_no_large_copy (старое ready-фото без preview_key, без повторной загрузки, копия 1200×800 = размер оригинала, то есть апскейла нет) и test_the_sweep_does_not_double_a_photo_that_is_already_on_its_way, параметризованный по queued/running. Хелпер only_jobs_for чистит чужие задачи: sweep идёт по всей таблице, и фото дев-стенда иначе затягиваются в прогон.

Прогон: 45 passed (реальные Postgres/MinIO/ffmpeg). Дев-воркер на время прогона приостанавливался (SIGSTOP pid 66193 — питон, а не sh-обёртка из .run/worker.pid) и возвращён в работу (SIGCONT); jobs пустая, 27 дев-фото не тронуты — состояние стенда исходное.

README: таблица превью дополнена строкой фото и абзацем про догонку.
<!-- SECTION:NOTES:END -->
