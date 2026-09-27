---
id: TASK-419
title: 'mobile: кадр из iCloud не читается с телефона — загрузка падает'
status: To Do
assignee: []
created_date: '2026-09-27 09:54'
labels:
  - from-human
dependencies: []
priority: high
type: bug
ordinal: 408000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
С включённой «Оптимизацией хранения iPhone» снимок лежит в iCloud, а не на устройстве. Приложение не может его прочитать и пишет «Could not be read from the phone's gallery» — загрузка не идёт. Человек, 2026-09-27, с настоящего телефона. Заодно в этом тексте опечатка: «prone's» вместо «phone's».
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Снимок, лежащий в iCloud, скачивается и уходит в воспоминание
- [ ] #2 Пока идёт скачивание из iCloud, человек видит, что происходит, а не ошибку
- [ ] #3 Настоящая невозможность прочитать файл называется понятными словами, без опечаток, на обоих языках
<!-- AC:END -->
