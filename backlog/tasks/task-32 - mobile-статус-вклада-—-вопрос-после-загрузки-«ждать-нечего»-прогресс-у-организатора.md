---
id: TASK-32
title: >-
  mobile: статус вклада — вопрос после загрузки, «ждать нечего», прогресс у
  организатора
status: Done
assignee: []
created_date: '2026-09-04 12:42'
updated_date: '2026-09-04 12:59'
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
- [x] #1 npm run lint и typecheck проходят в projects/mobile; существующий npm test не ломается — новых тестов сознательно не заводим (решение человека — конвейер ревью/тестов по всем трём вехам вернётся отдельным ходом)
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Контракт со стороны api (TASK-29): Member.contribution_status в GET /memories/:memoryId/members; POST /memories/:memoryId/contribution-status {status:'done'|'nothing'}; finishUpload() отвечает дополнительным полем first_upload. Смотреть точную форму в закоммиченном коде api, а не угадывать. Файлы: src/api.ts (типы и клиенты), src/uploads.ts (диалог после send()), src/app/memory/[id].tsx (статус в ростере + кнопка «ждать нечего»).

Обновление по ходу (2026-09-04): по решению человека этап ревью и тестирования вехи временно не идёт. Новых тестов специально не заводить; существующие не ломать.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Статус вклада появился на уже существующем экране воспоминания и в очереди загрузки — тремя точечными добавлениями, без новых экранов.

Что сделано:
- src/api.ts: тип ContributionStatus рядом с MemberRole, поле contribution_status у Member, first_upload: boolean в ответе finishUpload, клиент setContributionStatus(token, memoryId, 'done'|'nothing').
- src/uploads.ts: после finishUpload в send(), если ответ несёт first_upload — системный Alert «Is that everything? / Or is there more still to come?» с кнопками «More to come» (ничего не делает, статус уже more_coming на бэкенде) и «That's all» (setContributionStatus … 'done', ошибка сети глотается тем же приёмом, что и незаписанная очередь в changed()).
- src/app/memory/[id].tsx: строка статуса под ролью у каждого участника (все 4 значения: Nothing uploaded yet / Still adding photos / Uploaded everything / Nothing to add) и кнопка «Nothing to add» на своей строке, пока статус не done и не nothing — через существующий act(), с load() после.

Контракт api (TASK-29, ветка worktree-agent-ac564e016dbcbddbc) сверен с закоммиченным кодом: расхождений с брифом нет — поле в ростере действительно contribution_status (в базе колонка status, переименована в select), тело эндпоинта строго {status: 'done'|'nothing'}, first_upload отдаётся и на идемпотентном повторе complete (там всегда false).

Проверки: typecheck (tsc --noEmit) и npm test — зелёные, 12 тестов в 3 файлах, как и до работы. Скрипта npm run lint в репозитории нет вовсе (в package.json только start/android/ios/web/test/typecheck, конфигов eslint/prettier/biome тоже нет) — этот пункт DoD выполнить нечем, а не пропущен. Новых тестов не заводил по решению человека.

Коммит: 2f5d226, только три названных файла.

Замечено и не тронуто: при выборе пачки файлов вопрос задаётся после первого завершившегося, пока остальные ещё в очереди — человек может ответить «это всё», когда очередь ещё грузит. Ответ на это (переспросить позже или ждать опустошения очереди) — продуктовое решение, не моё; в бриф не входило.
<!-- SECTION:FINAL_SUMMARY:END -->
