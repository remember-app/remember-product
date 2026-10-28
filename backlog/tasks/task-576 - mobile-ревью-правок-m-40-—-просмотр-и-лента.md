---
id: TASK-576
title: 'mobile: ревью правок m-40 — просмотр и лента'
status: To Do
assignee: []
created_date: '2026-10-28 16:40'
labels:
  - from-lead
milestone: m-40
dependencies:
  - TASK-574
  - TASK-575
priority: medium
type: feat
ordinal: 555000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Ревью всех правок вехи m-40 по просмотру, ленте и сетке, когда код сдан: не сломано ли, не задвоено ли, нет ли дыр и небезопасных мест. Отдельный агент, не автор правок.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Ревью пройдено: каждая находка либо починена, либо объяснена и оставлена
- [ ] #2 Чужие находки рядом не чинятся молча — названы ведущему отдельной карточкой
- [ ] #3 Ревью идёт по коммитам вехи в dev, не по дереву на глаз
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Ревью завершено, находки закрыты или объяснены
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Работа идёт в projects/mobile; первым делом pwd и git rev-parse --show-toplevel, при несовпадении — стоп. Ревью идёт по коммитам m-40 в dev. Ничего не деплоить, в удалённую ветку не пушить.
<!-- SECTION:NOTES:END -->
