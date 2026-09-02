---
id: DRAFT-01
title: 'mobile: expo start --ios uses LAN IP and fails to launch on simulator'
status: Draft
assignee: []
created_date: '2026-09-02 09:13'
labels:
  - from-worker
milestone: m-7
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
From TASK-04 integration: 'npx expo start' then 'i' prints 'Opening exp://192.168.1.125:8081 on iPhone 17' but the app never loads; it only launches after 'xcrun simctl openurl booted exp://127.0.0.1:8081' (LAN IP vs loopback). Root README documents the workaround; the mobile skeleton itself is unfixed.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 npx expo start then pressing i launches the app on a booted iOS simulator with no manual openurl step
- [ ] #2 Root README workaround note removed or kept only as a fallback
<!-- AC:END -->
