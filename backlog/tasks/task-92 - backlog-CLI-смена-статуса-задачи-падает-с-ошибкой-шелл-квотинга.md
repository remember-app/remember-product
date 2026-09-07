---
id: TASK-92
title: 'backlog CLI: смена статуса задачи падает с ошибкой шелл-квотинга'
status: To Do
assignee: []
created_date: '2026-09-07 10:10'
labels:
  - from-lead
dependencies: []
priority: low
type: bug
ordinal: 96000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Каждый backlog task edit -s (смена статуса) печатает ошибку sh -c: unexpected EOF while looking for matching `"' перед тем, как всё же применить смену — сама операция проходит, но специалисты видят красную ошибку на каждом переключении карточки. Замечено дважды независимо (агентами по TASK-82 и TASK-83 в вехе m-13). В backlog/config.yml on_status_change стоит пустой строкой, но callback всё равно на что-то срабатывает — похоже на баг самого CLI-хука, не на конфиг этого репозитория.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Смена статуса задачи через backlog task edit -s не печатает ошибку шелла
<!-- AC:END -->
