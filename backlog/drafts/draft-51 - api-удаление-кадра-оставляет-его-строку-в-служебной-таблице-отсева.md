---
id: DRAFT-51
title: 'api: удаление кадра оставляет его строку в служебной таблице отсева'
status: Draft
assignee: []
created_date: '2026-11-01 09:49'
labels:
  - from-chief
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Строка кадра в таблице, где воркер хранит миниатюру и резкость, переживает удаление самого кадра: внешнего ключа нет, очистки нет. Таблица растёт мусором.
<!-- SECTION:DESCRIPTION:END -->
