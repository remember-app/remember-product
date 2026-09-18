---
id: TASK-143
title: 'mobile: главный экран и создание воспоминания по макету «Афиша»'
status: Done
assignee: []
created_date: '2026-09-18 13:01'
updated_date: '2026-09-18 14:36'
labels:
  - from-chief
milestone: m-21
dependencies:
  - TASK-142
  - TASK-141
priority: high
type: feat
ordinal: 150000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Главный экран (список воспоминаний) и создание нового — по новому макету, в тёмной и светлой теме, вместе с пустым списком, загрузкой и плашкой «нет соединения».
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Главный экран и создание воспоминания выглядят как в Main.html/HomeDay.html/Create.html, в обеих темах
- [x] #2 Пустой список, загрузка и плашка «нет соединения» с её автоматическим уходом — как в HomeEmpty/HomeLoading/HomeOffline/HomeOnline
- [x] #3 Карточка воспоминания показывает, сколько участников уже скинули кадры, без отдельного запроса на карточку
- [x] #4 В шапке главного экрана одна иконка, ведущая на «Аккаунт»
- [x] #5 От прежней вёрстки экрана ничего не осталось
- [x] #6 Автотесты зелёные
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 Ничего лишнего не оставлено
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Экраны макета: Main, HomeDay, Create, HomeEmpty, HomeLoading, HomeOffline, HomeOnline (design/screens/). src/app/index.tsx и src/app/create.tsx — код вычистить и собрать заново на новой библиотеке (TASK-142), не поверх старой вёрстки. Карточка воспоминания показывает сводку вклада участников — поле из TASK-141 (GET /memories, doc-06). Шапка держит одну иконку (на «Аккаунт»), второй иконки на «Контакты» больше нет — сравнить с текущим src/app/index.tsx, где их две.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
2f4f327: src/app/index.tsx и src/app/create.tsx собраны заново по Main/HomeDay/Create + HomeEmpty/HomeLoading/HomeOffline/HomeOnline, целиком на ките. Крупная карточка только когда есть материал (пустое воспоминание — обычной карточкой с пунктиром, по образцу «Корпоратив Nox» в макете). Сводка «N из M» читается из списка без доп.запроса (TASK-141). Одна иконка в шапке — на Аккаунт. Слито в main лидом. Проверено: typecheck и 427 тестов зелёные в main.
<!-- SECTION:FINAL_SUMMARY:END -->
