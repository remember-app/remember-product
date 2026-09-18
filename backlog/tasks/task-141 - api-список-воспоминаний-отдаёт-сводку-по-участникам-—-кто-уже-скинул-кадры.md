---
id: TASK-141
title: 'api: список воспоминаний отдаёт сводку по участникам — кто уже скинул кадры'
status: Done
assignee: []
created_date: '2026-09-18 13:00'
updated_date: '2026-09-18 13:09'
labels:
  - from-chief
milestone: m-21
dependencies: []
priority: high
type: feat
ordinal: 148000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Список воспоминаний на главном экране показывает, сколько участников уже скинули кадры — сейчас сервер этого не отдаёт, и главному экрану пришлось бы делать запрос на каждую карточку.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 GET /memories отдаёт для каждого воспоминания число уже скинувших кадры участников и общее число участников
- [x] #2 Верно и на воспоминании без единого участника кроме организатора, и там, где скинули все
- [x] #3 Тесты на GET /memories обновлены под новое поле, автотесты зелёные
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 Ничего лишнего не оставлено
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
doc-06, design/README.md раздел 5 п.1. GET /memories (projects/api/src/memories/plugin.ts) — добавить в ответ сводку по memory_members.status для каждого воспоминания (сколько уже скинули / всего участников), аналогично тому, как GET /memories/:id/members уже читает contribution_status. Миграция не нужна — статус уже есть в memory_members. Если миграция всё же понадобится — номер брать следующий свободный на main, при конфликте перенумеровать (в api параллельно пишут ещё две вехи).
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
GET /memories отдаёт member_count и contributed_member_count — сводку по memory_members.status одним lateral-джойном, без миграций. «Скинул» = любой статус, кроме not_started. POST /memories отвечает теми же полями (1 и 0), чтобы созданное клалось в начало списка как есть. README обновлён. Тесты: 86 зелёных, typecheck чистый. Коммит 88f13a3 в ветке worktree-agent-a2319c3b6eb082f0c — слить в main не смог: изоляция воркрии запрещает трогать общий чекаут, ветка идёт fast-forward поверх main (8b882ba).
<!-- SECTION:FINAL_SUMMARY:END -->
