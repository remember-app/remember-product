---
id: TASK-462
title: 'design: правки по ревью перед вёрсткой ролика и журналов'
status: Done
assignee: []
created_date: '2026-10-01 08:34'
updated_date: '2026-10-01 08:47'
labels:
  - from-chief
milestone: m-33
dependencies: []
priority: high
type: feat
ordinal: 451000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Привести новый дизайн ролика в порядок до вёрстки в приложении.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Старого экрана Film.html нет; index.html и MemoryFrames.html ведут на FilmReady.html
- [ ] #2 Есть один общий экран «Этап остановился» для журнала любого этапа
- [ ] #3 В карточке анализа есть «Кто в кадре» (метки людей и животных), «Комментарии» и в итоге анализа «найдено людей»
- [ ] #4 На финале сборки сказано «Уведомление отправлено», не «ушёл всем участникам»
- [ ] #5 Раздел про монтаж в design/spec.md переписан под экраны Film* и Journal*, без отсева брака и MontageLive*
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Читать HTML, не открывать экраны пачкой в браузере человека: максимум пара названных экранов по одному, каждый закрывать.
<!-- SECTION:NOTES:END -->
