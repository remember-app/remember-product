---
id: TASK-432
title: 'montage: обработчик пишет размер собранного видео'
status: Done
assignee:
  - '@specialist'
created_date: '2026-09-27 11:26'
updated_date: '2026-09-27 11:40'
labels:
  - from-lead
milestone: m-30
dependencies:
  - TASK-424
priority: medium
type: feat
ordinal: 421000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Api уже готов отдавать размер файла готового ролика (TASK-430, колонка montages.size_bytes), но обработчик его не пишет — сохраняет только ключи файла и длительность. Без этого сведения ролика (SheetFilmInfo) всегда будут показывать пустой размер.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 при переходе ролика в статус ready в базе сохраняется реальный размер собранного видеофайла в байтах
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Коммит в ветке worktree сервиса montage, слияние в dev — за лидом
- [ ] #2 Автотесты montage зелёные
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Сделано (коммит fb46c2c, смержен в montage/dev, ПОКА НЕ ЗАПУШЕН — ждёт api): при переходе в ready воркер меряет assembled.stat().st_size на диске перед заливкой и пишет в montages.size_bytes. Тест — реальная сборка ffmpeg end-to-end: скачивает готовый файл из бакета и сверяет размер с базой; без правки падает (assert None == 275027), с правкой проходит. 479/480 (1 skip — требует настоящих ключей Google).
Порядок выкладки как и в TASK-424: пушу montage только после того, как api (миграция 170) уйдёт в origin первой.
<!-- SECTION:NOTES:END -->
