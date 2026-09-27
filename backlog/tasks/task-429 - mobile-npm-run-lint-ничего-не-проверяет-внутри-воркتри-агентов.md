---
id: TASK-429
title: 'mobile: npm run lint ничего не проверяет внутри воркتри агентов'
status: To Do
assignee: []
created_date: '2026-09-27 10:54'
labels:
  - from-lead
dependencies: []
priority: low
type: bug
ordinal: 418000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Шаблон !!**/.claude в biome.jsonc гасит все файлы внутри любого ворктри агента (.claude/worktrees/...), поэтому npm run lint там падает без единой проверенной строки. Найдено при работе над TASK-420 — агенту пришлось гонять biome на копии файлов во /tmp, чтобы вообще что-то проверить. Влияет на все задачи, которые ведутся в изолированных ворктри mobile, не только на эту.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 npm run lint в ворктри агента (внутри projects/mobile/.claude/worktrees/...) проверяет реальные файлы задачи, а не завершается пустым результатом
<!-- AC:END -->
