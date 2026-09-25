---
id: TASK-295
title: 'mobile: пожелание к музыке пишется к каждому треку'
status: To Do
assignee: []
created_date: '2026-09-25 06:26'
labels:
  - from-chief
milestone: m-28
dependencies:
  - TASK-288
  - TASK-289
priority: medium
type: feat
ordinal: 292000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Шаг «Музыка» переделан по новому макету: пожелание пишется к каждому треку отдельно — за карандашом в его строке, — и стоит подстрочником. Общего поля пожеланий и волн громкости больше нет.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Экраны шага (MontageMusicNone и MontageMusic) соответствуют design/screens: «Без музыки» наверху; добавлен трек — его место занимает блок «Выбрано» (треков сколько угодно); в строке трека кнопка с карандашом, написанное пожелание — кнопка залита, текст стоит подстрочником под названием; общего поля пожеланий и волн громкости нет
- [ ] #2 Заказ уходит на сервер с пожеланиями у треков (music_wishes: трек → текст, только непустые и только к выбранным трекам); общая music_note не уходит; удалённый из выбора трек уносит своё пожелание с собой
- [ ] #3 Шаблон с автопилотом заполняет пожелание у своего трека (сервер отдаёт шаблонам music_wishes); итог заказа и «Ролики» показывают то, что есть в новой форме; ролики старой формы (с music_note) по-прежнему открываются без ошибок
- [ ] #4 Автотесты зелёные и покрывают: написать пожелание к одному из нескольких треков, стереть его, убрать трек с пожеланием, заказ с пожеланиями у двух треков из трёх, шаблон с пожеланием, старый ролик
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Коммит в ветке worktree сервиса, слияние в main — за лидом
- [ ] #2 Автотесты приложения зелёные
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Строится по design/spec.md (после TASK-288) и design/screens/MontageMusic.html, MontageMusicNone.html. Контракт сервера — TASK-289 (docs/montages.md сервиса api в main после слияния): тело заказа music_tracks: string[] + music_wishes: {трек: текст}; шаблоны отдают music_wishes вместо music_note; старое music_note сервер не принимает. Места в коде: src/app/memory/[id]/order/music.tsx, src/lib/montage/order.ts (note → wishes), src/api/montage.ts, src/screens/order/wizard.tsx, src/screens/memory/films.tsx, kit montage-order. Пожелание у трека — не более 500 символов (сервер откажет длиннее); что делает поле при переполнении — по кит-правилу поля.
<!-- SECTION:NOTES:END -->
