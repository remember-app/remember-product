---
id: TASK-425
title: 'mobile: онбординг по новой выгрузке — прогресс, шапки шагов, клавиатура'
status: In Progress
assignee:
  - '@specialist'
created_date: '2026-09-27 10:36'
updated_date: '2026-09-27 11:11'
labels:
  - from-chief
milestone: m-30
dependencies:
  - TASK-421
priority: medium
type: feat
ordinal: 414000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Вход в приложение переделан по новой спеке: полоса прогресса из пяти сегментов, своя короткая шапка у каждого шага, и клавиатура больше ничего не двигает кроме главной кнопки.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 на шагах входа (Login, LoginEmail, LoginCode/LoginCodeKeys, Consent, Username) видна тонкая полоса прогресса из пяти сегментов; вход через Apple/Google дорисовывает её со второго по четвёртый сегмент
- [ ] #2 у каждого шага своя короткая шапка по тексту из спеки
- [ ] #3 при поднятой клавиатуре (шаг ввода кода) двигается только главная кнопка — всё остальное остаётся на месте, под полем ввода ничего не появляется
- [ ] #4 после регистрации поведение прежнее — главный экран или воспоминание, куда позвали
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Коммит в ветке worktree сервиса mobile, слияние в dev — за лидом
- [ ] #2 Автотесты мобильного приложения зелёные
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Репозиторий mobile (worktree), ветка dev. Смотри design/spec.md (уже обновлён TASK-421) — экраны Login, LoginEmail, LoginCode, LoginCodeKeys, Consent, Username. LoginCodeKeys — тот же шаг LoginCode, но с поднятой клавиатурой; проверь, можно ли обойтись одним экраном с двумя состояниями вместо двух роутов. Проверь src/kit на готовый компонент прогресс-полосы, прежде чем городить новый.
<!-- SECTION:NOTES:END -->
