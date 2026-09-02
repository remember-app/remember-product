---
id: TASK-05
title: >-
  api authenticates a request: users/auth_identities/sessions schema, email
  magic-link login, and a mountable session check
status: Done
assignee: []
created_date: '2026-09-02 10:29'
updated_date: '2026-09-02 11:14'
labels:
  - from-chief
milestone: m-3
dependencies: []
ordinal: 5000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Migration 002 (idempotent) creates users (id, username citext nullable+unique, name, email, created_at), auth_identities (user_id, provider, provider_account_id, unique(provider,provider_account_id)), sessions (id, user_id, token_hash, expires_at, revoked_at, created_at). Session module: issue (random token -> store SHA-256 hash), verify, revoke. Email magic-link: POST /auth/email/start (body email) finds/creates user + mints single-use link token, in dev prints the deep link to the api log (no mail service, no account); POST /auth/email/verify (body token) consumes it and issues a session. GET /me returns current user. Fastify decorator app.authenticate (preHandler): reads Bearer token, hashes, looks up a live session, sets request.user, else 401. README section on how the next feature mounts it.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 npm run migrate applies 002 on a clean db and is idempotent (re-run is a no-op; kill between file apply and version mark re-runs it clean)
- [x] #2 Magic-link works end to end live: /auth/email/start prints a deep link to the api log, /auth/email/verify returns a session token, that token on GET /me returns the user
- [x] #3 A route with { preHandler: app.authenticate } gets request.user for a live token and 401 for missing / expired / revoked
- [x] #4 npm test, npm run lint, npm run typecheck all green
- [x] #5 README documents mounting app.authenticate for the next lead
- [x] #6 Session token is 32 bytes from a crypto-strong source; DB stores only its SHA-256 hash; every session has an expiry and is revocable one at a time
- [x] #7 Magic-link token is single-use and extinguished at the moment it is consumed (not merely TTL-expired), with a minutes-scale lifetime
- [x] #8 POST /auth/email/start is rate-limited (cheapest form that works) so it can't be used to enumerate registered addresses or send mail in our name
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 No username claim/change, no user search, no Apple/Google, no session-list endpoint (other m-3 cards). No product tables beyond users/auth_identities/sessions. No mail service.
<!-- DOD:END -->
