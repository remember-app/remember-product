---
id: TASK-568
title: 'mobile: окно кадра в сведениях — 289, панель с 292, по макету'
status: Done
assignee: []
created_date: '2026-10-28 13:51'
updated_date: '2026-10-28 14:00'
labels:
  - from-lead
milestone: m-38
dependencies: []
priority: medium
type: feat
ordinal: 547000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
В сведениях о кадре приложение держит окно кадра 352 с TASK-478, а макет FrameInfo.html рисует окно кадра 289 и панель с 292. Макет — источник правды по отступам; README-строка про 352 устарела и сама себе противоречит. Привести приложение к макету.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Кадр в сведениях ужимается в верхние 289, панель встаёт с 292 — как в FrameInfo.html
- [ ] #2 На повёрнутом телефоне поведение берётся из макета так же, а если макет его не описывает — остаётся прежним
- [ ] #3 Проверка ломается, когда окно кадра возвращается к 352
- [ ] #4 Автотесты зелёные
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Где: frameInfoRoom и height.frameInfo в src/theme/tokens.ts, их читают src/screens/memory/frame-viewer.tsx (room и box) и frame-info.tsx. Сейчас frameInfoRoom = Math.min(height.frameInfo, screenHeight * 0.42), height.frameInfo = 352. Заменить на макетное правило (окно кадра 289, панель с 292). Учти: экран телефона 844, а доска макета 962 — реши, как макетное число переносится на телефон, и запиши это в отчёте. Макет design/screens/FrameInfo.html — источник; design/ не трогать (README правит отдельная карточка). Не трогать src/screens/memory/frame-info.tsx дальше того, что нужно окну кадра. Остальные галереи и ленту не трогать.
<!-- SECTION:NOTES:END -->
