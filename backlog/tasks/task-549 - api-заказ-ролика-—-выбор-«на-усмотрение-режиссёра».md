---
id: TASK-549
title: 'api: заказ ролика — выбор «на усмотрение режиссёра»'
status: Done
assignee: []
created_date: '2026-10-28 12:59'
updated_date: '2026-10-28 13:06'
labels:
  - from-lead
milestone: m-39
dependencies: []
priority: high
type: feat
ordinal: 528000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
На шаге музыки человек может не выбирать треки, а отдать выбор режиссёру-нейросети. Заказ должен это выражать отдельным полем, а не выдумкой внутри списка треков.

Поле — music_director: true. music_tracks сохраняет ровно своё значение (треки в порядке проигрывания; пустой список — «без музыки»; поля нет — старый заказ). Когда выбор отдан режиссёру, music_tracks не пишется вовсе, а music_director: true идёт в params.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Тело заказа принимает music_director (boolean); music_director: true вместе с непустым music_tracks — 400, тем же приёмом, что уже стоит на «кадр и в include, и в exclude»
- [ ] #2 При music_director: true в params пишется music_director: true и не пишется music_tracks
- [ ] #3 Без флага ничего не меняется: music_tracks пишется всегда, даже пустым; music_track_id и music_track_key по-прежнему отвергаются
- [ ] #4 Тип params ролика знает music_director; ответы о ролике его отдают
- [ ] #5 docs/montages.md описывает поле и его отношение к music_tracks
- [ ] #6 Автотесты на флаг, на конфликт и на то, что прежнее поведение цело
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Тесты api зелёные, tsc и biome чисты
<!-- DOD:END -->
