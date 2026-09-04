---
id: TASK-26
title: 'root: окружение R2 и лимиты, подъём с нуля'
status: To Do
assignee: []
created_date: '2026-09-03 13:00'
labels:
  - from-chief
milestone: m-3
dependencies:
  - TASK-20
  - TASK-22
priority: medium
type: feat
ordinal: 30000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Появляются переменные окружения для хранилища R2 и чисел лимитов — во всех сервисах одинаково названные, с примерами; README подъёма с чистой машины учитывает новый шаг, деплой-конфиг знает про новые переменные.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 .env.example в api и montage перечисляют переменные R2 (endpoint, бакет, ключи, TTL) и лимитов с дефолтами-предложениями из architecture.md
- [ ] #2 README корневого репозитория в разделе подъёма упоминает, что бакет и ключи R2 заводит человек, и куда их класть
- [ ] #3 Деплой-конфиг, если он заведён, знает про новые переменные; если не заведён — в README зафиксировано, что переменные обязательны для api и montage
- [ ] #4 Имена переменных R2 совпадают между api и montage
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Числа лимитов — предложенные из architecture.md («Лимиты»), свои не выдумывать. Выбор PaaS не трогать — не решение лида. См. architecture.md «Стек и хостинг», «Как это поднять». Идёт после того, как TASK-20 и TASK-22 зафиксировали финальные имена переменных.
<!-- SECTION:NOTES:END -->
