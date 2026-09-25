---
id: TASK-398
title: >-
  mobile: остатки повторной сверки — знаки в кнопках и плашках, карточки шаблона
  и воспоминания
status: To Do
assignee: []
created_date: '2026-09-25 23:17'
labels:
  - from-chief
milestone: m-28
dependencies:
  - TASK-375
  - TASK-395
priority: medium
type: bug
ordinal: 389000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Повторная сверка показала знаки крупнее макета (значок шаблона 22 вместо 16, «−»/«+», карандаш, значок в плашке итога), описание шаблона обрезано в одну строку вместо двух и значок «играть» в плашке роликов на карточке крупнее макета.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Корни R'6 (знаки в круглых кнопках 44: 15–16 вместо 18; значок шаблона в стеклянном квадрате 30 — 16; значок в плашке шаблона на итоге — 14; карандаш «Изменить пожелание»), R'11 (описание шаблона «Лица, тепло, чуть медленнее» — две строки, без «…» при обычном шрифте), R'4 (значок ▶ в плашке «N ролика» на карточке ≈6×7), R'7 (перенос имени на обложке карточки воспоминания «Свадьба / Лизы и Марка» — ручным решением или шириной блока; слова Consent не трогать) исправлены по макету или названы с причиной
- [ ] #2 Значения держатся токенами/ролями кита; тесты читают числа макета/спеки и падают при возврате старых (намеренная порча); что уже соответствует — названо
- [ ] #3 Адаптивность цела: type-rules, scroll, rows-wrap, board-flow, large-type, large-type-cells зелёные и не ослаблены; на крупном шрифте карточки не теряют минимальных высот; полный npm test зелёный
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Коммит в ветке worktree сервиса, слияние в dev — за лидом
- [ ] #2 Автотесты приложения зелёные
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Пакет ROUND2-CARDS (после слияния TASK-375 — он меняет карточки и montage-order). Источник: /private/tmp/m28-visual-compare/round2/README.md (R'4, R'6, R'7, R'11), round2/{A,B}/MontageTemplate.md, MontageBuild.md, MontageMusic.md, MontageSummary.md, Main.md, HomeDay.md; макет /private/tmp/m28-mock-measure/<Имя>.json. Файлы: src/kit/montage-order.tsx, badge.tsx, card-memory.tsx, button.tsx (знак IconButton по размеру круга — после ROUND2-KIT, перебазируйся). Слова Consent — вопрос продукта.
<!-- SECTION:NOTES:END -->
