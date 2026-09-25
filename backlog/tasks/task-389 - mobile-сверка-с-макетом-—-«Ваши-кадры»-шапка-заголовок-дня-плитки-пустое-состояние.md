---
id: TASK-389
title: >-
  mobile: сверка с макетом — «Ваши кадры» (шапка, заголовок дня, плитки, пустое
  состояние)
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
ordinal: 380000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
По сверке с макетом на «Ваших кадрах» стеклянная шапка вместо простой (Limited, Queue), заголовок дня «Снято 25 сентября 2026 · 1 кадр» по центру без линии и без «Выбрать все N» вместо «13 сентября, суббота … 61» слева с линией, плитка 128.7 вместо 117.3 без полей и скруглений, UploadEmpty прижат к верху (−239 pt).
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Экраны Upload, UploadAccess, UploadEmpty, UploadLimited, UploadQueue: шапка, заголовок дня (слева, с линией и «Выбрать все N»), размер и скругления плиток и поля, центрирование пустого состояния, кнопка «в строке» «Отдать ещё» (использовать вид, добавленный пакетом мастера), абзац UploadAccess по макету, блок «НЕ УШЛИ» очереди — по JSON макета
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
Пакет UPLOAD (волна 3 — после слияния пакета мастера 384: нужна кнопка «в строке»). Файлы: src/app/memory/[id]/upload.tsx, src/screens/upload/*, src/kit/upload.tsx, tile для Upload. Не трогай: wizard/order, montage-live, листы. Источники: измерение макета /private/tmp/m28-mock-measure/<Имя>.json и .png (ПРАВДА — design/README.md); отчёты сверки /private/tmp/m28-visual-compare/{A,B}/ (README.md — общие корни; <Имя>.md — таблица расхождений; <Имя>-side.png — склейка); снимки приложения /private/tmp/m28-visual-stand/shots/ (ДО правок пакетов 382–385, 377, 380, 381). Правила: макет побеждает; «сознательное» и «данные-среда» не дефекты; safe-area 47/52 и нижний отступ 34/30 не правятся; адаптивность (тесты type-rules, scroll, rows-wrap, board-flow, large-type зелёные). Слитые пакеты: вход/онбординг (eyebrow 16, banner, spinner, новые роли — смотри src/theme/tokens.ts на dev), главная, мастер (в работе), лента.
<!-- SECTION:NOTES:END -->
