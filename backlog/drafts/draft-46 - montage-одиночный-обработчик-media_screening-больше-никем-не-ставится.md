---
id: DRAFT-46
title: 'montage: одиночный обработчик media_screening больше никем не ставится'
status: Draft
assignee: []
created_date: '2026-10-28 19:38'
labels:
  - from-specialist
dependencies: []
priority: low
type: feat
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Найдено ревью m-43: после перехода на задачу анализа на воспоминание тип задачи media_screening остался в HANDLERS, но api и догоны его больше не ставят — его зовут только тесты. Убрать тип и обработчик или оставить осознанно и записать причину.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Тип media_screening либо убран вместе с обработчиком и тестами, либо оставлен с записанной причиной
- [ ] #2 Проверки зелёные
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Мёртвый контракт убран или оправдан
<!-- DOD:END -->
