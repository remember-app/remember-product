---
id: TASK-149
title: 'mobile: вступление по приглашению по макету'
status: Done
assignee: []
created_date: '2026-09-18 13:01'
updated_date: '2026-09-18 14:28'
labels:
  - from-chief
milestone: m-21
dependencies:
  - TASK-142
priority: high
type: feat
ordinal: 156000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Экран вступления по пригласительной ссылке по новому макету: пока вступаю и когда ссылка уже не действует.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Экран «вступаю по ссылке» выглядит как в InviteJoining.html
- [x] #2 Экран «ссылка не действует» выглядит как в InviteDead.html
- [x] #3 От прежней вёрстки экрана ничего не осталось
- [x] #4 Автотесты зелёные
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 Ничего лишнего не оставлено
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Экраны: InviteJoining, InviteDead (design/screens/). src/app/invite.tsx — вычистить и собрать заново на новой библиотеке (TASK-142).
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
4baf59d: src/app/invite.tsx собран заново по InviteJoining.html/InviteDead.html — целиком на кита, старая красная вёрстка ошибки убрана, логика приёма ссылки сохранена. Кит получил четвёртый знак Empty (line) с историей. Слито в main лидом. Проверено: typecheck и 419 тестов зелёные. Найдено при работе, не в этой задаче: отступы в src/kit/empty.tsx (22/12 в макете против единых 24 в ките) расходятся на пяти пустых экранах разом — заведу отдельной задачей после того, как остальные экранные задачи вехи лягут в main.
<!-- SECTION:FINAL_SUMMARY:END -->
