---
id: TASK-325
title: >-
  infra: секрет реестра создаёт сам чарт, пространство заводит ArgoCD
  (кластерный доступ не нужен)
status: Done
assignee:
  - '@devops'
created_date: '2026-09-25 07:48'
updated_date: '2026-09-25 07:58'
labels:
  - from-chief
milestone: m-29
dependencies: []
priority: high
type: feat
ordinal: 322000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Кластерного доступа у людей нет и не будет. Поэтому чарты api и обработчика сами создают секрет для скачивания образов из токена чтения, а пространство dev-remember заводит ArgoCD при синке. Ни одного шага с kubectl не остаётся.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 В чартах на ветке remember-charts есть шаблон секрета реестра (тип dockerconfigjson) из блока значений с адресом реестра, именем и токеном — значения ПУСТЫЕ в закоммиченном виде; поды сервера, обработчика и все их разовые задачи (миграции, инициализация, выкладка музыки) подключают его как imagePullSecrets; рендер helm template проходит, секрета реестра из default чарт не требует
- [ ] #2 Пространство dev-remember заводит синк (CreateNamespace в приложениях ArgoCD проверено); в README чарта убраны шаги kubectl про пространство и копию секрета; порядок выкатки переписан без единого шага, требующего доступа к кластеру; если такой шаг всё же остался — назван прямо с объяснением, почему его нельзя убрать
- [ ] #3 Названо, как без кластерного доступа наблюдать выкатку: публичный /health сервера, состояние подов и перезапуски через открытый Prometheus (метрики kube-state), логи в Loki — что для входа туда нужно человеку
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Коммит на локальной ветке remember-charts репозитория инфраструктуры; не запушено, не слито
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Решение человека 2026-09-25 (слово chief): доступа к кластеру нет и не будет. Токены чтения — по одному на проект (api, montage), значения в ~/.remember-secrets.env (REGISTRY_API_USER/TOKEN, REGISTRY_MONTAGE_USER/TOKEN) появятся позже отдельной карточкой; твоя работа — только шаблоны и пустые значения. Реестр git.dapp-devs.com:5050, образы .../nox-labs/nox/remember/{api,montage}. Продолжай в своей ветке remember-charts и в своём worktree; чужие чарты не менять. Секреты не читать и не писать.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Коммит e33abb9f на локальной ветке remember-charts (поверх 468101e8), не запушено, main репозитория инфраструктуры не тронут. Секрет реестра рендерит сам чарт из блока registry (у каждого чарта свой, права read_registry своего проекта); поля пусты в закоммиченном виде, рендер с пустыми падает понятной ошибкой намеренно; пространство заводит CreateNamespace=true; шагов kubectl в выкатке нет. В README — как наблюдать выкатку без доступа к кластеру (публичный /health, Prometheus с готовыми запросами, Loki в Grafana через Authentik).
<!-- SECTION:FINAL_SUMMARY:END -->
