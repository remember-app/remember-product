---
id: TASK-383
title: >-
  mobile: сверка с макетом — главная, пустые состояния, карточка воспоминания,
  контакты
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
ordinal: 374000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
По сверке с макетом карточка воспоминания ниже и с иной плашкой «N ролика», пустые состояния уже и центрируются по другой области, спиннер меньше, баннеры и подсказки другого кегля.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Экраны Main, HomeDay, HomeEmpty, HomeLoading, HomeOffline, HomeOnline, Contacts, ContactsEmpty, FramesEmpty, InviteDead, InviteJoining: card-memory — карточка 181, плашка «N ролика» 28 высотой и у низа, поля 18, подпись пустой карточки «Ни одного кадра — скиньте первые» вместо «Кадров пока нет…»; Empty — ширина описания по макету (36 от края), центрирование по той же области (HomeEmpty — 3 строки), спиннер 44/40; баннеры «note» 18 и подсказки 12/17; Contacts — «Сохранить» ширины макета, eyebrow «НЕ В КОНТАКТАХ» muted; FramesEmpty — капсула без растяжения при пустом правом слоте
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
Пакет HOME (волна 1). Файлы: src/kit/empty.tsx, src/kit/card-memory.tsx, src/kit/card.tsx, src/app/index.tsx, src/app/contacts.tsx, src/app/invite.tsx, токен note (src/theme/tokens.ts — только note и связанные размеры спиннера). Не трогай: field.tsx (пакет ONBOARD), bits.tsx, wizard.tsx, films.tsx, tile.tsx, frames.tsx (кроме FramesEmpty-капсулы: согласуй в отчёте), upload. Источники: измерение макета /private/tmp/m28-mock-measure/<Имя>.json и .png (ПРАВДА: макет — источник по виду, отступам, цветам и тексту — design/README.md); отчёты сверки /private/tmp/m28-visual-compare/A/ и /B/ (README.md — общие корни; <Имя>.md — таблица расхождений с числами и вероятным местом в коде; <Имя>-side.png — склейка макет | приложение | разность); снимки приложения /private/tmp/m28-visual-stand/shots/<Имя>.png|json (ДО правок 20ccfc8/380, Expo Go, iPhone 17e 390×844). Правило: макет побеждает; «сознательное» (решения, записанные в спеке) и «данные-среда» — не дефекты; safe-area устройства 47 против 52 макета и нижний отступ 34 против 30 — не правятся (реальные вставки устройства). Адаптивность (слово человека) остаётся: правка под размеры макета не должна вернуть фиксированные высоты, обрезание или ломку на крупном тексте/клавиатуре — роли/токены/минимальные высоты, тесты type-rules/scroll/rows-wrap зелёные. Повторная сверка на стенде — отдельная задача (TASK про повторную сверку).
<!-- SECTION:NOTES:END -->
