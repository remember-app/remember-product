---
id: TASK-598
title: 'mobile: автотесты кнопок Analyze и propose to remove'
status: Done
assignee: []
created_date: '2026-10-28 19:16'
updated_date: '2026-10-28 19:39'
labels:
  - from-lead
milestone: m-43
dependencies:
  - TASK-595
priority: medium
type: feat
ordinal: 577000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Проверить автотестами кнопки m-43 в реальных сценариях: Analyze — все пять видов, вызов маршрута, опрос и его прекращение, «Дальше» во время прохода, ошибка; «Предложить удалить» — какие кадры отмечаются, пустой вердикт, баннеры, сброс при уходе. Прогон по dev, плюс сломанный код роняет проверку.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Автотесты зелёные на dev, как он стоит сейчас
- [x] #2 На каждый пункт есть проверка, падающая при откате
- [x] #3 Чужие красные прогоны не закрываются молча — названы ведущему
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 Проверки кнопок есть и краснеют при откате
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Работа идёт в projects/mobile; первым делом pwd и git rev-parse --show-toplevel, при несовпадении — стоп. В ворктри biome требует --vcs-use-ignore-file=false. Тот же порядок дважды; сломанный код краснеет. Ничего не деплоить, в удалённую ветку не пушить.
<!-- SECTION:NOTES:END -->
