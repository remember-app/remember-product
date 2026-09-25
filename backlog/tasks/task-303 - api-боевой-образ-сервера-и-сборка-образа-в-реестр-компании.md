---
id: TASK-303
title: 'api: боевой образ сервера и сборка образа в реестр компании'
status: In Progress
assignee:
  - '@devops'
created_date: '2026-09-25 07:17'
updated_date: '2026-09-25 07:18'
labels:
  - from-chief
milestone: m-29
dependencies: []
priority: high
type: feat
ordinal: 300000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
У сервера нет боевого образа. Нужен образ, который собирается в реестр компании из репозитория и запускает сервер и миграции; без секретов внутри.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 В репозитории api есть боевой Dockerfile (и .dockerignore): образ собирается, запускает сервер на порту 3000 (GET /health отвечает) и умеет запустить миграции той же командой, что и локально; под непривилегированным пользователем; без dev-зависимостей, без .env, без секретов и без тестовых данных внутри
- [ ] #2 Образ собран и запущен локально против временной базы и временного хранилища (не стенд человека): /health отвечает, миграции накатываются на пустую базу, сервер падает громко, если базы нет
- [ ] #3 В репозитории лежит сборочная часть CI (.gitlab-ci.yml) по образцу qe-life: сборка на пуш в main, образ в реестр проекта с тегом по SHA коммита. Джоба выкатки, которая пишет в репозиторий инфраструктуры, НЕ добавлена — это отдельное решение человека
- [ ] #4 Команды запуска сервера и миграций в образе записаны в docs/running.md — по ним пишутся чарты
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Коммит в ветке worktree сервиса, слияние в main — за лидом
- [ ] #2 Автотесты сервиса зелёные; временные контейнеры и образы убраны
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Сервис: projects/api. Node >=22.18 выполняет TypeScript напрямую (npm start = node src/server.ts, шага сборки нет; npm run migrate = scripts/migrate.ts, зависимости postgrator/postgres/fastify/jose/aws4fetch — все в dependencies, dev-зависимостей на боевом образе быть не должно). Миграции api не требуют таблицу jobs (её создаёт montage: python -m montage init); scripts/migrate.ts применяет ../montage/schema.sql только если файл есть, в образе его нет — это ожидаемо. Образец CI: /Users/kubik/Nox/projects/qe-life/.gitlab-ci.yml и шаблоны GitLab-проекта nox-labs/internal/devops/ci-templates (jobs/docker.yml). Реестр: git.dapp-devs.com:5050/nox-labs/nox/remember/api. Параллельно в api другие кодеры правят src/media/r2.ts, src/auth/mail.ts и docs — Dockerfile и CI-файл конфликтовать не должны; docs/running.md правь точечно. Стенд человека на маке (база remember, MinIO, порты, процессы) не трогать.
<!-- SECTION:NOTES:END -->
