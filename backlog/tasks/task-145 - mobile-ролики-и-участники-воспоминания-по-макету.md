---
id: TASK-145
title: 'mobile: ролики и участники воспоминания по макету'
status: Done
assignee: []
created_date: '2026-09-18 13:01'
updated_date: '2026-09-18 14:39'
labels:
  - from-chief
milestone: m-21
dependencies:
  - TASK-142
priority: high
type: feat
ordinal: 152000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Ролики воспоминания и список участников по новому макету: статусы загрузки, приглашение людей, подтверждение действия с участником.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Список роликов и его пустое состояние — как в MemoryFilms.html/FilmsEmpty.html
- [x] #2 Список участников со статусами загрузки — как в MemoryPeople.html
- [x] #3 Лист приглашения (ссылка, контакты, ник) — как в SheetInvite.html
- [x] #4 Подтверждение действия с участником — как в SheetConfirmMember.html
- [x] #5 От прежней вёрстки экранов ничего не осталось
- [x] #6 Автотесты зелёные
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 Ничего лишнего не оставлено
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Экраны: MemoryFilms, FilmsEmpty, MemoryPeople, SheetInvite, SheetConfirmMember (design/screens/). src/memory/films.tsx, src/memory/people.tsx — вычистить и собрать заново на новой библиотеке (TASK-142). src/memory/head.tsx — общая шапка трёх лиц воспоминания, её же может трогать соседняя задача TASK-144 (галерея кадров); меняй в ней только то, что необходимо для этого экрана, не переписывай ради чистоты — конфликт на слиянии разбирает лид.
<!-- SECTION:NOTES:END -->

## Comments

<!-- COMMENTS:BEGIN -->
author: @coder
created: 2026-09-18 14:37
---
Развилки, решённые по ходу: (1) чипы контактов на листе приглашения выбирают человека, а отправляет одна главная кнопка «Позвать» — из-за этого ушли строка «позвали» и чип «В контакты» (в макете такого места нет). (2) В карточке ролика кнопка стоит в одной строке со значком состояния — так собрана деталь CardMontage из библиотеки; в макете она отдельной строкой. (3) У собирающегося ролика нет шкалы из пяти шагов и названия этапа: API не отдаёт этап, а рисовать выдуманный прогресс нельзя. (4) «N из N скинули» считается по тем, кто может приносить кадры (организатор и «Добавление»), и только по статусу «всё загрузил». Замечено, но не трогал: поле ввода на листе всегда заливается surface, а по макету поле внутри листа должно быть ink (у сегментов в ките такой вариант есть, у поля — нет); заказ ролика по-прежнему один лист, а в макете это мастер из четырёх шагов (MontageSelect/Story/Music/Build) — отдельная работа.
---
<!-- COMMENTS:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
db3dfda (слито с main как 542b383, конфликт в strings.ts разошёлся автоматически): src/memory/films.tsx и src/memory/people.tsx собраны заново по MemoryFilms/FilmsEmpty/MemoryPeople/SheetInvite/SheetConfirmMember. head.tsx не тронут — конфликта с TASK-144 по нему не будет. Слито в main лидом. Проверено: typecheck и 429 тестов зелёные в main.
<!-- SECTION:FINAL_SUMMARY:END -->
