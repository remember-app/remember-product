---
id: DRAFT-5
title: 'mobile: «Поделиться» пачкой кадров открывает системный лист по одному файлу'
status: Draft
assignee: []
created_date: '2026-09-21 14:48'
labels:
  - from-lead
milestone: m-24
dependencies: []
priority: low
type: feat
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
В режиме выбора «Поделиться» несколькими кадрами открывает системный лист по файлу: ни Share из React Native, ни expo-sharing больше одного вложения не берут, а новую зависимость поставить было нельзя. Вопрос к человеку: нужен ли один лист на все кадры (нативный код/новая зависимость) или пока так. Помечено ponytail в src/memory/frames.tsx.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Решение по слову человека записано; если нужен один лист — поделиться несколькими кадрами открывает один системный лист
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Ничего лишнего не оставлено
<!-- DOD:END -->
