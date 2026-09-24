---
id: TASK-242
title: 'mobile: заблокировать права на геопозицию в Android-сборке'
status: Done
assignee: []
created_date: '2026-09-24 07:04'
updated_date: '2026-09-24 07:05'
labels:
  - from-chief
milestone: m-24
dependencies: []
priority: medium
type: bug
ordinal: 249000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Библиотека определителя адреса объявляет в манифесте Android права на точную и приблизительную геопозицию, хотя приложение позицию не использует и не просит. Приложение в магазине не должно выглядеть просящим её — права блокируются в конфигурации сборки.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 В app.json в разделе android заданы blockedPermissions с android.permission.ACCESS_FINE_LOCATION и android.permission.ACCESS_COARSE_LOCATION; существующие настройки не изменены
- [x] #2 Проверка конфигурации: npx expo config --type public (или prebuild-эквивалент без сети) показывает blockedPermissions, приложение по-прежнему собирается (typecheck, тесты зелёные); в README подпроекта одна строка о том, зачем права заблокированы и что определитель адреса на Android поэтому не даёт названия, а показывает координаты — это принято
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 Ничего лишнего не оставлено
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Слово человека 2026-09-24 через chief. Контекст: TASK-240 (название места, expo-location). Не подключать плагин expo-location и не добавлять строки про геопозицию в iOS Info.plist. Слить сможет только лид; перед отчётом влить main.
<!-- SECTION:NOTES:END -->
