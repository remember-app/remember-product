---
id: DRAFT-17
title: 'montage: ролик короче заказа на длину склеек — режиссёр не знает про них'
status: Draft
assignee: []
created_date: '2026-09-25 10:40'
labels:
  - from-lead
dependencies: []
priority: low
type: bug
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Живой прогон: заказ на 18 с, режиссёр дал 4 куска по 4,5 с = 18 с, сборка вычитает 3 склейки по 0,5 с — ролик 16,5 с, в логе предупреждение «материал кончился на 1,5 с раньше», хотя материала хватало. director.md про это молчит.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Длина собранного ролика совпадает с заказанной (допуск в один кадр), либо режиссёру честно сообщается, что склейки вычитаются
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Черновик от лида по отчёту TASK-317: не блокирует пилот.
<!-- SECTION:NOTES:END -->
