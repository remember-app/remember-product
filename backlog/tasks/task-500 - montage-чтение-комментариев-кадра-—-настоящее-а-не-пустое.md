---
id: TASK-500
title: 'montage: чтение комментариев кадра — настоящее, а не пустое'
status: Done
assignee:
  - '@coder'
created_date: '2026-10-03 23:50'
updated_date: '2026-10-04 02:03'
labels:
  - from-lead
milestone: m-32
dependencies:
  - TASK-497
priority: high
type: feat
ordinal: 482000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
`understanding.frame_comments` (projects/montage/montage/media/understanding.py, строка 93) сегодня
возвращает `{}` — шов готов и честно пуст. Теперь комментарии есть (TASK-497), и функция должна
читать их из базы, а не из воздуха.

Вызывающие уже написаны и их не трогаем:
- `montage/video/director.py:246` — кладёт их в подсказку режиссёру как `comments`;
- `montage/video/story.py:51` — кладёт их в запись этапа «анализ» в `details["comments"]`.

Им нужно `{media_id: [текст, …]}`, старые — раньше — новыми. Порядок внутри кадра — по времени
написания.

## Тесты, которые придётся переписать — они сейчас утверждают обратное

- `tests/test_journal_entries.py::test_a_frames_speech_and_comments_come_from_their_own_tables` —
  последней строкой проверяет `all("comments" not in fields ...)`: «пока m-32 не заведёт хранилище,
  комментариев ни у кого нет». После этой задачи комментарии у кадра, которому их написали, есть.
- `tests/test_journal_entries.py::test_the_one_place_comments_come_from_is_empty_and_breaks_nothing` —
  проверяет, что `frame_comments` возвращает `{}`. После — что читает настоящее.

Переписать так, чтобы тесты ломались на каждом месте, где значение производится: кадр с
комментариями — комментарии есть, кадр без — нет, режиссёр получает их в подсказку, запись этапа
«анализ» их несёт.

## Границы

В `projects/montage` в этом же репозитории работает соседний исполнитель (этап m-33). Твоя работа —
`montage/media/understanding.py` и тесты к нему. **`montage/video/`, `montage/media/selection.py` и
`docs/` не трогай.**

## Готово когда

- `frame_comments` читает настоящие комментарии и возвращает `{}` там, где их нет.
- Тесты зелёные, включая переписанные два выше.
- Прогон в контейнере: `cd projects/api && docker compose up -d --wait`, затем
  `./test-in-docker.sh`. TASK-493 (эталон не снимается из контейнера) — не твоя, обойди её, не чини.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 frame_comments читает комментарии из базы и отдаёт {media_id: [текст]}
- [ ] #2 Кадр без комментариев отдаёт пусто, список пуст — не ошибка
- [ ] #3 Режиссёр получает комментарии в подсказке, запись этапа «анализ» их несёт
- [ ] #4 Два теста, утверждавшие пустоту, переписаны и ломаются на каждом месте, где значение производится
- [ ] #5 Полный набор тестов в контейнере зелёный
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
## Таблица уже есть — миграция 190 в `dev`

`frame_comments` в api накатана (TASK-497, миграция `190.do.frame-comments.sql`). Колонки: `id`,
`media_id`, `memory_id`, `author_id`, `body`, `created_at`. Индекс `(media_id, created_at)` — то
есть чтение «комментарии кадра по времени написания» уже оптимизировано под твой запрос.

Читай прямо из неё, как читаешь `media_understandings` и `media_speech`. Ничего больше не нужно:
ни api, ни HTTP, ни новых колонок.

## Про два теста, которые придётся переписать

`tests/test_journal_entries.py::test_a_frames_speech_and_comments_come_from_their_own_tables` и
`::test_the_one_place_comments_come_from_is_empty_and_breaks_nothing` сегодня утверждают, что
комментариев у кадра не бывает.

Порядок обязателен:

1. **Сначала** напиши новые проверки и убедись, что на старом коде (где `frame_comments`
   возвращает `{}`) они **падают**.
2. **Потом** перепиши функцию, чтобы они позеленели.

Если сначала переписать функцию, а потом подправить тесты под зелёный цвет, «переписал» будет
неотличимо от «ослабил». Покажи в отчёте оба прогона: красный на старом коде и зелёный на новом.

## Границы

В `projects/montage` в этом же репозитории работает соседний исполнитель (этап m-33). Твоя работа —
`montage/media/understanding.py` и тесты к нему. **`montage/video/`, `montage/media/selection.py`
и `docs/` не трогай.**

## Про api, где красное

В `projects/api` на `dev` красное в `src/montages/` — это TASK-463 соседнего этапа (тесты ждут двух
этапов журнала, код после TASK-463 выдаёт пять). К тебе отношения не имеет, не чини и не считай
своим.

## Готово когда

- `frame_comments` читает настоящие комментарии и возвращает `{}` там, где их нет.
- Тесты зелёные, включая переписанные два выше.
- Прогон в контейнере: `cd projects/api && docker compose up -d --wait`, затем
  `./test-in-docker.sh`. TASK-493 (эталон не снимается из контейнера) — не твоя, обойди, не чини.
<!-- SECTION:NOTES:END -->
