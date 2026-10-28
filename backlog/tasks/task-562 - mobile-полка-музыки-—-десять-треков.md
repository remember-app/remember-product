---
id: TASK-562
title: 'mobile: полка музыки — десять треков'
status: Done
assignee: []
created_date: '2026-10-28 13:47'
updated_date: '2026-10-28 13:55'
labels:
  - from-lead
milestone: m-39
dependencies: []
priority: high
type: feat
ordinal: 541000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
TASK-548 расширил полку треков воркера до десяти; приложение знает пять (TRACKS в src/lib/montage/order.ts и имена в src/strings/montage.ts). Добавить пять новых — их имена с полки воркера, длительности с файлов.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 TRACKS в src/lib/montage/order.ts — десять id с длительностями в целых секундах, в порядке полки
- [ ] #2 Имена всех десяти — в словаре приложения, ru и en
- [ ] #3 Шаг музыки показывает десять строк; сумма длительностей выбранного считается по всем
- [ ] #4 Прежние пять не сломаны; автотесты зелёные
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Тесты приложения зелёные; линтер и типы чисты
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Новые треки из отчёта TASK-548: merry — Весёлая, 120.4 с (Merry Go); tender — Нежная, 72.0 с (Heartwarming); dreamy — Мечтательная, 126.6 с (Dreamy Flashback); mystery — Таинственная, 135.5 с (Frost Waltz); energetic — Энергичная, 231.3 с (Cipher). Все — Kevin MacLeod, incompetech.com, CC BY 4.0; источник и лицензии — projects/montage/montage/video/tracks/README.md. Английские имена — как у существующих пяти, в том же стиле.
<!-- SECTION:NOTES:END -->
