---
id: TASK-300
title: 'Человек: бакет Google для Remember и ключи доступа к нему'
status: To Do
assignee:
  - '@human'
created_date: '2026-09-25 06:59'
updated_date: '2026-09-25 07:54'
labels:
  - from-chief
milestone: m-29
dependencies: []
priority: high
type: feat
ordinal: 297000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Для друзей нужны свои закрытые хранилища Google (не общее со статикой лендингов) и доступ к ним для приложения. Решение 2026-09-25: идём родным доступом Google по JSON-ключу служебной учётки (как у qe-life), ключи совместимости (HMAC) не просим. У человека нет доступа в консоль Google, всё через коллегу.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Есть два закрытых бакета: remember-dev-media (кадры, превью, ролики друзей) и remember-dev-check (только для проверок, объекты живут сутки); имена могут быть близкими, если эти заняты — точные названы лиду; регион — тот же, где кластер (europe-north1), публичный доступ выключен
- [ ] #2 Есть служебная учётка remember-storage с ролью Storage Object User только на эти два бакета (на уровне бакетов, не проекта) и её JSON-ключ; человек сохранил ключ файлом вне всех репозиториев (~/.remember-secrets.gcs.json, права 600)
- [ ] #3 Имена бакетов человек записал в ~/.remember-secrets.env строками GOOGLE_STORAGE_BUCKET и GOOGLE_STORAGE_CHECK_BUCKET; значения ключа в чат, карточки и отчёты не идут
- [ ] #4 По возможности: на основном бакете правило, удаляющее незавершённые многочастные загрузки старше 7 дней
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Отчёт devops со списком созданного и командами отката принят лидом
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
СТОП 2026-09-25 по S3-ключам: коллега HMAC не выдаёт (у qe-life ему отказали в том же). Просьба к коллеге — той же формы, что для qe-life: два закрытых бакета (remember-dev-media и remember-dev-check, europe-north1, публичный доступ выключен), служебная учётка remember-storage с ролью Storage Object User только на эти бакеты, её JSON-ключ файлом (не в чат). Мягкое удаление у новых бакетов включено на 7 дней по умолчанию. Реализация: собственный доступ по JSON-ключу вместо S3-протокола — карточки api и montage появятся после короткой живой проверки подписи ссылок на куски закрытым ключом (карточка проверки).
<!-- SECTION:NOTES:END -->
