---
id: TASK-272
title: 'review: подгонка под музыку — длина в заказе (TASK-268)'
status: In Progress
assignee: []
created_date: '2026-09-24 11:08'
labels:
  - from-chief
milestone: m-26
dependencies: []
priority: high
type: feat
ordinal: 269000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Свежие глаза над правкой ритма: подгонка склеек под биты теперь держит длину заказа. Меняется алгоритм для каждого ролика с музыкой, поэтому смотрит ревьюер, а не только тесты автора.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Три взгляда — баги, чистота, безопасность — пройдены над коммитами TASK-268 в воркере (8768e96, b24df34)
- [ ] #2 Реальные находки исправлены и слиты, отвергнутые и отложенные названы в заметках; весь набор воркера зелёный
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Коммиты слиты в main сабмодуля montage, указатель в корне подтянут
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Код: projects/montage rhythm.py (fit: стык к ближайшему биту от своего места, последний кусок принимает сдвиг, кадровое округление _whole_frames), montage.py, selection.py, test_rhythm.py, test_montage.py, fixtures/journal_algorithm.json (перезаписан — номера). Особое внимание: край последнего куска (пол 1,5 с, целый клип без запаса), совместимость с journal M-27 (cuts считает только стыки), путь режиссёра, ролик без музыки без изменений, жёсткие 600,0 из TASK-262.
<!-- SECTION:NOTES:END -->
