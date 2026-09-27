---
id: TASK-438
title: 'api: чужой скрытый кадр можно добавить в лейбл, зная его id'
status: To Do
assignee: []
created_date: '2026-09-27 12:30'
labels:
  - from-lead
dependencies: []
priority: low
type: bug
ordinal: 427000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
putFrames/missingFrames в src/media/labels.ts не проверяют seenBy — зная id чужого скрытого кадра, его можно положить в лейбл, хотя он не виден ни в счётчике, ни в списке. Найдено при работе над TASK-436.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 положить кадр в лейбл можно только для кадров, которые видны звонящему (seenBy) — как и везде
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Место: src/media/labels.ts, putFrames/missingFrames. Ориентируйся на seenBy (src/memories/plugin.ts) — тот же приём, что уже применён в TASK-436.
<!-- SECTION:NOTES:END -->
