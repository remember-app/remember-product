---
id: TASK-563
title: 'montage: docs — полка теперь десять треков, не пять'
status: Done
assignee: []
created_date: '2026-10-28 13:47'
updated_date: '2026-10-28 13:50'
labels:
  - from-lead
milestone: m-39
dependencies: []
priority: medium
type: bug
ordinal: 542000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
После TASK-548 полка треков воркера — десять, но docs/jobs/montage.md в разделе про музыку (около строк 220–238) всё ещё говорит «пять треков полки», перечисляет пять id и считает «сколько из пяти ушло». Привести в соответствие с library.TRACKS и tracks/README.md.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 docs/jobs/montage.md больше не говорит «пять треков»; перечень id и счёт по полке — про десять
- [ ] #2 Ничего другого в доке не переписано
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Дока совпадает с library.TRACKS и tracks/README.md
<!-- DOD:END -->
