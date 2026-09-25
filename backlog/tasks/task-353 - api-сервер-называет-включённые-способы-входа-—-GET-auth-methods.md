---
id: TASK-353
title: 'api: сервер называет включённые способы входа — GET /auth/methods'
status: Done
assignee:
  - '@coder-backend'
created_date: '2026-09-25 09:26'
updated_date: '2026-09-25 09:29'
labels:
  - from-chief
milestone: m-29
dependencies: []
priority: high
type: feat
ordinal: 346000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Набор способов входа должен диктовать сервер, а не телефон: приложение рисует только то, что сервер назвал включённым. Сервер отдаёт публичный список — почта, Apple, Google — по тому, что у него настроено.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 GET /auth/methods без входа отвечает 200 и JSON вида {"email":true,"apple":<bool>,"google":<bool>}: email всегда true; apple true только если задан APPLE_CLIENT_ID, google — только если задан GOOGLE_CLIENT_ID (пустое значение = не задано, как во всём сервере); сами идентификаторы и любые настройки в ответ не попадают
- [ ] #2 Маршрут не трогает базу и не попадает под лимиты входа; ответ короткий, кеш умеренный (Cache-Control публичный, минуты); маршруты входа через Apple и Google и их ответы 501 при выключенных настройках не меняются
- [ ] #3 Автотесты: только почта при пустых настройках; apple/google включаются каждая своей настройкой независимо; пустая и пробельная настройка = выключено; в ответе нет значений настроек; docs/auth.md описывает маршрут одной строкой контракта
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Коммит в ветке worktree сервиса, слияние в dev — за лидом
- [ ] #2 Автотесты сервиса зелёные, в своей тестовой базе
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Сервис: projects/api (dev), src/auth/plugin.ts / social.ts, функции appleClientId() и googleClientId() в src/auth/config.ts. Контракт согласован с приложением (TASK-353), которое делается параллельно: GET /auth/methods → {"email":true,"apple":false,"google":false}. Основание — решение chief: сервер диктует способы входа (правило TASK-107 «на входе не показывать способы, которых нет»). Стенд человека на маке не трогать: тесты в своей тестовой базе.

Уточнение номеров: сервер — TASK-353, приложение — TASK-354 (в тексте выше номера могут быть указаны неверно).
<!-- SECTION:NOTES:END -->
