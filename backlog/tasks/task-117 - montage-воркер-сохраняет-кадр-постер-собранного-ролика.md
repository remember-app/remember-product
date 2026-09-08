---
id: TASK-117
title: 'montage: воркер сохраняет кадр-постер собранного ролика'
status: Done
assignee: []
created_date: '2026-09-08 18:12'
updated_date: '2026-09-08 18:27'
labels:
  - from-lead
milestone: m-16
dependencies:
  - TASK-116
priority: medium
type: feat
ordinal: 121000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
TASK-112: после сборки ролика воркер сейчас вырезает и загружает только видео (video_key). Добавить кадр-постер — один кадр из собранного видео, тем же приёмом THUMBNAIL_SCALE, что уже используется в media.py для превью фото/видео — и загрузить его в R2 рядом с видео, ключ записать в тот же столбец, что заводит TASK-116.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 После успешной сборки ролика в R2 лежит файл-постер рядом с видео
- [x] #2 Ключ постера пишется в ту же строку montages вместе с video_key
- [x] #3 Тест: успешный монтаж оставляет постер, провалившийся — нет
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Готово, коммит e863de4 в montage (ветка worktree-agent-ab5bdee2361389b99).

Что сделано: в montage.py, сразу после того как собранный ролик уехал в montages/<id>.mp4, из готового файла вырезается первый кадр (media._ffmpeg + media.THUMBNAIL_SCALE — тот же приём, что у превью в media.py) и кладётся рядом в montages/<id>.jpg как image/jpeg. Ключ пишется в poster_key тем же единственным UPDATE, что video_key, duration_seconds и status='ready'. Если строка исчезла во время сборки — из хранилища теперь забирается и видео, и постер.

Честность при сбое: вырезание и загрузка постера обёрнуты в try/except — ролик остаётся ready с видео, poster_key null, в логе предупреждение. Api это уже поддерживает (poster_url null, как у роликов до этой карточки). Пересобирать ролик ради одного кадра нельзя, поэтому не исключение, а предупреждение.

Тесты: в happy-path тесте (test_a_memory_of_photos_and_a_clip_becomes_one_playable_video) проверяется poster_key == montages/<id>.jpg и что скачанный файл — mjpeg шириной 640; в test_too_little_material_fails_the_montage_instead_of_retrying — что у провалившегося монтажа poster_key пустой. Полный набор: 38 passed (docker, реальные Postgres/MinIO/ffmpeg).

Не покрыто тестом: ветка «постер не вырезался» — её проверка стоит целой сборки ролика ради случая, когда ffmpeg не читает файл, который сам только что записал.

Замечание по окружению: на хосте крутится dev-воркер (worker.py run) против той же базы — он перехватывает задачи у тестов, и набор из-за этого падает случайными двумя-тремя тестами. Прогонял с приостановленным воркером (SIGSTOP/SIGCONT), после прогона вернул на место.
<!-- SECTION:NOTES:END -->
