---
id: TASK-442
title: 'mobile: подтверждения удаления показывают настоящее число, не видимое'
status: In Progress
assignee:
  - '@specialist'
created_date: '2026-09-27 12:45'
updated_date: '2026-09-27 12:45'
labels:
  - from-chief
milestone: m-30
dependencies: []
priority: medium
type: feat
ordinal: 431000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Api теперь отдаёт отдельное поле removal_media_count — настоящее число кадров, которые исчезнут при удалении (включая скрытые), отдельно от видимого счётчика на карточке. Подтверждения «убрать участника» и «удалить воспоминание» сейчас берут число из видимого счётчика — нужно переключить на новое поле и поправить формулировку.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 подтверждение «убрать участника» показывает removal_media_count той строки участника, а не видимый счётчик
- [ ] #2 подтверждение «удалить воспоминание» показывает removal_media_count карточки для «N кадров» и сумму removal_media_count участников (кроме организатора) для «сюда принесли другие»
- [ ] #3 формулировка говорит про то, что исчезнет, а не про то, что видно/принесли
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Коммит в ветке worktree сервиса mobile, слияние в dev — за лидом
- [ ] #2 Автотесты мобильного приложения зелёные
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Репозиторий mobile (worktree). removal_media_count приходит только тому, кто может удалить (организатору — везде; участнику — на своей строке), у остальных пусто — учти это в типе (может отсутствовать). Если поля нет (старый api) — разумный запасной вариант: видимый media_count. Место — там же, где строится подтверждение SheetConfirmMember/SheetConfirmMemory.
<!-- SECTION:NOTES:END -->
