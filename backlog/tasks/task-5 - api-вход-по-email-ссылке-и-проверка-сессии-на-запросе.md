---
id: TASK-5
title: 'api: вход по email-ссылке и проверка сессии на запросе'
status: Done
assignee:
  - '@specialist'
created_date: '2026-09-03 10:15'
updated_date: '2026-09-03 10:17'
labels:
  - from-chief
milestone: m-1
dependencies: []
priority: high
type: feat
ordinal: 5000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Человек оставляет свой email, получает одноразовую ссылку и по ней входит. Появляются пользователи, привязки к способам входа и сессии; любой следующий эндпоинт может потребовать авторизованного пользователя одной строкой.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Запрос ссылки создаёт пользователя, если его ещё нет, и выдаёт одноразовый токен
- [x] #2 Токен срабатывает ровно один раз и обменивается на сессию
- [x] #3 Запрос с валидной сессией возвращает текущего пользователя, без неё — 401
- [x] #4 Миграция накатывается на пустую базу и повторный запуск ничего не ломает
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 README объясняет следующей команде, как подключить проверку сессии к своим маршрутам
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Миграция 002: users (ник citext, уникальный), auth_identities, sessions, email_login_tokens. Сессия — случайный токен на 32 байта, в базе хранится только SHA-256 от него, срок 30 дней. Почтовой службы в MVP нет: ссылка печатается в лог сервера. Ограничение частоты на запрос ссылки — по адресу и по IP, счётчики в памяти процесса.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Сдано в projects/api коммитом b51a9f0 (2026-09-02). Восстановлено на доске задним числом 2026-09-03 из истории git.
<!-- SECTION:FINAL_SUMMARY:END -->
