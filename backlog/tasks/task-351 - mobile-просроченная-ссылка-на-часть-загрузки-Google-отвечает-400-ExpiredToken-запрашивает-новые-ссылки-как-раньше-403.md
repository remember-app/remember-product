---
id: TASK-351
title: >-
  mobile: просроченная ссылка на часть загрузки (Google отвечает 400
  ExpiredToken) запрашивает новые ссылки, как раньше 403
status: In Progress
assignee:
  - '@coder'
created_date: '2026-09-25 09:12'
updated_date: '2026-09-25 09:13'
labels:
  - from-chief
milestone: m-29
dependencies: []
priority: high
type: bug
ordinal: 344000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Живая проверка на Google показала: просроченная подписанная ссылка на часть загрузки отвечает 400 с кодом ExpiredToken, а не 403. Приложение заново просит у сервера ссылки только по 403, поэтому после просрочки (час) загрузка большого файла упадёт вместо докачки.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Часть загрузки с ответом 400 и кодом ExpiredToken в теле ведёт себя так же, как раньше 403: приложение просит у сервера новые ссылки и досылает недостающее; неверная подпись (403 SignatureDoesNotMatch) и любые другие 4xx/5xx по-прежнему ошибки как сегодня; тело ответа читается только чтобы отличить ExpiredToken, ничего из него не логируется и не показывается человеку
- [ ] #2 Автотесты приложения зелёные и закрепляют: 403 просрочка (как было), 400 ExpiredToken просрочка, 400 с другим телом — ошибка, 403 SignatureDoesNotMatch — ошибка, докачка после новых ссылок досылает только недостающее
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Коммит в ветке worktree сервиса, слияние в dev — за лидом
- [ ] #2 Автотесты приложения зелёные
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Сервис: projects/mobile (dev), src/lib/upload/send.ts, функция putPart (сегодня: if (response.status === 403) return null). Комментарий у функции говорит «R2» и «hour» — привести к правде. Правка не должна менять контракт с сервером и другие места (src/screens, src/kit, src/strings, src/api не трогать). Основание — отчёт живой проверки TASK-328: Google отвечает 400 ExpiredToken («The provided token has expired»). Параллельно сервер может выдавать ссылки на срок дольше часа — отдельно, конфигом.
<!-- SECTION:NOTES:END -->
