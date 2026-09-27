---
id: TASK-446
title: 'montage: кадры, съеденные отсевом дублей, пропадают из журнала'
status: To Do
assignee: []
created_date: '2026-09-27 13:05'
updated_date: '2026-09-27 13:47'
labels:
  - from-chief
dependencies: []
priority: medium
type: bug
ordinal: 435000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Отсев серий убирает похожие кадры до показа модели. В живом прогоне две фотографии исчезли из журнала совсем: их описания оплачены, а человеку про них не сказано ничего.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Про каждый кадр, убранный как дубль, в журнале есть запись
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Поглощена TASK-447: видимость схлопнутых дублей стала условием усиленного отсева.
<!-- SECTION:FINAL_SUMMARY:END -->
