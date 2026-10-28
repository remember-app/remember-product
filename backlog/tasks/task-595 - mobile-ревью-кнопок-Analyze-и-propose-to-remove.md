---
id: TASK-595
title: 'mobile: ревью кнопок Analyze и propose to remove'
status: In Progress
assignee: []
created_date: '2026-10-28 19:15'
updated_date: '2026-10-28 19:15'
labels:
  - from-lead
milestone: m-43
dependencies:
  - TASK-591
  - TASK-592
priority: medium
type: feat
ordinal: 574000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Ревью правок m-43 в приложении: кнопка Analyze на первом шаге заказа с опросом и видами, кнопка «Предложить удалить» в режиме выбора. Отдельный агент, не автор правок.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Ревью пройдено: каждая находка либо починена, либо объяснена и оставлена
- [ ] #2 Чужие находки рядом не чинятся молча — названы ведущему отдельной карточкой
- [ ] #3 Ревью идёт по коммитам m-43 в dev, не по дереву на глаз
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Ревью завершено, находки закрыты или объяснены
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Работа идёт в projects/mobile; первым делом pwd и git rev-parse --show-toplevel, при несовпадении — стоп. Коммиты — f4f9730 и 81445e6 в dev (и мержи). Сверяй с design/spec.md 10.15. В ворктри biome требует --vcs-use-ignore-file=false, иначе 0 файлов. Ничего не деплоить, в удалённую ветку не пушить.
<!-- SECTION:NOTES:END -->
