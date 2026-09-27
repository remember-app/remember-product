---
id: TASK-435
title: 'api: в сведениях о кадре ролик показан без имени'
status: To Do
assignee: []
created_date: '2026-09-27 12:08'
labels:
  - from-lead
dependencies: []
priority: low
type: bug
ordinal: 424000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
После TASK-423 ролик умеет называться, но в «Сведениях о кадре» (список «в каких роликах») отдаётся только длительность — имя ролика туда не попало. Переименовал ролик — список роликов это покажет, а лист кадра нет.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 в списке «в роликах» сведений о кадре видно текущее имя ролика
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Найдено при ревью m-30 (TASK-422/423/430). Место — src/media/frame.ts:156-163, тип InMontage. Новое поле в ответе — приложению нужно будет его читать, поэтому не мелочь для реализации в ревью.
<!-- SECTION:NOTES:END -->
