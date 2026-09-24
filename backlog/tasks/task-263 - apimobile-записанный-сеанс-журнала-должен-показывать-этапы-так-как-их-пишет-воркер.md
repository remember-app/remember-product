---
id: TASK-263
title: >-
  api+mobile: записанный сеанс журнала должен показывать этапы так, как их пишет
  воркер
status: In Progress
assignee: []
created_date: '2026-09-24 09:41'
updated_date: '2026-09-24 10:25'
labels:
  - from-lead
milestone: m-27
dependencies: []
priority: medium
type: bug
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
В сквозных тестах журнала этапы появляются по одному, по мере сборки, а настоящий воркер заводит все пять сразу, в ожидании. Тесты приложения проверяют то, чего в жизни не бывает, и не проверяют то, что бывает.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Сеанс в сквозном тесте api заводит пять этапов разом в ожидании, как воркер, и дальше только меняет их состояние; записанные ответы для приложения перезаписаны с этой моделью
- [ ] #2 Копии записей и тесты приложения обновлены; приложение проверено на пяти этапах в ожидании с первого опроса; наборы api и приложения зелёные
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Слито в main api и приложения, указатели в корне подтянуты
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Найдено кодером README api по TASK-253. Тест src/montages/journal.golden.test.ts (api) заводит строку этапа, когда этап начинается; настоящий воркер — journal.begin, все пять сразу до первого файла. Из-за этого в записи live_first_open_empty этапов нет, в опросах их растёт число; в проекте mobile лежат копии — src/recorded-api. Ответственность — TASK-230 (тестовое звено).
<!-- SECTION:NOTES:END -->
