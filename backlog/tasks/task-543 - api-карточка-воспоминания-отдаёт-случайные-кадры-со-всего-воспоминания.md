---
id: TASK-543
title: 'api: карточка воспоминания отдаёт случайные кадры со всего воспоминания'
status: Done
assignee: []
created_date: '2026-10-28 12:59'
updated_date: '2026-10-28 13:10'
labels:
  - from-lead
milestone: m-38
dependencies: []
priority: medium
type: feat
ordinal: 522000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Человек: на главном экране фотографии воспоминания должны выбираться случайно из всего воспоминания, а не только из последних. Сейчас список отдаёт лишь последние четыре кадра, и меняется только их порядок. API должно отдавать карточке более широкую случайную выборку готовых кадров со всего воспоминания.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Список воспоминаний отдаёт карточке случайную выборку готовых кадров, взятую со всего воспоминания, а не только последние четыре
- [ ] #2 Существующее поле последних кадров (recent_thumbnail_urls) не меняет смысла: выбор обложки в настройках и мозаика роликов читают его как прежде
- [ ] #3 Ссылки подписаны тем же сроком, что и прочие, и скрытые кадры в выборку не попадают
- [ ] #4 Проверка ломается, когда выборка снова сужается до последних кадров
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Где: projects/api/src/memories/plugin.ts, функция cards() — подзапрос array(select mi.thumbnail_key ... order by coalesce(captured_at, created_at) desc limit 4). Поле recent_thumbnail_urls остаётся как есть: его читают экран выбора обложки (mobile src/app/memory/[id]/settings.tsx, edit.tsx — CoverSlot) и мозаика роликов (src/screens/memory/films.tsx), и случайная выборка им не нужна. Добавить отдельное поле для карточки главного экрана (предлагаемое имя — card_thumbnail_urls): случайная выборка готовых кадров со всего воспоминания, до 12, подписанная тем же ttl, с тем же учётом seenBy (скрытые чужие не показывать). Имя поля согласовано с TASK-544 (мобильная часть). README api — обновить контракт. Тесты порядка recent_thumbnail_urls в src/memories/memories.test.ts и src/media/frame.test.ts не трогать — они про старое поле.
<!-- SECTION:NOTES:END -->
