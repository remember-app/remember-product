---
id: TASK-8
title: 'mobile: вход, выход и ник в приложении'
status: Done
assignee:
  - '@specialist'
created_date: '2026-09-03 10:16'
updated_date: '2026-09-03 10:17'
labels:
  - from-chief
milestone: m-1
dependencies:
  - TASK-5
  - TASK-6
  - TASK-7
priority: high
type: feat
ordinal: 8000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Человек входит в приложение — через Apple, через Google или по email-ссылке, — при первом входе придумывает ник, видит свой профиль и может выйти. Пока он не вошёл, внутрь приложения его не пускают.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Экран входа даёт три способа: Apple, Google, ссылка на email
- [x] #2 Переход по email-ссылке обменивает токен на сессию и впускает в приложение
- [x] #3 Первый вход без ника ведёт на экран ника; занятый и неверный ник показывают ошибку
- [x] #4 В профиле видно ник и имя, ник можно сменить, выход возвращает на экран входа
- [x] #5 Пока человек не вошёл, экраны приложения недоступны
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 Токен сессии лежит в защищённом хранилище телефона, не в обычном
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Токен в expo-secure-store, доступ только при разблокированном устройстве и без выгрузки в облако. Сетевая ошибка не разлогинивает — только явный отказ сервера. Гейт на уровне маршрутов expo-router, а не скрытием кнопок. Кнопки Apple и Google подключены, но без ключей провайдера сервер отвечает отказом — падений нет.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Сдано в projects/mobile коммитом 68b8979 (2026-09-02). Восстановлено на доске задним числом 2026-09-03 из истории git.
<!-- SECTION:FINAL_SUMMARY:END -->
