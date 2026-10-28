---
id: TASK-567
title: 'design: README про высоту кадра в сведениях расходится с макетом'
status: Done
assignee: []
created_date: '2026-10-28 13:51'
updated_date: '2026-10-28 13:53'
labels:
  - from-lead
milestone: m-38
dependencies: []
priority: low
type: feat
ordinal: 546000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
design/README.md говорит, что кадр в сведениях ужимается в верхние 352 px и что доска 1030 px, а сам макет FrameInfo.html рисует окно кадра 289 и панель с 292 на доске 962. Это то же противоречие, что README признаёт в своём начале: выгрузка макета главнее описания. Прав макет. Поправить строку в README, чтобы она не спорила с экраном.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Строка про высоту кадра в сведениях в design/README.md совпадает с FrameInfo.html: окно кадра 289, панель с 292
- [ ] #2 Больше нигде в design/README.md и design/spec.md не осталось числа 352 про сведения о кадре, если оно там есть
- [ ] #3 Сами экраны не перерисовываются — только слово в описании
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Где: design/README.md, строка около 279 («кадр ужимается в верхние 352 px»). Макет — design/screens/FrameInfo.html: окно кадра 289, панель начинается с 292. Ничего в screens/ не трогать. Мобильная часть — отдельная карточка.
<!-- SECTION:NOTES:END -->
