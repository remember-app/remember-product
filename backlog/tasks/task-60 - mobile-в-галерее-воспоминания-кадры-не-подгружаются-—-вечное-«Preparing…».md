---
id: TASK-60
title: 'mobile: в галерее воспоминания кадры не подгружаются — вечное «Preparing…»'
status: Done
assignee: []
created_date: '2026-09-07 06:27'
updated_date: '2026-09-07 06:55'
labels:
  - from-human
milestone: m-11
dependencies: []
priority: high
type: bug
ordinal: 64000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Со слов человека: «не подгружаются картинки после загрузки». На экране галереи воспоминания все плитки стоят в состоянии «Preparing…» с оранжевой точкой и картинку так и не показывают.
<!-- SECTION:DESCRIPTION:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Причина клиентская, сервер не трогали: галерея читала список один раз при монтировании (useEffect(load,[load])), а processing → ready происходит на стороне воркера. Правка — чтение на фокусе (useFocusEffect) плюс тихое перечитывание раз в три секунды, пока в списке есть processing, и только пока экран впереди. Коммит 42e4c87 (ветка worktree-agent-ac5b0410a997920c8), там же src/frames.ts и src/frames.test.ts — переход processing → ready прогнан двумя ответами listMedia. Плитка при этом ещё и не проявлялась: см. TASK-61, коммит 6a2c346.
<!-- SECTION:NOTES:END -->
