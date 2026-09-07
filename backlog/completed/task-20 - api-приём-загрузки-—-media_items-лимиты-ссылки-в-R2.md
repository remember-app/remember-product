---
id: TASK-20
title: 'api: приём загрузки — media_items, лимиты, ссылки в R2'
status: Done
assignee: []
created_date: '2026-09-03 12:59'
updated_date: '2026-09-03 15:37'
labels:
  - from-chief
milestone: m-3
dependencies: []
priority: high
type: feat
ordinal: 24000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Приложение говорит api «хочу загрузить файл», api проверяет лимиты воспоминания, заводит запись медиа в статусе ожидания и отдаёт подписанную ссылку на прямую загрузку в R2 частями с докачкой. По колбэку «загружено» запись переходит в обработку, счётчики растут, воркеру ставится задача на превью.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Миграция заводит media_items (поля из architecture.md «Модель данных»); накат на пустую базу идемпотентен
- [x] #2 POST /memories/:memoryId/media за app.authenticate плюс app.requireMembership: viewer получает 403, не участник или кривой id — 404 телом семейства; contributor/organizer получают подписанную ссылку на multipart-загрузку в R2 и id записи media_items в статусе pending_upload
- [x] #3 Лимиты (размер файла, длительность видео, суммарный объём и число файлов на воспоминание) читаются из env; превышение — отказ с внятным телом, запись не создаётся
- [x] #4 Колбэк «загружено» переводит запись в processing, увеличивает storage_bytes и media_count на воспоминании и user_usage в той же транзакции, ставит задачу media_preview в jobs; повторный колбэк идемпотентен
- [x] #5 Протухшую ссылку клиент запрашивает заново, не создавая новую запись media_items
- [x] #6 Таблица jobs доступна тестам api, при этом api не заводит на неё миграцию — schema.sql montage остаётся единственным источником схемы
- [x] #7 Живые тесты против настоящего Postgres: матрица ролей на загрузку, срабатывание каждого лимита, постановка задачи, идемпотентность колбэка
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
architecture.md: «Хранилище и медиа-пайплайн», «Лимиты», «Очередь задач», «Обработка ошибок». R2 — S3-совместимое API; клиента нет, выбрать лёгкий (aws4fetch для подписи или @aws-sdk/client-s3 плюс presigner) — решает coder-implement. Env: endpoint, бакет, ключи, TTL загрузки ~1 ч. Ключ оригинала в R2 — по id записи. captured_at приходит от клиента. TRAP #2: api pretest гоняет только postgrator; jobs завести для тестов, не нарушая владение montage — механизм за coder-implement, при упоре эскалировать лиду. Числа лимитов — предложенные из architecture.md: 1 ГБ на файл, видео ≤5 мин, 10 ГБ и 1000 файлов на воспоминание; в env, не в код. Матрица прав и хелпер requireMembership — README api, раздел «Как повесить проверку прав на воспоминание».
<!-- SECTION:NOTES:END -->
