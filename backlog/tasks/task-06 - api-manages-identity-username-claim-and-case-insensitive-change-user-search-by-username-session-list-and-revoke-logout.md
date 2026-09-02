---
id: TASK-06
title: >-
  api manages identity: username claim and case-insensitive change, user search
  by username, session list and revoke, logout
status: To Do
assignee: []
created_date: '2026-09-02 10:29'
labels:
  - from-chief
milestone: m-3
dependencies: []
ordinal: 6000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
On top of task-05's schema + app.authenticate. POST /me/username: claim when null, change any time; citext case-insensitive uniqueness; a freed username is immediately reusable; no history kept; reject format-invalid. GET /users search by username (case-insensitive) returning stable user_id + username + name — the endpoint m-0 calls to invite people. GET /auth/sessions lists the caller's live sessions; POST /auth/sessions/:id/revoke revokes one; POST /auth/logout revokes the current one. All behind app.authenticate.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Two users cannot hold the same username differing only in case
- [ ] #2 Changing a username frees the old one for immediate reuse by another user
- [ ] #3 Searching a known username returns that user's stable id
- [ ] #4 Revoking a session makes its token 401 on the next request; logout 401s the token it was called with
- [ ] #5 npm test, npm run lint, npm run typecheck all green
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 No roles or permission checks (m-0 owns the roles table). No account deletion. No username history. No push tokens.
<!-- DOD:END -->
