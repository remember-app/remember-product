---
id: TASK-144
title: 'mobile: галерея кадров воспоминания по макету'
status: To Do
assignee: []
created_date: '2026-09-18 13:01'
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
- [ ] #1 Галерея, группировка по людям, фильтры и сортировка выглядят как в MemoryFrames/FramesByPeople/SheetFilter/SheetSort.html
- [ ] #2 Режим выбора и подтверждение удаления кадра — как в FramesPicking.html/SheetConfirmDelete.html
- [ ] #3 Пустая галерея — как в FramesEmpty.html
- [ ] #4 От прежней вёрстки экрана ничего не осталось
- [ ] #5 Автотесты зелёные
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Ничего лишнего не оставлено
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Экраны: MemoryFrames, FramesByPeople, FramesPicking, FramesEmpty, SheetConfirmDelete, SheetFilter, SheetSort (design/screens/). doc-02. src/memory/frames.tsx — вычистить и собрать заново на новой библиотеке (TASK-142).
<!-- SECTION:NOTES:END -->
