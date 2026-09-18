---
id: TASK-161
title: 'api: список треков синхронизирован с воркером — пять вместо трёх'
status: Done
assignee: []
created_date: '2026-09-18 14:39'
updated_date: '2026-09-18 15:28'
labels:
  - from-lead
milestone: m-23
dependencies: []
priority: high
type: bug
ordinal: 168000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
TASK-157 (montage) заменил три синтезированных тона на пять настоящих треков библиотеки — id bright/warm/calm/night/road («Яркая»/«Тёплая»/«Спокойная»/«Ночь»/«Дорога», design/screens/MontageMusic.html). api до сих пор проверяет заказ по старому списку из трёх (musicTracks в src/montages/montages.ts) — заказ трека night или road отклоняется 400, хотя воркер их уже собирает и хранит (projects/montage/tracks/README.md — источник и лицензия каждого).

Расширить musicTracks до пяти id в том же порядке. Больше ничего в контракте не меняется.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 musicTracks — пять id в порядке макета: bright, warm, calm, night, road
- [x] #2 Заказ с любым из пяти id принимается, сохраняется в params и виден в ответе на заказ и в списке роликов
- [x] #3 Поведение с прежними тремя id (warm, bright, calm) не изменилось
- [x] #4 Автотесты добавлены на два новых id, существующие не сломаны
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
musicTracks в src/montages/montages.ts — пять id в порядке экрана «Под что монтировать»: bright, warm, calm, night, road (design/screens/MontageMusic.html, projects/montage/tracks/README.md). Константа питает и JSON-схему заказа (enum), и тип тела запроса, поэтому правка одной строки закрывает весь контракт — больше в нём ничего не менялось: взаимоисключение music_track_id/music_track_key, порядок записи в params и ответ на заказ прежние, неизвестный id по-прежнему 400.

README api поправлен в двух местах, где перечислял три трека (раздел про общий каталог и таблица полей заказа) — плюс ссылка на projects/montage/tracks/README.md как на источник и лицензии.

Тесты: существующая проверка заказа «трек с полки» в src/montages/montages.test.ts развёрнута в цикл по всем пяти id — каждый принимается 201, пишется в params и виден в списке роликов; отказ на неизвестный id (epic) остался на месте. Прогон: 96 тестов, 10 файлов — зелено; tsc --noEmit чисто; biome по изменённым файлам чисто.

Коммит a5104af в worktree agent-a999eb17fa2a8a0ee, ветка worktree-agent-a999eb17fa2a8a0ee. Слияние в main сабмодуля — за лидом.
<!-- SECTION:NOTES:END -->
