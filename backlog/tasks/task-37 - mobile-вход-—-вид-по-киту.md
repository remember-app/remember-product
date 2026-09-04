---
id: TASK-37
title: 'mobile: вход — вид по киту'
status: To Do
assignee: []
created_date: '2026-09-04 14:20'
labels:
  - from-chief
milestone: m-7
dependencies:
  - TASK-36
priority: medium
ordinal: 41000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Экраны входа (src/app/login.tsx) и приёма ссылки на почту (src/app/auth/email.tsx) одеваются в кит: кнопки провайдеров со слотом под официальный знак, тихая кнопка входа по почте, состояние «ссылка отправлена», состояние проверки токена.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Экран входа собран из компонентов TASK-36 (btn-provider со слотом brand-slot, btn-quiet, field), без самодельных цветов и отступов
- [ ] #2 Состояние «Проверьте почту» после отправки ссылки и состояние ошибки — по голосу кита (что случилось и что делать), не системки текстом об ошибке
- [ ] #3 Экран приёма ссылки (auth/email.tsx): ожидание — спиннер кита, ошибка — banner-error с понятным действием «Назад ко входу»
- [ ] #4 Вся логика входа (почта/Apple/Google, обработка ошибок провайдеров) не изменена — только вид
- [ ] #5 typecheck и существующие тесты проходят
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Кит: секция 3 (кнопки, btn-provider) и раздел «Вход» демо. Токены и компоненты — из TASK-35/TASK-36, не заводить новых. Плейсхолдер brand-slot для Apple/Google остаётся пунктирным слотом, как в ките — рисованные логотипы не добавлять.
<!-- SECTION:NOTES:END -->
