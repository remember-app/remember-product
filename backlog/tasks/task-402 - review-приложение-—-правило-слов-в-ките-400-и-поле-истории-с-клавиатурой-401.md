---
id: TASK-402
title: >-
  review: приложение — правило слов в ките (400) и поле истории с клавиатурой
  (401)
status: In Progress
assignee: []
created_date: '2026-09-26 10:21'
updated_date: '2026-09-26 10:21'
labels:
  - from-chief
milestone: m-28
dependencies:
  - TASK-400
  - TASK-401
priority: high
type: feat
ordinal: 393000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Последние два пакета крупные: слова больше не режутся и не рвутся (правило в общем тексте, страж на размеры окна, автоуменьшение как страховка), доска и лист по-новому уступают клавиатуре. Нужен независимый взгляд ревьюера до финальной проверки.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Прочитан код диапазона b612629..dev (пакеты TASK-401 и TASK-400) в submodule projects/mobile; настоящие ошибки исправлены отдельными коммитами с тестами, ложные тревоги объяснены
- [ ] #2 Проверена цена: подписка каждого Text на размеры окна, второй обсчёт текста, автоуменьшение (не уводит ли текст в нечитаемо мелкий, не зацикливается ли, не мигает ли первый кадр), гонки Board (heading/keyboardDidShow/AreaRoom), правило листа (lead), Android и web-среда
- [ ] #3 Тесты адаптивности (type-rules, scroll, rows-wrap, board-flow, large-type, large-type-cells, sheet-rise, word-room) не ослаблены: вердикт по изменениям диапазона и выборочная проверка намеренной порчей; после правок полный npm test, typecheck и biome зелёные
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Коммиты в ветке worktree сервиса, слияние в dev — за лидом
- [ ] #2 Автотесты приложения зелёные
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Диапазон: git log b612629..dev в projects/mobile (TASK-401: bars.tsx Board/heading/WizardHeading, field.tsx, sheet.tsx lead, wizard.tsx, order/frames.tsx, upload.tsx; TASK-400: text.tsx (Shares в bits.tsx, страж, fit), type-rules с запретом numberOfLines вне исключений, rows/member/card-memory/tile/upload/empty/done.tsx и др.). Отчёт тестера: /private/tmp/m28-sweep/report/summary.md; доказательства кодеров: /private/tmp/m28-400-evidence/, /private/tmp/m28-401-evidence/.
<!-- SECTION:NOTES:END -->
