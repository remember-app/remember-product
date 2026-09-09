---
id: TASK-132
title: 'api: README отстал от TASK-126 — контракт заказа ролика без ориентации'
status: Done
assignee: []
created_date: '2026-09-09 07:13'
updated_date: '2026-09-09 09:22'
labels:
  - from-lead
milestone: m-20
dependencies: []
priority: low
type: bug
ordinal: 139000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Найдено попутно при TASK-126.1 и подтверждено ревью. README этого репозитория описывает договор заказа ролика с воркером — таблица полей запроса, абзац про то, какие значения не записываются по умолчанию, строки про пример ответа (около 1001, 1030-1062) и про причины ответа 400. Ни одно из этих мест не знает про orientation, добавленный TASK-126.1. Это ровно то, что читает мобильный разработчик перед тем, как послать поле — README называет себя единственной связью между репозиториями.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 таблица полей POST /memories/:memoryId/montages включает orientation наравне с target_seconds и music_track_id
- [x] #2 абзац про то, что не записывается по умолчанию, актуализирован под orientation — незаданная ориентация не пишется в params (воркер читает отсутствие поля как landscape), выбранная пишется
- [x] #3 примеры ответов (около строк 1030-1036 и 1054-1063) показывают orientation в params наравне с остальными полями
- [x] #4 перечень причин 400 включает неизвестное значение orientation
- [x] #5 формулировки соответствуют реальному коду src/montages/montages.ts (enum landscape/portrait, дефолт через отсутствие поля)
<!-- AC:END -->
