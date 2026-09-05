---
id: TASK-42
title: 'mobile: приём приглашения — вид по киту'
status: Done
assignee: []
created_date: '2026-09-04 14:21'
updated_date: '2026-09-04 14:58'
labels:
  - from-chief
milestone: m-7
dependencies:
  - TASK-36
priority: medium
ordinal: 46000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Экран, на который приходит ссылка приглашения (src/app/invite.tsx), одевается в кит: ожидание присоединения и честная ошибка мёртвой ссылки.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Состояние «Присоединяем» — спиннер и текст кита
- [x] #2 Ошибка (нет токена, мёртвая ссылка, прочее) — banner-error с действием «К моим воспоминаниям»
- [x] #3 Логика приёма приглашения (принятие, редиректы по статусу сессии) не изменена
- [x] #4 typecheck и существующие тесты проходят
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Кит: секция 6 (спиннер) и секция 12 (banner-error). Экран маленький — переиспользовать компоненты TASK-36 напрямую, не изобретать новых.
<!-- SECTION:NOTES:END -->
