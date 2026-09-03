---
id: TASK-17
title: >-
  root: bump api + mobile submodule pointers to the merged m-0 work, refresh the
  stale bring-up line
status: Done
assignee: []
created_date: '2026-09-03 09:30'
updated_date: '2026-09-03 09:34'
labels:
  - from-chief
milestone: m-0
dependencies: []
ordinal: 17000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
m-0 Memory is merged in both sub-repos (projects/api at 46cd927, projects/mobile at 54e507b) but the product repo still points at the m-3 heads. Bump both gitlinks in the product repo and commit, message referencing m-0. Also refresh README.md: lines ~135-136 and ~157 still say the mobile home screen shows 'API: ok' — that placeholder is gone (TASK-13 replaced it with the memories list). Reword the '### 4. Приложение' expectation and the 'Соединено, когда' bullet to the current reality: after signing in (email link, already described just below), the home screen shows the user's memories — an empty-state line on a fresh DB. Keep it short; the api/mobile READMEs already carry the detail. Sanity-check a clean 'git submodule update --init' plus the bring-up still reaches the running app.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 git submodule status shows projects/api and projects/mobile at 46cd927 / 54e507b with no '+' (heads recorded in the product repo)
- [x] #2 The product-repo commit message references m-0
- [x] #3 README.md no longer claims the mobile home screen shows 'API: ok'; the '### 4. Приложение' step and the 'Соединено, когда' bullet describe the memories list / empty state after sign-in
- [x] #4 A clean git submodule update --init followed by the README bring-up still reaches the running app
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 Root repo only — no edits inside projects/api or projects/mobile, no architecture.md. No board changes. No tests.
<!-- DOD:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Delivered on product repo main: c9620a0 (gitlinks: projects/api e220bf9->46cd927, projects/mobile 461bd4e->54e507b; montage untouched) + 36b67bb (README.md 4 lines — step 4 and the 'Соединено, когда' bullet now describe: app opens on Sign in, email link gets you in, first sign-in asks for a username, then the memories list shows empty 'No memories yet'). Verified: submodule status clean (no +), update --init a no-op; /health 200; GET /memories 401 (m-0 build); Metro-compiled home+login graphs carry the right strings and zero occurrences of 'API: ok'/'API: unreachable'/'Check again'. Nothing pushed. Notes: didn't click through the running app (compile + live-api only, brief allowed it); a failure-mode hint dropped with the old text (worker flagged, didn't restructure); backlog/ left dirty as found.
<!-- SECTION:FINAL_SUMMARY:END -->
