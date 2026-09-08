---
id: TASK-97
title: 'api: вход в разработке без почты — ссылка в ответе, замок в боевом режиме'
status: Done
assignee: []
created_date: '2026-09-08 15:43'
updated_date: '2026-09-08 15:49'
labels:
  - from-lead
milestone: m-15
dependencies: []
priority: high
type: feat
ordinal: 101000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Раньше сервер печатал ссылку входа в лог для разработки. Веха m-4 (cfa638e) это убрала: без RESEND_API_KEY/MAIL_FROM POST /auth/email/start сразу отвечает 503 mail not configured, до выпуска токена. Взамен ничего не осталось — человек с собранным приложением не может войти никак.

Возвращаем путь для разработки, с замком на боевой режим: сигнал тот же, что уже принят в проекте (src/app.ts:18 гасит логгер по process.env.NODE_ENV !== "test"; здесь нужен NODE_ENV === "production") — новый сигнал не изобретать.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 mailConfigured() === false И NODE_ENV !== "production": запрос идёт обычным путём — лимитер, normalizeEmail, startEmailLogin как сегодня; письмо не отправляется, sendMagicLink не вызывается; ответ 200 {ok:true, link} — link это deepLink(token), remember://auth/email?token=…
- [x] #2 mailConfigured() === false И NODE_ENV === "production": поведение не меняется — 503 {error:"mail not configured"} до лимитера и до выпуска токена, как сейчас
- [x] #3 mailConfigured() === true: поведение не меняется вовсе — письмо уходит как сегодня, ответ {ok:true} без link
- [x] #4 Автотест бьёт по замку: с NODE_ENV принудительно выставленным в production и почтой не настроенной — по-прежнему 503, не ссылка. Это и есть закрепление замка тестом, а не обещанием
- [x] #5 Автотест на сам обходной путь: без почты и без production — ответ несёт рабочую ссылку, и токен из неё реально проходит POST /auth/email/verify
- [x] #6 projects/api/README.md, раздел «Как добыть токен в разработке»: текущее описание (ручной node-скрипт на машине сервера) переписано под новый путь — ссылка приходит в ответе на POST /auth/email/start, никакого доступа к серверной машине не нужно; там же — как путь выключается (NODE_ENV=production, либо просто настоящие RESEND_API_KEY/MAIL_FROM)
- [x] #7 Resend, Apple, Google — не тронуты; sendMagicLink и mailConfigured() не меняют сигнатуру
<!-- AC:END -->
