---
id: TASK-04
title: >-
  root: bump submodule pointers, top-level bring-up README, verify the three
  connect
status: Done
assignee: []
created_date: '2026-09-02 07:20'
updated_date: '2026-09-02 09:13'
labels:
  - from-chief
milestone: m-7
dependencies: []
ordinal: 4000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Integration in the product root repo after api/mobile/montage skeletons land: update the three submodule pointers to the accepted commits, write a top-level README that walks a clean machine through bringing up Postgres + api + montage + mobile and seeing them connected, and actually run that bring-up once to confirm the app screen shows the API health response and the worker drains its dummy job.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 projects/api, projects/mobile, projects/montage submodule pointers updated to the accepted commits; git submodule status clean
- [x] #2 Top-level README (or docs/) walks a clean checkout through: recursive clone -> start Postgres -> migrate -> run api -> run montage -> run mobile, and states the expected connected result
- [x] #3 Bring-up performed once and confirmed: mobile screen shows the API /health response; montage drains a dummy job and retries it to failed
- [x] #4 Root repo commit made; no CI, no deploy config added
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 Report back the exact run commands for api, mobile and montage, how local Postgres comes up, and which migration tool api uses
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
ACCEPTED by lead. Root commit 5521de0 on main, exactly 4 paths (projects/api, projects/mobile, projects/montage, README.md). git submodule status clean, .gitmodules untouched, in-flight plane edits (CLAUDE.md/architecture.md/backlog) left unstaged. Verified end-to-end from a WIPED volume: api migrate 'applied: 1 init' + /health 200 {"status":"ok"}; montage job1 done / job2 -> failed after 3 attempts (confirmed from table); mobile on real iPhone 17 simulator shows 'API: ok', corroborated by api req log. Migration tool: postgrator. Local PG: cd projects/api && docker compose up -d --wait (canonical, shared by api+montage).
<!-- SECTION:NOTES:END -->
