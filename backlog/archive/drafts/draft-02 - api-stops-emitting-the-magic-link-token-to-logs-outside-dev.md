---
id: DRAFT-02
title: api stops emitting the magic-link token to logs outside dev
status: Draft
assignee: []
created_date: '2026-09-02 14:33'
labels:
  - from-worker
milestone: m-3
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
TASK-05 delivers the email magic-link by printing the full remember:// deep link (token included) to the api log — the mandated dev mechanism. That same code path in production makes the token an account-takeover primitive for anyone with log access. Before prod: gate the log-line delivery to dev only and/or wire a real email sender. Found by the TASK-06 worker; line already carries its own ponytail: note.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 outside NODE_ENV=development the magic-link token never appears in logs
- [ ] #2 a dev still has a working way to complete email login locally
<!-- AC:END -->
