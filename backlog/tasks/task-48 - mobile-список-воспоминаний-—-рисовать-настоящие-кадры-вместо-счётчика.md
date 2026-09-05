---
id: TASK-48
title: 'mobile: список воспоминаний — рисовать настоящие кадры вместо счётчика'
status: To Do
assignee: []
created_date: '2026-09-05 04:19'
labels:
  - from-human
milestone: m-8
dependencies:
  - TASK-47
priority: low
ordinal: 52000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Список /memories теперь отдаёт до двух URL последних кадров на воспоминание (TASK-47). Карточка kit'а (CardMemory/Stack в src/kit/card-memory.tsx) уже умеет рисовать thumbs — сейчас src/app/index.tsx передаёт только more={media_count} с пометкой ponytail «pass thumbs here the day /memories hands out previews». День настал.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 CardMemory на главном экране получает thumbs из ответа /memories, more — остаток сверх нарисованных кадров
- [ ] #2 Ни одного отдельного запроса на карточку — все данные приходят одним вызовом /memories
- [ ] #3 Пустое воспоминание по-прежнему честно показывает пустоту (kit's «—»), вёрстка не меняется за рамками того, что уже рисует кит
<!-- AC:END -->
