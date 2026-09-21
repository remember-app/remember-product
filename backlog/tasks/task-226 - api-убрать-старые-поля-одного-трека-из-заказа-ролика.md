---
id: TASK-226
title: 'api: убрать старые поля одного трека из заказа ролика'
status: Done
assignee: []
created_date: '2026-09-21 14:38'
updated_date: '2026-09-21 14:47'
labels:
  - from-lead
milestone: m-26
dependencies: []
priority: medium
type: feat
ordinal: 233000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Заказ ролика принимает трек только списком. Два старых поля одного трека, которые держались, пока приложение не перешло на список, убираются.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Заказ и итог заказа отклоняют поля music_track_id и music_track_key как неизвестные (400); музыка называется только списком music_tracks
- [x] #2 Ролики, собранные по старой форме, по-прежнему отображаются в списке и повторяются: чтение старых params не тронуто
- [x] #3 Из кода и README убраны шим и его описание; автотесты зелёные
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Коммит в ветке worktree, слияние в main — за лидом
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Сделано (коммит 792decb, ветка worktree-agent-ae178e088c738982b, api):
- src/montages/montages.ts: из схемы orderBody, из типа OrderBody и из checkOrder убраны music_track_id и music_track_key; вместе с ними ушёл отказ "the music is named more than one way" (он существовал только ради выбора между тремя полями). `asked` теперь просто `body?.music_tracks ?? []`.
- Чтение не тронуто: в Montage.params оба поля остались (комментарий переписан без ponytail-маркера) — старые строки живы, список и повтор их отдают как есть; retry вообще не валидирует params, он только меняет статус и ставит job.
- src/montages/music.ts: в шапке файла ссылка на music_track_key заменена на "ключ в music_tracks".
- Тесты: сняты блок "the old apps two fields" и блок "two ways of naming the music"; заказ в основном тесте и проверка недогруженного трека в music.test.ts переведены на music_tracks; кейс `{music_track_id:"epic"}` из списка схемных 400 убран. Добавлено в тест `stuffed`: заказ с music_track_id и music_track_key проходит и пишет music_tracks: [].
- README: из таблицы полей заказа убраны обе старые строки, абзац про совместимость заменён одной фразой, строка ответа "the music is named more than one way" убрана. Описание колонки params (старые строки) оставлено — это чтение.

Критерий №1 не отмечен — расхождение по факту, решать лиду. В этом сервисе ajv у Fastify работает с removeAdditional (значение по умолчанию), поэтому additionalProperties:false не даёт 400, а молча выбрасывает поле: заказ с music_track_id получает 201 и music_tracks: []. Это давняя и осознанная договорённость сервиса (тот же тест про `style: "cinematic"`, тот же комментарий в src/media/labels.ts). Вторая половина критерия выполнена целиком: назвать музыку можно только списком. Сделать именно 400 на эти два имени = дописать особый случай (или сменить removeAdditional на весь сервис) — это больше кода, чем было до снятия шима, и меняет поведение всех маршрутов.

Тесты: 14 файлов, 139 тестов — зелёные (своя база remember_t226 в стоячем postgres, свой MinIO на 9010, --fileParallelism=false). typecheck чистый, biome по затронутым файлам чистый. База и контейнер после прогона убраны.

Лид: критерий №1 («400») в такой формулировке не соответствует договорённости сервиса — ajv Fastify отбрасывает неизвестные поля молча (removeAdditional), так же, как любое другое лишнее поле на любом маршруте. Принято как «поля больше не действуют: заказ называет музыку только списком»; громкий отказ старому клиенту — отдельное решение chief, ни один клиент его не ждёт.
<!-- SECTION:NOTES:END -->
