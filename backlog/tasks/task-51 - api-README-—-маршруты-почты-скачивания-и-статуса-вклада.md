---
id: TASK-51
title: 'api: README — маршруты почты, скачивания и статуса вклада'
status: Done
assignee: []
created_date: '2026-09-05 04:19'
updated_date: '2026-09-05 04:23'
labels:
  - from-human
milestone: m-8
dependencies: []
priority: medium
ordinal: 55000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
projects/api/README.md не описывает то, что появилось в m-4 (доставка magic-link почтой, переменные RESEND_*), m-5 (скачивание одного файла и всей галереи) и m-6 (статус вклада участника — переходы, кто может их менять). Дописать по образцу того, как README уже описывает остальные маршруты.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 README описывает маршруты скачивания: один файл и вся галерея — путь, права, форма ответа, TTL ссылки
- [x] #2 README описывает переменные окружения почты (RESEND_API_KEY, MAIL_FROM и т.д.) и поведение без них
- [x] #3 README описывает маршрут(ы) статуса вклада — кто может менять свой, кто читает чужой, набор значений
<!-- AC:END -->
