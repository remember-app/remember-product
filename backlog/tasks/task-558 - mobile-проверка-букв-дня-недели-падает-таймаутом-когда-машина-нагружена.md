---
id: TASK-558
title: 'mobile: проверка букв дня недели падает таймаутом, когда машина нагружена'
status: Done
assignee: []
created_date: '2026-10-28 13:36'
updated_date: '2026-10-28 14:11'
labels:
  - from-lead
dependencies: []
priority: low
type: bug
ordinal: 537000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Несколько проверок mobile падают таймаутом, когда машина нагружена, а поодиночке зелёные: tests/kit/large-type-cells.test.tsx (буквы дня недели, меряет настоящий шрифт), tests/screens/order/order-flow.test.tsx и иногда tests/screens/memory/frame-comments.test.tsx. Воспроизводятся и на чистом dev, без правок вехи. Та же порода, что TASK-557 в api, только в другом репозитории. Разные исполнители натыкались на них независимо.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Проверка держит срок, достаточный для её работы под нагрузкой, и не мигает
- [x] #2 Проверка ломается, когда срок снова урезают
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Где: projects/mobile/tests/kit/large-type-cells.test.tsx, проверка на строке 177. Срок ставить самой проверке, а не всему набору. Замечено ведущим m-38 при прогоне dev после слияния TASK-545; к плотности отношения не имеет. Есть карточка на то же в api — TASK-557.
<!-- SECTION:NOTES:END -->

## Comments

<!-- COMMENTS:BEGIN -->
created: 2026-10-28 14:11
---
Принято.

Срок 20 000 задан только двум тяжёлым проверкам (DRAWS_MANY в tests/helpers/renderer.ts); набору срок не менялся. frame-comments.test.tsx — тот же дефект, что назван в карточке.

Проверено ведущим на dev после слияния: эти два файла 38/38; полный набор mobile — 146 файлов / 2397 тестов зелёные. Ломающий прогон на моей копии: DRAWS_MANY = 100 мс — 2 failed | 36 passed таймаутом; после восстановления снова 38/38.
---
<!-- COMMENTS:END -->
