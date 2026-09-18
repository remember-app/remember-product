---
id: TASK-147
title: 'mobile: просмотр кадра и видео во весь экран по макету'
status: Done
assignee: []
created_date: '2026-09-18 13:01'
updated_date: '2026-09-18 15:15'
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
- [x] #1 Фото во весь экран, плавающая панель сверху, лента миниатюр и панель действий снизу — как в Viewer.html
- [x] #2 Видео — шкала и таймкод, как в ViewerVideo.html
- [x] #3 Лист сведений о кадре — как в SheetFrame.html
- [x] #4 От прежней вёрстки экрана ничего не осталось
- [x] #5 Автотесты зелёные
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 Ничего лишнего не оставлено
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Экраны: Viewer, ViewerVideo, SheetFrame (design/screens/). doc-02 (открытие как в системной галерее: полноэкранно, панель действий снизу — сохранить в галерею телефона, поделиться, удалить; лента миниатюр для листания). ВАЖНО: полноэкранный просмотр кадра уже реализован внутри src/memory/frames.tsx (Modal на строке ~639, включая показ видео) — это тот же файл, что у TASK-144 (галерея). Дождись, пока TASK-144 смёржена в main, и продолжай в уже обновлённом файле, не создавай второй экран/файл параллельно. Лист сведений о кадре (SheetFrame) в коде пока не существует — новый компонент.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
4cae377 (+ слияние main): полноэкранный просмотрщик вынесен из frames.tsx в новый src/memory/frame-viewer.tsx — панель сверху, лента миниатюр (доработана деталь кита filmstrip.tsx: прокрутка к текущему кадру через FlatList), панель действий (сохранить/поделиться/удалить), для видео — своя дорожка с таймкодом. Новый лист FrameSheet в frames-sheets.tsx. Слито в main лидом (fast-forward, main уже был предком ветки, включая параллельно слитый TASK-162 вехи Montage director). Проверено: typecheck и 475 тестов зелёные в main.
<!-- SECTION:FINAL_SUMMARY:END -->
