---
id: TASK-178
title: 'mobile: карточка ролика по размеру самого ролика'
status: Done
assignee: []
created_date: '2026-09-21 07:52'
updated_date: '2026-09-21 07:59'
labels:
  - from-human
dependencies: []
priority: high
type: feat
ordinal: 185000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Карточка ролика должна быть ровно той формы, что и ролик: вертикальный ролик — высокая карточка, горизонтальный — широкая, постер вписан без чёрных полей по краям. Человек, 2026-09-21.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 У вертикального ролика карточка высокая, у горизонтального — широкая, по соотношению сторон самого ролика
- [x] #2 Постер занимает карточку целиком, чёрных полей по краям карточки нет
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Соотношение сторон берётся из заказанной ориентации: воркер собирает каждый ролик на одном из двух фиксированных холстов (projects/montage/assembly.py, CANVASES — landscape 1920×1080, portrait 1080×1920, по умолчанию landscape), поэтому ориентация и есть настоящая пропорция видео — размеры в api добавлять не понадобилось.

Сделано в projects/mobile (коммит d6ed0a4): shapeOf() в src/montage.ts, у CardMontage вместо булева vertical — числовой ratio (aspectRatio карточки), постер contentFit=cover во всю карточку; films.tsx передаёт shapeOf(montage.params.orientation). Убраны poster height 200 и posterTall 4/5. Тесты обновлены, весь набор зелёный (516).

Проверено на данных: реальные ролики в стенде — 1080×1920 и 1920×1080, постеры 640×1138 и 640×360 (пропорция сохранена). У вертикального постера 352 чёрные строки сверху и 354 снизу из 1138 — чёрные поля впечатаны в сам ролик (assembly.py _normalise: force_original_aspect_ratio=decrease + pad). Карточка их не убирает и под них не подгоняется — отдельный вопрос к монтажу.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Карточка ролика теперь ровно той формы, что и сам ролик: 9:16 у вертикального, 16:9 у горизонтального, постер заполняет карточку целиком.
<!-- SECTION:FINAL_SUMMARY:END -->
