---
id: TASK-570
title: 'montage: lint на dev красный — две длинные строки в test_journal_entries.py'
status: Done
assignee: []
created_date: '2026-10-28 13:55'
updated_date: '2026-10-28 14:04'
labels:
  - from-lead
dependencies: []
priority: medium
type: bug
ordinal: 549000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
На dev воркера `ruff check` красный: в tests/test_journal_entries.py две строки по 101 символу (E501), и `ruff format --check` хочет переформатировать файл. Файл последним трогали TASK-468 и TASK-500 — m-39 его не касалась. Найдено на приёмке m-39.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 ruff check и ruff format --check по tests/test_journal_entries.py чисты
- [x] #2 Ничего, кроме форматирования, не переписано
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 ruff по всему репозиторию воркера чист
<!-- DOD:END -->

## Comments

<!-- COMMENTS:BEGIN -->
created: 2026-10-28 14:04
---
Принято. Правка — только переносы строк, логика не тронута.

Проверено ведущим: на dev до слияния ruff check давал 2 × E501 и format --check хотел переформатировать; в ворктри с правкой — «All checks passed», «71 files already formatted».
Слито в dev: 34d3057 → f908777. На dev после слияния ruff check . и ruff format --check . чисты.
---
<!-- COMMENTS:END -->
