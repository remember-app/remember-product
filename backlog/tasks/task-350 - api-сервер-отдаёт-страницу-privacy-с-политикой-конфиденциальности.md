---
id: TASK-350
title: 'api: сервер отдаёт страницу /privacy с политикой конфиденциальности'
status: Done
assignee:
  - '@coder-backend'
created_date: '2026-09-25 09:11'
updated_date: '2026-09-25 09:25'
labels:
  - from-chief
milestone: m-29
dependencies:
  - TASK-349
priority: high
type: feat
ordinal: 343000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Страница политики конфиденциальности отдаётся самим сервером по адресу /privacy без входа — по ней Apple проверяет внешнюю группу TestFlight. Текст — из TASK-349.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 GET /privacy отвечает 200 и красивой читаемой страницей на русском и английском (текст из TASK-349 дословно, без правок); без входа, без внешних скриптов, шрифтов и трекеров, корректная кодировка, адаптивная вёрстка, переключение языка ссылкой или обе версии на одной странице; заголовки безопасности как у остальных маршрутов; остальные маршруты и проверка /health не тронуты
- [ ] #2 Автотесты: маршрут отвечает без входа, содержит адрес для связи, не содержит внешних ресурсов; линтер и типы чисты
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Коммит в ветке worktree сервиса, слияние в dev — за лидом
- [ ] #2 Автотесты сервиса зелёные, в своей тестовой базе
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Сервис: projects/api (dev), рядом с /health в src/app.ts или отдельным небольшим модулем. Публичный адрес: https://dev-api-remember.noxlabs.xyz/privacy — его же указывают в App Store Connect. Текст после одобрения chief.
<!-- SECTION:NOTES:END -->
