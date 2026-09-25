---
id: DRAFT-12
title: >-
  mobile: мелкие расхождения просмотра кадра, видео и ленты с выгрузкой 25
  сентября
status: Draft
assignee: []
created_date: '2026-09-25 07:10'
labels:
  - from-specialist
milestone: m-28
dependencies: []
priority: low
type: bug
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Кодер капсул нашёл места, где экраны приложения отличаются от выгрузки, а спека о них молчит: у кнопки «Смонтировать» на пустых роликах нет знака плюс; кнопка паузы видео тёмная, а не стеклянная; цвет и вес таймкодов видео; зазор дорожки и плёнки 14 вместо 12; цвет даты в пилюле просмотрщика; чёрточки и точка на стержне дат.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Каждое из названных расхождений либо исправлено по выгрузке, либо явно оставлено с причиной
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Коммит в ветке worktree сервиса, слияние в main — за лидом
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Источник: отчёт по TASK-297. Смотреть design/screens (FilmsEmpty, ViewerVideo, Viewer, MemoryScrub) и design/spec.md 7.10, 7.0.
<!-- SECTION:NOTES:END -->
