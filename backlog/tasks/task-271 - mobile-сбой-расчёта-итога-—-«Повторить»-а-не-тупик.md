---
id: TASK-271
title: 'mobile: сбой расчёта итога — «Повторить», а не тупик'
status: Done
assignee: []
created_date: '2026-09-24 10:25'
updated_date: '2026-09-24 10:45'
labels:
  - from-chief
milestone: m-26
dependencies: []
priority: high
type: bug
ordinal: 268000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Если расчёт итога перед монтажом упал на сети, экран показывает баннер без «Повторить»; выход только «Назад» — тупик. Решение chief 2026-09-24: добавить «Повторить».
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Сбой расчёта итога (сеть, 500) показывает баннер с «Повторить»; нажатие повторяет расчёт по актуальному заказу; «Повторить» не зацикливается и не шлёт устаревшее тело
- [x] #2 Тест: сбой расчёта итога → «Повторить» → итог посчитан, кнопка «Начать монтаж» доступна; весь набор приложения зелёный, tsc чисто
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 Коммит слит в main сабмодуля mobile, указатель в корне подтянут
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Код: projects/mobile/src/app/memory/[id]/order/summary.tsx; образец «Повторить» уже есть на index.tsx, build.tsx (баннер + существующее слово s.action.retry). Сквозные тесты — src/order-flow.test.tsx (заглушка сервера умеет отвечать сбоем). Ручную и визуальную проверку не запускать.
<!-- SECTION:NOTES:END -->
