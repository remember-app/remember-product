---
id: TASK-22
title: 'montage: превью фото и видео, уборка оборванных загрузок'
status: In Progress
assignee: []
created_date: '2026-09-03 12:59'
updated_date: '2026-09-04 05:49'
labels:
  - from-chief
milestone: m-3
dependencies:
  - TASK-20
priority: high
type: feat
ordinal: 26000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Воркер по задаче на превью качает оригинал из R2 и делает из него то, что показывает галерея: для фото — миниатюру, для видео — постер и лёгкую версию 720p. Раз в час подчищает записи, застрявшие в загрузке дольше суток, и освобождает место в R2.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Обработчик media_preview: качает оригинал из R2, для фото кладёт thumbnail, для видео — постер и 720p H.264, заливает деривативы в R2, ставит media_items.status = ready с ключами
- [ ] #2 Падение обработчика идёт по существующему пути повторов; после трёх попыток media_items.status = failed (галерея покажет плейсхолдер)
- [ ] #3 Раз в час: media_items в pending_upload/uploading старше 24 ч — недособранный multipart в R2 отменяется (abort), ключ освобождается, запись снимается
- [ ] #4 Живой тест: фото → появился thumbnail и статус ready; видео-фикстура → постер плюс 720p, длительность 720p в разумном диапазоне, дорожки на месте (ffprobe); застрявшая запись после прогона уборки исчезает
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
architecture.md: «Хранилище и медиа-пайплайн», «Обработка ошибок». Добавить в воркер ffmpeg и ffprobe. NIMA/OpenCV/сборка ролика — НЕ здесь (doc-03, заморожено человеком). S3-клиент для Python — boto3 (ponytail). Env R2 — те же имена, что у api (согласовать в TASK-25). Тип задачи media_preview — свободный текст в jobs.type, схему jobs менять не нужно. Уборку повесить в цикл воркера рядом с разбором очереди, не отдельным процессом. Существующий скелет: worker.py (run_once, HANDLERS), schema.sql, test_worker.py — держать их стиль.
<!-- SECTION:NOTES:END -->
