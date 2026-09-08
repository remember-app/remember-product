---
id: TASK-109
title: 'mobile: имя и дата наезжают на фото при полноэкранном просмотре'
status: To Do
assignee: []
created_date: '2026-09-08 17:58'
updated_date: '2026-09-08 18:12'
labels:
  - from-human
milestone: m-16
dependencies:
  - TASK-106
priority: medium
type: bug
ordinal: 113000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Человек 2026-09-08 со скриншотом: сверху текст с именем и датой лежит прямо на снимке. Переделать по киту.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Имя и дата над открытым кадром читаются на любой фотографии — под текстом есть затемнение, а не голый снимок
- [ ] #2 Проверено рассуждением/тестом, что затемнение действительно рисуется на настоящем iPhone, а не только в симуляторе — учтено, что experimental_backgroundImage в RN 0.86 может не держаться
- [ ] #3 Названа причина, а не только визуально подложен цвет под текст точечно
<!-- AC:END -->
