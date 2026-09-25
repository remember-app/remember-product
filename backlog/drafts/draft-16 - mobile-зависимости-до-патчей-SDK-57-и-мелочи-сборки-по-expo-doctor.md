---
id: DRAFT-16
title: 'mobile: зависимости до патчей SDK 57 и мелочи сборки по expo-doctor'
status: Draft
assignee: []
created_date: '2026-09-25 08:02'
labels:
  - from-lead
dependencies: []
priority: low
type: feat
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Найдено при подготовке сборки для TestFlight (TASK-320): expo-doctor не проходит две проверки — не хватает пакета expo-asset как зависимости expo-audio (в сборку он попадает через expo) и 19 пакетов отстали от SDK 57 на патч-версии (expo, expo-notifications и другие). В README раздел «Пуши» ссылается на команду npx eas, которой не существует как нужной (нужно eas … или npx eas-cli …).
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 expo-doctor проходит без замечаний (обновление через expo install --fix проверено тестами и сборкой), README не ссылается на несуществующую команду
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Автотесты приложения зелёные
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Черновик от лида: ждёт одобрения; не блокирует пилот. Менять package.json стоит после стабилизации mobile у m-28.
<!-- SECTION:NOTES:END -->
