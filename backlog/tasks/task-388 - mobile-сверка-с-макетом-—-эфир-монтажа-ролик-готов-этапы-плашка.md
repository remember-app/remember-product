---
id: TASK-388
title: 'mobile: сверка с макетом — эфир монтажа (ролик готов, этапы, плашка)'
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
ordinal: 379000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
По сверке с макетом на экране «Ролик готов» подпись постера наложена на «ГОТОВ», все этапы раскрыты записями; на эфире пять строк этапов вместо одной «Дальше: …» и нет плашки «Сообщить, когда будет готово»; на экране этапа другой заголовок.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Экраны MontageLive, MontageLiveDone, MontageLiveStage, SheetLiveFile: подпись постера не перекрывает «ГОТОВ» (единственный по-настоящему сломанный вид); структура списка этапов на «Ролик готов» и на эфире — по макету (одна строка «Дальше: ритм трека · склейка», плашка «Сообщить, когда будет готово», где спека противоречит макету — следуй макету, расхождение назови для дизайнера); заголовок этапа «Строит историю» (вместо «Режиссёр строит историю») и чипы на 12 ниже по макету; в SheetLiveFile — то, что можно проверить по JSON макета (рамка взгляда, теги «Что увидел», плашка мысли: на снимках стенда их нет — сверь по коду и JSON)
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
Пакет LIVE (волна 2). Файлы: src/kit/montage-live.tsx, src/app/memory/[id]/montage/[montageId]/*, src/screens/memory/stage-rows.tsx, live-file.tsx, film-player.tsx, journal-часть src/lib/montage/journal/*. Не трогай: wizard/order, upload, листы кроме live-file, field.tsx, button.tsx (кроме случая, если без этого нельзя — назови). Источники: измерение макета /private/tmp/m28-mock-measure/<Имя>.json и .png (ПРАВДА — design/README.md); отчёты сверки /private/tmp/m28-visual-compare/{A,B}/ (README.md — общие корни; <Имя>.md — таблица расхождений; <Имя>-side.png — склейка); снимки приложения /private/tmp/m28-visual-stand/shots/ (ДО правок пакетов 382–385, 377, 380, 381). Правила: макет побеждает; «сознательное» и «данные-среда» не дефекты; safe-area 47/52 и нижний отступ 34/30 не правятся; адаптивность (тесты type-rules, scroll, rows-wrap, board-flow, large-type зелёные). Слитые пакеты: вход/онбординг (eyebrow 16, banner, spinner, новые роли — смотри src/theme/tokens.ts на dev), главная, мастер (в работе), лента.
<!-- SECTION:NOTES:END -->
