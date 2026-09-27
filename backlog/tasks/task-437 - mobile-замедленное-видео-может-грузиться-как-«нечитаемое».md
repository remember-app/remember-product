---
id: TASK-437
title: 'mobile: замедленное видео может грузиться как «нечитаемое»'
status: To Do
assignee: []
created_date: '2026-09-27 12:13'
labels:
  - from-lead
dependencies: []
priority: low
type: bug
ordinal: 426000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Найдено попутно при разборе TASK-434: для замедленной съёмки (slow-mo) expo-media-library отдаёт localUri голым путём без file://. Без схемы права на файл определяются как «никаких», и такое видео, вероятно, встанет как «нечитаемое» — не подтверждено на реальном видео, только по чтению исходников.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 загрузка замедленного видео с телефона либо подтверждённо работает, либо причина найдена и починена так же, как TASK-434
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
См. отчёт TASK-434, раздел Findings — MediaLibraryModule.swift:490. Не начинай, пока не будет реального замедленного видео для проверки (от человека) или более сильного сигнала, что это происходит на практике — сейчас это только гипотеза по коду.
<!-- SECTION:NOTES:END -->
