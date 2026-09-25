---
id: TASK-307
title: 'review: montage вехи m-28 — режиссёр получает пожелание вместе с треком'
status: In Progress
assignee: []
created_date: '2026-09-25 07:22'
updated_date: '2026-09-25 07:22'
labels:
  - from-chief
milestone: m-28
dependencies:
  - TASK-290
priority: medium
type: feat
ordinal: 304000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Ревью воркера: пожелание к музыке уходит режиссёру у своего трека, общего пожелания нет.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Прочитан каждый коммит диапазона; реальные дефекты исправлены коммитом (с тестом там, где это поведение), а то, что дефектом не признано, названо в отчёте с причиной
- [ ] #2 Автотесты, типы и линтер сервиса зелёные после исправлений (линтер — на копии вне worktree или после слияния)
- [ ] #3 Ничего сверх ревью: соседние находки названы в отчёте, а не исправлены
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Исправления — коммитами в ветке worktree сервиса, слияние в main — за лидом
- [ ] #2 Автотесты сервиса зелёные
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Сервис projects/montage. Диапазон: git log d2f6f1c..main (коммит 9aad2d6 и слияние). Критерии карточки TASK-290; контракт входа — projects/api/docs/montages.md.
<!-- SECTION:NOTES:END -->
