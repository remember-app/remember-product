---
id: TASK-255
title: 'mobile: убрать остатки подписи к ролику после перехода шаринга на expo-sharing'
status: Done
assignee: []
created_date: '2026-09-24 09:32'
updated_date: '2026-09-24 09:34'
labels:
  - from-chief
milestone: m-24
dependencies: []
priority: low
type: bug
ordinal: 257000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
После перехода «Поделиться» на expo-sharing подпись к ролику пропала: системный лист носит только файл. Осталось мёртвое: строка подписи, параметр воспоминания у действий с роликом и чтение воспоминания только ради этой подписи.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Удалены мёртвые: strings.montage.shareText (оба языка), параметр memory в useFilmActions, проп memory у FilmPlayer и его передача из films.tsx и done.tsx, чтение воспоминания (listMemories и состояние memory) в done.tsx, если оно нужно было только ради подписи; на странице ролика и в плеере всё остальное работает как раньше
- [x] #2 Проверка типов и весь набор автотестов зелёные; тесты, читавшие исходник ради этих строк, обновлены; никакого нового кода сверх удаления
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 Ничего лишнего не оставлено
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Слово chief: остатки после TASK-243 — территория M-24. Соседняя веха Montage live параллельно правит films.tsx, done.tsx, index.tsx, stage-rows.tsx, live-file.tsx, montage-journal.ts, strings.ts, kit/card-montage — влить свежий main перед отчётом, конфликты разбирать, оставляя их правки.
<!-- SECTION:NOTES:END -->
