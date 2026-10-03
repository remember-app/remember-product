---
id: TASK-468
title: 'montage: шаги сборки и примерный процент, причина остановки'
status: To Do
assignee: []
created_date: '2026-10-01 08:34'
labels:
  - from-chief
milestone: m-33
dependencies:
  - TASK-467
  - TASK-466
priority: medium
type: feat
ordinal: 457000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Сборка рассказывает подшагами и приблизительным процентом; остановка этапа называет причину.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Журнал сборки: подшаги и примерный процент, без отслеживания каждой склейки ffmpeg
- [ ] #2 Упавший этап пишет понятную причину остановки словами (не текст исключения)
- [ ] #3 Автотесты зелёные
<!-- AC:END -->
