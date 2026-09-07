---
id: TASK-62
title: 'mobile: открытый во весь экран кадр не загружается'
status: Done
assignee: []
created_date: '2026-09-07 06:27'
updated_date: '2026-09-07 06:55'
labels:
  - from-human
milestone: m-11
dependencies: []
priority: high
type: bug
ordinal: 66000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Со слов человека: «при нажатии на медиафайл он во-первых все так же не загружается». В полноэкранном просмотре вместо кадра значок предупреждения и надпись «Preparing…».
<!-- SECTION:DESCRIPTION:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Та же причина, что у TASK-60, и та же правка: полноэкранный просмотр берёт запись из тех же items, поэтому устаревшее processing давало треугольник и «Preparing…». Закрыт коммитом 42e4c87 (ветка worktree-agent-ac5b0410a997920c8); вид просмотра не трогали — это TASK-65. Заодно сетка и просмотр читают запись одним способом (src/frames.ts), а не порознь.
<!-- SECTION:NOTES:END -->
