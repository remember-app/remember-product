---
id: TASK-361
title: >-
  infra: чарты под драйвер Google, дверь рецензента, остановку по сигналу и
  Apple-настройки
status: In Progress
assignee:
  - '@devops'
created_date: '2026-09-25 10:12'
updated_date: '2026-09-25 10:12'
labels:
  - from-chief
milestone: m-29
dependencies: []
priority: high
type: feat
ordinal: 353000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Чарты в ветке remember-charts написаны под S3-ключи. Код теперь работает с Google по JSON-ключу, добавилась дверь рецензента Apple, подбор задач и остановка по сигналу. Чарты должны это отразить, без значений секретов.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Оба чарта: STORAGE_DRIVER=google, GOOGLE_STORAGE_BUCKET=cdn.dapp-devs.com (открытая настройка), GOOGLE_STORAGE_PREFIX=remember/dev-media (одинаковый в обоих), GOOGLE_STORAGE_CREDENTIALS в secretEnv (пустой в закоммиченном виде); переменные R2_* убраны из чартов; в сервере — REVIEW_LOGIN в secretEnv (пусто, значения подставит выкатка); APPLE_CLIENT_ID и GOOGLE_CLIENT_ID не заданы (входа через них на пилоте нет)
- [ ] #2 Обработчик: команда запуска в exec-форме (без sh -c), terminationGracePeriodSeconds не меньше 30, запуск не от root (образ работает при любом uid, HOME=/tmp), init-контейнер init создаёт таблицы и индекс перед стартом; запрос памяти 1 ГиБ и лимит 2 ГиБ оставить до результатов TASK-327, после них — обновить по цифрам; сервер: проба на /health, порт 3000, /privacy и /auth/methods доступны через Ingress без входа
- [ ] #3 helm lint и helm template с подставленными через командную строку значениями проходят; рендер просмотрен (нет root/privileged, нет Namespace, regcred подключён); README чартов описывает новые настройки без значений и порядок подстановки; записано, какие значения кто подставляет (из ~/.remember-secrets.gcs.json — ключ хранилища одной строкой JSON; из значений qe-life — почта; из projects/montage/.env — ключ Gemini; общий секрет и настройка рецензента — случайные)
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Коммит на локальной ветке remember-charts репозитория инфраструктуры; не запушено, не слито
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Решение decision-16: хранилище временно — общий бакет cdn.dapp-devs.com, префиксы remember/dev-media и remember/dev-check; НО бакет публично перечисляем — вопрос к человеку открыт (листинг или отдельное хранилище); если выберут R2, вернёт R2_* и STORAGE_DRIVER=s3 — правка мелкая. Ветка remember-charts, worktree /Users/kubik/Nox/infra/nox-infra-dev/.claude/worktrees/remember-charts (последний коммит a1fafb0c). Имена настроек — в docs/running.md api и montage в dev. Секреты не читать и не писать; ключ Google в файле не открывать.
<!-- SECTION:NOTES:END -->
