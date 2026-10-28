---
id: TASK-597
title: 'api: автотесты маршрута Analyze'
status: Done
assignee: []
created_date: '2026-10-28 19:16'
updated_date: '2026-10-28 19:39'
labels:
  - from-lead
milestone: m-43
dependencies:
  - TASK-594
priority: medium
type: feat
ordinal: 576000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Проверить автотестами маршрут запуска отсева: право организатора, одна задача в очереди, повторный вызов, уже идущая задача, не участник. Прогон по dev, плюс сломанный код роняет проверку.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Автотесты зелёные на dev, как он стоит сейчас
- [x] #2 На каждый пункт есть проверка, падающая при откате
- [x] #3 Чужие красные прогоны не закрываются молча — названы ведущему
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 Проверки маршрута есть и краснеют при откате
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Работа идёт в projects/api; первым делом pwd и git rev-parse --show-toplevel, при несовпадении — стоп. npm test требует MONTAGE_SCHEMA_SQL на projects/montage/schema.sql; lint в ворктри видит 0 файлов — биом с реальной проверкой. Тот же порядок дважды; сломанный код краснеет. Ничего не деплоить, в удалённую ветку не пушить.
<!-- SECTION:NOTES:END -->
