---
id: TASK-126.1
title: 'api: заказ ролика принимает ориентацию — горизонтальный или вертикальный'
status: Done
assignee: []
created_date: '2026-09-09 06:47'
updated_date: '2026-09-09 07:01'
labels:
  - from-lead
milestone: m-17
dependencies: []
parent_task_id: TASK-126
priority: high
type: feat
ordinal: 133000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Часть TASK-126. Спека doc-03: при заказе ролика можно выбрать ориентацию. Сейчас в src/montages/montages.ts тело заказа (orderBody) принимает target_seconds и music_track_id и кладёт их в montages.params (jsonb) — воркер потом читает этот же params. Ориентация добавляется тем же путём, без новой таблицы и без изменений в jobs.

Контракт (зафиксирован для всех трёх сервисов): необязательное поле orientation в теле POST /memories/:memoryId/montages, строка-перечисление "landscape" | "portrait". Ничего не прислали — как сейчас, горизонтальный (landscape) по умолчанию, поведение не меняется. Значение кладётся в params наравне с target_seconds/music_track_id и возвращается в ответе view() как есть (в rest уже прокидывается всё, что в params, проверить).
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 POST /memories/:memoryId/montages принимает необязательный orientation: "landscape" | "portrait", неверное значение отклоняется схемой
- [x] #2 Значение сохраняется в montages.params и видно в ответе на заказ и в списке роликов
- [x] #3 Заказ без orientation ведёт себя как раньше (landscape)
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
orientation добавлен в orderBody (ajv enum landscape|portrait), в тип тела запроса, в сборку params и в Montage.params. Ключ ложится в montages.params и виден снаружи как params.orientation — view() отдаёт params как есть, и в ответе на заказ, и в списке роликов. Без orientation ключа в params нет: это landscape, ровно как читаются ролики, заказанные до правки (воркер и так обязан понимать отсутствие поля), поэтому дефолт в строку не выписывается. Тесты: src/montages/montages.test.ts — portrait в ответе на заказ и в списке, square/Portrait отклоняются схемой (400), прежние проверки заказа без пожеланий не менялись. Весь набор 84/84 зелёный, tsc --noEmit и biome чистые. Коммит 07fff0f на ветке worktree-agent-a869c874e20f69fd7 (мердж в main за лидом).
<!-- SECTION:NOTES:END -->
