---
id: TASK-246
title: 'api: список шаблонов отказывает там, где заказ всё равно откажут'
status: Done
assignee: []
created_date: '2026-09-24 09:01'
updated_date: '2026-09-24 09:18'
labels:
  - from-chief
milestone: m-26
dependencies: []
priority: high
type: bug
ordinal: 253000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Список шаблонов на воспоминании, где заказ в любом случае откажут по нехватке материала, отдавал 200 и текст «от 0 человек». Решение chief 2026-09-24: так нельзя — вход в мастер должен получать тот же отказ, что и заказ.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 GET …/montage-templates на воспоминании, где заказ без исключённых кадров отказал бы по нехватке материала (меньше трёх готовых кадров или предел 0), отвечает тем же 409 и тем же телом, что заказ; текста «от 0 человек» больше никто не получает
- [x] #2 Тест на такое воспоминание (мало кадров; предел 0) и на воспоминание с достаточным материалом, где ответ прежний; весь набор api зелёный
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 Коммит слит в main сабмодуля api, указатель в корне подтянут
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Код: projects/api/src/montages/templates.ts, montages.ts (checkOrder — проверка материала уже есть, взять её, не писать вторую). Тело и код отказа — те же, что у POST …/montages. README api поправить (раздел про шаблоны). Тесты в своей базе и хранилище, --fileParallelism=false; стенд человека не трогать.
<!-- SECTION:NOTES:END -->
