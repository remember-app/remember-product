---
id: TASK-557
title: 'api: хук afterAll в migrations.test.ts падает под нагрузкой — срок в 10 секунд'
status: Done
assignee: []
created_date: '2026-10-28 13:29'
updated_date: '2026-10-28 13:46'
labels:
  - from-lead
dependencies: []
priority: low
type: bug
ordinal: 536000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Найдено при разборе изоляции api-прогонов (TASK-552). Хук afterAll в src/migrations.test.ts ждёт 10 секунд, и под чужой нагрузкой на машине срывается: база и десяток миграций не укладываются. Краснеет не от общей базы — при --maxWorkers=2 проходит. В самом файле уже есть const slow = 30_000 ровно для такого случая, у этого хука его нет. Похожая проверка с таймаутом 5 секунд в src/montages/journal.golden.test.ts мигает так же.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Хук afterAll в migrations.test.ts держит срок того же порядка, что и остальные медленные проверки в файле, и не срывается под нагрузкой
- [ ] #2 Проверка ломается, когда срок снова урезают
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Где: projects/api/src/migrations.test.ts, afterAll. Правка — одна строка: взять существующий const slow (30_000) вместо 10 000. Заодно посмотреть src/montages/journal.golden.test.ts на ту же болезнь. Найдено исполнителем TASK-552, к самой изоляции отношения не имеет.
<!-- SECTION:NOTES:END -->
