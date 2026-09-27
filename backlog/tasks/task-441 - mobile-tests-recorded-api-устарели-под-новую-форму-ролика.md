---
id: TASK-441
title: 'mobile: tests/recorded-api устарели под новую форму ролика'
status: To Do
assignee: []
created_date: '2026-09-27 12:33'
labels:
  - from-lead
dependencies: []
priority: low
type: bug
ordinal: 430000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Записанные ответы api в tests/recorded-api/ ещё в старой форме — ordered_by строкой, без name. Тесты зелёные, потому что ничего не проверяет заголовок по этим данным, но данные пора перезаписать под актуальный ответ api (TASK-423/428).
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 tests/recorded-api/ отражает текущую форму ответа api по ролику (name, ordered_by объектом)
<!-- AC:END -->
