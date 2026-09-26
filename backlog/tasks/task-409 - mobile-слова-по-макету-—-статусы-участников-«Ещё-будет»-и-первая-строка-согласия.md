---
id: TASK-409
title: >-
  mobile: слова по макету — статусы участников («Ещё будет») и первая строка
  согласия
status: In Progress
assignee: []
created_date: '2026-09-26 14:53'
updated_date: '2026-09-26 14:53'
labels:
  - from-chief
milestone: m-28
dependencies: []
priority: medium
type: bug
ordinal: 397000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Chief решил: источник правды по тексту — макет. Статус участника «Планирует загрузить» заменяется словом из макета «Ещё будет»; первая строка согласия берётся из макета.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Слова статусов участников (видимые и для чтения вслух) — как в макете: «Ещё будет» / «Всё загрузил» (проверить MemorySettings.json, SheetAskAll.json, Contacts и др. в /private/tmp/m28-mock-measure); «Нечего добавлять» остаётся, если в макете для этого статуса нет иного слова — назвать в отчёте; ru и en парой
- [ ] #2 Первая строка карточки Consent — дословно как в /private/tmp/m28-mock-measure/Consent.json (ru и en); перенос строк на 390×844 по макету (карточка того же размера); на iPhone SE и крупном шрифте слова переносятся, не рвутся
- [ ] #3 Тесты, читавшие старые слова, обновлены и закрепляют слова макета; полный npm test, typecheck, biome зелёные, тесты адаптивности не ослаблены
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Коммит в ветке worktree сервиса, слияние в dev — за лидом
- [ ] #2 Автотесты приложения зелёные
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Решения chief 26 сентября (2 и 3). Места: src/strings/*.ts (login.ts:138 — первая строка согласия; статусы участников — искать «Планирует загрузить»), экраны MemorySettings, SheetAskAll, Contacts; слово для чтения вслух — accessibilityLabel. Слова только из макета, не выдумывать. Плашку «Сообщить…» и строку «Мы сообщим…» НЕ добавлять — снятые решением человека. Проверка на стенде не обязательна: тесты + сверка по JSON макета; при сомнении — один снимок Consent на SE и 17e (свой экземпляр стенда, отдельный TMPDIR у Metro).
<!-- SECTION:NOTES:END -->
