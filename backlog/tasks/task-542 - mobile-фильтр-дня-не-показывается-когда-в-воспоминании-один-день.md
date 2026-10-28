---
id: TASK-542
title: 'mobile: фильтр дня не показывается, когда в воспоминании один день'
status: Done
assignee: []
created_date: '2026-10-28 12:58'
updated_date: '2026-10-28 13:04'
labels:
  - from-lead
milestone: m-38
dependencies: []
priority: medium
type: bug
ordinal: 521000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Человек: не показывать фильтр дня, если в воспоминании всего один день.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Когда в воспоминании один день, фильтра дня в листе фильтров нет
- [ ] #2 Когда дней два и больше, фильтр дня показывается как прежде
- [ ] #3 Проверка ломается, когда фильтр дня возвращается при одном дне
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Лист фильтров — src/screens/memory/frames-sheets.tsx (FilterSheet), дни считает filterDays в src/lib/frames.ts, на экране ленты days = filterDays(items). Прятать надо только строку дней; люди, лейблы, тип и ориентация остаются. Проверить, что при одном дне не остаётся пустой заголовок или лишний отступ.
<!-- SECTION:NOTES:END -->
