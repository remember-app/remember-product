---
id: DRAFT-7
title: 'montage: проверить, что превью боком снятой фотографии не лежит на боку'
status: Draft
assignee: []
created_date: '2026-09-21 14:48'
labels:
  - from-lead
milestone: m-24
dependencies: []
priority: low
type: bug
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Кодер TASK-215 предположил, что превью и крупная копия боком снятого фото делаются без учёта EXIF-поворота (ffmpeg 7.1 в образе). Не проверено. Проверить по коду и тестом на повёрнутой фикстуре; если подтвердится — разворачивать при сборке превью.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Проверено тестом на повёрнутой фотографии: превью стоит так, как фото видит человек; если нет — исправлено
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Ничего лишнего не оставлено
<!-- DOD:END -->
