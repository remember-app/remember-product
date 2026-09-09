---
id: TASK-126.2
title: 'montage: воркер собирает ролик в выбранную ориентацию'
status: Done
assignee: []
created_date: '2026-09-09 06:47'
updated_date: '2026-09-09 07:02'
labels:
  - from-lead
milestone: m-17
dependencies: []
parent_task_id: TASK-126
priority: high
type: feat
ordinal: 134000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Часть TASK-126. montage.py собирает всё на жёстко заданный холст CANVAS_WIDTH=1920, CANVAS_HEIGHT=1080 (module-level, строки 35-42) — вертикальный материал добивается полями, горизонтальный ложится как есть. Контракт с api (зафиксирован): params.orientation — необязательная строка "landscape" | "portrait", по умолчанию "landscape" (нынешнее поведение).

Нужно: холст 1920×1080 при landscape/отсутствии значения (как сейчас) и 1080×1920 при portrait — CANVAS сейчас строится один раз на весь модуль из констант; сделать зависимым от params, читать рядом с target_seconds/track_id (строки 294-296). Постер (media.THUMBNAIL_SCALE, строка 394) режется из уже собранного файла своим отношением сторон — трогать его отдельно не нужно, если он не завязан на фиксированные 1920×1080 (проверить media.py).
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 montages.params.orientation = "portrait" — собранный ролик 1080×1920, материал вписан в вертикальный холст
- [x] #2 orientation отсутствует или "landscape" — ролик 1920×1080, как сейчас
- [x] #3 Автотест на выбор холста по params (test_montage.py)
<!-- AC:END -->
