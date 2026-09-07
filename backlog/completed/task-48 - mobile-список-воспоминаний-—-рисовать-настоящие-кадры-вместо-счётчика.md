---
id: TASK-48
title: 'mobile: список воспоминаний — рисовать настоящие кадры вместо счётчика'
status: Done
assignee: []
created_date: '2026-09-05 04:19'
updated_date: '2026-09-05 04:31'
labels:
  - from-human
milestone: m-8
dependencies:
  - TASK-47
priority: low
ordinal: 52000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Список /memories теперь отдаёт до двух URL последних кадров на воспоминание (TASK-47). Карточка kit'а (CardMemory/Stack в src/kit/card-memory.tsx) уже умеет рисовать thumbs — сейчас src/app/index.tsx передаёт только more={media_count} с пометкой ponytail «pass thumbs here the day /memories hands out previews». День настал.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 CardMemory на главном экране получает thumbs из ответа /memories, more — остаток сверх нарисованных кадров
- [x] #2 Ни одного отдельного запроса на карточку — все данные приходят одним вызовом /memories
- [x] #3 Пустое воспоминание по-прежнему честно показывает пустоту (kit's «—»), вёрстка не меняется за рамками того, что уже рисует кит
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Проводка UI, два места. src/api.ts: в типе Memory появилось поле recent_thumbnail_urls: string[] — зеркало ответа api (TASK-47), до двух подписанных ссылок, свежие первыми, пусто пока нет готовых превью или не настроен бакет. src/app/index.tsx: CardMemory получает thumbs={item.recent_thumbnail_urls} и more={Math.max(0, item.media_count - item.recent_thumbnail_urls.length) || undefined} — остаток сверх нарисованного, ноль схлопывается в undefined, отрицательного не бывает. Данные приходят тем же одним вызовом listMemories, лишних запросов на карточку нет; кит (Stack) не тронут, пустое воспоминание по-прежнему рисует прочерк. Комментарий-ponytail «pass thumbs here the day…» снят. Тест не добавлен: в проекте нет рендер-харнесса (ни testing-library, ни react-test-renderer), все существующие тесты — чистые функции; ради одного выражения на одном экране отдельный модуль не заводился. Проверено typecheck и vitest (21 тест зелёный). Коммит 8294793.
<!-- SECTION:NOTES:END -->
