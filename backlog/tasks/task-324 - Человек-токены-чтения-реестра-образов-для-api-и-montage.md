---
id: TASK-324
title: 'Человек: токены чтения реестра образов для api и montage'
status: To Do
assignee:
  - '@human'
created_date: '2026-09-25 07:48'
labels:
  - from-chief
milestone: m-29
dependencies: []
priority: high
type: feat
ordinal: 321000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Образы лежат в закрытом реестре компании. Кластерного доступа нет, поэтому пропуск на скачивание образов чарт создаёт сам — из токена только на чтение. Токен человек создаёт сам в GitLab в браузере: по одному на проект api и montage.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 В GitLab у проектов remember/api и remember/montage созданы токены развёртывания (Deploy tokens) с единственным правом read_registry — по одному на проект; каждый открывает только скачивание образов своего проекта и ничего больше (ни кода, ни записи)
- [ ] #2 Имена и значения токенов человек записал в ~/.remember-secrets.env (права 600) строками REGISTRY_API_USER, REGISTRY_API_TOKEN, REGISTRY_MONTAGE_USER, REGISTRY_MONTAGE_TOKEN; в чат, карточки и отчёты они не идут
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Человек подтвердил лиду, что токены заведены и записаны
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Где: GitLab → проект remember/api → Settings → Repository → Deploy tokens → Create deploy token: имя remember-cluster-pull, срок — без срока (или год), галочка только read_registry → значения имя пользователя и токен показываются один раз. То же в проекте remember/montage. Роль Maintainer у человека на обоих проектах есть (по разбору TASK-298). Реестр: git.dapp-devs.com:5050.
<!-- SECTION:NOTES:END -->
