---
id: TASK-320
title: 'mobile: профиль сборки для TestFlight и адрес сервера компании в нём'
status: In Progress
assignee:
  - '@coder'
created_date: '2026-09-25 07:44'
updated_date: '2026-09-25 07:44'
labels:
  - from-chief
milestone: m-29
dependencies: []
priority: medium
type: feat
ordinal: 317000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Подготовить приложение к раздаче друзьям через TestFlight: отдельный профиль сборки с адресом сервера компании и инструкция, как человек запускает сборку и отправку. Саму сборку не запускаем — сначала проверка, что адрес отвечает снаружи.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 В eas.json есть профиль сборки для TestFlight (раздача через магазин, номер сборки растёт сам) с адресом сервера https://dev-api-remember.noxlabs.xyz в переменной EXPO_PUBLIC_API_URL этого профиля — не в коде и не в общих файлах; существующий профиль разработки не изменён
- [ ] #2 В README приложения — короткий раздел «Раздача через TestFlight» с точными командами и что человек делает руками: запись приложения в App Store Connect с этим идентификатором, вход в Expo и Apple, ключ пушей через eas credentials, отправка сборки, добавление друзей во внутреннюю группу тестировщиков — без значений секретов
- [ ] #3 Автотесты приложения зелёные; в src/screens, src/kit, src/strings, src/api ничего не менялось
- [ ] #4 app.json и eas.json согласованы для iOS-сборки: идентификатор com.noxlabs.remember, версия и номер сборки, заявленное шифрование, разрешения; проект EAS (projectId) берётся из конфигурации, а не зашит в код; push-токен запрашивается с этим projectId (проверено по итоговой конфигурации приложения)
- [ ] #5 Конфигурация проходит проверку без входа в аккаунты (expo config, expo-doctor — то, что работает без логина) и без ошибок; сама облачная сборка НЕ запускается
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Коммит в ветке worktree сервиса, слияние в main — за лидом
- [ ] #2 Автотесты приложения зелёные
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Сервис: projects/mobile (main занят параллельной вехой m-28, её карточки правят src/screens, src/kit, src/strings, src/app/*, src/lib/{auth,frames,montage/order}, src/api/{account,contacts,montage}; конфигурацию приложения (eas.json, app.json, package.json) они не трогают). Сегодня: eas.json — только профиль development (developmentClient, internal), appVersionSource local; в app.json owner nox-labs, projectId уже стоит, ios.bundleIdentifier com.noxlabs.remember, ITSAppUsesNonExemptEncryption false; src/lib/push.ts запрашивает getExpoPushTokenAsync. Решение по домену: сервер — dev-api-remember.noxlabs.xyz; dev-remember.noxlabs.xyz — под приложение и ссылки-приглашения позже (в этой карточке не нужны); боевую пару (api-remember, remember) не использовать. Правило Cloudflare на зоне может резать внешних — пока не снято, поэтому сборку не режем. Apple Developer оформлен человеком; Google/Apple-вход на сервере не настроен (501), приложение прячет их кнопки само — в этой карточке не менять. Значения секретов не нужны и не пишутся.
<!-- SECTION:NOTES:END -->
