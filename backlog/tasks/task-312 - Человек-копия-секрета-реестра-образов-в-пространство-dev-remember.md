---
id: TASK-312
title: 'Человек: копия секрета реестра образов в пространство dev-remember'
status: To Do
assignee:
  - '@human'
created_date: '2026-09-25 07:24'
updated_date: '2026-09-25 07:36'
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
СТОП 2026-09-25 (отчёт devops): доступа к кластеру нет — на маке нет kubeconfig (kubectl без контекстов), gcloud не установлен, сессия argocd просрочена. Три пути: (A) человек ставит gcloud и gke-gcloud-auth-plugin и делает gcloud auth login + gcloud container clusters get-credentials lumos-cluster (зона и проект — у владельца GCP) — тогда devops повторяет карточку; (B) человек или коллега выполняет три команды: kubectl create namespace dev-remember; kubectl get secret regcred -n default -o json | jq '{apiVersion, kind, type, data, metadata: {name: .metadata.name}}' | kubectl apply -n dev-remember -f - ; проверка kubectl get secret regcred -n dev-remember; откат kubectl delete namespace dev-remember; (C) секрет реестра создаёт сам чарт из токена чтения реестра (deploy token в GitLab-проектах api и montage) — тогда доступа к кластеру не нужно вовсе, но токен лёг бы открытым текстом в значения dev (как остальные секреты); требует слова человека на создание токена.
<!-- SECTION:NOTES:END -->
