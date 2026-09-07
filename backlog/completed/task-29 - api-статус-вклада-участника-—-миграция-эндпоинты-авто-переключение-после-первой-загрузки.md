---
id: TASK-29
title: >-
  api: статус вклада участника — миграция, эндпоинты, авто-переключение после
  первой загрузки
status: Done
assignee: []
created_date: '2026-09-04 12:42'
updated_date: '2026-09-04 12:51'
labels:
  - from-lead
milestone: m-6
dependencies: []
priority: high
type: feat
ordinal: 33000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Внутри воспоминания у каждого участника заводится статус его вклада: пока ничего не загрузил — начальный; после первой успешной загрузки статус сам переходит в «догрузит ещё», и приложение может спросить, всё ли загружено; участник может сам поставить «ждать нечего» в любой момент. Реализует doc-06 на бэкенде.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Миграция добавляет memory_members.status (default 'not_started', CHECK IN ('not_started','more_coming','done','nothing')); идемпотентна, накатывается на пустую базу
- [x] #2 GET /memories/:memoryId/members отдаёт contribution_status для каждого участника
- [x] #3 POST /memories/:memoryId/media/:mediaId/complete при первом успешном завершении загрузки участника (его статус был not_started) переводит статус в more_coming и возвращает в ответе first_upload: true; в остальных случаях first_upload отсутствует или false
- [x] #4 Новый POST /memories/:memoryId/contribution-status с телом {status: 'done'|'nothing'} — любой участник ставит себе этот статус сам; неизвестное значение — 400; не участник — 404; без сессии — 401
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 Номер миграции проверен по факту прямо перед коммитом — не совпадает с тем, что успели завести m-4/m-5
- [x] #2 npm run lint и npm run typecheck проходят в projects/api; существующий npm test не ломается — новых тестов сознательно не заводим (решение человека — конвейер ревью/тестов по всем трём вехам вернётся отдельным ходом)
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Зона — src/memories (plugin.ts membership select, members.ts) и точечно src/media/upload.ts (хук в /complete). Таблицу jobs (montage) не трогать. Тесты — по конвенции репозитория (vitest, реальный Postgres), тег тестовых пользователей — по номеру своей задачи, как в members.test.ts (testEmail('taskNN')).

Обновление по ходу (2026-09-04): по решению человека этап ревью и тестирования вехи временно не идёт, три вехи закладывают базу параллельно. Новых тестов специально не заводить; существующие не ломать.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Готово, коммит bb7387d в projects/api (ветка воркtree agent-ac564e016dbcbddbc).

Что сделано:
- Миграция 010 (010.do/undo.contribution-status.sql). Номер проверен по факту перед коммитом: в основном чекауте и во всех воркtree'ах m-4/m-5 максимум был 004, так что 010 взят с запасом и ни с кем не столкнулся. Колонка memory_members.status text NOT NULL DEFAULT 'not_started' + CHECK на четыре значения; и ADD COLUMN, и DROP/ADD CONSTRAINT идемпотентны. Накатилась на живую базу, колонка и CHECK проверены запросом к information_schema/pg_constraint. undo снимает колонку (CHECK уходит с ней).
- GET /memories/:memoryId/members отдаёт contribution_status пятым полем (mm.status as contribution_status). Имя длинное нарочно: рядом на клиенте лежит медиа со своим status.
- app.requireMembership (src/memories/plugin.ts) кладёт в request.membership ещё и status — тот, что был у участника ДО запроса. Тип FastifyRequest.membership теперь { memory, role, status }, добавлен экспортируемый тип ContributionStatus.
- POST /memories/:memoryId/media/:mediaId/complete: в той же транзакции, что и счётчики и jobs, участник со статусом not_started переводится в more_coming (условие status='not_started' и в WHERE — гонка двух колбэков даёт one more_coming и ровно один first_upload). Ответ всегда несёт first_upload: true|false, в том числе на ветке повторного колбэка — форма ответа одна.
- POST /memories/:memoryId/contribution-status: тело {status: 'done'|'nothing'} через ajv-enum, preHandler [authenticate, requireMembership], без порога по роли (viewer тоже). Ставит статус всегда вызывающему — :userId в маршруте нет. Живёт в src/memories/members.ts рядом с ростером.
- README: раздел «Статус вклада» с таблицей значений, новый эндпоинт, first_upload в описании /complete, request.membership.status в разделе про requireMembership.

Проверено: npm run typecheck зелёный, biome зелёный по всем 29 файлам (npm run lint из воркtree печатает «0 files» — biome по конвенции репозитория игнорирует .claude/, это артефакт воркtree, а не код), npm test 54/54 зелёный. Существующие ожидания в members.test.ts и upload.test.ts подтянуты под новый контракт (contribution_status в ростере, first_upload в ответе /complete) — это правка старых тестов, а не новые.
Новый эндпоинт прогнан руками отдельным скриптом (не в репозитории): 200 на done/nothing у организатора и у viewer, 400 на 'more_coming' и на пустое тело, 404 не участнику и на кривой memoryId, 401 без сессии, ростер показывает выставленные статусы, viewer после 'nothing' по-прежнему читает ростер, организатор со статусом done по-прежнему получает 201 на заявку загрузки — статус прав не режет.

Не покрыто, раз тестов не заводим: авто-переход по first_upload проверен только там, где его задевает существующий upload.test.ts (первый /complete -> true, повторный -> false); второй загрузкой того же человека (должен быть false) и сценарием «сказал nothing, потом всё-таки загрузил» (статус не должен перезаписываться) прогонов не было — обе ветки держатся на условии status='not_started' в WHERE.

Осталось за рамками карточки: GET /memories и POST /invites/accept по-прежнему отдают воспоминание без статуса вызывающего (клиенту он приходит через ростер) — если mobile захочет его в теле воспоминания, это отдельная задача.
<!-- SECTION:FINAL_SUMMARY:END -->
