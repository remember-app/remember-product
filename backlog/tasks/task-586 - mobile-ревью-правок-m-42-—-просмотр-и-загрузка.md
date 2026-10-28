---
id: TASK-586
title: 'mobile: ревью правок m-42 — просмотр и загрузка'
status: Done
assignee: []
created_date: '2026-10-28 18:02'
updated_date: '2026-10-28 18:11'
labels:
  - from-lead
milestone: m-42
dependencies:
  - TASK-583
  - TASK-584
priority: medium
type: feat
ordinal: 565000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Ревью правок вехи m-42, когда код сдан: кнопка паузы скрывается вместе с интерфейсом и вопрос о повторной загрузке уже загруженного файла. Не сломано ли, не задвоено ли, нет ли дыр и небезопасных мест. Отдельный агент, не автор правок.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Ревью пройдено: каждая находка либо починена, либо объяснена и оставлена
- [x] #2 Чужие находки рядом не чинятся молча — названы ведущему отдельной карточкой
- [x] #3 Ревью идёт по коммитам m-42 в dev, не по дереву на глаз
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 Ревью завершено, находки закрыты или объяснены
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Работа идёт в projects/mobile; первым делом pwd и git rev-parse --show-toplevel, при несовпадении — стоп. Ревью идёт по коммитам m-42 в dev (23263b1, 1d8eb03 и их мержи). Источник поведения — backlog/milestones/m-42. Ничего не деплоить, в удалённую ветку не пушить.
<!-- SECTION:NOTES:END -->
