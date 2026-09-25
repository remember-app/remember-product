---
id: TASK-290
title: 'montage: режиссёр получает пожелание вместе с треком'
status: Done
assignee: []
created_date: '2026-09-25 06:25'
updated_date: '2026-09-25 06:42'
labels:
  - from-chief
milestone: m-28
dependencies: []
priority: medium
type: feat
ordinal: 287000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Пожелание к музыке уходит режиссёру не одной строкой на весь ролик, а у того трека, к которому оно написано.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Воркер читает params.music_wishes (имя трека → текст) и передаёт режиссёру каждое пожелание вместе со своим треком: в запросе к нейросети у трека в списке музыки стоит его пожелание, у треков без пожелания — ничего; порядок треков и их длины не меняются
- [x] #2 Общая строка music_note больше не идёт режиссёру: ни из params, ни в тексте запроса; ролик без пожеланий и без музыки собирается как раньше
- [x] #3 Старая строка params (music_note без music_wishes) не роняет сборку, в том числе повтор упавшего ролика; что стало с её общим пожеланием — сказано в отчёте и в README воркера
- [x] #4 Запрос к нейросети остаётся записанным целиком, вместе с пожеланиями у треков; README воркера и тесты отражают новый вход; автотесты зелёные, сеть в тестах не трогается
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 Коммит в ветке worktree сервиса, слияние в main — за лидом
- [x] #2 Автотесты воркера зелёные
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Контракт (решён лидом, api пишет его в TASK-289): params.music_tracks: string[] — id полки или ключ music/…, как сейчас; params.music_wishes: { [track]: string } — необязательное, ключи из music_tracks, тексты уже обрезаны и не пустые. Старое поле params.music_note больше не пишется. Читать в montage/video/montage.py (music_note сейчас берётся в строке ~81 и уходит в montage/video/director.py и montage/ai/prompts.py). Набор тестов воркера пишет в бакет стенда человека (TASK-284) — учитывай при разборе красноты, стенд не трогать. ruff проверяется на main.
<!-- SECTION:NOTES:END -->
