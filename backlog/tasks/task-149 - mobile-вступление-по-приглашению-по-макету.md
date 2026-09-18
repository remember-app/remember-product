---
id: TASK-149
title: 'mobile: вступление по приглашению по макету'
status: To Do
assignee: []
created_date: '2026-09-18 13:01'
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
- [ ] #1 Экран «вступаю по ссылке» выглядит как в InviteJoining.html
- [ ] #2 Экран «ссылка не действует» выглядит как в InviteDead.html
- [ ] #3 От прежней вёрстки экрана ничего не осталось
- [ ] #4 Автотесты зелёные
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Ничего лишнего не оставлено
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Экраны: InviteJoining, InviteDead (design/screens/). src/app/invite.tsx — вычистить и собрать заново на новой библиотеке (TASK-142).
<!-- SECTION:NOTES:END -->
