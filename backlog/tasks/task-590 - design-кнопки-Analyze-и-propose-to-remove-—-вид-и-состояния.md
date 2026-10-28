---
id: TASK-590
title: 'design: кнопки Analyze и propose to remove — вид и состояния'
status: Done
assignee: []
created_date: '2026-10-28 18:26'
updated_date: '2026-10-28 18:31'
labels:
  - from-lead
milestone: m-43
dependencies: []
priority: high
type: feat
ordinal: 569000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Для m-43 нужны две кнопки, которых нет в макетах: Analyze на первом шаге заказа вместо «What was dropped» и propose to remove в режиме выбора на экране воспоминания вместо серой «Ничего не выбрано». Дизайнер рисует их по словам человека одним проходом, чтобы вид был один, и описывает состояния: покой, идёт отсев, готово, нечего предложить/ошибка. Слова — на двух языках.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Обе кнопки нарисованы и описаны в design/spec.md с состояниями
- [x] #2 Слова обеих кнопок и состояний даны на двух языках
- [x] #3 Поведение после нажатия вписано в существующий язык кита, без лишних компонентов
- [x] #4 Тронут только design/; временных файлов не осталось
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 Спецификация обеих кнопок готова, по ней можно писать код
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Работа идёт в корневом репозитории, design/; первым делом pwd и git rev-parse --show-toplevel, при несовпадении — стоп. Ветка design/m-43 от dev корня, коммит design(m-43): кнопки Analyze и propose to remove. Триггер propose-to-remove — decision-30, ждёт ответа человека: рисовать оба состояния, логику не вшивать. Ничего не деплоить, не пушить.
<!-- SECTION:NOTES:END -->
