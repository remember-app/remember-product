---
id: DRAFT-04
title: mobile Apple/Google buttons meet store-review and dev-build requirements
status: Draft
assignee: []
created_date: '2026-09-03 05:53'
labels:
  - from-worker
milestone: m-3
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
TASK-08 wired Apple and Google sign-in but keyless: the Apple button is a plain Button (App Store review requires AppleAuthenticationButton), and app.json has no Google scheme/redirect entry needed for a real dev build. Both are deferred with the provider keys the human will add later. Do this together with wiring the real APPLE_CLIENT_ID / GOOGLE_CLIENT_ID.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 the Apple sign-in control is AppleAuthenticationButton, not a plain Button
- [ ] #2 app.json carries whatever redirect/scheme config expo-auth-session Google needs for a dev build
- [ ] #3 with real keys in env, both flows complete on a dev build
<!-- AC:END -->
