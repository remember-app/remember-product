---
id: TASK-46
title: 'mobile: приглашение участника — лист снизу вместо постоянной формы'
status: Done
assignee: []
created_date: '2026-09-04 16:01'
updated_date: '2026-09-04 16:06'
labels:
  - from-human
dependencies: []
priority: medium
ordinal: 50000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Раздел «Invite someone» на экране участников (переключатель прав, поле ника, ссылка-приглашение) уходит в лист снизу, открываемый одной кнопкой «Invite», вместо формы, всегда открытой на экране.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 На экране участников одна кнопка/иконка «Invite» открывает лист снизу
- [x] #2 Лист снизу содержит всё то же: переключатель прав новичка, поле ника с кнопкой «Invite», секцию со ссылкой-приглашением (получить/поделиться/заменить)
- [x] #3 Механика листа (подложка, ручка, подъём, закрытие по тапу вне) переиспользует существующий ConfirmSheet — если для этого нужно выделить общую «раковину» листа в src/kit, сделать это, не поломав ConfirmSheet
- [x] #4 Вся логика приглашения (inviteByUsername, fetchInvite, rotateInvite, тексты notice) не меняется — только где она показана
- [x] #5 typecheck и тесты проходят
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Прямой запрос человека, за рамками боевой границы m-7 — отдельная задача, без вехи.
<!-- SECTION:NOTES:END -->
