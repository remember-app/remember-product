---
id: TASK-455
title: 'montage: локальная тестовая среда разошлась с requirements.txt и Makefile'
status: Done
assignee: []
created_date: '2026-09-27 15:54'
updated_date: '2026-09-27 16:11'
labels:
  - from-lead
milestone: m-31
dependencies: []
priority: low
type: bug
ordinal: 444000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Все агенты этой вехи независимо натыкались на одно и то же: общий .venv обработчика не совпадает с requirements.txt (нет google-auth/cryptography — pytest без контейнера не стартует), а test-in-docker.sh/docs/testing.md зашиты под кред Postgres remember:remember, хотя на машине сейчас работает postgres:postgres, как в Makefile. Каждый заводил свою временную базу и venv — лишняя трата времени на ровном месте.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Общий .venv устанавливается из requirements.txt без ручных дополнений
- [x] #2 test-in-docker.sh подключается к базе, реально стоящей на машине (или сам поднимает нужную), без правки руками перед каждым запуском
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 ревью пройдено
- [ ] #2 автотесты зелёные
<!-- DOD:END -->
