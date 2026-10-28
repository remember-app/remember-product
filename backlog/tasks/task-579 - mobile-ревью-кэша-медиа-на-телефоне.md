---
id: TASK-579
title: 'mobile: ревью кэша медиа на телефоне'
status: Done
assignee: []
created_date: '2026-10-28 16:40'
updated_date: '2026-10-28 17:46'
labels:
  - from-lead
milestone: m-41
dependencies:
  - TASK-578
priority: medium
type: feat
ordinal: 558000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Ревью кэша медиа на телефоне, когда код сдан: не сломано ли, не задвоено ли, нет ли дыр, утечек и небезопасных мест; совпадает ли код со спецификацией doc-15. Отдельный агент, не автор правок.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Ревью пройдено: каждая находка либо починена, либо объяснена и оставлена
- [x] #2 Код сверен со спецификацией doc-15, расхождений нет или они названы ведущему
- [x] #3 Чужие находки рядом не чинятся молча — названы ведущему отдельной карточкой
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 Ревью завершено, находки закрыты или объяснены
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Работа идёт в projects/mobile; первым делом pwd и git rev-parse --show-toplevel, при несовпадении — стоп. Ревью идёт по коммитам m-41 в dev. Ничего не деплоить, в удалённую ветку не пушить.
<!-- SECTION:NOTES:END -->
