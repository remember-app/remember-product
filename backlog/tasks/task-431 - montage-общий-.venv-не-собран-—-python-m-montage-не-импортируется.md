---
id: TASK-431
title: 'montage: общий .venv не собран — python -m montage не импортируется'
status: To Do
assignee: []
created_date: '2026-09-27 11:22'
labels:
  - from-lead
dependencies: []
priority: low
type: bug
ordinal: 420000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
В projects/montage/.venv не хватает google-auth, поэтому запуск python -m montage падает на импорте прямо в основном чек-ауте. Найдено при работе над TASK-424 — агент обошёлся временным venv. Как и с biome в mobile (TASK-429), это окружение, которым будут пользоваться все следующие задачи по montage.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 python -m montage init запускается в основном .venv репозитория montage без ошибок импорта
<!-- AC:END -->
