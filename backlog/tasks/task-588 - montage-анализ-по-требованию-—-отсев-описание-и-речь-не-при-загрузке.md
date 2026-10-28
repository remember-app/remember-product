---
id: TASK-588
title: 'montage: анализ по требованию — отсев, описание и речь не при загрузке'
status: Done
assignee: []
created_date: '2026-10-28 18:25'
updated_date: '2026-10-28 19:03'
labels:
  - from-lead
milestone: m-43
dependencies: []
priority: high
type: feat
ordinal: 567000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Слова человека по m-43: при загрузке файл больше не уходит в модель за описанием и речью и не получает предложение отсева. Отсев запускается задачей на воспоминание по нажатию Analyze или при заказе ролика; описание и речь делаются на первом этапе монтажа, а уже готовые переиспользуются. Данные камеры остаются при загрузке.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 После загрузки обработчик делает копии и данные камеры, и больше не ставит описание, речь и отсев
- [x] #2 Есть задача анализа на воспоминание: отсев всего готового видимого материала, повторный запуск не дублирует работу и не зовёт модель зря
- [x] #3 Первый этап монтажа сам добирает недостающее: отсев для материала заказа, речь для видео, описание — готовое переиспользуется; заказ без Analyze проходит
- [x] #4 Часовые догоны не запускают отсев, описание и речь без запроса человека
- [x] #5 Проверки падают при откате поведения; pytest и lint зелёные; docs обновлены
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 Модель и отсев не запускаются при загрузке; анализ по требованию работает и переиспользует готовое
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Работа идёт в projects/montage; первым делом pwd и git rev-parse --show-toplevel, при несовпадении — стоп. Опоры: montage/media/preview.py ставит follow-up задачи (сейчас media_screening, media_speech, media_frame_info, media_understanding) — оставить только frame_info; worker.py HANDLERS; media/screening.py (judge локальный ffmpeg, НЕ внешняя модель; _dedup по всему воспоминанию — не гонять по кадру в цикле, иначе O(n^2)); media/understanding.py (describe_missing уже переиспользует); media/speech.py (_remembered переиспользует); video/montage.py — стадия analysis уже зовёт describe_missing, туда же речь для видео до story/director; sweeps.py — догоны sweep_media_without_screening, sweep_media_without_ai_answers (understanding+speech) больше не должны запускать анализ сами. Новая задача media_analysis: type='media_analysis', ref=id воспоминания; api ставит её в общую таблицу jobs. Считает по готовым не скрытым кадрам воспоминания, отсев делает одним проходом на воспоминание. docs/jobs/*.md и docs/ai.md обновить. Ничего не деплоить, в удалённую ветку не пушить; коммит в свою ветку ворктри и отчёт.
<!-- SECTION:NOTES:END -->
