---
id: DRAFT-17
title: >-
  mobile: после удаления воспоминания жест «назад» ведёт на удалённое
  воспоминание
status: Draft
assignee: []
created_date: '2026-09-25 08:15'
labels:
  - from-lead
milestone: m-28
dependencies: []
priority: medium
type: bug
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
После «Удалить навсегда» приложение делает переход на главный экран заменой верхнего экрана: стопка остаётся «главная → воспоминание → главная». Жест «назад» с главной ведёт на только что удалённое воспоминание, а оно отвечает 404. Найдено тестировщиком чтением кода экспо-роутера; на устройстве не проверено.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 После удаления воспоминания жест и кнопка «назад» с главного экрана не возвращают на удалённое воспоминание и его настройки; проверено на устройстве человеком
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Коммит в ветке worktree сервиса, слияние в dev — за лидом
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
src/app/memory/[id]/settings.tsx около строки 188: router.replace('/'). Вероятное исправление: router.dismissAll(), как в leave мастера заказа. Логика удаления пришла из TASK-281, лист — из TASK-296. Проверить сначала воспроизведением на устройстве.
<!-- SECTION:NOTES:END -->
