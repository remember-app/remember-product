---
id: TASK-277
title: 'api: удаление лейбла в момент правки отвечает 500 вместо «не найдено»'
status: To Do
assignee: []
created_date: '2026-09-24 11:55'
labels:
  - from-chief
dependencies: []
priority: medium
type: bug
ordinal: 274000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Если лейбл удалили, пока другой участник его правит, сервер падает с внутренней ошибкой вместо понятного ответа.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Правка удалённого лейбла отвечает «не найдено», а не внутренней ошибкой
<!-- AC:END -->
