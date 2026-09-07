---
id: TASK-30
title: 'mobile: действие «скачать» в галерее — файл и вся галерея'
status: Done
assignee: []
created_date: '2026-09-04 12:42'
updated_date: '2026-09-04 12:54'
labels:
  - from-chief
milestone: m-5
dependencies:
  - TASK-28
priority: high
type: feat
ordinal: 34000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
На уже существующем экране галереи (src/app/memory/[id]/gallery.tsx) — кнопка «Download» у открытого файла и «Download all» для всей галереи разом; тянут оригинал по новым api-маршрутам и кладут его в галерею телефона. Новых экранов и вёрстки нет — человек параллельно готовит UI-кит. Закрывает doc-07 Gallery Download со стороны mobile.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 src/api.ts: downloadMedia(token, memoryId, mediaId) → { url } и downloadAllMedia(token, memoryId) → { id, kind, url }[], бьющие в маршруты TASK-28
- [x] #2 app.json: плагин expo-media-library получает savePhotosPermission с текстом объяснения (сейчас false) — без него сохранение в галерею телефона падает без объяснения пользователю
- [x] #3 В открытом просмотре файла (Modal) — кнопка Download рядом с Close/Delete, видна независимо от роли (viewer тоже); тянет оригинал во временный файл (expo-file-system File.downloadFileAsync) и сохраняет его в галерею телефона (expo-media-library saveToLibraryAsync, /legacy как в остальном коде); просит permission на сохранение при первом использовании; ошибка выводится тем же notice, что у остальных действий экрана
- [x] #4 В футере экрана — кнопка Download all, видна любому участнику (не только contributor/organizer): по одному нажатию тянет весь список через downloadAllMedia и сохраняет файлы один за другим с индикатором «X из N»; отказ одного файла не останавливает остальные, в конце — сводка, если что-то не скачалось
- [x] #5 Ничего из существующей вёрстки экрана не тронуто сверх этих двух кнопок
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Зависит от TASK-28 (новые api-маршруты). original_key и media_items не хранят имя файла/расширение — имя локального файла собирается из kind (jpg/mp4), это осознанное упрощение (пометить ponytail: с потолком и путём апгрейда — настоящее имя файла при загрузке). expo-media-library и expo-file-system уже в зависимостях, новых пакетов не нужно. Дублировать паттерн из upload.tsx/uploads.ts (импорт из 'expo-media-library/legacy', File/Paths из 'expo-file-system').

Указание CHIEF (смена порядка по m-5): ревью и тестировщик на этой вехе не запускаются, новых тестов специально не заводим (для mobile их и так не требовалось — ручное тестирование тоже отложено).
<!-- SECTION:NOTES:END -->
