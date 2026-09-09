---
id: TASK-129
title: >-
  mobile: другие листы тоже не закрываются при уходе с экрана без явного
  закрытия
status: To Do
assignee: []
created_date: '2026-09-09 06:52'
updated_date: '2026-09-09 09:08'
labels:
  - from-lead
milestone: m-20
dependencies: []
priority: low
type: bug
ordinal: 136000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Найдено попутно при TASK-94 (лист приглашения на экране участников). Тот же пробел в соседних экранах — лист остаётся смонтированным (Modal visible=true), если уйти с экрана не закрыв его явно:
- src/memory/films.tsx — лист заказа монтажа, состояние ordering, useFocusEffect(load) без сброса на blur;
- src/memory/frames.tsx — подтверждение удаления (confirming) и открытый на весь экран кадр (open);
- src/memory/people.tsx — подтверждение удаления участника (dropping) — то же лицо, что и TASK-94, но другое состояние, не тронуто там сознательно (задача была про лист приглашения).

Не часть вехи m-17, в очередь не поставлена — фиксирую находку.
<!-- SECTION:DESCRIPTION:END -->
