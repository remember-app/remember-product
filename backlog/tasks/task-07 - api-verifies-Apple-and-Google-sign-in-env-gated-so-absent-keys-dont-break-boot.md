---
id: TASK-07
title: >-
  api verifies Apple and Google sign-in, env-gated so absent keys don't break
  boot
status: To Do
assignee: []
created_date: '2026-09-02 10:29'
updated_date: '2026-09-02 11:38'
labels:
  - from-chief
milestone: m-3
dependencies: []
ordinal: 11000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
POST /auth/apple and POST /auth/google, body { idToken }. Verify the ID token signature against the provider JWKS (jose), check iss/aud/exp, extract the stable provider subject. Find or create the auth_identities row (+ users row on first sight, storing whatever name/email the provider returns; Apple may hide email). Issue a session via task-05's session module — same response shape as /auth/email/verify. Provider client id / audience from env; when a provider's env is unset it is disabled and its endpoint returns a clean 'not configured' and the server still boots. Not live-testable now (no keys) — cover with unit tests against a stubbed verifier/JWKS.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 With provider env unset the server boots and the endpoint answers a clean not-configured, no crash
- [ ] #2 With a stubbed verifier: a valid token creates user+identity and returns a session; a second call with the same subject reuses the user
- [ ] #3 Invalid signature / wrong aud / expired token is rejected
- [ ] #4 npm test, npm run lint, npm run typecheck all green
- [ ] #5 Binding is by the provider's stable sub claim, never by email (Apple email may be a hidden relay and can change)
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 No real provider keys and no live provider test (expected — say so in the report). No provider beyond Apple/Google. Reuses task-05's session module, does not fork it.
<!-- DOD:END -->
