---
id: TASK-146
title: 'mobile: выбор и загрузка кадров с телефона по макету'
status: Done
assignee: []
created_date: '2026-09-18 13:01'
updated_date: '2026-09-18 14:38'
labels:
  - from-chief
milestone: m-21
dependencies:
  - TASK-142
priority: high
type: feat
ordinal: 153000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Выбор и отправка кадров с телефона по новому макету: отказ и частичный доступ к галерее, очередь отправки, вопрос «это всё?» после отправки.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Выбор кадров из галереи телефона выглядит как в Upload.html
- [x] #2 Отказ и частичный доступ к медиатеке — как в UploadAccess.html/UploadLimited.html
- [x] #3 Очередь отправки и пустой выбор — как в UploadQueue.html/UploadEmpty.html
- [x] #4 Вопрос «Это всё?» после отправки — как в SheetAskAll.html
- [x] #5 От прежней вёрстки экрана ничего не осталось
- [x] #6 Автотесты зелёные
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 Ничего лишнего не оставлено
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Экраны: Upload, UploadAccess, UploadLimited, UploadQueue, UploadEmpty, SheetAskAll (design/screens/). doc-02. src/app/memory/[id]/upload.tsx — вычистить и собрать заново на новой библиотеке (TASK-142).
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
58eae8c: src/app/memory/[id]/upload.tsx собран заново по Upload/UploadAccess/UploadLimited/UploadQueue/UploadEmpty/SheetAskAll — один файл, пять лиц макета. «Это всё?» переехал из системного Alert в лист, очередь (src/uploads.ts) отдаёт момент через useAskAll(). Слито в main лидом. Проверено: typecheck и 430 тестов зелёные в main.
<!-- SECTION:FINAL_SUMMARY:END -->
