---
id: TASK-166
title: 'api: сводка «N из M» — единое правило, зрители не считаются'
status: To Do
assignee: []
created_date: '2026-09-18 15:47'
updated_date: '2026-09-18 15:48'
labels:
  - from-chief
milestone: m-21
dependencies: []
priority: medium
type: feat
ordinal: 173000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Главный экран и экран «Люди» показывают разное число уже скинувших кадры на одном и том же воспоминании. Chief закрепил правило (doc-06): в число уже скинувших входят «всё загрузил» и «ждать нечего» (оба — ответ, что человека больше не ждут), не входят «планирует загрузить» и «ещё не грузил»; зрители (роль viewer) не входят ни в число скинувших, ни в общее число участников.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Зрители не входят ни в число скинувших, ни в общее число участников
- [ ] #2 Тест закрепляет конкретный пример с зрителем, дающий разные числа при старом и новом правиле
- [ ] #3 Автотесты зелёные
- [ ] #4 GET /memories: скинувшим считается только done и nothing, не more_coming и не not_started
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Ничего лишнего не оставлено
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
GET /memories (projects/api/src/memories/plugin.ts) — сейчас считает скинувшим любой статус кроме not_started, но ничего не исключает по роли (зрители попадают и в N, и в M — неверно). Поправить lateral-агрегат: contributed = count где status in ('done','nothing') and role <> 'viewer'; member_count = count где role <> 'viewer'. Тест: воспоминание с организатором (done), одним contributor (nothing), одним contributor (more_coming), одним viewer — ожидаем 2 из 3 (зритель не считается вообще). README поправить под новую формулу.
<!-- SECTION:NOTES:END -->
