---
id: TASK-224
title: 'api: повтор упавшего ролика начинает журнал с чистого листа'
status: Done
assignee:
  - coder
created_date: '2026-09-21 13:48'
updated_date: '2026-09-21 13:58'
labels:
  - from-lead
milestone: m-27
dependencies:
  - TASK-200
  - TASK-223
priority: medium
type: bug
ordinal: 231000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Когда организатор повторяет упавший ролик, в очереди он больше не тащит за собой красный этап и записи прошлой неудачи: журнал и этапы обнуляются в тот же миг, когда ролик снова становится «в очереди».
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 «Повторить» на упавшем ролике в той же транзакции удаляет его записи журнала и этапы; сразу после повтора и маршрут журнала, и список роликов показывают пустое (ролик в очереди без этапов)
- [x] #2 Смотрящие не трогаются; повтор по неупавшему ролику по-прежнему отвечает 409 и журнал не трогает; чужие части файла montages.ts не менялись
- [x] #3 Автотесты зелёные, README api одной фразой описывает поведение; тесты шли в своей базе, не в живой
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 Работа закоммичена в ветке worktree, свежий main подтянут, тесты после этого зелёные
- [x] #2 Ничего лишнего не оставлено: своя тестовая база, бакет и контейнер удалены
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Final Summary: в транзакции retry (src/montages/montages.ts, failed→queued + задача в jobs) добавлены два DELETE — montage_journal_entries и montage_stages этого ролика; montage_viewers не трогаются, остальное в retry и в файле не менялось. README api: в разделе retry фраза про «прошлую попытку в строках этапов» заменена на «той же транзакцией стираются записи журнала и этапы прошлой попытки». Тест в src/montages/montages.test.ts («repeating a montage that fell starts its journal from a clean sheet»): упавший ролик с журналом и смотрящим + упавший сосед → retry → у ролика 0 записей и 0 этапов, у соседа его две записи и два этапа на месте, смотрящий на месте, маршрут журнала отдаёт stages: [], entries: [], список — stages: null; затем воркер берёт повтор (processing + этап + запись), повторное «повторить» → 409 и журнал цел. Проверено: вся сюита 139/139 зелёная в своей базе remember_m27_test_224 со своим MinIO (контейнер remember-t224-minio, бакет t224bucket) — живой стенд не трогался; тест падает без правки (lines: 2, stages: 2 вместо 0/0); tsc --noEmit чисто; biome по двум файлам временным конфигом вне репозитория — чисто. Ветка worktree-agent-a4a64f0681a9244e7, коммит 2002f25, rebase на main (54a0829) сделан, после него тесты прогнаны заново. База, бакет и контейнер удалены. В main не сливал.
<!-- SECTION:NOTES:END -->

## Comments

<!-- COMMENTS:BEGIN -->
author: lead
created: 2026-09-21 13:58
---
Лид: ПРИНЯТО. Слито в main api.
---
<!-- COMMENTS:END -->
