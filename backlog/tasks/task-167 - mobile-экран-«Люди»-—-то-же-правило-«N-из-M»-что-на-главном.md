---
id: TASK-167
title: 'mobile: экран «Люди» — то же правило «N из M», что на главном'
status: Done
assignee: []
created_date: '2026-09-18 15:48'
updated_date: '2026-09-18 15:58'
labels:
  - from-chief
milestone: m-21
dependencies: []
priority: medium
type: feat
ordinal: 174000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Экран «Люди» считает уже скинувших только по статусу «всё загрузил» — по решению chief в число скинувших входит и «ждать нечего» (человек ответил, что материала не будет). Знаменатель на этом экране уже верно не считает зрителей — трогать не нужно.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Статус nothing считается скинувшим наравне с done на экране «Люди»
- [x] #2 Число на экране «Люди» совпадает с числом на главном экране для одного и того же воспоминания при том же наборе статусов
- [x] #3 Автотесты зелёные
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 Ничего лишнего не оставлено
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
src/memory/people.tsx (строки около 154-155, комментарий #4 в задаче ревью) — добавить статус nothing к тем, кто считается скинувшим, рядом с done. Знаменатель (организатор + contributor) уже правильный, зрителей не считает — не менять. Правило то же самое, что теперь на сервере в GET /memories (TASK-166) — держать оба места в согласии, doc-06 — источник смысла. Тест: тот же набор статусов, что в тесте TASK-166 (done/nothing/more_coming/viewer), число должно совпасть с тем, что покажет главный экран на этом же воспоминании.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
3f82116: правило «скинул = done или nothing» вынесено в hasShared(status) в src/api.ts, читают оба места экрана «Люди» (сводка и чип «нечего добавлять») — раньше было выписано дважды, теперь одна функция. Тесты: таблица по всем статусам + ростер (done/nothing/more_coming/viewer) → «2 из 3», совпадает с числом api (TASK-166, тоже уже в main). Слито в main лидом (fast-forward). Проверено: typecheck и 503 теста зелёные в main.
<!-- SECTION:FINAL_SUMMARY:END -->
