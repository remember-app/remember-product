---
id: DRAFT-13
title: 'mobile: отступы листов подтверждения и сортировки по нарисованным значениям'
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
Общий лист кита держит 16 между блоками и 12 между кнопками, а макеты подтверждений рисуют 18 и 8; у листов сортировки и фильтров — 20 между блоками и 10 от подписи до сегментов; красная плашка в SheetConfirmMember нарисована с зазором 11 и отступами 12/14, в ките 8 и 12. Высоты подтверждений (380/420/430) не применяются.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Листы подтверждения, сортировки и фильтров держат отступы и высоты, нарисованные в design/screens
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Коммит в ветке worktree сервиса, слияние в main — за лидом
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Источник: отчёты по TASK-292, 294, 296. Общий стиль группы листа делят сортировка и фильтры — менять осознанно, оба листа сразу.
<!-- SECTION:NOTES:END -->
