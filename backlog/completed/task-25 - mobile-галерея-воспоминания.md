---
id: TASK-25
title: 'mobile: галерея воспоминания'
status: Done
assignee: []
created_date: '2026-09-03 13:00'
updated_date: '2026-09-04 10:40'
labels:
  - from-chief
milestone: m-3
dependencies:
  - TASK-21
  - TASK-22
priority: high
type: feat
ordinal: 29000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
На экране воспоминания появляется галерея — фото и видео, которые сложили участники, видны всем. Видео играет прогрессивным превью 720p. Своё можно удалить, организатор удаляет любое. Догрузить ещё — всегда.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Галерея показывает деривативы всех ready-медиа воспоминания; processing и failed — плейсхолдер (для failed с «повторить», если дёшево)
- [x] #2 Видит любой участник, включая viewer; видео играет 720p-превью прогрессивно (expo-video)
- [x] #3 Удаление: своё — всегда, любое — организатор; после удаления пропадает из галереи
- [x] #4 Вход «добавить ещё» доступен всегда, в том числе после монтажа
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
expo-video заявлен в стеке architecture.md, но в package.json его нет — добавить. Список и подписанные ссылки — из GET /memories/:memoryId/media (TASK-21). Разместить на src/app/memory/[id].tsx или отдельным экраном, но вход с экрана воспоминания. Удаление зовёт DELETE .../media/:id (TASK-21).
<!-- SECTION:NOTES:END -->
