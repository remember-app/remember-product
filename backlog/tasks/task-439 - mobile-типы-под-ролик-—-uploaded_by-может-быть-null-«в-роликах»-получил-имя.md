---
id: TASK-439
title: 'mobile: типы под ролик — uploaded_by может быть null, «в роликах» получил имя'
status: To Do
assignee: []
created_date: '2026-09-27 12:30'
labels:
  - from-lead
dependencies: []
priority: low
type: bug
ordinal: 428000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
После TASK-436/435 сервер иногда отдаёт uploaded_by как null (скрытый чужой кадр в журнале сборки) и добавил name к каждому ролику в списке «в роликах» кадра. Мобильный тип журнала (src/api/journal.ts) этого ещё не отражает — на деле не падает (участник просто не находится в ростере), но тип пора обновить, и имя ролика показать там, где оно уже приходит.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 тип журнала сборки в приложении допускает uploaded_by: null
- [ ] #2 имя ролика из «в роликах» видно там, где приложение показывает список роликов кадра
<!-- AC:END -->
