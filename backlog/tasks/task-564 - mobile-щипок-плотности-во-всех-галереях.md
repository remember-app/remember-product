---
id: TASK-564
title: 'mobile: щипок плотности во всех галереях'
status: Done
assignee: []
created_date: '2026-10-28 13:48'
updated_date: '2026-10-28 14:11'
labels:
  - from-lead
milestone: m-38
dependencies: []
priority: medium
type: feat
ordinal: 543000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Человек решил (decision-27): плотность задаётся щипком не только в ленте воспоминания, но и в остальных галереях — «Мои кадры», добавление кадров, выбор кадров. Сейчас жест стоит только в ленте, а остальные читают то же значение, но зажаты на трёх. Расширить жест на эти три экрана и дать им доходить до одного кадра в ряд.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Щипок меняет плотность в «Моих кадрах», на экране добавления кадров и на экране выбора кадров
- [x] #2 Эти галереи доходят до одного кадра в ряд, а не зажаты на трёх
- [x] #3 Плотность по-прежнему одна на всё приложение и переживает перезапуск
- [x] #4 Проверка ломается, когда жест перестаёт менять плотность хотя бы в одной из галерей
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Где: жест и пилюля — src/screens/memory/frames-density.tsx (useDensityPinch, DensityPill), навит только в src/screens/memory/frames.tsx. Три экрана: src/app/memory/[id]/mine.tsx, src/app/memory/[id]/upload.tsx, src/app/memory/[id]/order/frames.tsx — все три берут колонки через gridColumns в src/lib/density.ts, а тот сейчас зажимает 1 до 3. Убрать зажим и навить жест с пилюлей на эти три экрана так же, как в ленте. Макет — design/spec.md 10.14.1 и 10.14.2. Не трогать src/screens/memory/frame-viewer.tsx и src/kit/filmstrip.tsx — их правит другой исполнитель.
<!-- SECTION:NOTES:END -->

## Comments

<!-- COMMENTS:BEGIN -->
created: 2026-10-28 14:11
---
Принято.

Проверено ведущим на dev после слияния: полный набор mobile — 146 файлов / 2397 тестов зелёные; новый density-galleries.test.tsx меряет ширину плитки 390 в «Моих кадрах» и добавлении, 358 в выборе кадров (поля 16+16), зазор 0 на последнем шаге.

Ломающий прогон на моей копии dev: убрал panHandlers в order/frames.tsx — density-galleries.test.tsx даёт 1 failed | 3 passed (TypeError на onResponderGrant); после восстановления снова 4/4.
gridColumns удалён, все четыре галереи читают useDensity целиком; frame-viewer.tsx и filmstrip.tsx не тронуты (диф пуст).
---
<!-- COMMENTS:END -->
