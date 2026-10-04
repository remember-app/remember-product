---
id: TASK-429
title: 'mobile: npm run lint ничего не проверяет внутри воркتри агентов'
status: Done
assignee: []
created_date: '2026-09-27 10:54'
updated_date: '2026-10-04 11:25'
labels:
  - from-lead
dependencies: []
priority: low
type: bug
ordinal: 418000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Шаблон !!**/.claude в biome.jsonc гасит все файлы внутри любого ворктри агента (.claude/worktrees/...), поэтому npm run lint там падает без единой проверенной строки. Найдено при работе над TASK-420 — агенту пришлось гонять biome на копии файлов во /tmp, чтобы вообще что-то проверить. Влияет на все задачи, которые ведутся в изолированных ворктри mobile, не только на эту.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 npm run lint в ворктри агента (внутри projects/mobile/.claude/worktrees/...) проверяет реальные файлы задачи, а не завершается пустым результатом
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Закрыто как дубль карточки TASK-516 — она описана там же, во второй из двух мелочей окружения.

Правка пришла коммитом `a1e7a7d`, слита в `dev` как `e3fc381`. Причина названа точно: биом узнаёт
`.claude` по пути к самой копии, и строка `"!!**/.claude"` в `biome.jsonc` вычёркивала корень
worktree целиком. Исключение убрано; рабочие копии и так не входят в проверку — их отсекает
`.gitignore` (`.claude/worktrees/`) через `vcs.useIgnoreFile`.

Проверено лично, до и после:
- на старом `dev`: код 1, «Checked 0 files», «No files were processed»;
- после правки: код 0, «Checked 317 files»;
- битый файл в `src/` в изолированной копии даёт код 1, после отката — 0.

Обе причины закрыты: линтер проверяет файлы и не врёт кодом ошибки на пустом месте.
<!-- SECTION:NOTES:END -->
