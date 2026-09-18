---
id: TASK-145
title: 'mobile: ролики и участники воспоминания по макету'
status: To Do
assignee: []
created_date: '2026-09-18 13:01'
updated_date: '2026-09-18 14:15'
labels:
  - from-chief
milestone: m-21
dependencies:
  - TASK-142
priority: high
type: feat
ordinal: 152000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Ролики воспоминания и список участников по новому макету: статусы загрузки, приглашение людей, подтверждение действия с участником.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Список роликов и его пустое состояние — как в MemoryFilms.html/FilmsEmpty.html
- [ ] #2 Список участников со статусами загрузки — как в MemoryPeople.html
- [ ] #3 Лист приглашения (ссылка, контакты, ник) — как в SheetInvite.html
- [ ] #4 Подтверждение действия с участником — как в SheetConfirmMember.html
- [ ] #5 От прежней вёрстки экранов ничего не осталось
- [ ] #6 Автотесты зелёные
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Ничего лишнего не оставлено
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Экраны: MemoryFilms, FilmsEmpty, MemoryPeople, SheetInvite, SheetConfirmMember (design/screens/). src/memory/films.tsx, src/memory/people.tsx — вычистить и собрать заново на новой библиотеке (TASK-142). src/memory/head.tsx — общая шапка трёх лиц воспоминания, её же может трогать соседняя задача TASK-144 (галерея кадров); меняй в ней только то, что необходимо для этого экрана, не переписывай ради чистоты — конфликт на слиянии разбирает лид.
<!-- SECTION:NOTES:END -->
