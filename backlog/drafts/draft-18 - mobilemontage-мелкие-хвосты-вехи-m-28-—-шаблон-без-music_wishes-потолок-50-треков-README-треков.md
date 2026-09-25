---
id: DRAFT-18
title: >-
  mobile+montage: мелкие хвосты вехи m-28 — шаблон без music_wishes, потолок 50
  треков, README треков
status: Draft
assignee: []
created_date: '2026-09-25 08:15'
labels:
  - from-lead
milestone: m-28
dependencies: []
priority: low
type: bug
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Мелочи, найденные тестировщиками: приложение падает на шаблоне ролика без поля music_wishes (контракт обещает поле всегда); приложение не ограничивает выбор 50 треками, а api отвечает 400 на 51-й; в README треков воркера сказано, что id трека приходит полем music_track_id, а api его отвергает; ячейки календаря в макете 40 при цели 44 (вопрос к дизайну).
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Приложение не падает на шаблоне без music_wishes; выбор ограничен 50 треками с понятным ответом человеку; README треков воркера описывает music_tracks; про ячейки календаря дизайн ответил
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Коммит в ветке worktree сервиса, слияние в dev — за лидом
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Источник: отчёты тестировщиков TASK-323 и TASK-322. src/lib/montage/order.ts (fromTemplate), projects/montage/montage/video/tracks/README.md.
<!-- SECTION:NOTES:END -->
