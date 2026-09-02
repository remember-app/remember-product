---
id: TASK-09
title: 'root: api and mobile submodule pointers moved to the merged m-3 work'
status: Done
assignee: []
created_date: '2026-09-02 10:29'
updated_date: '2026-09-02 21:14'
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
- [x] #1 git submodule status shows projects/api and projects/mobile at the new heads
- [x] #2 A clean git submodule update --init plus the README bring-up still reaches 'API: ok' on the app
- [x] #3 Root commit message references m-3
- [x] #4 projects/mobile/README.md carries the remember:// vs exp:// deep-link caveat, committed in the mobile submodule
- [x] #5 root README documents how to test m-3 email login in dev and points at the api README for the new (optional) env vars
- [x] #6 projects/api/README.md's dev-token section no longer claims remember:// works on the simulator as-is — it names the Expo Go exp:// form and that remember:// needs a dev build; committed in the api submodule
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 No architecture.md edits (chief's). No deploy / CI / Dockerfiles.
<!-- DOD:END -->
