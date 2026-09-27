---
id: TASK-447
title: 'montage: перед каждым роликом заново скачиваются все оригиналы воспоминания'
status: To Do
assignee: []
created_date: '2026-09-27 13:05'
updated_date: '2026-09-27 13:16'
labels:
  - from-chief
dependencies: []
priority: medium
type: feat
ordinal: 436000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Отсев качает все оригиналы при каждом заказе. На маленьком воспоминании это 18 секунд, на настоящем (200 фото и 20 видео, около двух гигабайт) — минуты и трафик, каждый раз заново.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Повторный заказ ролика не качает то, что уже считали
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Отменено человеком 2026-09-27: основной случай — воспоминание на 20 кадров и 4 видео, там перекачка стоит секунды. Вернуться, если появятся большие воспоминания.
<!-- SECTION:FINAL_SUMMARY:END -->
