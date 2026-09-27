---
id: TASK-454
title: 'montage: копия golden-снимков журнала в api разошлась с воркером'
status: Done
assignee: []
created_date: '2026-09-27 15:54'
updated_date: '2026-09-27 16:01'
labels:
  - from-lead
milestone: m-31
dependencies: []
priority: medium
type: bug
ordinal: 443000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
TASK-447/449 добавили новые записи в журнал монтажа (отброшенные дубли, несколько отрезков одного клипа). У api своя копия снимков (projects/api/src/montages/golden/) для собственных тестов — она не покраснела, но перестала отражать настоящий вывод воркера, а это и есть тот самый мост, который снимок должен держать.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Копии journal_algorithm.json/journal_director.json (и responses_*.json, если понадобится пересборка) в api обновлены до текущего вывода воркера
- [x] #2 Тесты api на этих снимках зелёные
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 ревью пройдено
- [ ] #2 автотесты зелёные
<!-- DOD:END -->
