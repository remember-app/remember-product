---
id: TASK-360
title: >-
  api: CI — адрес репозитория инфраструктуры тоже в скрипте выкатки, как в
  обработчике
status: Done
assignee:
  - '@devops'
created_date: '2026-09-25 10:11'
updated_date: '2026-09-25 10:13'
labels:
  - from-lead
milestone: m-29
dependencies: []
priority: medium
type: bug
ordinal: 352000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Ревью обработчика показало: одноимённая переменная CI (проекта, группы, всего GitLab) старше значений в блоке variables джобы; в сервере путь к чарту уже перенесён в скрипт, а адрес репозитория инфраструктуры остался в variables — при подмене запись с общим ключом ушла бы в чужой репозиторий.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 В .gitlab-ci.yml сервера INFRA_REPO (адрес репозитория инфраструктуры) задан внутри скрипта джобы выкатки, а не в variables; поведение джобы и все проверки без изменений; glab ci lint проходит; форма совпадает с обработчиком (dev montage, коммит 7abcf49)
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Коммит в ветке worktree сервиса, слияние в dev — за лидом
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Сервис: projects/api (dev), .gitlab-ci.yml. Образец — projects/montage .gitlab-ci.yml в dev (7abcf49). Ничего не запускать в GitLab, не пушить. Найдено ревью TASK-356.
<!-- SECTION:NOTES:END -->
