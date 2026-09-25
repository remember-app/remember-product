---
id: TASK-300
title: 'Человек: бакет Google для Remember и ключи доступа к нему'
status: To Do
assignee:
  - '@human'
created_date: '2026-09-25 06:59'
updated_date: '2026-09-25 07:36'
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
Для друзей нужен свой закрытый бакет Google (не общий бакет статики лендингов) и пара ключей для S3-совместимого доступа к нему. Заводит человек руками — ключей и бакета у нас нет.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Есть закрытый бакет только под Remember (основной) и маленький бакет для проверок с правилом удаления объектов через сутки; у обоих запрещён публичный доступ, включён единый доступ на уровне бакета; регион и точные имена названы в отчёте
- [ ] #2 К бакетам есть пара HMAC-ключей отдельного сервисного аккаунта Remember (не ключ чужого сервисного аккаунта), с ролью чтения/записи/удаления объектов только на этих двух бакетах и без прав на список чужих; права выданы на уровне бакета, а не проекта
- [ ] #3 В основном бакете есть правило, обрывающее незавершённые многочастные загрузки старше 7 дней (если Google это поддерживает; иначе — сказано прямо и как обойтись); мягкое удаление оставлено по умолчанию, но о нём сказано в отчёте одной строкой
- [ ] #4 Значения ключей лежат только в ~/.remember-secrets.env (права 600, вне репозиториев) строками R2_ENDPOINT, R2_BUCKET, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_CHECK_BUCKET, R2_CHECK_ACCESS_KEY_ID, R2_CHECK_SECRET_ACCESS_KEY; ни в отчёте, ни в карточках, ни в репозиториях значений нет
- [ ] #5 Записано всё созданное (бакеты, сервисный аккаунт, ключи, правила): имя, где, команда отката; ничего чужого не изменено, права на уровне проекта не менялись
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Отчёт devops со списком созданного и командами отката принят лидом
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
СТОП 2026-09-25 (отчёт devops): доступа нет. Единственный путь в Google Cloud с мака — JSON-ключ чужого сервисного аккаунта из репозитория инфраструктуры; система разрешений запретила им пользоваться, обходить это нельзя, снять запрет может только владелец. gcloud не установлен, логина нет. Создать нужно человеку (или тому, у кого есть доступ к проекту GCP) — консоль Google Cloud: (1) Cloud Storage → создать два бакета: основной (имя вида noxlabs-remember-dev-media) и для проверок (noxlabs-remember-dev-check), регион europe-north1, класс Standard, единый доступ на уровне бакета, запрет публичного доступа включён; (2) IAM → Service Accounts → создать remember-storage; на каждый из двух бакетов выдать ей роль «Storage Object User» на уровне бакета (вкладка Permissions), не на проект; (3) Cloud Storage → Settings → Interoperability → Create a key for a service account → remember-storage → записать пару Access key / Secret; (4) в основном бакете Lifecycle → правило «Abort incomplete multipart uploads» age 7 дней; в бакете проверок — правило «Delete object» age 1 день; (5) значения — в ~/.remember-secrets.env (права 600), строками R2_ENDPOINT=https://storage.googleapis.com, R2_BUCKET, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_CHECK_BUCKET, R2_CHECK_ACCESS_KEY_ID, R2_CHECK_SECRET_ACCESS_KEY (можно одна пара на оба бакета). Мягкое удаление у новых бакетов включено на 7 дней по умолчанию — удалённые файлы физически лежат неделю.
<!-- SECTION:NOTES:END -->
