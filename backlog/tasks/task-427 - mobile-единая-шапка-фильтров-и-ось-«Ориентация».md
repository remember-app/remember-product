---
id: TASK-427
title: 'mobile: единая шапка фильтров и ось «Ориентация»'
status: In Progress
assignee:
  - '@specialist'
created_date: '2026-09-27 10:37'
updated_date: '2026-09-27 11:11'
labels:
  - from-chief
milestone: m-30
dependencies:
  - TASK-421
  - TASK-422
priority: medium
type: feat
ordinal: 416000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
У всех разделов с фильтрами появляется одинаковая шапка («Все» показывает, отсекает ли раздел что-то), и добавляется новая ось «Ориентация» (горизонтальные/вертикальные) отдельно от типа файла.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 во всех разделах с фильтром из спеки одинаковая шапка: название слева, «Все» справа, отражающая состояние (залита — раздел ничего не отсекает)
- [ ] #2 добавлена ось «Ориентация»: Горизонтальные / Вертикальные, отдельно от «Тип» (Фото/Видео)
- [ ] #3 «Сбросить» снимает все фильтры разом одной кнопкой
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Коммит в ветке worktree сервиса mobile, слияние в dev — за лидом
- [ ] #2 Автотесты мобильного приложения зелёные
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Репозиторий mobile (worktree), ветка dev. Опирается на design/spec.md (TASK-421, SheetFilter) и на поле ориентации из TASK-422 (api) — без него фильтр рисуется, но не фильтрует по-настоящему.
<!-- SECTION:NOTES:END -->
