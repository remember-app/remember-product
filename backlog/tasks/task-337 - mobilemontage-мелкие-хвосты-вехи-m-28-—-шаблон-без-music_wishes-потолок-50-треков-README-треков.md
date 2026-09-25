---
id: TASK-337
title: >-
  mobile: шаблон без music_wishes не роняет приложение, выбор ограничен 50
  треками
status: Done
assignee: []
created_date: '2026-09-25 08:15'
updated_date: '2026-09-25 08:29'
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
- [x] #1 Приложение не падает на шаблоне ролика без поля music_wishes: пожеланий у шаблона просто нет
- [x] #2 Выбор треков ограничен 50 (потолок api): 51-й не добавляется, человеку сказано понятными словами на обоих языках; автотесты зелёные и покрывают оба случая
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 Коммит в ветке worktree сервиса, слияние в dev — за лидом
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Источник: отчёты тестировщиков TASK-323 и TASK-322. src/lib/montage/order.ts (fromTemplate), projects/montage/montage/video/tracks/README.md.

Chief 2026-09-25: первое по срочности — падение на шаблоне без пожеланий (src/lib/montage/order.ts, fromTemplate). README треков воркера — отдельная карточка про montage; ячейки календаря 40 против 44 — вопрос дизайну, не здесь.
<!-- SECTION:NOTES:END -->
