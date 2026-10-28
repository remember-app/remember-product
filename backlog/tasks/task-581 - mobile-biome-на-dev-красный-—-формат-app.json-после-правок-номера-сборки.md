---
id: TASK-581
title: 'mobile: biome на dev красный — формат app.json после правок номера сборки'
status: Done
assignee: []
created_date: '2026-10-28 16:56'
updated_date: '2026-10-28 16:58'
labels:
  - from-lead
milestone: m-40
dependencies: []
priority: low
type: bug
ordinal: 560000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Линтер на dev падает не из-за кода приложения: в app.json блок granularPermissions разложен по строкам, и biome требует одной строкой. Из-за этого проверка biome не может быть зелёной ни у одной карточки m-40, хотя их файлы чистые.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 biome check --error-on-warnings на dev выходит с кодом 0
- [x] #2 Правка касается только форматирования app.json, поведение не меняется
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 biome на dev зелёный, правка только формат
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Работа идёт в projects/mobile; первым делом pwd и git rev-parse --show-toplevel, при несовпадении — стоп. Файл app.json, блок ios.infoPlist.NSPhotoLibraryUsageDescription и granularPermissions разложен по строкам — привести к формату biome (одна строка). Запуск: biome check --error-on-warnings, код возврата 0. Ничего не деплоить, в удалённую ветку не пушить. После себя не оставлять временных файлов.
<!-- SECTION:NOTES:END -->
