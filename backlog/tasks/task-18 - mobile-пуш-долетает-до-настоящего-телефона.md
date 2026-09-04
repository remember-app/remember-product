---
id: TASK-18
title: 'mobile: пуш долетает до настоящего телефона'
status: To Do
assignee: []
created_date: '2026-09-03 12:59'
labels:
  - from-chief
milestone: m-3
dependencies: []
priority: high
type: feat
ordinal: 22000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
EAS-проект заведён, приложение получает push-токен на реальном устройстве и отдаёт его api; сбой регистрации виден в логе, а не проглатывается молча. Приглашение по пушу открывает приложение на экране загрузки нужного воспоминания — проверено на живом телефоне (впервые за всё время).
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 На дев-билде на физическом устройстве getExpoPushTokenAsync возвращает токен, приложение шлёт его в POST /me/push-tokens, строка появляется в push_tokens
- [ ] #2 Нет projectId или регистрация не удалась — это видимая строка в логе разработчика, не молчаливый проглот
- [ ] #3 Пуш «вас позвали в воспоминание», отправленный api при добавлении по нику, приходит на реальный телефон и по тапу открывает экран загрузки именно этого воспоминания
- [ ] #4 projectId и EAS-конфиг берутся из конфигурации или окружения, не зашиты в код случайным значением
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Первая карта (бриф). Код отправки (api src/memories/push.ts) и приёма (mobile src/push.ts, usePush) уже написан. Нужно: завести EAS-проект (Expo-аккаунт — ЗА ЧЕЛОВЕКОМ), прописать projectId в app.json (expo.extra.eas.projectId) либо из env, добавить eas.json и при необходимости конфиг плагина expo-notifications (иконка/канал Android). В src/push.ts register() сейчас console.warn глотает ошибку — лог оставить, но убедиться, что на реальном устройстве путь проходит. Финальная проверка — живой дев-билд на телефоне, ЗА ЧЕЛОВЕКОМ. См. architecture.md «Перед продом» и «Пуши».
<!-- SECTION:NOTES:END -->
