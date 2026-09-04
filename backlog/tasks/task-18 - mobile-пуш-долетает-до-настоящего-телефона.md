---
id: TASK-18
title: 'mobile: пуш долетает до настоящего телефона'
status: To Do
assignee: []
created_date: '2026-09-03 12:59'
updated_date: '2026-09-04 10:27'
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
- [x] #2 Нет projectId или регистрация не удалась — это видимая строка в логе разработчика, не молчаливый проглот
- [ ] #3 Пуш «вас позвали в воспоминание», отправленный api при добавлении по нику, приходит на реальный телефон и по тапу открывает экран загрузки именно этого воспоминания
- [ ] #4 projectId и EAS-конфиг берутся из конфигурации или окружения, не зашиты в код случайным значением
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Первая карта (бриф). Код отправки (api src/memories/push.ts) и приёма (mobile src/push.ts, usePush) уже написан. Нужно: завести EAS-проект (Expo-аккаунт — ЗА ЧЕЛОВЕКОМ), прописать projectId в app.json (expo.extra.eas.projectId) либо из env, добавить eas.json и при необходимости конфиг плагина expo-notifications (иконка/канал Android). В src/push.ts register() сейчас console.warn глотает ошибку — лог оставить, но убедиться, что на реальном устройстве путь проходит. Финальная проверка — живой дев-билд на телефоне, ЗА ЧЕЛОВЕКОМ. См. architecture.md «Перед продом» и «Пуши».

Код и конфиг сделаны (mobile, коммит b5fba1b): eas.json с профилем development, expo-dev-client в зависимостях, плагин expo-notifications в app.json (даёт aps-environment на iOS — без него getExpoPushTokenAsync на устройстве токен не отдаст), обработчик показа пуша в открытом приложении, отказ в разрешении теперь тоже строка в логе. Типы и тесты зелёные. Мобильная сторона шлёт токен в POST /me/push-tokens корректно: тело { token, platform }, Bearer-сессия — совпадает со схемой api.

Критерий #2 отмечен по чтению кода: каждый путь сбоя в register() пишет console.warn, включая отсутствие projectId (expo-notifications бросает 'No projectId found').

ЗА ЧЕЛОВЕКОМ, без этого дальше нельзя:
1. Expo-аккаунт и 'npx eas init' в projects/mobile — он сам запишет expo.extra.eas.projectId и owner в app.json (критерий #4 закрывается этим шагом; выдумывать projectId нельзя).
2. ios.bundleIdentifier / android.package — их спросит первая eas build и запишет сама.
3. Ключи APNs / FCM через eas credentials.
4. Дев-билд на физическом телефоне и живая проверка критериев #1 и #3 (токен в push_tokens, пуш по приглашению открывает экран загрузки нужного воспоминания).
Пошагово это же записано в README мобильного репозитория, раздел «Пуши».

Задача осознанно оставлена в To Do: код готов, транспорт ни разу не проверен.
<!-- SECTION:NOTES:END -->
