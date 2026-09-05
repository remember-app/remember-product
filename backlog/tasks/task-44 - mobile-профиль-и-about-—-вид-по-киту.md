---
id: TASK-44
title: 'mobile: профиль и about — вид по киту'
status: Done
assignee: []
created_date: '2026-09-04 14:21'
updated_date: '2026-09-04 15:01'
labels:
  - from-chief
milestone: m-7
dependencies:
  - TASK-36
  - TASK-38
priority: medium
ordinal: 48000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Экран профиля (src/app/profile.tsx) и справочный экран about (src/app/about.tsx) одеваются в кит: смена ника через уже одетую форму, выход из аккаунта через лист подтверждения, служебная страница about — минимально, но в том же тоне.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Профиль собран из компонентов TASK-36 и уже одетой формы ника (TASK-38) — ник, имя, смена ника, выход
- [x] #2 Выход из аккаунта — необратимое действие через лист подтверждения кита, а не системный Alert/прямая кнопка
- [x] #3 About одет в токены кита (фон, типографика), без самодельных цветов
- [x] #4 Логика (сохранение ника, выход, чтение API_URL) не изменена
- [x] #5 typecheck и существующие тесты проходят
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Кит: секция 13 (Лист подтверждения) для выхода. About — самый простой экран вехи, ему хватит t-display/t-body и токенов фона, отдельных компонентов не требует.
<!-- SECTION:NOTES:END -->
