---
id: TASK-71
title: 'mobile: карточка воспоминания на 74 точки выше своего содержимого'
status: To Do
assignee: []
created_date: '2026-09-07 09:23'
labels:
  - from-specialist
dependencies: []
priority: high
type: bug
ordinal: 75000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Дизайнер: под полоской кадров в каждой карточке зияет пустота — карточка 238 точек вместо 164 по анатомии кита. Причина в перфорации: шестнадцать точек с шагом 13 дают колонку в 204 точки и задают высоту строки, обрезка их прячет, но место они занимают. Чинится тем, что перфорация перестаёт участвовать в раскладке — рисуется поверх левого края карточки. Файл: projects/mobile/src/kit/card-memory.tsx, стиль rail.
<!-- SECTION:DESCRIPTION:END -->
