---
id: TASK-2
title: 'mobile: приложение запускается и показывает ответ API'
status: Done
assignee:
  - '@specialist'
created_date: '2026-09-03 10:15'
updated_date: '2026-09-03 10:17'
labels:
  - from-chief
milestone: m-0
dependencies: []
priority: high
type: feat
ordinal: 2000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Скелет мобильного клиента: приложение открывается в Expo Go или на симуляторе, ходит между двумя экранами, читает адрес API из переменной окружения и показывает на экране, отвечает ли бэкенд.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Приложение запускается документированной командой в Expo Go и на симуляторе
- [x] #2 Навигация работает как минимум между двумя экранами
- [x] #3 Экран показывает результат запроса к /health по адресу из переменной окружения
- [x] #4 README описывает установку, запуск и переменную с адресом API
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 Типы локальные — общего пакета с бэкендом нет
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Expo / React Native + TypeScript, маршрутизация expo-router по файлам. Проверка типов через tsc --noEmit.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Сдано в projects/mobile коммитом 12893f7 (2026-09-02). Восстановлено на доске задним числом 2026-09-03 из истории git.
<!-- SECTION:FINAL_SUMMARY:END -->
