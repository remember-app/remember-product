---
id: TASK-569
title: 'montage+api+mobile: ревью правок m-39 — музыка ролика'
status: Done
assignee: []
created_date: '2026-10-28 13:54'
updated_date: '2026-10-28 14:18'
labels:
  - from-lead
milestone: m-39
dependencies:
  - TASK-538
  - TASK-548
  - TASK-549
  - TASK-550
  - TASK-551
  - TASK-561
  - TASK-562
  - TASK-563
priority: high
type: feat
ordinal: 548000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Прочитать слитые в dev правки вехи m-39 в трёх репозиториях и найти, что в них на самом деле сломано, не переиспользовано, не вычищено или небезопасно.

Правки вехи: полка треков до десяти (TASK-548 montage, TASK-561 api, TASK-562 mobile); выбор «на усмотрение режиссёра» (TASK-538 дизайн, TASK-549 api, TASK-550 montage, TASK-551 mobile); доки полки (TASK-563).
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Каждый коммит вехи прочитан; каждая находка названа файлом и строкой
- [x] #2 Контракт music_director сверен на трёх сторонах: api params и 400 на конфликт, воркер (флаг читается первым, BY_DIRECTOR, дорожка после ответа), приложение (тело с флагом и без music_tracks, trackWords)
- [x] #3 Полка сверена: library.TRACKS, musicTracks, TRACKS приложения и tracks/README.md называют одни и те же десять id, одни и те же имена и длительности
- [x] #4 Настоящие находки исправлены или вынесены карточкой with причиной; ложные отклонены с причиной
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 Ревью пройдено: настоящих находок не осталось без карточки или правки
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Слияние в dev уже сделано. Правила проекта — из самих репозиториев. Помни: npm run lint в ворктри агента ничего не проверяет (исключение **/.claude) — см. TASK-429 для mobile; в api та же ловушка. Деплоя нет.
<!-- SECTION:NOTES:END -->

## Comments

<!-- COMMENTS:BEGIN -->
created: 2026-10-28 14:18
---
Принято. Ревью шло по коммитам dev трёх репозиториев, находки — с файлом и строкой.

Настоящие находки (только подписи, код верный): mobile/src/lib/music.ts:74 «which of the five»; mobile/src/api/music.ts:49-51 «one of the five» и «the same five for everyone». Вынесены карточкой TASK-572 (from-lead, Low) — полку в приложении не правлю молча.

Проверено ведущим лично: полка — одни и те же десять id в montage/montage/video/library.py:16-27, api/src/montages/music.ts:52-63, mobile/src/api/montage.ts:12-22 и montage/video/tracks/README.md:12-23; имена и длительности README сходятся с приложением. Контракт: api order.ts:255-258 даёт 400 на флаг вместе с music_tracks, :331 кладёт в params только music_director; воркер video/music.py:46-47 читает флаг первым и отдаёт BY_DIRECTOR; приложение lib/montage/order.ts:409-417 шлёт флаг и не шлёт music_tracks.

Ложные/вне вехи отклонены с причиной в отчёте ревьюера: SHELF из пяти пар в test_director — стенд вопроса, а не утверждение о полке; старая длительность warm в docs/director.md; автор трека — TASK-554 (отложен человеком). Тестовая дыра e2e закрывается TASK-571.

Правок в montage ревьюер не делал — реальных дефектов там нет; ruff в его ворктри чист, 13 точечных тестов зелёные.
---
<!-- COMMENTS:END -->
