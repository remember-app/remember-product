---
id: TASK-1
title: 'api: сервис отвечает на /health и ходит в Postgres'
status: Done
assignee:
  - '@specialist'
created_date: '2026-09-03 10:14'
updated_date: '2026-09-03 10:18'
labels:
  - from-chief
milestone: m-0
dependencies: []
priority: high
type: feat
ordinal: 1000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Скелет бэкенда: сервис поднимается локально одной командой, отвечает на проверку живости, подключается к базе из переменной окружения и умеет накатывать миграции. Продуктовых таблиц ещё нет.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Документированная команда поднимает сервер; GET /health отдаёт 200 {"status":"ok"} без авторизации
- [x] #2 docker compose поднимает локальный Postgres 16; сервер подключается через DATABASE_URL
- [x] #3 Миграции накатываются на пустую базу с нуля и не создают ни одной продуктовой таблицы
- [x] #4 npm test проходит; линтер и форматтер настроены и проходят чисто
- [x] #5 README описывает: поднять Postgres, задать переменные, накатить миграции, запустить сервер и тесты
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 Никаких продуктовых сущностей — ни пользователей, ни воспоминаний, ни таблицы задач
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
TypeScript + Fastify 5, драйвер postgres.js, миграции postgrator, тесты Vitest, линтер и форматтер Biome. Миграция 001 включает только расширение citext.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Сдано в projects/api коммитом ab4c6ce (2026-09-02). Восстановлено на доске задним числом 2026-09-03 из истории git.
<!-- SECTION:FINAL_SUMMARY:END -->
