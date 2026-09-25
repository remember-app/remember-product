---
id: TASK-331
title: >-
  infra: чарты Remember живут в пространстве default с готовым секретом реестра
  — как у соседей
status: To Do
assignee:
  - '@devops'
created_date: '2026-09-25 08:07'
labels:
  - from-chief
milestone: m-29
dependencies: []
priority: high
type: feat
ordinal: 328000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Разбор показал: рабочие соседи живут в пространстве default, где секрет реестра уже заведён один раз руками (в dev он не работал — это записано в коммите dd92e1f5). Изоляция dev-remember была нашей выдумкой. Разворачиваемся туда же, куда все: токены и любые шаги с кластером отпадают.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Оба приложения ArgoCD (dev-remember-api, dev-remember-montage) описаны как у соседей: проект default (встроенный, без ручного применения AppProject), назначение — пространство default, без CreateNamespace; имена ресурсов в кластере остаются dev-remember-api и dev-remember-montage
- [ ] #2 Из чартов убраны шаблоны секрета реестра и блок registry (добавленные в TASK-325); поды и все разовые задачи подключают существующий секрет regcred так же, как у соседей (imagePullSecrets: regcred); значения секретов по-прежнему пустые в закоммиченном виде
- [ ] #3 Проверено по открытому Prometheus (метрики kube-state) и по репозиторию, что имена dev-remember-api и dev-remember-montage и наш хост в пространстве default не заняты и не пересекаются ни с чьими ресурсами; итог записан
- [ ] #4 README чарта переписан: шагов для человека не остаётся, кроме значений и слияния; helm lint и helm template с подставленными через командную строку значениями проходят, рендер просмотрен (никаких Namespace, secret regcred в шаблонах не создаётся, root/privileged нет)
- [ ] #5 Названо прямо, что проверить нельзя без кластера (годится ли regcred из default для пути образов nox-labs/nox/remember/..., по косвенным данным да — соседи из nox-labs/nox тянут им образы), и что видно по Prometheus, если он не подойдёт (причина ожидания контейнера ImagePullBackOff)
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Коммит на локальной ветке remember-charts репозитория инфраструктуры; не запушено, не слито
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Основание: argocd-apps/apps/dev/dev-sms-frontend.yaml (project sms, destination namespace default), ioc-helm/deppa/README.md («в default должен лежать regcred»), коммит dd92e1f5 (второй комплект в namespace dev не работал: нет учётных данных реестра), values соседей imagePullSecrets: regcred. Проект dev в ArgoCD пускает только dev и dev-*, поэтому для default берём проект default; свой AppProject применить нельзя — нужен kubectl, которого у людей нет. Токены чтения реестра (TASK-324) отпадают. Хост dev-api-remember.noxlabs.xyz и остальное — без изменений. Ветка remember-charts, worktree /Users/kubik/Nox/infra/nox-infra-dev/.claude/worktrees/remember-charts.
<!-- SECTION:NOTES:END -->
