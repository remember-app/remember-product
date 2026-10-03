---
id: TASK-453
title: 'montage: скрытие/удаление/правка даты кадра не пересчитывает «Дубль»'
status: Done
assignee:
  - '@coder'
created_date: '2026-09-27 14:48'
updated_date: '2026-10-03 12:26'
labels:
  - from-lead
milestone: m-33
dependencies:
  - TASK-452
priority: low
type: bug
ordinal: 442000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
TASK-452 пересчитывает серии дублей при каждом новом кадре. Если организатор скрыл, удалил кадр или api поправил дату съёмки, пересчёта не происходит — «Дубль» может провисеть на кадре до следующей загрузки в это же воспоминание.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Скрытие, удаление кадра или правка его даты съёмки запускает честный пересчёт серий по памяти (тем же путём, что и новый кадр)
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 ревью пройдено
- [ ] #2 автотесты зелёные
<!-- DOD:END -->
