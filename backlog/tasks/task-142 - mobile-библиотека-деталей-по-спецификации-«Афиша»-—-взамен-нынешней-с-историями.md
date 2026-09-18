---
id: TASK-142
title: >-
  mobile: библиотека деталей по спецификации «Афиша» — взамен нынешней, с
  историями
status: Done
assignee: []
created_date: '2026-09-18 13:01'
updated_date: '2026-09-18 14:10'
labels:
  - from-chief
milestone: m-21
dependencies:
  - TASK-140
priority: high
type: feat
ordinal: 149000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Собрать в приложении настоящую библиотеку деталей по новой спецификации — взамен нынешней: новые цвета, шрифты с кириллицей, тёмная тема целиком, светлая — подстановкой цветов. На каждый вид и состояние каждой детали — своя история. Как только она в main приложения — сообщить об этом вехам «Code sign-in» и «Montage director» и chief: их экраны строятся на этой библиотеке.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Шрифты Unbounded и Onest подключены и показывают кириллицу
- [ ] #2 Токены тёмной темы и радиусы/ритм из спецификации — в src/theme.ts, светлая тема собрана подстановкой
- [ ] #3 Каждая деталь спецификации реализована на каждый её вид и состояние, с историей/тестом на каждый
- [ ] #4 Ни один компонент не использует старую библиотеку — она заменена целиком
- [ ] #5 Тесты и проверка типов зелёные
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Ничего лишнего не оставлено
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Зависит от задачи спецификации (TASK-140). Источник — спецификация в design/ (плюс design/README.md разделы 1-2). Полностью заменяет src/kit/*, собранный под старый design/kit.html (его больше нет). Skill coder-kit. Шрифты — Unbounded 600/700, Onest 400…700, оба с кириллицей (прежний Bricolage Grotesque кириллицы не поддерживал — это и меняем). Светлая тема — подстановка токенов по образцу экрана HomeDay. После слияния в main mobile-репозитория — написать LEAD M-22-Code-sign-in, LEAD M-23-Montage-director и CHIEF remember [c7d1bc] (сессия remember, не спутать с одноимённым chief другого продукта).
<!-- SECTION:NOTES:END -->
