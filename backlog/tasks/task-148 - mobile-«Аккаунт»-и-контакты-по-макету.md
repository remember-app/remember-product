---
id: TASK-148
title: 'mobile: «Аккаунт» и контакты по макету'
status: To Do
assignee: []
created_date: '2026-09-18 13:01'
labels:
  - from-chief
milestone: m-21
dependencies:
  - TASK-142
priority: high
type: feat
ordinal: 155000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Экран профиля становится «Аккаунтом» с контактами внутри — по новому макету.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 «Аккаунт» выглядит как в Account.html, включая крупную красную кнопку выхода без подписи
- [ ] #2 «Контакты» открываются из «Аккаунта» и выглядят как в Contacts.html, пустой список — как в ContactsEmpty.html
- [ ] #3 От прежней вёрстки экранов ничего не осталось
- [ ] #4 Автотесты зелёные
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Ничего лишнего не оставлено
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
doc-04, doc-10. Экраны: Account, Contacts, ContactsEmpty (design/screens/). src/app/profile.tsx перестраивается под Account.html (разделы, среди них «Контакты», внизу крупная красная кнопка выхода без подписи); src/app/contacts.tsx — под Contacts.html/ContactsEmpty.html. Точка входа в «Контакты» — только из «Аккаунта», отдельной иконки в шапке главного экрана больше нет (это меняет соседняя задача про главный экран, TASK-143).
<!-- SECTION:NOTES:END -->
