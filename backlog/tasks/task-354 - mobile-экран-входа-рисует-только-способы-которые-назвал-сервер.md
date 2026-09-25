---
id: TASK-354
title: 'mobile: экран входа рисует только способы, которые назвал сервер'
status: In Progress
assignee:
  - '@coder'
created_date: '2026-09-25 09:26'
updated_date: '2026-09-25 09:27'
labels:
  - from-chief
milestone: m-29
dependencies: []
priority: high
type: feat
ordinal: 347000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Кнопка «Продолжить с Apple» сегодня появляется, потому что её решает показать телефон, а сервер вход через Apple не включал — нажатие даёт отказ. Правило: показывать только способы, которые сервер назвал включённым.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Экран входа при открытии спрашивает у сервера GET /auth/methods (ответ {"email":true,"apple":bool,"google":bool}); почта показывается всегда; кнопка Apple — только если сервер сказал apple и телефон умеет Apple ID; кнопка Google — только если сервер сказал google и в сборке задан идентификатор клиента; пока ответ не пришёл, а также если запрос не удался, показана только почта, без ошибки и без мигания лишних кнопок
- [ ] #2 Остальное поведение входа не меняется: обработка отказа 501, порядок экранов, тексты; запрос способов идёт на тот же адрес сервера, что остальные (EXPO_PUBLIC_API_URL), без входа
- [ ] #3 Автотесты приложения зелёные и закрепляют: сервер сказал только email → одна кнопка; apple:true и телефон умеет → две; apple:true, телефон не умеет → одна; google:true без идентификатора клиента в сборке → без Google; запрос упал/таймаут → только почта; не показывается лишнее до ответа
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Коммит в ветке worktree сервиса, слияние в dev — за лидом
- [ ] #2 Автотесты приложения зелёные
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Сервис: projects/mobile (dev): src/app/login.tsx (или соседний файл экрана входа), src/api/ (семья маршрутов аккаунта — добавить вызов), kit не менять (использовать существующие кнопки). Контракт с сервером (TASK-352, параллельно): GET /auth/methods → 200 {"email":true,"apple":false,"google":false}. Сегодня кнопку Apple решает AppleAuthentication.isAvailableAsync(), Google — EXPO_PUBLIC_GOOGLE_CLIENT_ID (README приложения, раздел о входе). Правка едет в ту же сборку TestFlight, что и TASK-351. Код входа через Apple/Google не трогать. src/strings — только если нужен новый текст (скорее всего нет).

Уточнение номеров: сервер — TASK-353, приложение — TASK-354 (в тексте выше номера могут быть указаны неверно).
<!-- SECTION:NOTES:END -->
