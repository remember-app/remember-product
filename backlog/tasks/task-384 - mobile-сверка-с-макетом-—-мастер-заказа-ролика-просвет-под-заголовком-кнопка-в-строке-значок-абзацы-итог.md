---
id: TASK-384
title: >-
  mobile: сверка с макетом — мастер заказа ролика (просвет под заголовком,
  кнопка в строке, значок, абзацы, итог)
status: In Progress
assignee: []
created_date: '2026-09-25 19:15'
updated_date: '2026-09-25 19:15'
labels:
  - from-chief
milestone: m-28
dependencies:
  - TASK-370
priority: high
type: bug
ordinal: 375000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
По сверке с макетом в мастере нет просвета между заголовком шага и первым блоком (7 экранов), кнопка «в строке» нарисована обычной, значок «играть» контурный и крупный, абзацы 16/23 вместо 15/22, подписи белые, у итога иная структура.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Экраны MontageTemplate, MontageSelect, MontageStory, MontageMusic, MontageMusicNone, MontageBuild, MontageSummary, SheetRejected, SheetTooLittle, SheetAskAll: просвет заголовок шага → первый блок по макету (R3, wizard.tsx head); кнопка «в строке» 13/600 с полями 16 (Что сняли, Свой трек, Вернуть, Сохранить/Поделиться) — kit/button.tsx; значок «играть» залитый ≈9 pt (kit/icon.tsx, rows.tsx RowTrack); абзацы 15/22 (или 14/20 по макету) вместо 16/23; eyebrow «ДЛИНА», «Формат» — капсом и muted; подписи и абзац истории в итоге цвета макета; размеры label/chip/meta/badgeSm в карточках шаблонов и этапов — по макету через нужные роли (не сдвигая глобальную шкалу для остальных экранов); SheetRejected — шаг строк 68 и абзац по макету
- [ ] #2 Значения приведены к макету (числа из JSON макета и таблиц сверки) и держатся токенами/ролями кита, а не литералами по экранам; исправленные значения закреплены тестами, читающими значения макета/спеки; сознательные отступления и данные-среда не тронуты
- [ ] #3 Ничего сверх пакета: не исправленное названо в отчёте с причиной; на крупном тексте, при клавиатуре и в обоих языках правки не ломают правила адаптивности (тесты type-rules, scroll, rows-wrap, board-flow зелёные)
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Коммит в ветке worktree сервиса, слияние в dev — за лидом
- [ ] #2 Автотесты приложения зелёные
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Пакет WIZARD (волна 1). Файлы: src/screens/order/wizard.tsx, src/app/memory/[id]/order/*, src/kit/montage-order.tsx, src/kit/rows.tsx, src/kit/icon.tsx, src/kit/button.tsx (только вид «в строке»), src/kit/story.tsx/typography (только нужные роли). Не трогай: montage-live.tsx и журнал, upload, films/tile/frames, field.tsx, bits.tsx, empty.tsx. Источники: измерение макета /private/tmp/m28-mock-measure/<Имя>.json и .png (ПРАВДА: макет — источник по виду, отступам, цветам и тексту — design/README.md); отчёты сверки /private/tmp/m28-visual-compare/A/ и /B/ (README.md — общие корни; <Имя>.md — таблица расхождений с числами и вероятным местом в коде; <Имя>-side.png — склейка макет | приложение | разность); снимки приложения /private/tmp/m28-visual-stand/shots/<Имя>.png|json (ДО правок 20ccfc8/380, Expo Go, iPhone 17e 390×844). Правило: макет побеждает; «сознательное» (решения, записанные в спеке) и «данные-среда» — не дефекты; safe-area устройства 47 против 52 макета и нижний отступ 34 против 30 — не правятся (реальные вставки устройства). Адаптивность (слово человека) остаётся: правка под размеры макета не должна вернуть фиксированные высоты, обрезание или ломку на крупном тексте/клавиатуре — роли/токены/минимальные высоты, тесты type-rules/scroll/rows-wrap зелёные. Повторная сверка на стенде — отдельная задача (TASK про повторную сверку).
<!-- SECTION:NOTES:END -->
