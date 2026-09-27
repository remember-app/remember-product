---
id: TASK-438
title: 'api: чужой скрытый кадр можно добавить в лейбл, зная его id'
status: To Do
assignee: []
created_date: '2026-09-27 12:30'
updated_date: '2026-09-27 13:08'
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

Расширено финальным ревью m-30: дыра шире, чем «зная id» — узнать id совсем не сложно. Журнал сборки ролика сознательно отдаёт id скрытых кадров всем участникам (запись остаётся в истории). Плюс тот же пробел у обложки воспоминания: PATCH принимает id чужого скрытого кадра без проверки видимости (src/memories/plugin.ts:287-291) — правда, тогда обложку видит только хозяин кадра, урон мелкий. Закрыть оба места вместе.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 положить кадр в лейбл можно только для кадров, которые видны звонящему (seenBy) — как и везде
- [ ] #2 положить кадр в лейбл можно только для кадров, которые видны звонящему (seenBy) — как и везде
- [ ] #3 поставить обложкой воспоминания можно только кадр, видимый звонящему (seenBy)
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Место: src/media/labels.ts, putFrames/missingFrames. Ориентируйся на seenBy (src/memories/plugin.ts) — тот же приём, что уже применён в TASK-436.
<!-- SECTION:NOTES:END -->
