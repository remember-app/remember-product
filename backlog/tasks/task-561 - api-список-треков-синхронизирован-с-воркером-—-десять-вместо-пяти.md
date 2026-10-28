---
id: TASK-561
title: 'api: список треков синхронизирован с воркером — десять вместо пяти'
status: Done
assignee: []
created_date: '2026-10-28 13:46'
updated_date: '2026-10-28 13:53'
labels:
  - from-lead
milestone: m-39
dependencies: []
priority: high
type: bug
ordinal: 540000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
TASK-548 расширил полку треков воркера с пяти до десяти; api до сих пор знает пять (musicTracks в src/montages/music.ts), поэтому заказ merry, tender, dreamy, mystery или energetic отвергается 400, хотя воркер их уже хранит и собирает. Расширить musicTracks до десяти id в порядке полки — тем же приёмом, что и прошлый раз (TASK-161).
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 musicTracks — десять id в порядке полки: bright, warm, calm, night, road, merry, tender, dreamy, mystery, energetic
- [ ] #2 Заказ с любым из десяти принимается, пишется в params и виден в ответе на заказ и в списке роликов
- [ ] #3 «Послушать» подписывает ссылку на любой из десяти
- [ ] #4 Поведение с прежними пятью не изменилось; неизвестный id по-прежнему 400
- [ ] #5 Автотесты на новые id, существующие зелёные
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Тесты api зелёные, tsc и biome чисты
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Прогон api — со своим TEST_DATABASE_URL (имя на _test, напр. remember_m39_test): общая remember_test делится с соседней вехой, см. TASK-552.
<!-- SECTION:NOTES:END -->
