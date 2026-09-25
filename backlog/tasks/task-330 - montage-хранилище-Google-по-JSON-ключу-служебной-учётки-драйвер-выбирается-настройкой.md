---
id: TASK-330
title: >-
  montage: хранилище Google по JSON-ключу служебной учётки, драйвер выбирается
  настройкой
status: To Do
assignee:
  - '@coder-backend'
created_date: '2026-09-25 08:04'
labels:
  - from-chief
milestone: m-29
dependencies:
  - TASK-328
priority: high
type: feat
ordinal: 327000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Обработчик ходит в то же хранилище, что и сервер. Раз доступ к Google выдаётся JSON-ключом, обработчик должен уметь работать так же, сохранив работу с местным MinIO.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Драйвер выбирается настройкой STORAGE_DRIVER: s3 (по умолчанию, как сегодня, boto3) и google (JSON-ключ из GOOGLE_STORAGE_CREDENTIALS одной строкой, бакет из GOOGLE_STORAGE_BUCKET); все места, где обработчик ходит в бакет (скачивание оригиналов, загрузка превью и роликов, проверка наличия, удаление, обрыв незавершённой загрузки в ежечасной уборке), работают в обоих режимах через одну узкую дверь в montage/storage.py, а не через ветвление по месту
- [ ] #2 В режиме google запросы идут с токеном доступа из JSON-ключа (легковесная связка google-auth и requests, без тяжёлой библиотеки клиента, если она не окажется заметно проще); загрузка результатов — одним запросом (XML API принимает большие объекты одним PUT), скачивание — потоком в файл; обрыв незавершённой загрузки — DELETE с uploadId; «нет такой загрузки/объекта» разбирается так же спокойно, как в режиме s3
- [ ] #3 Битый или отсутствующий ключ в режиме google — громкая ошибка при создании клиента; ключ и токен не попадают в логи и исключения
- [ ] #4 Автотесты обработчика: прежние зелёные на MinIO; для режима google — тесты формы запросов с подменой сети; один запускаемый живой контроль режима google на бакете для проверок (по образцу существующего в tests/test_storage.py)
- [ ] #5 docs/running.md обработчика описывает режим google (настройки без значений, права, живой контроль); зависимость google-auth добавлена в requirements.txt и в боевой образ, образ собирается
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Коммит в ветке worktree сервиса, слияние в dev — за лидом
- [ ] #2 Автотесты обработчика зелёные, в своей тестовой базе
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
НЕ начинать, пока живая проверка (карточка про подпись ссылок на куски) не показала, что схема работает. Сервис: projects/montage, montage/storage.py (сегодня boto3, 5 операций: download_file, upload_file, head_object, delete_object, abort_multipart_upload) и потребители в sweeps.py, media/preview.py, media/screening.py, media/understanding.py, media/frame_info.py, media/speech.py, video/montage.py, video/music.py, video/library.py; раскладка после TASK-302: storage.missing(), storage.free(). Основа — чтение документации Google (2026-09-25): XML API принимает Authorization: Bearer; токен из JSON-ключа со scope devstorage.read_write; роль Storage Object User на бакете покрывает все операции обработчика (включая multipartUploads.abort); эмулятора нет. Стенд человека на маке и его MinIO/базу не трогать; параллельно другой кодер правит worker.py и video/assembly (подбор брошенных задач, память сборки) — файлы разные.
<!-- SECTION:NOTES:END -->
