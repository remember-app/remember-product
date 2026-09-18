---
id: TASK-169
title: 'mobile: карточка «Собирается» ведёт на экран ожидания сборки'
status: Done
assignee: []
created_date: '2026-09-18 16:11'
updated_date: '2026-09-18 16:20'
labels:
  - from-chief
milestone: m-23
dependencies: []
priority: medium
type: feat
ordinal: 176000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
design/spec.md §7.6: карточка ролика в статусе «Собирается» на лице «Ролики» должна вести на экран ожидания сборки (MontageProgress, TASK-163 — маршрут /memory/[id]/montage/[montageId] уже есть). Сейчас (projects/mobile/src/memory/films.tsx) карточка ролика в очереди/сборке — просто статичная строка в списке, тап по ней ничего не делает.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Тап по карточке ролика в статусе queued или processing открывает экран ожидания этого ролика
- [x] #2 Тап по готовому или упавшему ролику ведёт себя как раньше (просмотр готового, «повторить» на упавшем)
- [x] #3 Автотест на переход по тапу для ролика в процессе сборки
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Одна правка в src/memory/films.tsx: у CardMontage появился onPress для роликов, которые ещё собираются — beingMade(montage.status) ? () => watchMaking(montage) : undefined. watchMaking делает router.push на /memory/[id]/montage/[montageId] с params { id, montageId }. Кит уже умел onPress (card-montage.tsx: accessibilityRole={onPress ? 'button' : undefined}, disabled={!onPress}), так что в ките менять было нечего.

Push, а не replace: экран ожидания уходит через router.back() и возвращается ровно на лицо «Ролики». frames в params не передаётся — это счёт мастера при отборе кадров, обратно его никто не считает; на экране ожидания параметр опциональный, просто строка meta короче.

AC #2 держится сам собой: у ready и failed onPress остаётся undefined, поведение прежнее (просмотр по постеру, «Повторить» у упавшего).

Тесты (src/memory-screens.test.ts, проект тестирует экраны по тексту исходника — рендерера нет):
- новый «a card still being made is the second road onto the waiting over it» — проверен на падение при откате правки;
- «no face reaches another by pushing a route» сужен: запрет на '/memory/[id]/montage' остался у frames и people, у films снят — экран ожидания не лицо, а экран, как и мастер заказа.

npm run typecheck чисто, npm test 506/506. Коммит 58b61c8 в ветке worktree-agent-a9676527d61f8d85f, слияние в main сабмодуля за лидом.
<!-- SECTION:NOTES:END -->
