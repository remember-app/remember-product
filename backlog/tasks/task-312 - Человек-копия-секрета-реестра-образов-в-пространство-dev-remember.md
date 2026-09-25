---
id: TASK-312
title: 'Человек: копия секрета реестра образов в пространство dev-remember'
status: In Progress
assignee:
  - '@devops'
created_date: '2026-09-25 07:24'
updated_date: '2026-09-25 07:30'
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
- [ ] #1 В кластере есть пространство dev-remember (до создания проверено, что его не было) и в нём секрет реестра образов regcred — копия заведённого в default; значение секрета нигде не выведено
- [ ] #2 Если доступа к кластеру нет — сказано, где искал и чего именно не хватает, без обходных путей; записано созданное и как снести
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Отчёт devops со списком созданного и командами отката принят лидом
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Копия делается после того, как пространство существует (создаётся синком приложения или командой kubectl create namespace dev-remember). Точную команду и порядок даёт devops в карточке выкатки; секрет реестра к нам не приходит и в отчётах не значится.
<!-- SECTION:NOTES:END -->
