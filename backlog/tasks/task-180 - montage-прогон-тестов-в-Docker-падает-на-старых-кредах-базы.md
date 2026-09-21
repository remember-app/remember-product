---
id: TASK-180
title: 'montage: прогон тестов в Docker падает на старых кредах базы'
status: To Do
assignee: []
created_date: '2026-09-21 08:07'
labels:
  - from-chief
dependencies: []
priority: low
type: bug
ordinal: 187000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
В test-in-docker.sh адрес базы остался со старой парой логина и пароля, а постоянный Postgres теперь другой. Запуск в контейнере падает на входе в базу; make test-montage работает.
<!-- SECTION:DESCRIPTION:END -->
