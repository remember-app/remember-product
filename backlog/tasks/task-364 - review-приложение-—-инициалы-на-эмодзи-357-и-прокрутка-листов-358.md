---
id: TASK-364
title: 'review: приложение — инициалы на эмодзи (357) и прокрутка листов (358)'
status: In Progress
assignee: []
created_date: '2026-09-25 10:33'
labels:
  - from-chief
milestone: m-28
dependencies:
  - TASK-357
  - TASK-358
priority: medium
type: feat
ordinal: 356000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Ревью двух последних хвостов вехи: инициалы по символу целиком и общий лист, который прокручивается, когда содержимое не влезло.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Прочитан каждый коммит; реальные дефекты исправлены коммитом (с тестом там, где это поведение), а то, что дефектом не признано, названо в отчёте с причиной
- [ ] #2 Автотесты, типы и линтер приложения зелёные после исправлений (линтер — на копии вне worktree или после слияния)
- [ ] #3 Ничего сверх ревью: соседние находки названы в отчёте, а не исправлены
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Исправления — коммитами в ветке worktree сервиса, слияние в dev — за лидом
- [ ] #2 Автотесты сервиса зелёные
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Сервис projects/mobile, ветка dev. Коммиты 8c32f31 (TASK-357), 3cf855e (TASK-358) и слияния (git log f3830b0..dev).
<!-- SECTION:NOTES:END -->
