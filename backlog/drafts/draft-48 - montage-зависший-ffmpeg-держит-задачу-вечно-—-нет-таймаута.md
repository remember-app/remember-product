---
id: DRAFT-48
title: 'montage: зависший ffmpeg держит задачу вечно — нет таймаута'
status: Draft
assignee: []
created_date: '2026-11-01 09:49'
labels:
  - from-chief
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
У запуска ffmpeg и у кодирования нет таймаута. Зависший декодер держит задачу бесконечно, heartbeat продолжает обновляться, очередь её не заберёт, воркер стоит. Живой зависший воркер неотличим от долгой работы.
<!-- SECTION:DESCRIPTION:END -->
