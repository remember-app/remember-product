---
id: DRAFT-15
title: 'api: тест шаблонов роликов держит свою копию заготовок вместо общей'
status: Draft
assignee: []
created_date: '2026-09-25 07:10'
labels:
  - from-specialist
milestone: m-28
dependencies: []
priority: low
type: feat
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
src/montages/templates.test.ts до сих пор несёт собственные заготовки (метка, уборка, участник, материал) вместо общего помощника underTag, введённого в TASK-286.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Тест шаблонов пользуется общим помощником; автотесты зелёные
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Коммит в ветке worktree сервиса, слияние в main — за лидом
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Источник: отчёт по TASK-289.
<!-- SECTION:NOTES:END -->
