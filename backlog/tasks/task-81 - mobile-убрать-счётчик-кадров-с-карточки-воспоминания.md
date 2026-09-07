---
id: TASK-81
title: 'mobile: убрать счётчик кадров с карточки воспоминания'
status: Done
assignee: []
created_date: '2026-09-07 09:47'
updated_date: '2026-09-07 11:05'
labels:
  - from-lead
milestone: m-12
dependencies:
  - TASK-66
priority: low
type: feat
ordinal: 85000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Решение человека при TASK-66: сервер поднимает предел кадров на карточке до четырёх, счётчик («N frames») с карточки убирается — его показывали только потому, что двух кадров не хватало показать содержимое.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 facts() в projects/mobile/src/app/index.tsx больше не добавляет строку «N frames»; в meta карточки остаётся только дата(ы) события
- [ ] #2 карточка полагается на реальные миниатюры (теперь до четырёх), а не на число, показывая, что внутри
- [ ] #3 на месте счётчика не появляется новый факт — только удаление
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
facts() в src/app/index.tsx всегда отдаёт только даты события — строка «N frames» убрана вместе с осиротевшим параметром s и импортом type Strings. Ничего на её место не поставлено. Коммит 8615e1c на ветке worktree-agent-a65941fe949ac0567.

Тестов на этот текст не было: home-screen.test.ts пинит проводку миниатюр, strings.test.ts проверяет memory.frames прямо на словаре, а card-memory.test.tsx передаёт свою литеральную meta — правки не потребовались. typecheck чистый, 103 теста зелёные. Одиночная meta в карточке уже покрыта card-memory.test.tsx.

Ключ memory.frames в strings.ts осиротел (обе локали) — не трогал: вне рамок карточки и в активной работе у m-13 по языку. Симулятор не гонял: чужой уже запущен, свой Metro отобрал бы его; правка — чистое удаление одной строки.
<!-- SECTION:NOTES:END -->
