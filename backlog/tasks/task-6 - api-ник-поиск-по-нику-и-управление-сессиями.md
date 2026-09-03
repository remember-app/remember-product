---
id: TASK-6
title: 'api: ник, поиск по нику и управление сессиями'
status: Done
assignee:
  - '@specialist'
created_date: '2026-09-03 10:15'
updated_date: '2026-09-03 10:17'
labels:
  - from-chief
milestone: m-1
dependencies:
  - TASK-5
priority: high
type: feat
ordinal: 6000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
У пользователя появляется уникальный ник, который он задаёт при первом входе и может сменить в любой момент. По нику его находят другие — это то, чем позже пользуются приглашения. Человек видит свои активные сессии и может закрыть любую из них или выйти.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Ник задаётся, когда его нет, и меняется в любой момент; регистр не различается
- [x] #2 Освобождённый ник сразу можно занять заново; истории не остаётся
- [x] #3 Поиск по нику возвращает пользователя без учёта регистра
- [x] #4 Список сессий помечает текущую; отзыв закрывает одну, выход — текущую
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 Все эти маршруты закрыты проверкой сессии
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Уникальность ника по citext. Есть защита от подмены похожими символами Unicode. Поиск — точное совпадение, не подстрока.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Сдано в projects/api коммитом ff879c9 (2026-09-02). Восстановлено на доске задним числом 2026-09-03 из истории git.
<!-- SECTION:FINAL_SUMMARY:END -->
