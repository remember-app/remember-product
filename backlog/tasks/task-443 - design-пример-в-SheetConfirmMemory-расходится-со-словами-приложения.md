---
id: TASK-443
title: 'design: пример в SheetConfirmMemory расходится со словами приложения'
status: To Do
assignee: []
created_date: '2026-09-27 12:52'
labels:
  - from-lead
dependencies: []
priority: low
type: bug
ordinal: 432000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Спека (SheetConfirmMemory, 10.7) держит образец «358 кадров сюда принесли другие» — приложение теперь говорит «исчезнут», не «принесли» (TASK-440/442, решение chief про правду об удалении). Найдено коддером TASK-442.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 design/spec.md для SheetConfirmMemory использует то же слово, что приложение — «исчезнут», не «принесли»
<!-- AC:END -->
