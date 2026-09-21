---
id: DRAFT-1
title: 'api+mobile: в журнале у каждой записи с файлом видно его имя (IMG_2041)'
status: Draft
assignee: []
created_date: '2026-09-21 14:47'
labels:
  - from-lead
milestone: m-27
dependencies:
  - TASK-200
priority: low
type: feat
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
В макете строка записи журнала и карточка файла называют файл по имени («IMG_2041 · Аня»). Сейчас ответ журнала имени файла не несёт, и строка показывает только автора.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Ответ журнала отдаёт имя файла у сведений о файле (то, что api уже хранит по TASK-191), у старых кадров без имени поле пустое, не ошибка
- [ ] #2 Строка записи и карточка файла показывают имя рядом с автором; без имени — как сейчас
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Найдено при приёмке TASK-221 (лид M-27, 2026-09-21). Макеты MontageLiveStage.html, SheetLiveFile.html. Имя файла заведено вехой Afisha 2 (TASK-191, media_items). Правка маленькая: journal.ts — поле в files[], mobile — строка записи и лист. Черновик: ждёт слова chief/человека.
<!-- SECTION:NOTES:END -->
