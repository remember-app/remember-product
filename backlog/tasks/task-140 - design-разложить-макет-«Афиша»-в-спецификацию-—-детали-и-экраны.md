---
id: TASK-140
title: 'design: разложить макет «Афиша» в спецификацию — детали и экраны'
status: Done
assignee: []
created_date: '2026-09-18 13:00'
updated_date: '2026-09-18 13:16'
labels:
  - from-chief
milestone: m-21
dependencies: []
priority: high
type: feat
ordinal: 147000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Разложить макет «Афиша» (design/) в спецификацию: все повторяющиеся детали интерфейса со всеми их видами и состояниями, и как из них собран каждый экран. Оригиналы страниц макета остаются на месте. Нужно для всех трёх вех — вход по коду и заказ ролика тоже строятся на этой библиотеке.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Каждая деталь макета описана со всеми видами и состояниями, которые есть в screens/*.html
- [x] #2 Токены тёмной и светлой темы, шрифты Unbounded/Onest и шкала размеров зафиксированы
- [x] #3 Для каждого из 46 экранов описано, из каких деталей и в каком состоянии он собран
- [x] #4 Оригиналы страниц макета не изменены
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 Ничего лишнего не оставлено
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
design/README.md — читать первым. Разложить весь макет (все 46 экранов в design/screens/), включая Login/LoginEmail/LoginCode/Consent/Username (веха Code sign-in) и MontageSelect/SheetRejected/MontageStory/MontageMusic/MontageBuild/MontageProgress/SheetTooLittle (веха Montage director) — их спецификация нужна тем вехам позже, сборка не в этой вехе. Токены и шрифты — design/README.md разделы 1-2. Спека пишется в design/, оригиналы screens/*.html и index.html не трогать. Использовать skill designer-import.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Спецификация design/spec.md (1141 строка, коммит 2f9bdaf): токены ночи/дня, шрифты Unbounded/Onest со шкалой, 43 детали со всеми видами и состояниями, сборка всех 46 экранов (включая пять входа и семь заказа ролика — впрок для M-22/M-23), раздел расхождений и решений для человека. Оригиналы design/screens не тронуты. Проверено лидом: все 46 экранов из design/screens/ названы в разделе 8, токены обеих тем и шрифты зафиксированы в разделах 2-3, диффа по оригиналам нет.
<!-- SECTION:FINAL_SUMMARY:END -->
