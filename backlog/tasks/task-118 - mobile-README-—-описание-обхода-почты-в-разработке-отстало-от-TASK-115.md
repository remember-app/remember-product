---
id: TASK-118
title: 'mobile: README — описание обхода почты в разработке отстало от TASK-115'
status: Done
assignee: []
created_date: '2026-09-08 18:41'
updated_date: '2026-09-08 18:42'
labels:
  - from-lead
milestone: m-16
dependencies: []
priority: low
type: bug
ordinal: 122000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
TASK-115 (api) сузил обход письма без ключей: теперь только адреса на test.com и только при явном EMAIL_LOGIN_DEV_BYPASS=1. projects/mobile/README.md (около строк 50-63) всё ещё описывает старое правило («без ключей почты и не в проде — обходит кто угодно») и даёт curl-пример с you@example.com. Поправить текст и пример под новое правило.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 README мобильного приложения описывает обход письма так же, как он работает после TASK-115: test.com + EMAIL_LOGIN_DEV_BYPASS
- [x] #2 Пример в README использует адрес на test.com
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
README мобильного приложения переписан под правило после TASK-115: обход письма работает, только когда на API явно включён EMAIL_LOGIN_DEV_BYPASS (1 или true), адрес на домене test.com и сервер не в проде — все три условия сразу. Добавлено, что ключи почты (RESEND_API_KEY, MAIL_FROM) на обход больше не влияют: с другим адресом уходит настоящее письмо, а без ключей приходит 503. Пример curl переведён с you@example.com на you@test.com. Тронут только раздел «Ссылка входа по email в разработке», кода не касался. Коммит 021e63f.
<!-- SECTION:NOTES:END -->
