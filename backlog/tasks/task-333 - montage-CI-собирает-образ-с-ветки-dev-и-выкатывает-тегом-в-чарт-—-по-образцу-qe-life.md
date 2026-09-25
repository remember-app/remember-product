---
id: TASK-333
title: >-
  montage: CI собирает образ с ветки dev и выкатывает тегом в чарт — по образцу
  qe-life
status: In Progress
assignee:
  - '@devops'
created_date: '2026-09-25 08:13'
updated_date: '2026-09-25 08:13'
labels:
  - from-chief
milestone: m-29
dependencies: []
priority: high
type: feat
ordinal: 330000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
То же для обработчика: сборка образа на пуш в dev и запись нового тега в его чарт в репозитории инфраструктуры. Сборочная часть уже есть, привязана к main — перепривязать к dev и добавить выкатку.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 В .gitlab-ci.yml обработчика: сборка и выкатка запускаются только на пуш в dev (к main ничего не привязано); образ в реестре проекта с тегом по SHA; джоба выкатки меняет в ioc-helm/nox/remember/montage/values-dev.yaml только image.repository и image.tag, коммитит и пушит в main репозитория инфраструктуры с повтором при гонке
- [ ] #2 Защита от порчи чужого: перед коммитом проверка, что изменён ровно один файл — ioc-helm/nox/remember/montage/values-dev.yaml — и ничего кроме образа; иначе падение без пуша
- [ ] #3 Нужные переменные CI названы по именам и доступны проекту (только чтение через glab); glab ci lint проходит; секретов в файле нет
- [ ] #4 docs/running.md обработчика описывает путь выкатки, откат и то, что первый запуск до слияния чарта в main упадёт на джобе выкатки — ожидаемо; в нём же — прежние сведения об образе не потеряны
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Коммит в ветке worktree сервиса, слияние в dev — за лидом
- [ ] #2 Ничего не запушено; временные файлы убраны
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Сервис: projects/montage (dev). Всё как в карточке для api (образец qe-life, ci-templates, форма джобы одна с api). Контракт с api: пожелания к трекам (api хранит, обработчик читает) выкатываются вместе — два независимых пайплайна не гарантируют порядка, окно рассогласования короткое, для пилота допустимо; записать в docs.
<!-- SECTION:NOTES:END -->
