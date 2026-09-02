---
id: TASK-02
title: 'mobile: Expo/RN skeleton runs, navigates two screens, shows API health'
status: Done
assignee: []
created_date: '2026-09-02 07:19'
updated_date: '2026-09-02 07:32'
labels:
  - from-chief
milestone: m-7
dependencies: []
ordinal: 2000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Skeleton of projects/mobile: Expo / React Native + TypeScript app that runs in Expo Go / simulator, has navigation working across at least two screens, reads an API base URL from env, calls GET {base}/health and shows the result on screen. Types are local (no shared package with api). Rewrite the GitLab README for this service.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Documented command launches the app in Expo Go / simulator showing a screen
- [x] #2 A navigation library is installed; moving between at least two screens works
- [x] #3 API base URL comes from env (e.g. EXPO_PUBLIC_API_URL); app calls GET {base}/health and shows ok/error visibly on a screen
- [x] #4 TypeScript typechecks clean (tsc --noEmit or npm run typecheck)
- [x] #5 README explains: set the API URL env, start the app, which screens exist
- [x] #6 git log in projects/mobile is non-empty; minimal deps (Expo + navigation only); no CI
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 No product screens or entities beyond the health-check demo; no shared types package with api (types duplicated/generated locally)
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
ACCEPTED by lead. Commit 12893f7 on mobile/main. Run: npm install; EXPO_PUBLIC_API_URL=http://localhost:3000 npx expo start. Nav: expo-router, screens index (home, shows API health) + about. Verified via web target + native bundle export (no simulator here); both health branches observed. Submodule pointer bump deferred to TASK-04. Note for TASK-04/api: native needs no CORS; web target (not a product target) would.
<!-- SECTION:NOTES:END -->
