---
id: TASK-572
title: 'mobile: две подписи про музыку говорят «пять», а на полке десять'
status: To Do
assignee: []
created_date: '2026-10-28 14:18'
labels:
  - from-lead
dependencies: []
priority: low
type: bug
ordinal: 551000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Ревью m-39 (TASK-569) нашло в приложении две подписи, оставшиеся от полки из пяти треков. Код с тех пор верный — десять, — а комментарии читаются как правило и вводят в заблуждение того, кто будет рядом работать.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Подписи в src/lib/music.ts (около 74-й строки) и src/api/music.ts (около 49-й) говорят о десяти треках и не обещают того, чего нет
- [ ] #2 Ничего, кроме этих подписей, не меняется; набор mobile зелёный
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Точные места: mobile/src/lib/music.ts:74 — «which of the five is sounding»; mobile/src/api/music.ts:49-51 — «one of the five off the shelf», «the same five for everyone». Приложение знает десять (MusicTrackId). Найдено ревью TASK-569, вне обеих вех оставлено нарочно.
<!-- SECTION:NOTES:END -->
