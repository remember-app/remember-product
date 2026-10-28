---
id: TASK-560
title: 'api: та же мигающая пятисекундная проверка ещё в трёх файлах'
status: Done
assignee: []
created_date: '2026-10-28 13:46'
updated_date: '2026-10-28 14:10'
labels:
  - from-lead
dependencies: []
priority: low
type: bug
ordinal: 539000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Тот же дефект, что TASK-557 починила в двух файлах, живёт ещё в трёх: src/auth/auth.test.ts («the review door opens for its exact spelling alone»), src/montages/templates.test.ts («каждый шаблон принимается заказом как есть»), src/server.test.ts (две проверки про запуск сервера). Под нагрузкой они не укладываются в срок по умолчанию 5 секунд и краснеют. На двух прогонах разом у ведущего не воспроизвелось, но под большей нагрузкой исполнитель TASK-557 воспроизводил их надёжно.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Эти проверки держат срок, достаточный для их работы под нагрузкой, и не мигают
- [x] #2 Проверка ломается, когда срок снова урезают
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Где: projects/api/src/auth/auth.test.ts, src/montages/templates.test.ts, src/server.test.ts. Приём тот же, что в TASK-557: свой срок на проверку (в api принят const slow = 30_000), логику не трогать. Найдено исполнителем TASK-557, за границей той задачи оставлено нарочно.
<!-- SECTION:NOTES:END -->

## Comments

<!-- COMMENTS:BEGIN -->
created: 2026-10-28 14:10
---
Принято. Три файла названы в карточке и получили свой срок slow = 30 000, логика не тронута; глобальный срок набора не менялся.

Проверено на dev после слияния: три файла — 3/3, 50 тестов зелёные (12.7 с). Ломающий прогон на моей копии: slow = 1 в server.test.ts — 2 из 3 красные таймаутом; после восстановления — снова 30 000.
---
<!-- COMMENTS:END -->
