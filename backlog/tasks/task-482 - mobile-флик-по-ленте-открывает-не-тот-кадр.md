---
id: TASK-482
title: 'mobile: флик по ленте открывает не тот кадр'
status: Done
assignee: []
created_date: '2026-10-03 21:58'
updated_date: '2026-10-03 22:33'
labels:
  - from-lead
milestone: m-34
dependencies: []
priority: high
type: bug
ordinal: 471000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Флик по ленте открывает кадр, на который палец поднялся, а не на который лента доехала. Главный пункт TASK-474 работает только для медленного листания.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Флик открывает кадр, на который лента встала после скольжения, а не тот, где палец оторвался
- [ ] #2 Медленное листание без скольжения открывает кадр, на котором палец остановился
- [ ] #3 Один палец спрашивает один раз, а не два
- [ ] #4 Проверка моделирует порядок событий как на обеих платформах, а не наоборот
- [ ] #5 Автотесты зелёные
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Найдено ревью (src/kit/filmstrip.tsx, onScrollEndDrag / onMomentumScrollBegin).

Причина: флаг flung ставится в onMomentumScrollBegin, а читается в onScrollEndDrag. На обеих платформах подъём пальца приходит РАНЬШЕ начала скольжения — собственный комментарий React Native в ScrollView.js:66 говорит «onMomentumScrollBegin (when animation begins after letting up)». То есть в момент onScrollEndDrag флаг всегда false, лента спрашивает по месту подъёма, settled ставится, и последующий onMomentumScrollEnd молча уходит.

Почему не поймано: хелпер flick в tests/kit/filmstrip-walk.test.tsx вызывает onMomentumScrollBegin ДО onScrollEndDrag — обратный порядок. Тест кодировал неверный порядок и потому держал неверное поведение.

Чинить флаг инверсией нельзя: в момент подъёма пальца скольжение ещё не началось, и неизвестно, начнётся ли. Правильный порядок — спрашивать по окончании скольжения, а при подъёме без скольжения спрашивать сразу.
<!-- SECTION:NOTES:END -->
