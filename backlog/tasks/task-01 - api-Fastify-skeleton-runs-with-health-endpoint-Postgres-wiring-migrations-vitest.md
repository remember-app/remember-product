---
id: TASK-01
title: >-
  api: Fastify skeleton runs with health endpoint, Postgres wiring, migrations,
  vitest
status: Done
assignee: []
created_date: '2026-09-02 07:19'
updated_date: '2026-09-02 07:37'
labels:
  - from-chief
milestone: m-7
dependencies: []
ordinal: 1000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Skeleton of projects/api: TypeScript + Fastify service that runs locally, answers one GET /health, connects to Postgres from env, has a chosen migration tool with one trivial (non-product) migration applying clean, one vitest live test, one linter + one formatter, and a docker-compose that stands up local Postgres. Rewrite the GitLab README for this service.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Documented command starts the server; GET /health returns 200 application/json {"status":"ok"} with no auth
- [x] #2 docker compose up -d in the repo starts Postgres 16 on localhost; server connects via DATABASE_URL env
- [x] #3 A migration tool is chosen and documented; one migration applies from scratch on an empty DB with no error and creates NO product tables (empty/utility only)
- [x] #4 npm test runs vitest with at least one live test passing
- [x] #5 Exactly one linter and one formatter configured; lint command passes clean
- [x] #6 README explains: start Postgres, set env, run migrations, run server, run tests
- [x] #7 git log in projects/api is non-empty; no CI, no prod Dockerfile, no deploy config, minimal deps
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 No product entities (no users/memories/media_items); jobs table is NOT created here
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
ACCEPTED by lead. Commit ab4c6ce on api/main. Fastify + postgres.js (0 transitive deps) + postgrator migrations (one dep 'glob'; plain .sql, ships no driver). Migration 001 = CREATE EXTENSION citext only, no product tables. Lint+format = Biome (one tool). No build step (Node 26 runs .ts natively; tsc --noEmit as typechecker). docker-compose.yml = canonical local DB for the product: postgres:16, db/user/pass all 'remember', :5432, pg_isready healthcheck (docker compose up -d --wait). Run: npm install; docker compose up -d --wait; cp .env.example .env; npm run migrate; npm run dev; npm test; npm run lint. Verified live incl. clean-machine rehearsal from fresh clone. DEVIATION (accepted): /health content-type is 'application/json; charset=utf-8' not bare — Fastify forces the charset; mobile parses JSON + checks res.ok so it is unaffected; api test asserts full string so it can't drift. Worker did not enumerate pipeline stages: verification covers the substance (health contract pinned by inject test, migrate script probed live incl. kill-between-statements, DATABASE_URL/PORT failure paths); no trust boundary in this skeleton for a security pass to act on.
<!-- SECTION:NOTES:END -->
