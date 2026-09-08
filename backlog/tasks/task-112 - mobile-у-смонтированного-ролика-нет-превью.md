---
id: TASK-112
title: 'mobile: у смонтированного ролика нет превью'
status: Done
assignee: []
created_date: '2026-09-08 17:58'
updated_date: '2026-09-08 18:30'
labels:
  - from-human
milestone: m-16
dependencies:
  - TASK-116
priority: medium
type: bug
ordinal: 116000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Человек 2026-09-08: карточка готового ролика идёт без постера. Проверить, отдаёт ли сервер постер и рисует ли его приложение.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Причина отсутствия постера установлена и названа: сервер сейчас не хранит и не отдаёт постер готового ролика (TASK-116/117 это чинят)
- [x] #2 Карточка ролика (CardMontage) получает poster из ответа api, когда он есть
- [x] #3 Без постера (старые ролики, где его ещё нет) карточка не ломается — тот же плейсхолдер, что и сейчас
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Причина: сервер до TASK-116/117 не хранил постер, а приложение и не готово было его нарисовать — тип Montage не имел поля постера, и CardMontage вызывался без пропа poster, поэтому карточка всегда рисовала плейсхолдер. Серверная половина закрыта отдельно, здесь только отрисовка.

Сделано (mobile, коммит 21e4843, ветка worktree-agent-ae68d4f95185add0b от main):
- src/api.ts — тип Montage получил poster_url: string | null, тем же образцом, что video_url (подписанная ссылка или null).
- src/memory/films.tsx — CardMontage получает poster={montage.poster_url ?? undefined}; null не доходит до карточки, поэтому без постера она рисует ровно тот же плейсхолдер, что и раньше.
- src/memory-screens.test.ts — тест композиции на все три звена: поле в api, передача пропа на лице, ветка poster ? <Image> в ките.

Зелено: tsc --noEmit чисто, vitest 23 файла / 192 теста.

Больше ничего не менялось: сам CardMontage, плейсхолдер и логика статусов не тронуты.
<!-- SECTION:NOTES:END -->
