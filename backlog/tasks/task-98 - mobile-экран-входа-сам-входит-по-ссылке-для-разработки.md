---
id: TASK-98
title: 'mobile: экран входа сам входит по ссылке для разработки'
status: Done
assignee: []
created_date: '2026-09-08 15:44'
updated_date: '2026-09-08 16:01'
labels:
  - from-lead
milestone: m-15
dependencies:
  - TASK-97
priority: high
type: feat
ordinal: 102000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
TASK-97 научит POST /auth/email/start (когда почта не настроена и сервер не в боевом режиме) отвечать {ok:true, link} вместо письма. Экран входа сейчас (src/app/login.tsx, sendLink()) такой ответ не отличает от обычного — читает только {ok:true} и показывает «проверьте почту» (setSent(true)), человеку копировать ссылку неоткуда, приложение remember:// deep link со своего экрана не открывает само.

Научить экран входа: если ответ несёт link — войти по нему самому, без ручного копирования. И показать на этом же экране, что это путь для разработки, а не обычный вход — кит уже даёт для этого нейтральный (без tone) Banner (src/kit/banner.tsx), самодельный индикатор не заводить.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 src/api.ts: тип ответа startEmailSignIn допускает необязательный link (string)
- [x] #2 login.tsx, sendLink(): когда ответ несёт link — экран сам меняет токен на сессию (verifyEmailToken(token из link) → signIn(session.token)), без setSent(true) и без участия человека; когда link нет — поведение как сегодня (экран «проверьте почту»)
- [x] #3 Пока идёт обмен токена на сессию, на экране виден нейтральный (без tone) Banner из кита, явно называющий это путём для разработки, а не обычным входом; текст — в src/strings.ts, оба языка от руки, не машинный перевод
- [x] #4 Ошибка на этом пути (истёкший/повторно использованный токен и т.п.) показывается тем же Banner tone="error", что и everywhere else — свой обработчик ошибок не заводить
- [x] #5 auth/email.tsx не тронут — это отдельный экран для остальных deep link переходов
- [x] #6 npm run typecheck зелёный
<!-- AC:END -->
