---
id: DRAFT-04
title: projects/mobile/README.md describes the m-3 client instead of the skeleton
status: Draft
assignee: []
created_date: '2026-09-02 21:14'
labels:
  - from-worker
milestone: m-3
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
TASK-08 added login / auth/email / set-username / profile screens and a Stack.Protected auth gate to the mobile app (commit 68b8979), but its README still opens with 'Пока это скелет: продуктовых экранов нет' and lists only / and /about under «Экраны». TASK-09's dev deep-link caveat now sits in a README that contradicts the shipped app. Bring the intro, «Экраны» and the run notes current; document the auth gate the way the api README documents app.authenticate. Docs only, commit in the mobile submodule, bump the root pointer.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 README intro no longer calls the app a skeleton; «Экраны» lists login, auth/email, set-username, profile, index (placeholder home), about
- [ ] #2 the auth gate (Stack.Protected in src/app/_layout.tsx, status from useAuth) is described for the next lead
- [ ] #3 committed in projects/mobile; root submodule pointer bumped
<!-- AC:END -->
