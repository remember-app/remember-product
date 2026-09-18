---
id: TASK-146
title: 'mobile: выбор и загрузка кадров с телефона по макету'
status: To Do
assignee: []
created_date: '2026-09-18 13:01'
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
- [ ] #1 Выбор кадров из галереи телефона выглядит как в Upload.html
- [ ] #2 Отказ и частичный доступ к медиатеке — как в UploadAccess.html/UploadLimited.html
- [ ] #3 Очередь отправки и пустой выбор — как в UploadQueue.html/UploadEmpty.html
- [ ] #4 Вопрос «Это всё?» после отправки — как в SheetAskAll.html
- [ ] #5 От прежней вёрстки экрана ничего не осталось
- [ ] #6 Автотесты зелёные
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Ничего лишнего не оставлено
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Экраны: Upload, UploadAccess, UploadLimited, UploadQueue, UploadEmpty, SheetAskAll (design/screens/). doc-02. src/app/memory/[id]/upload.tsx — вычистить и собрать заново на новой библиотеке (TASK-142).
<!-- SECTION:NOTES:END -->
