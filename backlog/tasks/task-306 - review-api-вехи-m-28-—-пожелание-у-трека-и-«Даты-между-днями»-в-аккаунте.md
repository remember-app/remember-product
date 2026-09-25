---
id: TASK-306
title: 'review: api вехи m-28 — пожелание у трека и «Даты между днями» в аккаунте'
status: Done
assignee: []
created_date: '2026-09-25 07:22'
updated_date: '2026-09-25 07:46'
labels:
  - from-chief
milestone: m-28
dependencies:
  - TASK-289
  - TASK-291
priority: medium
type: feat
ordinal: 303000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Ревью серверной части вехи: пожелание к музыке у каждого трека (заказ, шаблоны, итог) и настройка аккаунта «Даты между днями» (поле профиля, маршрут, миграция).
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Прочитан каждый коммит диапазона; реальные дефекты исправлены коммитом (с тестом там, где это поведение), а то, что дефектом не признано, названо в отчёте с причиной
- [x] #2 Автотесты, типы и линтер сервиса зелёные после исправлений (линтер — на копии вне worktree или после слияния)
- [x] #3 Ничего сверх ревью: соседние находки названы в отчёте, а не исправлены
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 Исправления — коммитами в ветке worktree сервиса, слияние в main — за лидом
- [x] #2 Автотесты сервиса зелёные
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Сервис projects/api. Диапазон: git log 3981cda..main (коммиты e1891fe, 45e7d7f, d74eab2 и слияния). Критерии карточек TASK-289 и TASK-291.
<!-- SECTION:NOTES:END -->
