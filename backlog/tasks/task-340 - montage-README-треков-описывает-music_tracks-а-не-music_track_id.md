---
id: TASK-340
title: 'montage: README треков описывает music_tracks, а не music_track_id'
status: Done
assignee: []
created_date: '2026-09-25 08:19'
updated_date: '2026-09-25 08:21'
labels:
  - from-chief
milestone: m-28
dependencies: []
priority: low
type: bug
ordinal: 333000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
В README каталога треков воркера сказано, что id трека приходит полем music_track_id, а api это поле давно отвергает: музыка называется списком music_tracks (id с полки или ключ своего трека), пожелание к треку — music_wishes.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 README каталога треков воркера описывает вход так, как он есть сейчас (music_tracks, music_wishes), без music_track_id; больше нигде в описании воркера прежнее поле не названо входом
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 Коммит в ветке worktree сервиса, слияние в dev — за лидом
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Файл projects/montage/montage/video/tracks/README.md (найдено тестировщиком TASK-322). Контракт — projects/api/docs/montages.md. Только описание, код не трогать.
<!-- SECTION:NOTES:END -->
