---
id: TASK-253
title: 'api: README журнала описывает заведение этапов не так, как делает воркер'
status: Done
assignee: []
created_date: '2026-09-24 07:34'
updated_date: '2026-09-24 09:43'
labels:
  - from-lead
milestone: m-27
dependencies: []
priority: low
type: bug
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
В описании журнала сказано, что строку этапа воркер заводит, когда до него дошёл; на деле он заводит все пять этапов сразу, в ожидании.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Раздел README про журнал говорит, как есть: пять этапов заводятся сразу, до первой записи
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 Слито в main api, указатель в корне подтянут
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Найдено ревьюером приложения m-27. Источник истины — journal.begin в projects/montage (journal.py). Сверить и раздел README воркера.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
README api про журнал приведён в соответствие с воркером: пять этапов заводятся разом, в ожидании, до первой записи; что видит читающий у ролика в очереди, взятого, готового и упавшего; список роликов (пять этапов или null). Заодно исправлены неверные «записи только дописываются» и пример ответа, и три комментария в коде api (только текст). Слито в main api (9b4cb6a), линт и типы чисто.
<!-- SECTION:FINAL_SUMMARY:END -->
