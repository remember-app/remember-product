---
id: TASK-390
title: >-
  mobile: сверка с макетом — листы (тумблер, шаг строк, «+», день недели,
  ширина)
status: To Do
assignee: []
created_date: '2026-09-25 19:50'
labels:
  - from-chief
milestone: m-28
dependencies:
  - TASK-370
priority: high
type: bug
ordinal: 381000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
По сверке с макетом у листов содержимое 356 при x=17 вместо 358 при x=16, тумблер в SheetInvite 63×28 вместо 52×32, шаг строк SheetFrameInfo 45 вместо 41, у «Новый лейбл» нет «+», ручка SheetSort 14.7 вместо 13, eyebrow-подписи в листах.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Листы SheetInvite, SheetLabelNew, SheetLabels, SheetFrameInfo, SheetFilter, SheetSort, SheetConfirm*, SheetFrame: ширина/отступ содержимого 358 при x=16 (sheet.tsx, R9), тумблер 52×32, шаг строк 41 (FrameInfo), «+» у «Новый лейбл», ручка листа по макету, eyebrow muted в листах (invite-sheet, label-sheets)
- [ ] #2 Значения приведены к макету (числа из JSON макета и таблиц сверки) и держатся токенами/ролями кита; исправленные значения закреплены тестами, читающими значения макета/спеки; сознательные отступления и данные-среда не тронуты
- [ ] #3 Ничего сверх пакета: не исправленное названо в отчёте с причиной; адаптивность цела (тесты type-rules, scroll, rows-wrap, board-flow, large-type зелёные)
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Коммит в ветке worktree сервиса, слияние в dev — за лидом
- [ ] #2 Автотесты приложения зелёные
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Пакет SHEETS (волна 3 — после слияния TASK-386, лист «Новый лейбл», и пакета мастера). Файлы: src/kit/sheet.tsx, confirm.tsx, src/screens/memory/invite-sheet.tsx, label-sheets.tsx, frames-sheets.tsx (детали), kit/toggle.tsx. Не трогай: wizard/order, upload, montage-live. Источники: измерение макета /private/tmp/m28-mock-measure/<Имя>.json и .png (ПРАВДА — design/README.md); отчёты сверки /private/tmp/m28-visual-compare/{A,B}/ (README.md — общие корни; <Имя>.md — таблица расхождений; <Имя>-side.png — склейка); снимки приложения /private/tmp/m28-visual-stand/shots/ (ДО правок пакетов 382–385, 377, 380, 381). Правила: макет побеждает; «сознательное» и «данные-среда» не дефекты; safe-area 47/52 и нижний отступ 34/30 не правятся; адаптивность (тесты type-rules, scroll, rows-wrap, board-flow, large-type зелёные). Слитые пакеты: вход/онбординг (eyebrow 16, banner, spinner, новые роли — смотри src/theme/tokens.ts на dev), главная, мастер (в работе), лента.
<!-- SECTION:NOTES:END -->
