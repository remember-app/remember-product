---
id: TASK-126.3
title: 'mobile: выбор ориентации в листе заказа ролика'
status: Done
assignee: []
created_date: '2026-09-09 06:47'
updated_date: '2026-09-09 07:10'
labels:
  - from-lead
milestone: m-17
dependencies: []
parent_task_id: TASK-126
priority: high
type: feat
ordinal: 135000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Часть TASK-126. src/memory/films.tsx: лист заказа (Sheet, ~строки 346-393) уже спрашивает длину (LENGTHS) и трек (track) рядом друг с другом — тем же приёмом (ряд кнопок-Button variant=secondary/quiet) добавить третий выбор: ориентация, горизонтальный/вертикальный. Состояние по умолчанию — горизонтальный (landscape), без выбора — как сейчас.

Контракт с api (зафиксирован): orderMontage() в src/api.ts получает необязательное поле orientation: "landscape" | "portrait" в теле запроса — добавить в тип и прокинуть из order() в films.tsx (строки 143-159) вместе с target_seconds и music_track_id. Тексты кнопок — через словарь (src/strings.ts), как у длины и трека, а не хардкодом.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 В листе заказа есть выбор ориентации: горизонтальный/вертикальный, по умолчанию горизонтальный
- [x] #2 Выбранная ориентация уходит в orderMontage() вместе с длиной и треком
- [x] #3 Слова на кнопках — из словаря, оба языка
<!-- AC:END -->
