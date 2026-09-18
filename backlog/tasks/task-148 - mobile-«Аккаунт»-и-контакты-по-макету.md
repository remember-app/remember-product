---
id: TASK-148
title: 'mobile: «Аккаунт» и контакты по макету'
status: Done
assignee: []
created_date: '2026-09-18 13:01'
updated_date: '2026-09-18 14:33'
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
- [x] #1 «Аккаунт» выглядит как в Account.html, включая крупную красную кнопку выхода без подписи
- [x] #2 «Контакты» открываются из «Аккаунта» и выглядят как в Contacts.html, пустой список — как в ContactsEmpty.html
- [x] #3 От прежней вёрстки экранов ничего не осталось
- [x] #4 Автотесты зелёные
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 Ничего лишнего не оставлено
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
doc-04, doc-10. Экраны: Account, Contacts, ContactsEmpty (design/screens/). src/app/profile.tsx перестраивается под Account.html (разделы, среди них «Контакты», внизу крупная красная кнопка выхода без подписи); src/app/contacts.tsx — под Contacts.html/ContactsEmpty.html. Точка входа в «Контакты» — только из «Аккаунта», отдельной иконки в шапке главного экрана больше нет (это меняет соседняя задача про главный экран, TASK-143).
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
11842da+a2d9a1a: src/app/profile.tsx («Аккаунт») и src/app/contacts.tsx собраны заново по Account.html/Contacts.html/ContactsEmpty.html, целиком на ките. Красная кнопка выхода 60px без подписи, «Контакты» — раздел внутри «Аккаунта» со стопкой аватаров. Небольшие добавления в кит по спецификации (height.logout у кнопки, необязательный ник в RowContact). Слито в main лидом. Проверено: typecheck и 421 тест зелёные в main (6 провалов tokens.test.ts в воркри — нехватка node_modules там же, в main тот же файл зелёный).
<!-- SECTION:FINAL_SUMMARY:END -->
