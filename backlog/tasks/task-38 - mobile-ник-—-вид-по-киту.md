---
id: TASK-38
title: 'mobile: ник — вид по киту'
status: To Do
assignee: []
created_date: '2026-09-04 14:20'
updated_date: '2026-09-04 14:21'
labels:
  - from-chief
milestone: m-7
dependencies:
  - TASK-36
priority: medium
ordinal: 42000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Экран выбора ника (src/app/set-username.tsx) и общая форма ника (src/username-form.tsx), которой позже пользуется профиль, одеваются в кит: поле со статусом «свободен»/ошибка до отправки формы.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 src/username-form.tsx собран из компонентов TASK-36 (field/field-ok/field-error, btn-primary)
- [ ] #2 set-username.tsx одет в кит: t-display/t-body, отступы и цвета — только из токенов
- [ ] #3 Состояние поля меняется на field-ok/field-error по тем же правилам валидации, что и сейчас (только вид проверки, не сама проверка)
- [ ] #4 typecheck и существующие тесты проходят
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Кит: секция 4 (Поля), пример «Ник» с field-ok/field-error. Форма используется и на /set-username, и на /profile (TASK-44) — здесь одевается сама форма, профиль наследует её вид без переделки.
<!-- SECTION:NOTES:END -->
