---
id: TASK-88
title: 'api: пуш-уведомления на языке каждого получателя'
status: Done
assignee: []
created_date: '2026-09-07 09:49'
updated_date: '2026-09-07 10:17'
labels:
  - from-human
milestone: m-13
dependencies:
  - TASK-84
priority: medium
type: feat
ordinal: 92000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
notifyInvited и notifyMontageReady (src/memories/push.ts) сейчас шлют один и тот же текст всем получателям разом. Переписать так, чтобы у каждого получателя был текст на его сохранённом языке (TASK-84) — тексты обоих языков написаны руками.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Текст приглашения и текст «ролик готов» написаны на обоих языках руками, английский не калька с русского
- [x] #2 Каждый получатель получает текст на своём сохранённом языке, включая случай, когда у разных получателей одной рассылки разные языки
- [x] #3 send/notifyInvited/notifyMontageReady по-прежнему никогда не бросают исключение наружу, как сейчас
- [x] #4 Тесты проходят, включая случай с получателями на разных языках в одной рассылке
<!-- AC:END -->
