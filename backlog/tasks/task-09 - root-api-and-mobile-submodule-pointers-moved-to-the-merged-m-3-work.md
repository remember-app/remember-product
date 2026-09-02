---
id: TASK-09
title: 'root: api and mobile submodule pointers moved to the merged m-3 work'
status: To Do
assignee: []
created_date: '2026-09-02 10:29'
updated_date: '2026-09-02 15:34'
labels:
  - from-chief
milestone: m-3
dependencies: []
ordinal: 9000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
After TASK-05..08 are accepted and committed, bump projects/api and projects/mobile submodule pointers in the product repo and commit. Also: (a) in projects/mobile/README.md add the dev deep-link caveat — the magic link is printed to the api log; in Expo Go open it as exp://127.0.0.1:8081/--/auth/email?token=..., the remember:// scheme needs a dev build; commit that in the mobile submodule so the pointer bump carries it. (b) in the root README add one line on testing the m-3 email login in dev, and note the new api env vars (SESSION_TTL_DAYS, EMAIL_LOGIN_*, APPLE_CLIENT_ID, GOOGLE_CLIENT_ID) are all optional/defaulted so bring-up is unchanged — point at the api README for detail. Sanity-check the clean-checkout bring-up still reaches API: ok.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 git submodule status shows projects/api and projects/mobile at the new heads
- [ ] #2 A clean git submodule update --init plus the README bring-up still reaches 'API: ok' on the app
- [ ] #3 Root commit message references m-3
- [ ] #4 projects/mobile/README.md carries the remember:// vs exp:// deep-link caveat, committed in the mobile submodule
- [ ] #5 root README documents how to test m-3 email login in dev and points at the api README for the new (optional) env vars
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 No architecture.md edits (chief's). No deploy / CI / Dockerfiles.
<!-- DOD:END -->
