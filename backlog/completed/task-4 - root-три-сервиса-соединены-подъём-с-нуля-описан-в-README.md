---
id: TASK-4
title: 'root: три сервиса соединены, подъём с нуля описан в README'
status: Done
assignee:
  - '@specialist'
created_date: '2026-09-03 10:15'
updated_date: '2026-09-03 10:17'
labels:
  - from-chief
milestone: m-0
dependencies:
  - TASK-1
  - TASK-2
  - TASK-3
priority: medium
type: feat
ordinal: 14000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Свести три скелета вместе в корневом репозитории: перевести указатели сабмодулей на принятые коммиты, написать README, который проводит чистую машину от нуля до трёх работающих сервисов, и один раз пройти этот путь руками.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Указатели трёх сабмодулей стоят на принятых коммитах
- [x] #2 README ведёт с чистой машины: Postgres, затем API, затем воркер, затем приложение
- [x] #3 Путь пройден вживую: экран приложения показывает ответ API, воркер разбирает свою тестовую задачу
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 В корневом репозитории нет кода — только документация и указатели
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Общий Postgres из docker-compose бэкенда обслуживает и api, и montage — отдельную базу воркеру не поднимают.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Сдано в корневом репозитории. Восстановлено на доске задним числом 2026-09-03 из истории git.
<!-- SECTION:FINAL_SUMMARY:END -->
