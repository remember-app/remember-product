---
id: TASK-566
title: 'mobile: экраны «нет доступа» и «галерея пуста» — один вид с семьёй'
status: Done
assignee: []
created_date: '2026-10-28 13:48'
updated_date: '2026-10-28 14:22'
labels:
  - from-lead
milestone: m-38
dependencies:
  - TASK-565
priority: medium
type: feat
ordinal: 545000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Человек решил (decision-28): свести к одному виду два крайних экрана семьи кадров. Дизайн переделан в TASK-565 — код идёт за ним.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Оба экрана в приложении приведены к тому же виду, что остальная семья кадров
- [x] #2 Поведение не меняется — только вид
- [x] #3 Автотесты зелёные
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Где: src/app/memory/[id]/upload.tsx — состояния без ленты (нет доступа к галерее, пустая галерея). Образец вида — макет, переделанный в TASK-565. Не трогать src/screens/memory/frame-viewer.tsx и src/kit/filmstrip.tsx — их правит другой исполнитель.
<!-- SECTION:NOTES:END -->

## Comments

<!-- COMMENTS:BEGIN -->
created: 2026-10-28 14:22
---
Принято.

Проверено ведущим на dev после слияния: полный набор mobile — 146 файлов / 2397 тестов зелёные. По диффу: AppBar с подзаголовком снят, у всех пяти состояний одна стеклянная шапка (назад, капсула, справа пустой слот 48 — кнопка выбора только при ленте); карточка-сообщение от 108 (insets.top + 48 + 8); пустое состояние и ожидания — центр всего тела 422. Поведение не тронуто: те же leave/ask/openSettings/retry, зависимость подписи кнопки от canAskAgain сохранена. Мёртвые токены bodyUpload/bodyUploadCard удалены.

Числа макета сверены с design/screens/UploadAccess.html и UploadEmpty.html (108, слот 48, центр 422) и закреплены в тестах.
---
<!-- COMMENTS:END -->
