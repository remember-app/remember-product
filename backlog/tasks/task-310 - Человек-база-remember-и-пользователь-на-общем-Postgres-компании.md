---
id: TASK-310
title: 'Человек: база remember и пользователь на общем Postgres компании'
status: Done
assignee:
  - '@devops'
created_date: '2026-09-25 07:24'
updated_date: '2026-09-25 07:39'
labels:
  - from-chief
milestone: m-29
dependencies: []
priority: high
type: feat
ordinal: 307000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Решено: живём на общем Postgres компании (10.127.128.3), как остальные продукты. Отдельную базу и отдельного пользователя под Remember заводит человек одной короткой командой — своим доступом суперпользователя; пароль суперпользователя к нам не приходит.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 На общем Postgres есть база remember и отдельный пользователь remember, владелец только этой базы (не суперпользователь; PUBLIC лишён доступа к базе); ни одна чужая база и роль не тронуты; до создания проверено, что таких имён не было
- [ ] #2 Строка подключения этого пользователя (DATABASE_URL) с случайным паролем лежит только в ~/.remember-secrets.env (права 600, вне репозиториев); в отчёте, карточках и репозиториях её нет; подключение под новым пользователем проверено (select 1, версия сервера названа в отчёте)
- [ ] #3 Записано созданное (база, роль, где, команда отката); стенд человека на маке (localhost:5432) не тронут
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Отчёт devops со списком созданного и командами отката принят лидом
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
SQL (пароль подставить свой, только буквы и цифры, без символов, которым нужно экранирование в адресе): CREATE ROLE remember LOGIN PASSWORD '<пароль>'; CREATE DATABASE remember OWNER remember; REVOKE ALL ON DATABASE remember FROM PUBLIC; Затем строка вида postgres://remember:<пароль>@10.127.128.3:5432/remember. Выполнять из места, откуда виден 10.127.128.3 (у мака человека есть доступ). Доступ из наших подов в кластере к этому хосту есть — так живёт qe-life. Разбор TASK-298: SSL до базы выключен, суперпользователь у всех продуктов один — свой пользователь ограничивает нас самих от чужих баз, но не чужих от нас; решение человека — принято (decision-15).
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Создано на общем Postgres компании (10.127.128.3:5432, Google Cloud SQL, PostgreSQL 15.18): база remember и роль remember (LOGIN, не суперпользователь, владелец только своей базы, лимит 30 подключений; PUBLIC лишён доступа к базе и к схеме public). Строка подключения — только в ~/.remember-secrets.env (DATABASE_URL, права 600). Откат: DROP DATABASE remember; DROP ROLE remember (лимит снимается ALTER ROLE remember CONNECTION LIMIT -1). Замечено: роль может подключаться к чужим базам (по умолчанию у PUBLIC есть CONNECT на 51 из 60 баз) — закрыть можно только правкой чужих баз, не делалось; шифрования до сервера нет.
<!-- SECTION:FINAL_SUMMARY:END -->
