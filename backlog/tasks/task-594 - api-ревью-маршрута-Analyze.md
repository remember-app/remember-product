---
id: TASK-594
title: 'api: ревью маршрута Analyze'
status: In Progress
assignee: []
created_date: '2026-10-28 19:15'
updated_date: '2026-10-28 19:15'
labels:
  - from-lead
milestone: m-43
dependencies:
  - TASK-589
priority: medium
type: feat
ordinal: 573000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Ревью правок m-43 в api: маршрут POST /memories/:id/analyze, право организатора, одна задача в очереди, контракт. Отдельный агент, не автор правок.
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
Работа идёт в projects/api; первым делом pwd и git rev-parse --show-toplevel, при несовпадении — стоп. Коммит — fd00f7f в dev (и мерж). В ворктри npm run lint проверяет 0 файлов (исключение **/.claude) — прогоняй biome так, чтобы файлы проверились, и покажи число. npm test требует MONTAGE_SCHEMA_SQL на projects/montage/schema.sql. Ничего не деплоить, в удалённую ветку не пушить.
<!-- SECTION:NOTES:END -->
