---
id: TASK-32
title: >-
  mobile: статус вклада — вопрос после загрузки, «ждать нечего», прогресс у
  организатора
status: In Progress
assignee: []
created_date: '2026-09-04 12:42'
updated_date: '2026-09-04 12:58'
labels:
  - from-lead
milestone: m-6
dependencies:
  - TASK-29
priority: high
type: feat
ordinal: 36000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Показать статус вклада каждого участника на уже существующем экране воспоминания, спросить участника простым системным диалогом сразу после его первой загрузки, дать ему самому отметить «ждать нечего». Никаких новых экранов — человек параллельно готовит UI kit.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 После загрузки, завершившейся с first_upload: true, показывается системный Alert с вопросом «всё загрузили или будет ещё» и двумя вариантами; «Это всё» переводит статус в done через POST /memories/:memoryId/contribution-status; «Будет ещё» ничего не меняет
- [x] #2 На экране воспоминания рядом с каждым участником виден его статус вклада человеческим текстом (все 4 значения: not_started, more_coming, done, nothing)
- [x] #3 Участник может сам поставить себе «ждать нечего», ничего не загружая — видимое действие на экране, вызывающее тот же эндпоинт со статусом nothing
- [x] #4 Экран воспоминания остаётся тем же экраном — только точечные добавления, вёрстка не переделывается, новых экранов нет
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 npm run lint и typecheck проходят в projects/mobile; существующий npm test не ломается — новых тестов сознательно не заводим (решение человека — конвейер ревью/тестов по всем трём вехам вернётся отдельным ходом)
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Контракт со стороны api (TASK-29): Member.contribution_status в GET /memories/:memoryId/members; POST /memories/:memoryId/contribution-status {status:'done'|'nothing'}; finishUpload() отвечает дополнительным полем first_upload. Смотреть точную форму в закоммиченном коде api, а не угадывать. Файлы: src/api.ts (типы и клиенты), src/uploads.ts (диалог после send()), src/app/memory/[id].tsx (статус в ростере + кнопка «ждать нечего»).

Обновление по ходу (2026-09-04): по решению человека этап ревью и тестирования вехи временно не идёт. Новых тестов специально не заводить; существующие не ломать.
<!-- SECTION:NOTES:END -->
