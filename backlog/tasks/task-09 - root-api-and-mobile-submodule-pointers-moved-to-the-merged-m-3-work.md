---
id: TASK-09
title: 'root: api and mobile submodule pointers moved to the merged m-3 work'
status: To Do
assignee: []
created_date: '2026-09-02 10:29'
labels:
  - from-chief
milestone: m-3
dependencies: []
ordinal: 9000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
After task-05..08 are accepted and committed in their repos, bump projects/api and projects/mobile submodule pointers in the product repo and commit. Sanity-check the root README bring-up still holds (auth adds env but does not change how the three services start); add any newly required env to the root README if needed.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 git submodule status shows projects/api and projects/mobile at the new heads
- [ ] #2 A clean git submodule update --init plus the README bring-up still reaches 'API: ok' on the app
- [ ] #3 Root commit message references m-3
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 No architecture.md edits (chief's). No deploy / CI / Dockerfiles.
<!-- DOD:END -->
