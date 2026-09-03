---
id: TASK-14
title: >-
  mobile: memory detail screen — roster, invite by username, invite link, leave
  and remove
status: Done
assignee: []
created_date: '2026-09-02 21:16'
updated_date: '2026-09-03 06:52'
labels:
  - from-chief
milestone: m-0
dependencies: []
ordinal: 15000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
On top of the m-0 api (TASK-11/12/15) and the home screen (TASK-13). Build src/app/memory/[id].tsx: the members roster with roles (GET /memories/:memoryId/members -> [{id,username,name,role}]); invite by username (POST /memories/:memoryId/members {username,role}, role viewer|contributor; 404 unknown username, 403 if the caller is a viewer, idempotent re-add); the invite link (GET /memories/:memoryId/invite -> {token,role}, mints on first ask; POST same path rotates = revoke+mint) shown as a shareable remember://invite?token=... string with copy and (organizer/contributor) rotate; leave (DELETE /memories/:memoryId/members/<self>, 409 for the organizer); per-member remove for the organizer. Role-gate the UI: a viewer sees roster + leave only. Register the route in the ready group in _layout.tsx. Add the api calls to src/api.ts in the existing style; while there delete isApiHealthy() (dead since TASK-13); if you touch describe(), also read body.message so Fastify schema-400s show detail. Receiving deep links and push are NOT here - that is TASK-16.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 src/app/memory/[id].tsx lists members with roles from GET /memories/:memoryId/members; reachable by tapping a home-screen row
- [x] #2 Invite by username: a field adds a user at role viewer|contributor; unknown username and already-a-member are shown clearly; a viewer caller never sees this control
- [x] #3 The invite link shows as remember://invite?token=... with copy; organizer/contributor can rotate it (old link then dead); a viewer sees no link controls
- [x] #4 A non-organizer member can leave; the organizer's leave is absent/disabled; the organizer's per-member remove works
- [x] #5 npm run typecheck green; roster / invite-by-username / invite-link / leave / remove exercised against a live api (state what was run)
- [x] #6 New api calls added to src/api.ts in the existing style; isApiHealthy() removed
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 No push, no notification handling, no deep-link RECEIVING (TASK-16) — only rendering the invite link string. No src/app/memory/[id]/upload.tsx. No media/gallery/montage. No api repo, no architecture.md.
<!-- DOD:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Delivered on mobile main f48545c. src/app/memory/[id].tsx (header w/ dates via listMemories+find, roster w/ roles, invite-by-username w/ level toggle, invite link via Share + rotate, leave, per-member remove; caller role read from own roster row; viewer sees roster+leave only; native Alert confirm on leave/remove). src/api.ts +listMembers/inviteByUsername/fetchInvite/rotateInvite/removeMember + DELETE in request() + Member/InviteRole/Invite types; isApiHealthy()+Health deleted. Route registered in _layout.tsx ready group; stale as-Href cast removed from index.tsx. Forks: Share instead of expo-clipboard (no dep); link minted on demand; one role toggle for both paths. typecheck exit 0. Verified via a 15-step live-api curl sequence matching the screen's exact calls (roster/role, 404 unknown, invite, idempotent re-add, link mint+rotate+old-token-dead, viewer 403s, organizer 409, leave, remove) — simulator would not bundle (Metro silent) so on-device visual render is UNVERIFIED; folded into TASK-16's app-run. describe() untouched (no screen call can produce a schema-400). Test users alice14/bob14 + 2 memories left in dev DB.
<!-- SECTION:FINAL_SUMMARY:END -->
