---
id: DRAFT-01
title: api /auth/email/start closes the registered-address timing side-channel
status: Draft
assignee: []
created_date: '2026-09-02 11:14'
labels:
  - from-lead
milestone: m-3
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
A1 (TASK-05) left a ~0.6ms timing difference on POST /auth/email/start: an unknown address does two extra inserts, a known one does not, so response latency leaks whether an address is registered. The response body is already identical and the route is rate-limited (5/mailbox/15min), which makes statistical exploitation impractical at pilot scale — hence deferred, not fixed inline. Fix options: constant-work path (always do equivalent DB work), or move find-or-create to verify time (a brief-structure change). Pick at gate time.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 start latency for a registered vs unknown address is indistinguishable under repeated sampling
- [ ] #2 the identical-response and rate-limit defences remain in place
<!-- AC:END -->
