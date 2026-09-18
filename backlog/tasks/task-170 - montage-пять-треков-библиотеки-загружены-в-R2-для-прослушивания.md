---
id: TASK-170
title: 'montage: пять треков библиотеки загружены в R2 для прослушивания'
status: Done
assignee: []
created_date: '2026-09-18 16:11'
updated_date: '2026-09-18 16:25'
labels:
  - from-chief
milestone: m-23
dependencies: []
priority: medium
type: feat
ordinal: 177000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
design/screens/MontageMusic.html: у каждого трека кнопка «Послушать» — это часть шага мастера, не хвост (решение chief). Сейчас библиотека (projects/montage/tracks/*.mp3) — только локальные файлы этого репозитория, воркер читает их с диска при сборке ролика; ни api, ни приложение достать их не могут.

Нужно: пять треков лежат в R2 под предсказуемыми ключами (например tracks/<id>.mp3 — тот же id, что в assembly.TRACKS), тем же способом, каким воркер уже загружает готовые ролики (media._upload/media.storage()). Идемпотентно — не перезаливать то, что уже там, и не гонять эту загрузку на каждый ролик; разумное место — рядом с командой python worker.py init или отдельная команда, на твой выбор.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 После запуска (init или отдельная команда — опиши в README) все пять треков лежат в R2 под ключами вида tracks/<id>.mp3
- [x] #2 Повторный запуск не перезаливает уже лежащие там объекты
- [x] #3 README описывает, как это устроено и что делать при добавлении/замене трека
- [x] #4 Тест подтверждает появление всех пяти объектов в бакете с ожидаемыми ключами
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Команда `python worker.py tracks` — отдельная, не в init. В init не встроено намеренно: `make worker-init` в корневом Makefile зовёт init без переменных R2, и init падал бы KeyError, а Makefile вне projects/montage (не трогал; при желании лид добавит туда цель).

Как устроено:
- `assembly.track_key(id)` -> `tracks/<id>.mp3` — тот же id, что в `assembly.TRACKS`; ключ строит и API по этому же правилу (TASK-171).
- `assembly.publish_tracks(s3=None)` — по каждому треку head_object по ключу; объект есть — пропуск, нет (ClientError) — `media._upload(..., "audio/mpeg")`. Возвращает список реально залитых.
- `worker.py`: ветка `tracks` стоит ДО `with connect()` — базы команде не нужно, только четыре переменные хранилища; лишние аргументы печатают usage.

Тест: `test_montage.py::test_the_library_is_published_to_the_bucket_for_the_app_to_play` — чистит пять ключей, публикует, сверяет по каждому ContentLength с размером файла и ContentType `audio/mpeg`; второй вызов возвращает пустой список и не меняет LastModified ни одного объекта.

README: команда добавлена в «Запуск», абзац в «Треках» — новый трек (файл + строка в TRACKS + строка у API + команда) и замена файла под тем же id (сначала удалить объект из бакета, иначе играть будет старое).

Прогон: полный набор 133 passed (своя база remember_test_170 + локальный MinIO, база потом удалена). Ветка worktree agent-a71c03ab1b302c3c9, коммит 98ad14a; слияние в main сабмодуля — за лидом.
<!-- SECTION:NOTES:END -->
