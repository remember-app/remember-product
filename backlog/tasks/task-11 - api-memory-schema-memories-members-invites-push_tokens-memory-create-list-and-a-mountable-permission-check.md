---
id: TASK-11
title: >-
  api: memory schema (memories/members/invites/push_tokens), memory create +
  list, and a mountable permission check
status: To Do
assignee: []
created_date: '2026-09-02 21:15'
labels:
  - from-chief
milestone: m-0
dependencies: []
ordinal: 12000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Migration 003 (idempotent) creates all four m-0 tables: memories (organizer, title, event_start, nullable event_end, counters storage_bytes/media_count/montage_count default 0), memory_members (user_id, role organizer|contributor|viewer, invited_by, unique(memory,user)), invites (link token, granted role, created_by, revoked_at), push_tokens (user_id, expo token). Endpoints behind app.authenticate: create a memory (title + event_start required, event_end optional, caller becomes an organizer member), list memories where the caller is organizer or member. Mountable permission check: a Fastify preHandler that resolves the route's memory + the caller's role onto the request; a non-member and a missing memory both get an identical 404. README section addressed to the next lead with the role x action matrix from architecture.md and a copy-paste mount example.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 npm run migrate applies 003 on a clean db and is idempotent (re-run is a no-op; kill between file apply and version mark re-runs it clean)
- [ ] #2 Migration 003 creates memories, memory_members, invites, push_tokens; memories carries event_start (required) + nullable event_end + counters storage_bytes/media_count/montage_count defaulting to 0
- [ ] #3 Create-memory endpoint rejects missing/blank title or missing event_start, stores event_end only when given, and creates the creator's memory_members row with role organizer
- [ ] #4 List endpoint returns exactly the memories where the caller is organizer or member
- [ ] #5 A route with the permission preHandler gets the memory + caller role on the request; a non-member and a non-existent memory return an identical 404
- [ ] #6 README has a section addressed to the next lead: the role x action matrix and a copy-paste mount example (preHandler + how to read the role)
- [ ] #7 npm test, npm run lint, npm run typecheck all green; the role x action matrix is covered by integration tests against real Postgres
- [ ] #8 Every new endpoint sits behind app.authenticate
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 No invites/member-add/remove/leave endpoints, no push sending (A2). No media_items/montages. No mobile. No architecture.md edits. No jobs table.
<!-- DOD:END -->
