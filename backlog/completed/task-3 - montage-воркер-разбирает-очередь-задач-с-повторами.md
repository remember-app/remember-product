---
id: TASK-3
title: 'montage: воркер разбирает очередь задач с повторами'
status: Done
assignee:
  - '@specialist'
created_date: '2026-09-03 10:15'
updated_date: '2026-09-03 10:17'
labels:
  - from-chief
milestone: m-0
dependencies: []
priority: high
type: feat
ordinal: 3000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Скелет фонового обработчика: отдельный процесс без входящей сети, который владеет общей таблицей задач, берёт задачи по одной, считает попытки, откладывает упавшие и после трёх неудач помечает задачу проваленной.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Процесс создаёт таблицу задач своей командой; повторный запуск ничего не ломает
- [x] #2 Задачи забираются по одной так, что два воркера не возьмут одну и ту же
- [x] #3 Упавшая задача откладывается с растущей паузой и после третьей попытки уходит в провал
- [x] #4 Есть одна тестовая задача-пустышка и живой тест полного цикла провала
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 Реальных обработчиков медиа нет — только очередь и пустышка
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Python + psycopg. Захват задачи одним UPDATE с SELECT ... FOR UPDATE SKIP LOCKED. Пауза 30 секунд с удвоением, максимум 3 попытки. Команды: init, enqueue, run. Известный предел помечен в коде: воркер, убитый в середине задачи, оставляет строку в running навсегда — сборщика таких строк нет.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Сдано в projects/montage коммитом 26c4a11 (2026-09-02). Восстановлено на доске задним числом 2026-09-03 из истории git.
<!-- SECTION:FINAL_SUMMARY:END -->
