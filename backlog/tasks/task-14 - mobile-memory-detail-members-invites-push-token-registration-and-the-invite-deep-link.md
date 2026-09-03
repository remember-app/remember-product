---
id: TASK-14
title: >-
  mobile: memory detail (members, invites), push-token registration, and the
  invite deep link
status: To Do
assignee: []
created_date: '2026-09-02 21:16'
labels:
  - from-chief
milestone: m-0
dependencies: []
ordinal: 15000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
On top of the m-0 api (TASK-11 + TASK-12) and the home screen (TASK-13). A memory detail screen: members list with roles; an organizer sees a remove control per member; every user sees a leave control (the organizer's is absent/disabled - no transfer in MVP). Invite by username: a field resolves a username via the api and adds them at a chosen role (viewer/contributor); not-found and already-member are shown clearly. Invite link: show the memory's link, copy it, and (organizer) revoke -> show the fresh link. Register the Expo push token with the api after login. Handle the 'you were invited' push deep link: it opens the app on that memory's upload screen - a stub route src/app/memory/[id]/upload.tsx is fine (upload is m-1) but the deep link must land there with the memory in context. UI hides controls the caller's role can't use (a viewer sees no invite/remove controls).
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 A memory detail screen lists members with roles; an organizer sees a per-member remove control; a non-organizer sees a leave control; a viewer sees no invite/remove controls
- [ ] #2 Invite by username resolves via the api and adds the user at a chosen role; not-found and already-member are shown clearly
- [ ] #3 The screen shows the invite link, copies it, and (organizer) revokes it and shows the fresh link
- [ ] #4 After login the app registers its Expo push token with the api
- [ ] #5 A 'you were invited' push deep link opens the app on the memory's upload route (stub screen ok) with the memory id in context
- [ ] #6 npm run typecheck green; members / invite-by-username / invite-link / leave flows work against a live api
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 The upload screen is a stub only (m-1 fills it). No media/gallery/montage. Only what is named here.
<!-- DOD:END -->
