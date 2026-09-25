---
id: TASK-387
title: 'mobile: сверка с макетом — создание, настройки воспоминания, аккаунт'
status: Done
assignee: []
created_date: '2026-09-25 19:50'
updated_date: '2026-09-25 20:23'
labels:
  - from-chief
milestone: m-28
dependencies:
  - TASK-370
priority: high
type: bug
ordinal: 378000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
По сверке с макетом на создании чипы дат переносятся на вторую строку, цвет будущих дней и подписи другие; в настройках название обрезано, у карточки нет верхнего поля; в аккаунте расходятся тумблер, подписи разделов и кегль «Выйти».
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Экраны Create, MemorySettings, Account: Create — чипы «Сегодня · Вчера · Выходные» в одну строку по макету (сейчас переносятся), цвет будущих дней #4A4757 (сейчас #6E6B7D), подсказки 12/17, eyebrow «КОГДА ЭТО БЫЛО» — muted (screens/memory/when.tsx:103); MemorySettings — название не обрезано, верхнее поле карточки по макету; Account — тумблер «Даты между днями», подписи разделов и кегль «Выйти» по таблицам A/Account.md
- [x] #2 Значения приведены к макету (числа из JSON макета и таблиц сверки) и держатся токенами/ролями кита; исправленные значения закреплены тестами, читающими значения макета/спеки; сознательные отступления и данные-среда не тронуты
- [x] #3 Ничего сверх пакета: не исправленное названо в отчёте с причиной; адаптивность цела (тесты type-rules, scroll, rows-wrap, board-flow, large-type зелёные)
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 Коммит в ветке worktree сервиса, слияние в dev — за лидом
- [x] #2 Автотесты приложения зелёные
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Пакет CREATE (волна 2). Файлы: src/app/create.tsx, src/screens/memory/when.tsx, src/kit/calendar.tsx (цвета дней), src/app/memory/[id]/settings.tsx, src/app/profile.tsx, src/kit/toggle.tsx. Не трогай: wizard/order, upload, montage-live, листы (invite-sheet, label-sheets, sheet.tsx), field.tsx (слито). Источники: измерение макета /private/tmp/m28-mock-measure/<Имя>.json и .png (ПРАВДА — design/README.md); отчёты сверки /private/tmp/m28-visual-compare/{A,B}/ (README.md — общие корни; <Имя>.md — таблица расхождений; <Имя>-side.png — склейка); снимки приложения /private/tmp/m28-visual-stand/shots/ (ДО правок пакетов 382–385, 377, 380, 381). Правила: макет побеждает; «сознательное» и «данные-среда» не дефекты; safe-area 47/52 и нижний отступ 34/30 не правятся; адаптивность (тесты type-rules, scroll, rows-wrap, board-flow, large-type зелёные). Слитые пакеты: вход/онбординг (eyebrow 16, banner, spinner, новые роли — смотри src/theme/tokens.ts на dev), главная, мастер (в работе), лента.
<!-- SECTION:NOTES:END -->
