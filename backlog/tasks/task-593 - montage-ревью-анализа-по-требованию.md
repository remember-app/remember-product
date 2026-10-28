---
id: TASK-593
title: 'montage: ревью анализа по требованию'
status: Done
assignee: []
created_date: '2026-10-28 19:15'
updated_date: '2026-10-28 19:38'
labels:
  - from-lead
milestone: m-43
dependencies:
  - TASK-588
priority: medium
type: feat
ordinal: 572000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Ревью правок m-43 в обработчике: загрузка больше не ставит анализ, новая задача анализа на воспоминание, первый этап монтажа добирает недостающее. Отдельный агент, не автор правок.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Ревью пройдено: каждая находка либо починена, либо объяснена и оставлена
- [x] #2 Чужие находки рядом не чинятся молча — названы ведущему отдельной карточкой
- [x] #3 Ревью идёт по коммитам m-43 в dev, не по дереву на глаз
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 Ревью завершено, находки закрыты или объяснены
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Работа идёт в projects/montage; первым делом pwd и git rev-parse --show-toplevel, при несовпадении — стоп. Коммит — 692baec в dev (и мерж fc0e395). Полный набор — make test-montage из корня (R2_* даёт Makefile; ./test.sh напрямую падает без них). Ничего не деплоить, в удалённую ветку не пушить.
<!-- SECTION:NOTES:END -->
