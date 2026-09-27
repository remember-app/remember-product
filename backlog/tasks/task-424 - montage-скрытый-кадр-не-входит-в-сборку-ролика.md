---
id: TASK-424
title: 'montage: скрытый кадр не входит в сборку ролика'
status: In Progress
assignee:
  - '@specialist'
created_date: '2026-09-27 10:36'
updated_date: '2026-09-27 11:08'
labels:
  - from-chief
milestone: m-30
dependencies:
  - TASK-422
priority: high
type: feat
ordinal: 413000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Кадр, который хозяин скрыл из ленты, не должен попасть в сам ролик — обработчик собирает ролик из тех же таблиц напрямую и про новый флаг пока не знает.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 запрос, которым обработчик набирает кадры для сборки ролика (montage/video/montage.py), не берёт кадры, отмеченные скрытыми
- [ ] #2 скрытый кадр не входит в ролик, даже если организатор явно отметил его «включить» при заказе — скрытие сильнее
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Коммит в ветке worktree сервиса montage, слияние в dev — за лидом
- [ ] #2 Автотесты montage зелёные
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Репозиторий montage (worktree). Зависит от TASK-422 (api) — точное имя столбца/флага в media_items появится в её миграции; дождись коммита TASK-422 в dev, прежде чем писать запрос. Основное место — SELECT в montage/video/montage.py (~строка 111); проверь, нет ли того же набора кадров в другом месте пайплайна (sweeps.py, understanding.py на скрытые кадры можно не тратить анализ, но это не обязательное условие приёмки — только сборка ролика).
<!-- SECTION:NOTES:END -->
