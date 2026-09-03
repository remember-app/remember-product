---
id: TASK-15
title: >-
  api: member roster endpoint for the memory detail screen, and a gender-neutral
  invite push string
status: Done
assignee: []
created_date: '2026-09-03 06:30'
updated_date: '2026-09-03 06:36'
labels:
  - from-lead
milestone: m-0
dependencies: []
ordinal: 16000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Decomposition gap in TASK-12: TASK-14's memory detail screen must list members with roles, but no endpoint returns the roster of one memory (GET /memories only lists the caller's memories + their own role). Add GET /memories/:memoryId/members behind [app.authenticate, app.requireMembership] returning [{ user_id, username, name, role, invited_by }] for every member; any member (including viewer) may read it. Also: the TASK-12 invite push body hard-codes masculine agreement ('<кто> добавил вас в …') while decision-06's own text reads feminine ('Аня добавила') — replace it with wording that does not assume the inviter's gender, keeping decision-06's call-to-upload intent.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 A viewer can read the roster (it is not gated to contributor+)
- [x] #2 The invite push title/body no longer assume the inviter's gender and still carry the call to upload and the memory title; the deep-link data is unchanged
- [x] #3 npm test, npm run lint, npm run typecheck all green; the roster endpoint's member-visibility and 404 behaviour are covered by an integration test
- [x] #4 GET /memories/:memoryId/members returns every member as { id, username, name, role } — id (not user_id) matching m-3's GET /users shape, no invited_by, and never email; a non-member / missing memory gets the family 404
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 No new migration. No other endpoints. No mobile. No architecture.md edits. Push still not verified live (no device/keys).
<!-- DOD:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Delivered on api main 46cd927. GET /memories/:memoryId/members behind [authenticate, requireMembership], returns [{ id, username, name, role }] — m-3 GET /users shape, no invited_by, no email (Object.keys test guards against a future u.* widening). Any member incl. viewer reads it (mutation-tested). Invite push body now 'X приглашает вас в «title» — загрузите свои фото и видео' — present tense agrees with any inviter, and it restores decision-06's call-to-upload that the old string had dropped; data:{memoryId} and the ponytail ordering untouched. 43 tests green, lint+typecheck clean. Notes: api repo 8 commits ahead of origin (push is the human's call); architecture.md's 'non-ролик-готов pushes are post-MVP' line is still stale per decision-06 — chief's to fix.
<!-- SECTION:FINAL_SUMMARY:END -->
