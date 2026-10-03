---
id: TASK-469
title: 'mobile: экран ролика — очередь, сборка, готов, ошибка, нет связи'
status: To Do
assignee: []
created_date: '2026-10-01 08:34'
labels:
  - from-chief
milestone: m-33
dependencies:
  - TASK-463
priority: high
type: feat
ordinal: 458000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Экран ролика в приложении по новому дизайну во всех состояниях.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Состояния: в очереди (место и что заказано), собирается (этап N из 5, оставшееся время, «Сейчас», итог пройденных), готов, не получилось (организатору «Повторить», участнику — что организатор запустит заново), нет связи
- [ ] #2 Построено из компонентов кита, новые — со Storybook-историями; старые экраны MontageLive* и стадийный экран удалены
- [ ] #3 Автотесты зелёные
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Макеты: design/screens/FilmQueued,Building,Ready,Failed,FailedMember,Offline.html. Читать HTML, не открывать в браузере пачкой.
<!-- SECTION:NOTES:END -->
