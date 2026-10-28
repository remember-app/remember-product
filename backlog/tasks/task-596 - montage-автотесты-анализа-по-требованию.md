---
id: TASK-596
title: 'montage: автотесты анализа по требованию'
status: Done
assignee: []
created_date: '2026-10-28 19:16'
updated_date: '2026-10-28 20:14'
labels:
  - from-lead
milestone: m-43
dependencies:
  - TASK-593
priority: medium
type: feat
ordinal: 575000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Проверить автотестами, что анализ по требованию работает в реальных сценариях: загрузка не зовёт анализ, задача анализа идемпотентна и считает серии один раз, заказ без Analyze добирает отсев/речь/описание, повторный заказ не зовёт модель, догоны не запускают анализ. Прогон по dev, плюс сломанный код роняет проверку.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Автотесты зелёные на dev, как он стоит сейчас
- [x] #2 На каждый пункт есть проверка, падающая при откате
- [x] #3 Чужие красные прогоны не закрываются молча — названы ведущему
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 Проверки анализа есть и краснеют при откате
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Работа идёт в projects/montage; первым делом pwd и git rev-parse --show-toplevel, при несовпадении — стоп. Полный набор — make test-montage из корня (R2_* даёт Makefile). Тот же порядок дважды даёт тот же результат; сломанный код делает проверку красной. Ничего не деплоить, в удалённую ветку не пушить.
<!-- SECTION:NOTES:END -->
