---
id: TASK-275
title: 'mobile: баннеры отказов носят значок «нет связи», что бы ни случилось'
status: In Progress
assignee: []
created_date: '2026-09-24 11:53'
updated_date: '2026-10-04 04:38'
labels:
  - from-chief
dependencies: []
priority: medium
type: bug
ordinal: 272000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
У баннера в ките значок по умолчанию — перечёркнутый wifi, а экраны передают только текст. Поэтому «вас больше нет в воспоминании», «нет прав» и прочие отказы выглядят как обрыв связи. В журнале монтажа и листах лейблов уже поправлено, на остальных экранах — нет.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Значок баннера выбирается по причине отказа, а не по умолчанию
- [ ] #2 Перечёркнутый wifi остаётся только у настоящего обрыва связи
<!-- AC:END -->
