---
id: TASK-134
title: 'mobile: устаревший комментарий про ролик всегда 16:9 в films.tsx'
status: To Do
assignee: []
created_date: '2026-09-09 07:13'
updated_date: '2026-09-09 09:08'
labels:
  - from-lead
milestone: m-20
dependencies: []
priority: low
type: bug
ordinal: 141000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Найдено попутно при TASK-126.3. Над модалкой просмотра ролика в src/memory/films.tsx комментарий утверждает, что ролик всегда 16:9 и это повод разрешить поворот. После TASK-126 ролик бывает и вертикальным — сам просмотр не ломается (поворот разрешён в обе стороны), но комментарий вводит в заблуждение. Не входило в границы той карточки.
<!-- SECTION:DESCRIPTION:END -->
