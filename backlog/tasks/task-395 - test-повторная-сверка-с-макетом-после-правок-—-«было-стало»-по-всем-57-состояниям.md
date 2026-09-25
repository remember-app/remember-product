---
id: TASK-395
title: >-
  test: повторная сверка с макетом после правок — «было / стало» по всем 57
  состояниям
status: To Do
assignee: []
created_date: '2026-09-25 22:28'
labels:
  - from-chief
milestone: m-28
dependencies:
  - TASK-375
priority: high
type: feat
ordinal: 386000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
После пакетов 382–394 нужно снова снять все состояния макета в симуляторе и сравнить с измерением макета и разделом 10.11 спеки: что расходилось — стало ли равно, что осталось, что появилось нового.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Все 57 состояний макета сняты заново на текущем dev (iPhone 17e — размер макета, ночная тема, ru) и сверены с измерением макета (/private/tmp/m28-mock-measure) и с разделом 10.11 спеки; отчёты по экранам в /private/tmp/m28-visual-compare/round2/ с таблицей «было (раунд 1) → стало (раунд 2)»
- [ ] #2 Каждое оставшееся расхождение классифицировано: расхождение / сознательное (строка в 10.11) / данные-среда; по «расхождениям» — приоритет и вероятное место в коде; общий список корней отдельно
- [ ] #3 Ничего не правится тестером: найденное — списком для лида; после себя не оставлено ни устройств вне стенда, ни временных файлов в репозиториях
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Отчёт передан лиду
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Стенд: /private/tmp/m28-visual-stand (README.md), команды ./stand up --app /Users/kubik/Nox/projects/remember/projects/mobile, ./stand shots. Инструменты сравнения раунда 1: /private/tmp/m28-visual-compare/B/_tools (изучи); отчёты раунда 1: /private/tmp/m28-visual-compare/{A,B}/. Данные-среда (не дефекты): Expo Go, подставной сервер, safe-area 47 против 52, нижний отступ 34 против 30, галерея симулятора. Сознательные отступления — таблица в design/spec.md 10.11 (например muted вместо faint, «Изменить ник»). Продуктовые вопросы (плашка «Сообщить, когда будет готово», слова статусов) — не дефекты. Голова без окна (headless), устройства только m28-… стенда, диск ограничен — не больше двух загруженных. Приложение — основной checkout /Users/kubik/Nox/projects/remember/projects/mobile (ветка dev); ничего в нём не менять.
<!-- SECTION:NOTES:END -->
