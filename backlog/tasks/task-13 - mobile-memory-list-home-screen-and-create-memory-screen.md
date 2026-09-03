---
id: TASK-13
title: 'mobile: memory list home screen and create-memory screen'
status: To Do
assignee: []
created_date: '2026-09-02 21:16'
labels:
  - from-chief
milestone: m-0
dependencies: []
ordinal: 14000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
On top of the m-0 api (TASK-11 + TASK-12). Replace the placeholder src/app/index.tsx with a home screen that lists the signed-in user's memories (organizer or member) from the api, behind the existing auth gate (src/auth.tsx). Add a create-memory screen: title + event date(s) via a native date input, title + start date required, posts to the api and returns to the refreshed list. Handle the empty state (no memories yet) and the error state (api unreachable). All api calls go through the existing src/api.ts client pattern.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 src/app/index.tsx (placeholder replaced) lists the caller's memories from the api behind the existing auth gate; each row shows title and event date
- [ ] #2 A create-memory screen requires a title and a start date, uses a native date input, optionally takes an end date, posts to the api, and the new memory appears in the list
- [ ] #3 Empty state (no memories) and error state (api unreachable) are both handled visibly
- [ ] #4 npm run typecheck green; with EXPO_PUBLIC_API_URL=http://localhost:3000 the app boots and the create -> list flow works against a live api
- [ ] #5 New api calls are added to src/api.ts following the existing pattern
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 No media/upload/gallery. No invite UI, no member list, no push (TASK-14). Only the screens named here.
<!-- DOD:END -->
