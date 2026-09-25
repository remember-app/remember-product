---
id: TASK-315
title: 'Проверка хранилища на настоящем бакете Google: сервер и обработчик'
status: To Do
assignee:
  - '@tester'
created_date: '2026-09-25 07:25'
updated_date: '2026-09-25 08:05'
labels:
  - from-chief
milestone: m-29
dependencies:
  - TASK-329
  - TASK-330
priority: high
type: feat
ordinal: 312000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
После того как сервер и обработчик научились работать с Google по JSON-ключу (TASK-329, TASK-330), прогнать на настоящем бакете для проверок живой контроль каждого из них — доказательство, что реальная работа с хранилищем идёт, а не только тесты с подменой.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Живой контроль сервера (npm run storage:check в режиме google) и живой контроль обработчика прогнаны на настоящем бакете для проверок; по каждому пункту записано: прошёл / не прошёл / как ответил Google
- [ ] #2 Подписанные ссылки на скачивание и на часть загрузки открываются вне сети мака человека (запрос с публичного адреса без ключей); в бакете проверок после прогона не осталось ни объектов, ни незавершённых загрузок
- [ ] #3 Всё расходящееся — карточками from-lead с описанием, что именно ответил Google; ответы, оставшиеся открытыми после карточки живой проверки подписи (TASK-328), закрыты
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Отчёт тестировщика без значений ключей; ключи взяты из ~/.remember-secrets.env и в отчёт/файлы репозиториев не попали
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Ключи бакета для проверок — в ~/.remember-secrets.env (R2_CHECK_BUCKET, R2_CHECK_ACCESS_KEY_ID, R2_CHECK_SECRET_ACCESS_KEY; R2_ENDPOINT=https://storage.googleapis.com). Живой контроль сервера: npm run storage:check в projects/api с переменными STORAGE_CHECK_ENDPOINT/STORAGE_CHECK_BUCKET/STORAGE_CHECK_ACCESS_KEY_ID/STORAGE_CHECK_SECRET_ACCESS_KEY (значения из R2_CHECK_* только на время прогона); контроль обработчика: python -m pytest tests/test_storage.py в projects/montage с R2_* на этот бакет (базы не нужно). Особенно ждут ответа три вещи: статус ответа Google на просроченную подписанную ссылку (приложение сегодня докачивает заново только по 403 — если Google отвечает иначе, например 400, это карточка from-lead на mobile), HEAD и DELETE без длины, повторный обрыв уже оборванной загрузки. Стенд человека на маке и его бакет remember не использовать. Линтер внутри worktree молча не проверяет ничего (biome.json исключает .claude): проверять npx biome check src scripts.
<!-- SECTION:NOTES:END -->
