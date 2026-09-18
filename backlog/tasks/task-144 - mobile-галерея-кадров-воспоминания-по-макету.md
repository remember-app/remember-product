---
id: TASK-144
title: 'mobile: галерея кадров воспоминания по макету'
status: Done
assignee: []
created_date: '2026-09-18 13:01'
updated_date: '2026-09-18 14:44'
labels:
  - from-chief
milestone: m-21
dependencies:
  - TASK-142
priority: high
type: feat
ordinal: 151000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Галерея кадров воспоминания по новому макету: группировка по тому, кто принёс, фильтры, сортировка, режим выбора и удаление кадра.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Галерея, группировка по людям, фильтры и сортировка выглядят как в MemoryFrames/FramesByPeople/SheetFilter/SheetSort.html
- [x] #2 Режим выбора и подтверждение удаления кадра — как в FramesPicking.html/SheetConfirmDelete.html
- [x] #3 Пустая галерея — как в FramesEmpty.html
- [x] #4 От прежней вёрстки экрана ничего не осталось
- [x] #5 Автотесты зелёные
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 Ничего лишнего не оставлено
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Экраны: MemoryFrames, FramesByPeople, FramesPicking, FramesEmpty, SheetConfirmDelete, SheetFilter, SheetSort (design/screens/). doc-02. src/memory/frames.tsx — вычистить и собрать заново на новой библиотеке (TASK-142). Этот файл держит и полноэкранный просмотр кадра (Modal внутри него) — его доводит до макета соседняя задача TASK-147, которая пойдёт следом за тобой; оставь структуру, на которую она сможет опереться, не удаляй Modal-просмотрщик как будто он не нужен. src/memory/head.tsx — общая шапка трёх лиц воспоминания (кадры/ролики/люди), её же трогает TASK-145 (ролики и участники); меняй в ней только то, что необходимо для этого экрана, не переписывай ради чистоты — конфликт на слиянии разбирает лид.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
7739a11 (+ слияние main): src/memory/frames.tsx собран заново по MemoryFrames/FramesByPeople/FramesPicking/FramesEmpty/SheetFilter/SheetSort/SheetConfirmDelete; листы вынесены в новый src/memory/frames-sheets.tsx, чтобы не делить frames.tsx с TASK-147. Полноэкранный просмотрщик (Modal) оставлен нетронутым для TASK-147. Слито в main лидом (--no-ff, авто-мёрж без конфликтов). Проверено: typecheck и 456 тестов зелёные в main (обнаружил и почистил попутно стухший локальный .expo/types/router.d.ts в основном чекауте — гитигнорится, к коду задачи отношения не имеет).
<!-- SECTION:FINAL_SUMMARY:END -->
