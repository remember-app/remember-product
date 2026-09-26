---
id: DRAFT-33
title: 'infra: поды Remember стоят на узле с раннерами CI — привязать их к пулу dev'
status: Draft
assignee: []
created_date: '2026-09-26 14:58'
labels:
  - from-lead
milestone: m-29
dependencies: []
priority: medium
type: bug
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
После выкатки почти все наши поды оказались на узле пула gitlab, где живут раннеры CI компании. Наша нагрузка может мешать соседям. Нужно привязать поды сервера и обработчика к пулу dev. Правка в репозитории инфраструктуры компании — только по слову человека.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 У чартов dev-remember-api и dev-remember-montage задан выбор узла (nodeSelector/tolerations) под пул dev; после выкатки поды Remember не на узлах пула gitlab (проверено по Prometheus/кластеру)
- [ ] #2 Ничего чужого в кластере не изменено; откат описан
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Слияние в main репозитория инфраструктуры — по прямому слову человека
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Источник: итог TASK-343 (риск: 109 из 110 подов на узле пула gitlab). Пул dev и метки узлов уточнить в репозитории инфраструктуры и у qe-life как образца.
<!-- SECTION:NOTES:END -->
