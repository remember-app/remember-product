---
id: TASK-347
title: 'Человек: положить JSON служебной учётки компании в свой секретный файл'
status: To Do
assignee:
  - '@human'
created_date: '2026-09-25 09:00'
labels:
  - from-chief
milestone: m-29
dependencies: []
priority: high
type: feat
ordinal: 340000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Хранилище временно — общий бакет компании (decision-16). Доступ — JSON-ключ служебной учётки компании (тот же, что у qe-life; лежит в репозитории инфраструктуры). Скопировать его в секретный файл исполнителям система прав Claude Code запретила (поиск учётных данных), обходить это нельзя — копирует человек сам, в своём терминале.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Файл ~/.remember-secrets.gcs.json существует, права 600 (-rw-------), вне всех репозиториев; содержимое — JSON служебной учётки компании; человек подтвердил это лиду
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Человек подтвердил лиду, что файл на месте
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Команду копирования лид передал chief личным сообщением (в карточку не пишется). Без файла не стартует живая проверка подписи ссылок (TASK-328) и всё за ней: TASK-329, 330, 315, 343.
<!-- SECTION:NOTES:END -->
