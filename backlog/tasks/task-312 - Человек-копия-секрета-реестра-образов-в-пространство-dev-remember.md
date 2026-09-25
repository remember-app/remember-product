---
id: TASK-312
title: 'Человек: копия секрета реестра образов в пространство dev-remember'
status: To Do
assignee:
  - '@human'
created_date: '2026-09-25 07:24'
labels:
  - from-chief
milestone: m-29
dependencies: []
priority: high
type: feat
ordinal: 309000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Образы Remember лежат в закрытом реестре компании, а секрет для скачивания заведён только в пространстве default. Для пространства dev-remember его копирует человек своим доступом к кластеру.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 В пространстве dev-remember есть секрет реестра regcred — копия заведённого в default; поды подхватывают образы без ошибки скачивания
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Человек подтвердил лиду, что секрет скопирован
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Копия делается после того, как пространство существует (создаётся синком приложения или командой kubectl create namespace dev-remember). Точную команду и порядок даёт devops в карточке выкатки; секрет реестра к нам не приходит и в отчётах не значится.
<!-- SECTION:NOTES:END -->
