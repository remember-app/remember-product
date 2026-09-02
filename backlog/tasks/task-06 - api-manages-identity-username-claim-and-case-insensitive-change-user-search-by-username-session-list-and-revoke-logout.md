---
id: TASK-06
title: >-
  api manages identity: username claim and case-insensitive change, user search
  by username, session list and revoke, logout
status: Done
assignee: []
created_date: '2026-09-02 10:29'
updated_date: '2026-09-02 14:33'
labels:
  - from-chief
milestone: m-3
dependencies: []
ordinal: 10000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
On top of task-05's schema + app.authenticate. POST /me/username: claim when null, change any time; citext case-insensitive uniqueness; a freed username is immediately reusable; no history kept; reject format-invalid. GET /users search by username (case-insensitive) returning stable user_id + username + name — the endpoint m-0 calls to invite people. GET /auth/sessions lists the caller's live sessions; POST /auth/sessions/:id/revoke revokes one; POST /auth/logout revokes the current one. All behind app.authenticate.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Two users cannot hold the same username differing only in case
- [x] #2 Changing a username frees the old one for immediate reuse by another user
- [x] #3 Searching a known username returns that user's stable id
- [x] #4 Revoking a session makes its token 401 on the next request; logout 401s the token it was called with
- [x] #5 npm test, npm run lint, npm run typecheck all green
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 No roles or permission checks (m-0 owns the roles table). No account deletion. No username history. No push tokens.
<!-- DOD:END -->
