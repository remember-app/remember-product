---
id: TASK-16
title: >-
  mobile: push-token registration, invite + notification deep links, and the
  upload stub route
status: Done
assignee: []
created_date: '2026-09-03 06:37'
updated_date: '2026-09-03 09:29'
labels:
  - from-chief
milestone: m-0
dependencies: []
ordinal: 1000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
The half split out of TASK-14. (1) Install expo-notifications via npx expo install. After the session is ready, request permission, get the Expo push token and POST /me/push-tokens { token, platform }; wrap it so a simulator or a denied permission logs and moves on, never crashes. (2) src/app/invite.tsx — the route for remember://invite?token=... : read the token, POST /invites/accept, on success navigate to the memory (src/app/memory/[id]); if signed out, send through login and resume the accept after; revoked/unknown token shows a clear message. (3) Notification-tap handler: a 'you were invited' push carries data:{ memoryId } — on tap, navigate to src/app/memory/[id]/upload.tsx. (4) src/app/memory/[id]/upload.tsx — a bare stub ('Upload lands here — m-1') that just shows the memory id; m-1 fills it. Register the new routes in _layout.tsx (invite reachable while signed-out too, like auth/email). Deep-link scheme is remember:// (app.json), same as m-3's magic link.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 expo-notifications installed via expo expo install; after login the app requests permission, gets the Expo push token and calls POST /me/push-tokens; on a simulator / denied permission it logs and continues, no crash
- [x] #2 src/app/invite.tsx handles remember://invite?token=... : accepts the invite via POST /invites/accept and lands on the memory; a revoked/unknown token shows a clear message; a signed-out user signs in first and the accept still completes
- [x] #3 Tapping a 'you were invited' notification (data:{memoryId}) opens src/app/memory/[id]/upload.tsx with that id
- [x] #4 src/app/memory/[id]/upload.tsx exists as a stub showing the memory id and nothing more
- [x] #5 npm run typecheck green; the invite deep link tested on the simulator via xcrun simctl openurl (state the result); push-token registration wired but stated as not verifiable on a simulator, with the POST /me/push-tokens shape checked by curl
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 The upload screen is a stub only — no media/gallery/upload/montage logic. No detail-screen work (TASK-14). No api repo, no architecture.md. New deps only via npx expo install.
<!-- DOD:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Delivered on mobile main 54e507b. New: src/push.ts (usePush: permission -> expo token -> POST /me/push-tokens once per session, fully guarded; pending-invite stash; notification-tap listener + cold-start getLastNotificationResponseAsync), src/app/invite.tsx (remember://invite?token= landing, accept + signed-out stash->login->drain), src/app/memory/[id]/upload.tsx (bare stub). src/api.ts +registerPushToken/acceptInvite. _layout.tsx routes + hook. expo-notifications@~57.0.16 via expo install. typecheck exit 0. Smoke caught+fixed 2 bugs (duplicate Stack.Screen name crash; param loss on replace during gate swap -> token moved to module). Verified live: invite deep link signed-in / dead-token / signed-out-cold-start all land correctly (DB-confirmed); POST /me/push-tokens 200 idempotent; in-app push registration ran, permission granted, getExpoPushTokenAsync failed-safe as designed. BONUS: TASK-14 detail screen verified rendering on device (organizer + viewer views, no errors). Unverified: notification tap banner (Expo Go dropped remote push in SDK53, needs dev build) - handler wired, payload matches api notifyInvited, target route verified. Prod prereq: app.json has no projectId/EAS config, so device push cannot succeed until an EAS project exists.
<!-- SECTION:FINAL_SUMMARY:END -->
