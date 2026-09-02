---
id: TASK-03
title: >-
  montage: Python worker skeleton with jobs table and FOR UPDATE SKIP LOCKED
  retry loop
status: Done
assignee: []
created_date: '2026-09-02 07:19'
updated_date: '2026-09-02 07:36'
labels:
  - from-chief
milestone: m-7
dependencies: []
ordinal: 3000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Skeleton of projects/montage: standalone Python process (no inbound network) that owns the shared jobs table, polls it with SELECT ... FOR UPDATE SKIP LOCKED, records attempts, backs off via run_after, sets failed after 3 attempts. One dummy job type registered (no real handlers). One pytest live test of the claim->attempt->fail->retry->failed cycle. Rewrite the GitLab README for this service.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 jobs table is created by montage's own mechanism (idempotent SQL or a light Python migration tool; minimal deps) and applies clean on an empty DB
- [x] #2 Worker connects via DATABASE_URL and runs a loop that claims one job with FOR UPDATE SKIP LOCKED, increments attempts, on failure sets run_after = now() + backoff, and after 3 attempts sets status='failed'
- [x] #3 Exactly one dummy job type registered (no media_preview, no montage handler); a documented helper enqueues a dummy job and running the worker processes it
- [x] #4 pytest runs one live test covering claim -> attempt -> fail -> retry -> failed
- [x] #5 README explains: get a local Postgres, set env, create the table, run the worker, run tests, enqueue a dummy job
- [x] #6 git log in projects/montage is non-empty; no ffmpeg/OpenCV/ONNX; no task handlers; minimal deps
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 jobs columns cover: id, type, ref (nullable), status, attempts, run_after, last_error (nullable), created_at, updated_at; no other tables; no product entities
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
ACCEPTED by lead. Commit 26c4a11 on montage/main. jobs table via schema.sql + 'python worker.py init' (idempotent, no migration tool). Driver psycopg[binary] v3. Claim: UPDATE ... WHERE id=(SELECT ... LIMIT 1 FOR UPDATE SKIP LOCKED) on autocommit (handler holds no lock). Backoff 30s x 2^(n-1). One handler 'dummy' (ref='fail' raises). pytest: 2 passed against real PG16. Run: python worker.py init|run|enqueue dummy [fail]; DATABASE_URL=... python -m pytest. Postgres for tests: docker run --rm postgres:16 (db/user/pass all 'remember', 5432) or ../api compose once it lands. Deferred (out of m-7, for chief to place): no reaper for jobs stranded in 'running' by a killed worker (ponytail: ceiling in code).
<!-- SECTION:NOTES:END -->
