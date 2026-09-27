---
id: TASK-435
title: 'api: в сведениях о кадре ролик показан без имени'
status: Done
assignee: []
created_date: '2026-09-27 12:08'
updated_date: '2026-09-27 12:30'
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
Сделано вместе с TASK-436 (коммит 8f1102f): «В роликах» в сведениях о кадре теперь показывает имя ролика (то же, что в списке роликов — своё или дефолт по языку). Рефактор: montageName вынесена в src/montages/view.ts, переиспользуется в обоих местах.
<!-- SECTION:NOTES:END -->
