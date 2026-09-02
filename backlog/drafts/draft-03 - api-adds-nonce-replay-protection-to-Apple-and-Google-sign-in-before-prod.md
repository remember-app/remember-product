---
id: DRAFT-03
title: api adds nonce/replay protection to Apple and Google sign-in before prod
status: Draft
assignee: []
created_date: '2026-09-02 14:59'
labels:
  - from-worker
milestone: m-3
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
TASK-07 verifies signature + iss/aud/exp via jose but does not bind the id token to a server-issued nonce, so a captured token is replayable within its exp window. Deferred at MVP: the aud gate means a passing token was minted for our app, and a nonce needs a round trip the current flow lacks. Add before production — issue a nonce, echo it in the provider request, verify it on the token.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 a replayed id token is rejected after first use / outside its issued nonce
- [ ] #2 the mobile sign-in flow passes the nonce through both providers
<!-- AC:END -->
