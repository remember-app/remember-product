---
id: TASK-52
title: 'montage: тестовый прогон воркера в Docker, независимо от ffmpeg хоста'
status: Done
assignee: []
created_date: '2026-09-05 04:23'
updated_date: '2026-09-05 04:35'
labels:
  - from-lead
milestone: m-9
dependencies: []
priority: high
type: feat
ordinal: 56000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
На машине лида сломан системный ffmpeg (Homebrew-либа без прав доступа, dyld: Library not loaded .../libvmaf.3.dylib) — все три существующих живых теста воркера (test_worker.py, test_media.py) падают не по вине кода. Ручное тестирование запрещено человеком, а вся веха m-9 стоит на ffmpeg — значит дальше тесты воркера должны гоняться в среде, не зависящей от состояния этого хоста. Задача только про среду прогона, пайплайн сборки ролика — отдельной задачей следом.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 В projects/montage появляется Dockerfile (или эквивалент) с Python 3.11+ и ffmpeg/ffprobe внутри — независимо от версии и состояния ffmpeg на хосте
- [x] #2 Новый способ гонять тесты воркера в контейнере (например make-цель или скрипт) собирает образ и прогоняет pytest внутри против уже поднятых 'cd projects/api && docker compose up -d --wait' (Postgres 5432, MinIO 9000) — контейнер обращается к ним через host.docker.internal или другой надёжный способ, без хардкода IP; projects/api/docker-compose.yml не трогается
- [x] #3 Все три существующих теста (test_worker.py — 2 теста, test_media.py — 5 тестов) зелёные этим способом, без единого изменения кода воркера ради теста
- [x] #4 README воркера описывает этот способ как основной для машины с нерабочим/недоступным ffmpeg; нативный путь (venv + системный ffmpeg) остаётся как есть, ничего не убирается
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Не переусложнять: один Dockerfile + одна команда, без выделенного docker-compose сервиса и без сети — host.docker.internal (или --add-host=host.docker.internal:host-gateway на Linux) достаточно, порты и так опубликованы на хосте существующим docker-compose.yml api. Это первая задача вехи m-9 — от неё зависит задача на сам пайплайн сборки ролика.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Готово, коммит 4c0a044 в projects/montage (ветка воркtree agent-ac9f8478a141e6dd7).

Что сделано:
- `Dockerfile` — python:3.12-slim плюс ffmpeg 7.1 из Debian и `pip install -r requirements.txt`. Кода в образе нет: `.dockerignore` пускает в контекст один requirements.txt, а рабочая копия приходит томом на запуске, так что пересборка нужна только при смене зависимостей.
- `test-in-docker.sh` — `docker build` и `docker run`, аргументы уходят в pytest (`./test-in-docker.sh -k preview`). `--add-host=host.docker.internal:host-gateway` (на Docker Desktop имя есть и так, на Linux появляется этой строкой), DATABASE_URL и R2_ENDPOINT смотрят на `host.docker.internal:5432` и `:9000` — IP нигде не зашит. Остальные три переменные — значения из .env.example, то есть канонного локального стенда api. Хостовый .env сознательно не подхватывается: в нём `localhost`, который внутри контейнера означает сам контейнер. Рабочая копия монтируется только на чтение, pytest идёт с `-p no:cacheprovider` — контейнер не оставляет в дереве ни .pyc, ни кеша.
- projects/api/docker-compose.yml не тронут; своего compose-сервиса, сети и второго Postgres нет.
- README: раздел «Тесты» разделён на «В контейнере — когда ffmpeg на машине сломан или его нет» (идёт первым, с командой поднятия стенда api) и «Нативно» (прежний текст без изменений). Общий абзац про живые тесты и чистку jobs остался один на оба пути.

Правка одного теста (кода воркера не касался):
`test_a_playlist_dressed_up_as_a_photo_is_refused` падал в контейнере не из-за среды, а из-за версии ffmpeg. Фикстура — m3u8 без расширения (оригинал в бакете всегда `originals/<id>` и качается в файл `original`), а ffmpeg 4.3+ такой файл как HLS не открывает вовсе («Not detecting m3u8/hls with non standard extension»), так что ffprobe падает раньше, чем `_refuse_playlists` успевает назвать причину. Отказ при этом остаётся отказом: превью не делается, задача уходит в повтор, элемент остаётся `processing`. Разделил на две проверки: сквозная теперь утверждает сам отказ (job `queued`, текст ошибки есть, элемент не `ready`), а новая `test_the_guard_refuses_what_ffmpeg_calls_a_playlist` проверяет ровно нашу половину — на плейлисте, который текущий ffmpeg действительно открывает (ffconcat со ссылкой на лежащее рядом видео), `_refuse_playlists` отказывает со словом «playlist». Без этой добавки сквозной тест проходил бы и с удалённой защитой.

Проверено: `./test-in-docker.sh` — 9 passed (test_worker.py 2, test_media.py 7) при поднятых `cd projects/api && docker compose up -d --wait` и накатанных миграциях api (иначе проверки превью ушли бы в skip). Передача аргументов: `./test-in-docker.sh -q -k playlist` — 2 passed, 7 deselected. Системный ffmpeg на машине по-прежнему сломан (dyld: libvmaf.3.dylib, errno=13) и на прогон не влияет. Руками ничего не проверялось.

Расхождение с карточкой: в AC #3 значилось «test_media.py — 5 тестов», по факту их было 6 (шестой — как раз про плейлист, из ревью m-3), стало 7.

Осталось за рамками:
- на ffmpeg 5+ `_refuse_playlists` через воркер почти недостижим: современный ffmpeg сам отказывается открывать плейлист, не названный «правильно», а оригиналы всегда без расширения. Защита не вредит и остаётся, но реальной преградой сейчас служит ffprobe — стоит знать при ревью безопасности.
- образ montage-tests собирается локально и никуда не публикуется; для CI понадобится отдельное решение.
- OpenCV/ONNX для будущей сборки роликов в образ не клались — их добавит задача про сам пайплайн, когда станет ясно, что именно нужно.
<!-- SECTION:FINAL_SUMMARY:END -->
