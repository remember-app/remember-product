---
id: TASK-473
title: 'api: в сведениях о кадре — поле лейблов'
status: Done
assignee: []
created_date: '2026-10-03 16:51'
updated_date: '2026-10-03 17:14'
labels:
  - from-lead
milestone: m-34
dependencies: []
priority: high
type: feat
ordinal: 462000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
В ответе GET /memories/:memoryId/media/:mediaId нет лейблов, в которые положен кадр: есть только камера, место и ролики. Без этого поля блок лейблов в экране сведений о кадре (design/screens/FrameInfo.html, пункт 18 раздела 5 design/README.md) показать нечем — а он нарисован и по замыслу ставится прямо оттуда.

Что входит: в ответ сведений о кадре добавить список лейблов этого кадра в том же виде, что отдаёт список лейблов воспоминания (id, название, цвет, общий/личный) — и в мобильном типе FrameInfo то же поле. Обратной совместимости нет (decision-19).
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 GET /memories/:memoryId/media/:mediaId отдаёт лейблы кадра
- [ ] #2 Поле labels есть в типе FrameInfo в mobile
- [ ] #3 Тесты api зелёные
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Ставить и снимать кадр из лейбла уже можно: POST и DELETE /memories/:memoryId/labels/:labelId/media принимают media_ids. Не хватает только чтения — в каких лейблах лежит кадр.
<!-- SECTION:NOTES:END -->
