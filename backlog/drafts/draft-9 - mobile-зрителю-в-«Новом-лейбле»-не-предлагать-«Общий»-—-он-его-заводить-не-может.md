---
id: DRAFT-9
title: >-
  mobile: зрителю в «Новом лейбле» не предлагать «Общий» — он его заводить не
  может
status: Draft
assignee: []
created_date: '2026-09-24 06:54'
labels:
  - from-lead
milestone: m-25
dependencies: []
priority: medium
type: bug
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Зритель общих лейблов не заводит (слово человека, decision-12), но лист «Новый лейбл» выбирает «Общий» по умолчанию и предлагает его зрителю: нажав «Создать» ничего не меняя, зритель получает отказ.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Зритель в листе «Новый лейбл» видит только «Личный» (или лист по умолчанию стоит на «Личный» и «Общий» не предлагается); остальные участники — как сейчас
- [ ] #2 Право заводить общий приложение берёт из того, что уже знает экран воспоминания (можно ли участнику добавлять материал), а не считает своё правило
- [ ] #3 Типы и тесты mobile зелёные; выбор покрыт тестом; тема и кит не тронуты
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Работа закоммичена в ветку задачи; слияние в main mobile — рукой lead; карточка в Done
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Найдено при TASK-239: LabelNewSheet в src/memory/label-sheets.tsx, состояние видимости стартует как useState(label?.shared ?? true), роли листу не известно; экран воспоминания в src/memory/frames.tsx знает mayUpload. Отказ 403 при создании общего зрителем уже словами закрыт (labels.sharedDenied) — он остаётся как страховка.
<!-- SECTION:NOTES:END -->
