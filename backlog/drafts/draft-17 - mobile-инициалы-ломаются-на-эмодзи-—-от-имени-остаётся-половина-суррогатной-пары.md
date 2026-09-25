---
id: DRAFT-17
title: >-
  mobile: инициалы ломаются на эмодзи — от имени остаётся половина суррогатной
  пары
status: Draft
assignee: []
created_date: '2026-09-25 09:50'
labels:
  - from-specialist
milestone: m-28
dependencies: []
priority: medium
type: bug
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Функция инициалов в ките берёт первый символ по единице UTF-16: для имени «😀 Аня» получается половина суррогатной пары, на телефоне вместо буквы — «�». Касается кружков в стопках, лица фильтра, строк людей. Найдено тестировщиком второго круга m-28; воспроизведено.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Инициалы берутся по символу целиком (эмодзи, составные знаки), ни при каком имени на экране нет «�»; тест падает на прежнем коде
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Коммит в ветке worktree сервиса, слияние в dev — за лидом
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
src/kit/member.tsx, initials(): initials('😀 Аня') даёт '\ud83dА', initials('Аня 🌸') даёт 'А\ud83c'. Решить, что считать инициалом у имени из одних эмодзи — по спеке аватара.
<!-- SECTION:NOTES:END -->
