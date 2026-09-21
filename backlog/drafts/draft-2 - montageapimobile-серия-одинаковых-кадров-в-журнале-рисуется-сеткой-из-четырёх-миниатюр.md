---
id: DRAFT-2
title: >-
  montage+api+mobile: серия одинаковых кадров в журнале рисуется сеткой из
  четырёх миниатюр
status: Draft
assignee: []
created_date: '2026-09-21 14:47'
labels:
  - from-lead
milestone: m-27
dependencies:
  - TASK-200
  - TASK-225
priority: low
type: feat
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
В макете запись «Взял 1 из 4» показывает не одну миниатюру, а сетку из кадров серии. Сейчас у записи один файл, серия видна только меткой «Взял 1 из N».
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Запись серии несёт кадры серии (их id, потолок числа), api отдаёт о них сведения и миниатюры в files[] порции, воркер пишет их на обоих путях (отсев и режиссёр)
- [ ] #2 Приложение рисует у записи серии сетку из миниатюр как в макете (деталь №61, вид «серия»); кадр серии, которого уже нет, не роняет запись
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Найдено при приёмке TASK-221 (лид M-27). Меняет контракт журнала: колонка в montage_journal_entries (миграция api ВЫШЕ самого большого номера на main), запись в journal.py/montage.py, выдача в journal.ts, экран. Три сервиса, поэтому черновик: ждёт слова chief/человека — по цене это заметно больше остального.
<!-- SECTION:NOTES:END -->
