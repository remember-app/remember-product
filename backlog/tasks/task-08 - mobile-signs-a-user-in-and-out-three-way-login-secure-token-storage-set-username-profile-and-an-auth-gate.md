---
id: TASK-08
title: >-
  mobile signs a user in and out: three-way login, secure token storage,
  set-username, profile, and an auth gate
status: Done
assignee: []
created_date: '2026-09-02 10:29'
updated_date: '2026-09-02 15:34'
labels:
  - from-chief
milestone: m-3
dependencies: []
ordinal: 8000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
expo-secure-store holds the session token; an auth context exposes it and attaches Authorization: Bearer to api calls (src/api.ts). Login screen: Continue with Apple / Google / email. Email: enter address -> 'open your link' screen; the dev link is a remember:// deep link printed by the api log — handle it, exchange the token via POST /auth/email/verify, store the session. Apple via expo-apple-authentication, Google via expo-auth-session — wired but untestable without keys; buttons present, failure graceful. First login with no username -> set-username screen (POST /me/username, shows taken/invalid error). Authenticated + username -> placeholder home ('your memories will show up here' — real list is m-0) with a link to Profile. Profile: show username + name, change username, log out (POST /auth/logout + clear secure store -> back to login). expo-router guard routes by auth state. tsc --noEmit stays green.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 With the api running, a tester completes email login via xcrun simctl openurl booted 'remember://...' from the logged link and lands on the placeholder home
- [x] #2 Killing and reopening the app keeps the user signed in (token from secure store)
- [x] #3 Changing the username on Profile shows the new value; a second user cannot then take it (case-insensitive)
- [x] #4 Logout returns to the login screen and the token is gone from secure store
- [x] #5 Apple/Google buttons are present and fail gracefully with no keys; npm run typecheck green
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 No memories list or creation (m-0). No push tokens (m-0). No roles. Login UI polished only enough for the pilot. No shared types package with api.
<!-- DOD:END -->
