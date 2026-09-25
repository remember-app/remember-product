---
id: TASK-371
title: >-
  review: приложение вехи m-29 — просроченная ссылка Google, способы входа от
  сервера, профиль TestFlight
status: Done
assignee:
  - '@reviewer'
created_date: '2026-09-25 11:10'
updated_date: '2026-09-25 11:19'
labels:
  - from-chief
milestone: m-29
dependencies: []
priority: medium
type: feat
ordinal: 363000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Проверка коммитов приложения, добавленных этой вехой: 400 ExpiredToken (TASK-351), экран входа по способам сервера (TASK-354), профиль TestFlight и номер сборки (TASK-320, TASK-341).
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Прочитаны коммиты 64b761e, 3c734f8 и слияния TASK-320/341 (eas.json, app.json, README); по каждому: что сломано / нечисто / небезопасно с местом в коде, либо «проверено, не нашёл» с тем, куда смотрел
- [ ] #2 Отдельно: putPart не считает просрочкой ничего лишнего и не логирует тело ответа; повтор после новых ссылок не дублирует куски; экран входа не мигает лишними кнопками, при недоступном сервере остаётся только почта, при медленной сети не задерживает вход, запрос без токена и на верный адрес; eas.json: профиль testflight не влияет на development, адрес сервера только в профиле, ascAppId не секрет; app.json: номер сборки, разрешения, шифрование
- [ ] #3 Настоящие находки исправлены в ветке worktree сервиса коммитами с пояснением; тесты приложения зелёные (npx vitest run, npx tsc --noEmit; biome — явными путями)
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Коммит в ветке worktree сервиса, слияние в dev — за лидом
- [ ] #2 Автотесты приложения зелёные
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Сервис: projects/mobile, dev. Параллельная веха m-28 закончена, её ревью пройдены. Никаких облачных сборок и входов в аккаунты; секретов нет.
<!-- SECTION:NOTES:END -->
