---
id: TASK-310
title: 'Человек: база remember и пользователь на общем Postgres компании'
status: To Do
assignee:
  - '@human'
created_date: '2026-09-25 07:24'
updated_date: '2026-09-25 07:26'
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
- [ ] #1 На общем Postgres есть база remember и отдельный пользователь remember, владелец только этой базы (не суперпользователь и без доступа к чужим базам); пароль пользователя — случайный, придуман человеком
- [ ] #2 Строка подключения этого пользователя (DATABASE_URL) лежит в ~/.remember-secrets.env, вне репозиториев, права 600; в чат, карточки и отчёты она не идёт
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Человек подтвердил лиду, что база и пользователь заведены и строка подключения лежит в файле
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
SQL (пароль подставить свой, только буквы и цифры, без символов, которым нужно экранирование в адресе): CREATE ROLE remember LOGIN PASSWORD '<пароль>'; CREATE DATABASE remember OWNER remember; REVOKE ALL ON DATABASE remember FROM PUBLIC; Затем строка вида postgres://remember:<пароль>@10.127.128.3:5432/remember. Выполнять из места, откуда виден 10.127.128.3 (у мака человека есть доступ). Доступ из наших подов в кластере к этому хосту есть — так живёт qe-life. Разбор TASK-298: SSL до базы выключен, суперпользователь у всех продуктов один — свой пользователь ограничивает нас самих от чужих баз, но не чужих от нас; решение человека — принято (decision-15).
<!-- SECTION:NOTES:END -->
