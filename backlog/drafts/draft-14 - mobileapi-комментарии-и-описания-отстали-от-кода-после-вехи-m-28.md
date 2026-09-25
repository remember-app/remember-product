---
id: DRAFT-14
title: 'mobile+api: комментарии и описания отстали от кода после вехи m-28'
status: Draft
assignee: []
created_date: '2026-09-25 07:10'
labels:
  - from-specialist
milestone: m-28
dependencies: []
priority: low
type: bug
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Мелкий хвост: в src/api/account.ts и contacts.ts остались задвоенные и осиротевшие комментарии после разреза TASK-285; в tests/routes/memory/settings.test.ts комментарии всё ещё говорят, что удаления воспоминания нет; README приложения говорит, что истории деталей лежат в src/kit, а они в tests/kit; в kit осталась карточка выбора (круг с галочкой), которой больше никто не пользуется.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Комментарии и README совпадают с кодом; неиспользуемая деталь кита удалена вместе с историей
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Коммит в ветке worktree сервиса, слияние в main — за лидом
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Источник: отчёты по TASK-292, 294, 295, 296.
<!-- SECTION:NOTES:END -->
