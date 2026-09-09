---
id: TASK-95
title: 'mobile: два быстрых нажатия по «Make a montage» гасят лист'
status: Done
assignee: []
created_date: '2026-09-07 14:59'
updated_date: '2026-09-09 06:58'
labels:
  - from-lead
milestone: m-17
dependencies: []
priority: medium
type: bug
ordinal: 99000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Замечено при проверке TASK-69, не чинилось: первое нажатие поднимает лист заказа, второе попадает в затемнение и закрывает его. Со стороны неотличимо от мёртвой кнопки — именно так это и выглядело в отчёте дизайнера.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Два быстрых нажатия подряд по «Make a montage» не закрывают лист заказа — второе не попадает в затемнение позади него
<!-- AC:END -->
