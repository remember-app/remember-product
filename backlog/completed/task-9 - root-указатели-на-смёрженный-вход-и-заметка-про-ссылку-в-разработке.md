---
id: TASK-9
title: 'root: указатели на смёрженный вход и заметка про ссылку в разработке'
status: Done
assignee:
  - '@specialist'
created_date: '2026-09-03 10:16'
updated_date: '2026-09-03 10:17'
labels:
  - from-chief
milestone: m-1
dependencies:
  - TASK-8
priority: medium
type: feat
ordinal: 16000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Свести работу по входу в корневой репозиторий: перевести указатели бэкенда и приложения на принятые коммиты и записать, как проверить вход по email-ссылке без настоящей почты.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Указатели бэкенда и приложения переведены на принятые коммиты
- [x] #2 Записано, что ссылка печатается в лог сервера и как её открыть в Expo Go
- [x] #3 Записано, что новые переменные окружения необязательны и подъём с нуля не изменился
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 Подъём с чистого клона проверен и по-прежнему доходит до работающего сервиса
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Схема remember:// требует dev-сборки; в Expo Go ссылку открывают как exp://127.0.0.1:8081/--/auth/email?token=…
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Сдано коммитами e220bf9 (api) и 0e7a50d (mobile) плюс правкой корневого README (2026-09-03). Восстановлено на доске задним числом 2026-09-03 из истории git.
<!-- SECTION:FINAL_SUMMARY:END -->
