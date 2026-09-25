---
id: TASK-374
title: >-
  review: приложение — прокрутка экранов в Board (372) и «Отмена»/сегменты на
  крупном шрифте (373)
status: In Progress
assignee: []
created_date: '2026-09-25 13:32'
labels:
  - from-chief
milestone: m-28
dependencies:
  - TASK-372
  - TASK-373
priority: medium
type: feat
ordinal: 365000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Ревью двух последних задач: общая прокрутка экрана в каркасе Board на все маршруты и крупный шрифт в шапке мастера и сегментах.
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
Сервис projects/mobile, ветка dev. Коммиты c9808f1 (TASK-372, перенос всех 24 маршрутов на Board), 4c4d0b7 (TASK-373) и слияния; git log 1f6b2f6..dev. Замеры реальной раскладки — временный стенд без окна, убран.
<!-- SECTION:NOTES:END -->
