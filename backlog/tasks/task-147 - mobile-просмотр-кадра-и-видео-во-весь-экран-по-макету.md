---
id: TASK-147
title: 'mobile: просмотр кадра и видео во весь экран по макету'
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
ordinal: 154000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Кадр и видео во весь экран по новому макету: без кнопок снизу, с лентой миниатюр для листания и панелью действий.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Фото во весь экран, плавающая панель сверху, лента миниатюр и панель действий снизу — как в Viewer.html
- [ ] #2 Видео — шкала и таймкод, как в ViewerVideo.html
- [ ] #3 Лист сведений о кадре — как в SheetFrame.html
- [ ] #4 От прежней вёрстки экрана ничего не осталось
- [ ] #5 Автотесты зелёные
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Ничего лишнего не оставлено
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Экраны: Viewer, ViewerVideo, SheetFrame (design/screens/). doc-02 (открытие как в системной галерее: полноэкранно, панель действий снизу — сохранить в галерею телефона, поделиться, удалить; лента миниатюр для листания). Код полноэкранного просмотра — вычистить и собрать заново на новой библиотеке (TASK-142).
<!-- SECTION:NOTES:END -->
