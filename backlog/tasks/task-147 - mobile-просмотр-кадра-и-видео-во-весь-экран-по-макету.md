---
id: TASK-147
title: 'mobile: просмотр кадра и видео во весь экран по макету'
status: To Do
assignee: []
created_date: '2026-09-18 13:01'
updated_date: '2026-09-18 14:14'
labels:
  - from-chief
milestone: m-21
dependencies:
  - TASK-142
  - TASK-144
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
Экраны: Viewer, ViewerVideo, SheetFrame (design/screens/). doc-02 (открытие как в системной галерее: полноэкранно, панель действий снизу — сохранить в галерею телефона, поделиться, удалить; лента миниатюр для листания). ВАЖНО: полноэкранный просмотр кадра уже реализован внутри src/memory/frames.tsx (Modal на строке ~639, включая показ видео) — это тот же файл, что у TASK-144 (галерея). Дождись, пока TASK-144 смёржена в main, и продолжай в уже обновлённом файле, не создавай второй экран/файл параллельно. Лист сведений о кадре (SheetFrame) в коде пока не существует — новый компонент.
<!-- SECTION:NOTES:END -->
