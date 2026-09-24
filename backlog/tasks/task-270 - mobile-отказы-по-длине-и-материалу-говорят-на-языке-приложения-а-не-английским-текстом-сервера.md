---
id: TASK-270
title: >-
  mobile: отказы по длине и материалу говорят на языке приложения, а не
  английским текстом сервера
status: Done
assignee: []
created_date: '2026-09-24 10:25'
updated_date: '2026-09-24 10:45'
labels:
  - from-chief
milestone: m-26
dependencies: []
priority: high
type: bug
ordinal: 267000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
На отказе по длине или нехватке материала приложение показывает английский текст сервера — язык приложения слетает. Решение chief 2026-09-24: тексты отказов — на языке приложения.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Отказ 409 (мало материала) и 400 по длине на шагах мастера показываются словами приложения на выбранном языке (ru и en в словаре), а не текстом сервера; числа предела подставляются из тела отказа; уже существующие слова брать из словаря, новых формулировок — минимум
- [x] #2 Тест: отказы на шаге длины и на итоге показывают слова приложения на двух языках; неизвестное тело отказа не роняет экран; весь набор приложения зелёный, tsc чисто
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 Коммит слит в main сабмодуля mobile, указатель в корне подтянут
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Места: projects/mobile/src/app/memory/[id]/order/build.tsx (сбой расчёта длин: показывает текст сервера), summary.tsx (разбор отказов: «Any other 400 → the api's own text»), словарь src/strings.ts (есть s.montage.tooLittle и framesGone). Тела отказов — projects/api/src/montages (409: {error, ready_items, need}; 400 длины: {error, min_seconds, max_seconds}; 400 кадры: {error, media_ids}). Ручную и визуальную проверку не запускать.
<!-- SECTION:NOTES:END -->
