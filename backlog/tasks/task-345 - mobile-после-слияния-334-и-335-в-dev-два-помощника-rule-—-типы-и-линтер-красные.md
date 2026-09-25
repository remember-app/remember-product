---
id: TASK-345
title: >-
  mobile: после слияния 334 и 335 в dev два помощника rule — типы и линтер
  красные
status: Done
assignee: []
created_date: '2026-09-25 08:54'
updated_date: '2026-09-25 08:57'
labels:
  - from-lead
milestone: m-28
dependencies: []
priority: high
type: bug
ordinal: 338000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Две параллельные задачи независимо вынесли один и тот же помощник rule (поиск класса по правилу): одна в src/kit/story.tsx, другая в tests/helpers/css.ts (с экранированием). После слияния в dev в tests/kit/rows.test.tsx он объявлен дважды: typecheck и biome красные.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Помощник rule один (в tests/helpers/css.ts, с экранированием), из src/kit/story.tsx убран, всё, что его импортировало, идёт к общему; typecheck, biome (--error-on-warnings) и полный набор тестов приложения на dev зелёные
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 Коммит в ветке worktree сервиса, слияние в dev — за лидом
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Найдено лидом при слиянии TASK-334 после TASK-335 (оба переносили rule из tests/kit/rows.test.tsx). Правка — в worktree бывшего кодера TASK-334.
<!-- SECTION:NOTES:END -->
