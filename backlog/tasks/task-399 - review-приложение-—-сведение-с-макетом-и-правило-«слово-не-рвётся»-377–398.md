---
id: TASK-399
title: 'review: приложение — сведение с макетом и правило «слово не рвётся» (377–398)'
status: In Progress
assignee: []
created_date: '2026-09-26 00:34'
updated_date: '2026-09-26 00:34'
labels:
  - from-chief
milestone: m-28
dependencies:
  - TASK-398
priority: high
type: feat
ordinal: 390000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
После сверки приложения с макетом слито около двадцати пакетов (кит, экраны, листы, эфир, загрузка, правило слов и клавиатуры). Нужен взгляд ревьюера на весь этот код: настоящие ошибки, мёртвый и дублирующий код, ослабленные тесты адаптивности, хрупкие места.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Три ревьюера (кит и тема; экраны; эфир, загрузка, мастер) прочли слитый код диапазона 481a303..dev в своих границах; настоящие ошибки исправлены отдельными коммитами с тестами, ложные подозрения объяснены
- [ ] #2 Проверено, что тесты адаптивности (type-rules, scroll, rows-wrap, board-flow, large-type, large-type-cells, sheet-rise, word-room) не ослаблены по сравнению с базой диапазона (нет снятых правил, расширенных исключений без причины)
- [ ] #3 Названы и сведены находки, не входящие в исправление (в виде списка для лида); после ревью полный npm test, typecheck и biome зелёные
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Коммиты в ветках worktree сервиса, слияние в dev — за лидом
- [ ] #2 Автотесты приложения зелёные
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Диапазон: git log 481a303..dev в submodule projects/mobile (пакеты TASK-377, 380, 381, 382–390, 392–394, 375, 386, 397, 398). Границы: A — src/kit/** (кроме файлов C) и src/theme/**, README, tests/kit, tests/theme; B — src/app/** (кроме upload и montage), src/screens/** (кроме upload, order, memory/stage-rows.tsx, memory/live-file.tsx), src/lib/dates.ts, src/strings/* (кроме montage.ts); C — src/kit/{montage-live,card-montage,rows,upload,montage-order}.tsx, src/screens/upload/*, src/screens/order/*, src/screens/memory/{stage-rows,live-file}.tsx, src/app/memory/[id]/upload.tsx и montage/**, src/lib/montage/**, src/strings/montage.ts. Внимание: WordRoom/balance в kit/text.tsx (измерение на каждый Text, скрытый до замера текст), DRAWN в icon.tsx, BackButton/роли control* в button.tsx, Sheet risen/enabled, useFooterOverhang, Board.
<!-- SECTION:NOTES:END -->
