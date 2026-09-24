---
id: DRAFT-3
title: >-
  api: принятое приглашение отдаёт воспоминание без карточки, а README обещает
  карточку
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
POST /invites/accept возвращает голую строку воспоминания с ролью — без кадров на карточку, числа людей, числа скинувших и обложки; README обещает то же тело, что у создания воспоминания. Найдено кодером TASK-199 при работе над обложкой; чинится одной строкой через уже существующую cards().
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Принятое приглашение отдаёт то же тело воспоминания, что создание и список; тест закрепляет
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Ничего лишнего не оставлено
<!-- DOD:END -->
