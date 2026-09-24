---
id: TASK-237
title: 'mobile: ползунок длины ролика ходит по секунде'
status: In Progress
assignee: []
created_date: '2026-09-24 06:26'
updated_date: '2026-09-24 06:40'
labels:
  - from-human
dependencies: []
priority: high
type: bug
ordinal: 244000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Сейчас ползунок длины квантует шагом пять секунд: точное число шаблона сбивается при первом касании. Человек 2026-09-24: шаг должен быть одна секунда. Сервер любое целое уже принимает.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Ползунок выставляет любое целое число секунд
- [ ] #2 Число из шаблона не округляется при касании
<!-- AC:END -->
