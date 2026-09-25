---
id: TASK-315
title: 'Проверка хранилища на настоящем бакете Google: сервер и обработчик'
status: Done
assignee:
  - '@tester'
created_date: '2026-09-25 07:25'
updated_date: '2026-09-25 09:49'
labels:
  - from-chief
milestone: m-29
dependencies: []
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

РЕШЕНИЕ decision-16: хранилище временно — общий публичный бакет cdn.dapp-devs.com, ТОЛЬКО под remember/dev-check/<uuid>/ для проверок; ключ — ~/.remember-secrets.gcs.json. Сервер: npm run storage:check с STORAGE_CHECK_DRIVER=google (STORAGE_CHECK_BUCKET, STORAGE_CHECK_PREFIX=remember/dev-check, STORAGE_CHECK_CREDENTIALS). Обработчик: STORAGE_DRIVER=google GOOGLE_STORAGE_BUCKET=cdn.dapp-devs.com GOOGLE_STORAGE_CREDENTIALS=… python -m pytest tests/test_storage_google.py (префикс проверок тест выбирает сам). Расхождения с S3-путём и находки исполнителей: google-auth в обработчике сам ходит фоном в iamcredentials после первого токена — посмотреть предупреждения в логе.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Живые контроли на настоящем Google (cdn.dapp-devs.com, только под remember/dev-check/<uuid>/, после прогонов 0 объектов и 0 незавершённых загрузок): сервер — npm run storage:check в режиме google, все шаги прошли (начало, куски по подписанным ссылкам, докачка недостающей части, завершение, размер, скачивание по ссылке, просрочка ссылки = 400 ExpiredToken, обрыв, повторный обрыв, удаление); подписанные ссылки открываются без ключей (хеш совпал, чужое имя = 403, после удаления 404); ключ вне префикса отказан до сети; сервер без префикса не стартует. Обработчик — tests/test_storage_google.py, 108 из 108, живой тест прошёл (PUT 9 МиБ, HEAD, GET, DELETE, многочастная загрузка и обрыв); 50 МиБ одним PUT потоком: память +7 МиБ, ~13–15 МиБ/с, хеш совпал; фоновый вызов google-auth в iamcredentials — 200 без предупреждений. Не проверено: с телефона, обновление токена по времени, реальные 5xx/429.
<!-- SECTION:FINAL_SUMMARY:END -->
