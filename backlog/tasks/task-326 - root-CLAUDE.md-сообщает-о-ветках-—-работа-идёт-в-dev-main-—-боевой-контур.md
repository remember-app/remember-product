---
id: TASK-326
title: 'root: CLAUDE.md сообщает о ветках — работа идёт в dev, main — боевой контур'
status: Done
assignee:
  - '@coder'
created_date: '2026-09-25 07:50'
updated_date: '2026-09-25 07:51'
labels:
  - from-chief
milestone: m-29
dependencies: []
priority: medium
type: feat
ordinal: 323000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
По слову человека вся работа переведена на ветку dev во всех четырёх репозиториях; main оставлен под будущий боевой контур. Корневой CLAUDE.md должен говорить об этом правду в двух строках.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 В корневом CLAUDE.md две короткие строки (не абзац, не раздел): работа идёт и сливается в ветку dev; main — боевой контур и без слова человека никем не трогается; деплой дев-контура собирается из dev. Формулировка совпадает по стилю с остальным файлом, без пересказа причин и истории
- [ ] #2 Изменён только корневой CLAUDE.md; правила в .claude/rules/ и остальные файлы не тронуты; если в CLAUDE.md есть другое утверждение про main, которое после этого стало неправдой, оно поправлено там же
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Коммит в ветке worktree корня, слияние в dev — за лидом
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Репозиторий: корень продукта (/Users/kubik/Nox/projects/remember), ветка dev. Строки вставить рядом с описанием раскладки репозиториев (раздел Sub-projects). Никаких других правок.
<!-- SECTION:NOTES:END -->
