---
id: TASK-139
title: 'api: соглашение при регистрации — без принятия нельзя получить ник'
status: Done
assignee: []
created_date: '2026-09-18 12:59'
updated_date: '2026-09-18 13:46'
labels:
  - from-chief
milestone: m-22
dependencies:
  - TASK-138
priority: high
type: feat
ordinal: 146000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
При регистрации человек принимает пользовательское соглашение (decision-9: распознавание лиц и животных названо отдельной строкой) — без этого получить ник (стать зарегистрированным) нельзя. Полный текст соглашения в этой задаче не нужен — черновик текста лид отправляет chief отдельно, человек его читает. Экранов не касается — Consent ждёт сообщения от M-21 о слитой библиотеке деталей.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Есть способ авторизованно отметить принятие соглашения; хранится с меткой времени
- [x] #2 Первое получение ника (POST /me/username, когда ника ещё нет) отклоняется, если соглашение не принято
- [x] #3 Принятие идемпотентно — повторное принятие не ошибка
- [x] #4 Смена уже занятого ника соглашения повторно не требует
- [x] #5 Тесты закрепляют: без принятия — отказ получить ник, после принятия — успех, повторное принятие безопасно
- [x] #6 Миграция — следующий свободный номер на main на момент слияния (после TASK-138), пара do/undo, идемпотентна
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Сделано в сабмодуле projects/api, ветка worktree-agent-aeae39b37d664167b, коммит 55181a5 (fast-forward от main 3a934d3; слияние в общий main — за человеком).

- POST /me/consent (за app.authenticate, без тела) пишет users.consent_accepted_at и отвечает {"accepted_at":"…"}; идемпотентность — coalesce(consent_accepted_at, now()), то есть повтор возвращает первое принятие.
- POST /me/username: оба условия в одном UPDATE — where id = … and (username is not null or consent_accepted_at is not null); нет строки — 403 {"error":"consent required"}. Смена занятого ника соглашения не спрашивает.
- Миграция 080.do/undo.consent.sql — users.consent_accepted_at timestamptz nullable, ADD/DROP COLUMN IF (NOT) EXISTS. Номер проверен на main перед коммитом (старший был 070); при слиянии перепроверить.
- Тесты в src/auth/identity.test.ts (3 новых) + общая фикстура acceptConsent в src/auth/testing.ts, через неё заводят людей с ником contacts.test.ts и members.test.ts. npm test — 96/96 зелёных, tsc чистый, biome по изменённым файлам чистый.
- README: раздел POST /me/consent и абзац про 403 в POST /me/username.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Соглашение принимается через POST /me/consent (идемпотентно, с меткой времени), без него первое получение ника отклоняется 403; смена уже занятого ника ничего не спрашивает. Миграция 080, тесты и README на месте.
<!-- SECTION:FINAL_SUMMARY:END -->
