---
id: TASK-479
title: 'mobile: тип FrameInfo знает о лейблах'
status: To Do
assignee: []
created_date: '2026-10-03 17:14'
labels:
  - from-lead
milestone: m-34
dependencies:
  - TASK-473
priority: high
type: feat
ordinal: 468000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
В типе FrameInfo нет поля лейблов, хотя api их уже отдаёт: с merge TASK-473 ответ GET /memories/:memoryId/media/:mediaId содержит labels. Экран сведений о кадре (TASK-478) без этого поля соберётся на старом наборе и блок лейблов показать не сможет.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 В типе FrameInfo есть поле labels: Label[] из ./labels
- [ ] #2 Поле приходит массивом, а не null — пустой массив значит «кадр ни в одной коробке»
- [ ] #3 Порядок лейблов не сортируется на телефоне: api присылает общие, потом по названию
- [ ] #4 Типы и линтер зелёные
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Правка ровно одна: импорт type { Label } из './labels' и поле labels: Label[] в типе FrameInfo (projects/mobile/src/api/media.ts). Тип Label уже описан в projects/mobile/src/api/labels.ts — импортировать, не переписывать.

Что важно не перепутать: поле приходит массивом, null не бывает — проверять через labels.length, а не через !labels. Порядок сортировать нельзя, иначе разойдётся с фильтром, который читает listLabels и ждёт тот же порядок.
<!-- SECTION:NOTES:END -->
