---
id: TASK-7
title: 'api: вход через Apple и Google'
status: Done
assignee:
  - '@specialist'
created_date: '2026-09-03 10:15'
updated_date: '2026-09-03 10:17'
labels:
  - from-chief
milestone: m-1
dependencies:
  - TASK-5
priority: medium
type: feat
ordinal: 15000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Два оставшихся способа входа. Приложение отдаёт токен от Apple или Google, сервер сам проверяет его подлинность у провайдера и выдаёт свою сессию — ту же, что и вход по email-ссылке. Пока ключей провайдера нет, вход через него выключен и сервер всё равно поднимается.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Подпись токена проверяется у провайдера, проверяются издатель, адресат и срок
- [x] #2 Первый вход заводит пользователя, повторный узнаёт того же
- [x] #3 Ответ по форме тот же, что у входа по email-ссылке
- [x] #4 Без ключей провайдера маршрут отвечает понятным отказом, а сервер поднимается как обычно
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 Покрыто тестами на подменённой проверке — живых ключей нет
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Проверка через jose против JWKS провайдера. Аккаунты намеренно не сливаются ни между провайдерами, ни по совпадающему email — защита от угона. Без ключей маршрут отвечает 501.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Сдано в projects/api коммитом 4101b70 (2026-09-02). Восстановлено на доске задним числом 2026-09-03 из истории git.
<!-- SECTION:FINAL_SUMMARY:END -->
