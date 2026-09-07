---
id: TASK-19
title: 'mobile: запускатель тестов и логика «выбрать всё за эту дату»'
status: Done
assignee: []
created_date: '2026-09-03 12:59'
updated_date: '2026-09-03 15:16'
labels:
  - from-chief
milestone: m-3
dependencies: []
priority: high
type: feat
ordinal: 23000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
У приложения появляется запускатель тестов (vitest, как у api) и первый тест — на чистую функцию подбора: окно мероприятия плюс список дат съёмки ассетов дают набор предвыбранных кадров.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 npm test в projects/mobile прогоняет vitest и проходит
- [x] #2 Есть чистая функция: по окну мероприятия (начало плюс необязательный конец, RFC3339 со смещением) и списку ассетов с датой съёмки возвращает попавшие в окно
- [x] #3 Тест покрывает: кадр внутри окна, кадр вне окна, обе границы окна, окно из одного дня и окно-интервал, ассет без даты съёмки
- [x] #4 Рендер-обвязки нет — функция не импортирует React Native
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Trap #3 из брифа. vitest тот же, что у api (devDependency). Функцию положить отдельным модулем (напр. src/media-window.ts), чтобы экран загрузки (TASK-23) её импортировал. Окно берётся из Memory.event_start/event_end (см. src/api.ts). Дата съёмки ассета — creationTime из expo-media-library. Нормализация дня — как в src/dates.ts (startOfDay/endOfDay). Голая дата невалидна на сервере — этот кейс не тестировать.
<!-- SECTION:NOTES:END -->
