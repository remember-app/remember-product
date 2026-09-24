---
id: TASK-287
title: 'api: тест правки воспоминания падает, когда между запросами тикает секунда'
status: To Do
assignee: []
created_date: '2026-09-24 15:22'
labels:
  - from-chief
dependencies: []
priority: low
type: bug
ordinal: 284000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Тест сравнивает подписанную ссылку из ответа на правку со ссылкой из более позднего запроса списка. Подписи включают время, и на границе секунды они расходятся — тест краснеет не по своей вине. Поймано один раз из шести прогонов.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Тест не зависит от того, тикнула ли секунда между двумя запросами
<!-- AC:END -->
