---
id: TASK-12
title: >-
  api: memory invites (username + link), member remove/leave, and the invite
  push
status: To Do
assignee: []
created_date: '2026-09-02 21:16'
updated_date: '2026-09-02 21:16'
labels:
  - from-chief
milestone: m-0
dependencies: []
ordinal: 13000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
On top of TASK-11's schema and permission check. Invite by username: a contributor or organizer adds a user found via the m-3 user-search contract (GET /users?username=) as a member at role viewer or contributor; a viewer cannot; re-adding an existing member is idempotent. Invite link: an endpoint returns the memory's active invite link token (mints one if absent) with its granted role; revoke marks revoked_at and issues a fresh token; the old token stops working. Accept-by-link: posting a valid token makes the caller a member at the invite's role; already-a-member is a no-op; revoked/unknown token gets a clean 4xx. Member management: an organizer removes another member; any member removes themselves (leave); the organizer cannot leave (no transfer in MVP) - documented. Removal drops only the memory_members row and leaves a clearly named hook/comment where m-1 will attach the media + jobs cascade. Invite push: adding a member fires an Expo Push 'you were invited to <memory>' with a deep link to that memory; with push env unset it logs the intended payload instead of throwing; a README note states it is not verified live (no device/keys).
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 A contributor or organizer can add a user (resolved via GET /users?username=) as a member at role viewer or contributor; a viewer gets a 403; re-adding an existing member is idempotent
- [ ] #2 An endpoint returns the memory's active invite link token + granted role, minting one if none exists; revoke sets revoked_at and returns a fresh token; the revoked token no longer accepts anyone
- [ ] #3 Posting a valid invite link token makes the caller a member at the invite's role; an already-member call is a no-op 2xx; a revoked or unknown token returns a clean 4xx
- [ ] #4 An organizer can remove another member; any non-organizer member can remove themselves; the organizer's own leave is refused with a documented reason
- [ ] #5 Member removal deletes only the memory_members row and leaves a named hook/comment for m-1's media+jobs cascade
- [ ] #6 Adding a member triggers an Expo Push with a memory deep link; with push env unset the intended payload is logged and nothing throws; a README note records it is not verified live
- [ ] #7 npm test, npm run lint, npm run typecheck all green; role x action for invite/accept/remove/leave covered by integration tests against real Postgres
- [ ] #8 Every new endpoint is behind app.authenticate and, where a memory is in scope, the TASK-11 permission check
- [ ] #9 The invite transaction (member added, memory_members row committed) closes BEFORE the push is attempted; a push send failure is caught and logged only and never rolls back or fails the invite
- [ ] #10 The push-send path carries a ponytail: comment naming the ceiling — no retry, a lost notification is not recovered, move to the jobs queue if/when pushes start getting lost — because m-2 will copy this send path verbatim
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 No new migration unless a column is genuinely missing (tables exist from 003). Only the cascade hook, not the media/jobs cascade itself. No mobile. No jobs writes. No architecture.md edits.
<!-- DOD:END -->
