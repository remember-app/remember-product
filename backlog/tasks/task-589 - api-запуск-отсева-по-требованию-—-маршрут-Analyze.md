---
id: TASK-589
title: 'api: запуск отсева по требованию — маршрут Analyze'
status: Done
assignee: []
created_date: '2026-10-28 18:25'
updated_date: '2026-10-28 18:33'
labels:
  - from-lead
milestone: m-43
dependencies: []
priority: high
type: feat
ordinal: 568000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Для m-43 приложению нужен один вызов, который ставит в очередь отсев кадров воспоминания по нажатию Analyze. Правило доступа — то же, что у заказа ролика: только организатор. Повторное нажатие не должно плодить задачи.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 POST анализа доступен организатору по тому же правилу, что заказ ролика; остальным 403
- [x] #2 Маршрут ставит задачу отсева на воспоминание, если такая ещё не в очереди и не в работе; повторный вызов не плодит задачи
- [x] #3 Контракт описан в docs; есть проверки, краснеющие при откате
- [x] #4 tsc, lint и набор api зелёные
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 Маршрут Analyze работает по праву организатора и ставит одну задачу
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Работа идёт в projects/api; первым делом pwd и git rev-parse --show-toplevel, при несовпадении — стоп. Опоры: src/memories/* или src/media/* — как устроены маршруты и ответы; право организатора — src/montages/montages.ts (role !== 'organizer' → 403). Задача в общую таблицу jobs ставится напрямую (образец: src/media/upload.ts, insert into jobs (type, ref) values ('media_preview', ...)). Тип задачи — 'media_analysis', ref — id воспоминания; условие «не ставить вторую» — как у preview follow-up (нет jobs в queued/running с этим type и ref). Ответ — сколько поставлено/уже идёт; контракт — docs/media.md. Сервер анализа живёт в montage; api только ставит задачу. Ничего не деплоить, в удалённую ветку не пушить; коммит в свою ветку ворктри и отчёт.
<!-- SECTION:NOTES:END -->
