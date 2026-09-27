---
id: TASK-428
title: 'mobile: экран ролика Film и сведения SheetFilmInfo'
status: To Do
assignee: []
created_date: '2026-09-27 10:37'
updated_date: '2026-09-27 11:09'
labels:
  - from-chief
milestone: m-30
dependencies:
  - TASK-421
  - TASK-423
  - TASK-430
priority: medium
type: feat
ordinal: 417000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Новый экран ролика Film (постер, этапы сборки, «Сохранить на телефон») и лист сведений SheetFilmInfo (шаблон, музыка, кадры, файл, кем собран, кто посмотрел, переименовать, удалить). Заодно имя ролика становится редактируемым на итоге заказа, не только в сведениях.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Film открывается тапом по готовому ролику: постер во всю ширину, кнопки «Назад» / капсула с названием / «Поделиться», блок этапов сборки, «Сохранить на телефон»
- [ ] #2 SheetFilmInfo показывает шаблон, музыку, кадры, файл, кем собран, кто из участников уже посмотрел ролик
- [ ] #3 имя ролика правится и на итоге заказа (MontageSummary), и в SheetFilmInfo («Переименовать»); новое имя сохраняется на сервере и видно везде
- [ ] #4 «Удалить ролик» в SheetFilmInfo удаляет его насовсем и убирает из списка роликов
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Коммит в ветке worktree сервиса mobile, слияние в dev — за лидом
- [ ] #2 Автотесты мобильного приложения зелёные
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Репозиторий mobile (worktree), ветка dev. Опирается на design/spec.md (TASK-421, экраны Film, SheetFilmInfo, MontageSummary) и на TASK-423 (api) — имя/переименование, «кто посмотрел» и удаление ролика должны быть в dev api. MontageSummary уже существует и уже показывает заголовок-имя по умолчанию как статичный текст (TASK-191) — сделай его тем самым редактируемым полем, не новым экраном.
<!-- SECTION:NOTES:END -->
