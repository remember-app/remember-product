---
id: TASK-359
title: >-
  design: спека — высоты листов названы там, где осмысленны, остальным «по
  содержимому»; правило прокрутки листа
status: In Progress
assignee: []
created_date: '2026-09-25 09:51'
labels:
  - from-chief
milestone: m-28
dependencies: []
priority: medium
type: feat
ordinal: 351000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Chief решил: код оставляет листы растущими по содержимому, а спека приводится к этому — высота названа только там, где она осмысленна (сортировка, фильтры, подтверждения), остальным написано «по содержимому». Отдельно записывается правило прокрутки листа.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Для девяти листов (SheetTooLittle 400, SheetAskAll 420, SheetFrameInfo 450, SheetRejected 523, SheetLabels 560, SheetLabelNew 600, SheetInvite 640, SheetLiveFile 640, SheetCover 640) в спеке сказано «высота — по содержимому»; нарисованное число оставлено как справка о макете, а не как требование; таблица высот листов согласована с этим
- [ ] #2 Записано правило: лист не выше девяти десятых окна; когда содержимое не влезает — лист прокручивается так, что каждая кнопка достижима, ручка и заголовок остаются на месте; это относится к любому листу
- [ ] #3 Файлы выгрузки (design/screens, design/index.html, design/README.md) не тронуты — правится только design/spec.md
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Коммит в корневом репозитории (ветка worktree, слияние в dev — за лидом)
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Решение chief 2026-09-25: отдельной работы по коду про минимальные высоты не заводим. Спека, раздел 4 (высоты листов) и правило о высоте листов (TASK-338).
<!-- SECTION:NOTES:END -->
