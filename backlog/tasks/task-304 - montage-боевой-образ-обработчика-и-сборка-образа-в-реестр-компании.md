---
id: TASK-304
title: 'montage: боевой образ обработчика и сборка образа в реестр компании'
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
ordinal: 301000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
У обработчика есть только тестовый образ. Нужен боевой: Python, ffmpeg, обработка HEIC и ритма музыки; без секретов внутри.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 В репозитории montage есть боевой Dockerfile (и .dockerignore): образ собирается; python -m montage run запускает цикл, python -m montage init создаёт таблицы, python -m montage tracks выкладывает музыку; под непривилегированным пользователем; в нём ffmpeg, ffprobe и всё, что нужно для HEIC и разбора ритма; без тестов, .env и секретов
- [ ] #2 Образ собран и запущен локально против временной базы и временного хранилища (не стенд человека): init создаёт таблицы, воркер стартует и берёт фиктивную задачу; известно, сколько памяти и места на диске он занимает в покое и на сборке одного короткого ролика — цифры записаны для чарта
- [ ] #3 Тестовый Dockerfile остаётся рабочим (test-in-docker.sh), боевой от него отделён и не тянет тестовых зависимостей
- [ ] #4 В репозитории лежит сборочная часть CI (.gitlab-ci.yml) по образцу qe-life: сборка на пуш в main, образ в реестр проекта с тегом по SHA. Джоба выкатки, пишущая в репозиторий инфраструктуры, НЕ добавлена — отдельное решение человека
- [ ] #5 docs/running.md описывает команды образа и его окружение (без значений)
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Коммит в ветке worktree сервиса, слияние в main — за лидом
- [ ] #2 Автотесты обработчика зелёные, в своей тестовой базе; временные контейнеры и образы убраны
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Сервис: projects/montage. Сегодня Dockerfile — только среда для тестов (python:3.12-slim + ffmpeg, код монтируется томом). requirements.txt: psycopg, boto3, numpy, librosa (тянет scipy/numba — тяжёлая сборка), pillow, pi-heif, pytest и ruff (последние два — не для боевого образа). Окружение воркера — только переменные среды (своего .env он не читает): DATABASE_URL, R2_*, AI_PROVIDER=gemini + GEMINI_API_KEY, API_URL, INTERNAL_WORKER_TOKEN. Известное ограничение кластера: на узлах пула dev свободно ~1.4 ГиБ памяти под поды, поэтому цифры потребления важны. Параллельно другой кодер правит montage/storage.py, sweeps.py и docs/running.md для Google-хранилища — файлы образа с ним не пересекаются, docs правь точечно. Стенд человека на маке (база remember, MinIO, порты, воркер) не трогать.
<!-- SECTION:NOTES:END -->
