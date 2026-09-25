---
id: TASK-322
title: 'test: montage вехи m-28 — пожелание доходит до режиссёра'
status: Done
assignee: []
created_date: '2026-09-25 07:46'
updated_date: '2026-09-25 08:06'
labels:
  - from-chief
milestone: m-28
dependencies:
  - TASK-307
priority: medium
type: feat
ordinal: 319000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Автотесты воркера: пожелание к музыке доходит до режиссёра у своего трека, и воркер читает то, что пишет api.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Тест держит стык с api: params в точно той форме, какую пишет api по docs/montages.md (music_tracks + music_wishes), собираются воркером, и в сохранённом запросе к нейросети пожелание стоит у своего трека, у других треков его нет, общего поля нет; форма params сверена с настоящим выводом api, а не придумана
- [x] #2 Сценарии по чек-листу: без музыки, один трек, несколько треков с пожеланиями у части, свой трек (ключ music/…), пожелание к треку не из списка, старая строка params (music_note), повтор упавшей сборки
- [x] #3 Полный набор тестов сервиса на актуальном main зелёный; красное разобрано: настоящий дефект назван и не спрятан, нагрузочный вылет по времени отделён от дефекта
- [x] #4 Ничего сверх тестирования: найденный дефект кода назван в отчёте с воспроизведением, а не исправлен молча
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 Тесты и правки — коммитами в ветке worktree сервиса, слияние в main — за лидом
- [x] #2 Полный набор тестов сервиса зелёный, в своей тестовой базе
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Сервис projects/montage, main. Свои база (remember_t311) и MinIO (порт 9017, свой бакет); набор тестов воркера по умолчанию целится в бакет стенда человека (TASK-284) — не допускать; стенд не трогать. Форму params брать из projects/api/docs/montages.md и из теста заказа projects/api/src/montages/order.test.ts (читать, не менять). ruff — .venv/bin/ruff основного checkout с --no-respect-gitignore.
<!-- SECTION:NOTES:END -->
