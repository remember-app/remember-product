---
id: TASK-120
title: 'mobile: открытый на весь экран кадр показывает превью, а не полное изображение'
status: Done
assignee: []
created_date: '2026-09-08 19:02'
updated_date: '2026-09-09 07:09'
labels: []
milestone: m-17
dependencies: []
priority: high
ordinal: 124000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Найдено лидом m-16 по ходу работы. При открытии кадра на весь экран рисуется уменьшенная версия, а не полный препросмотр — на телефоне это видно как мыло. Бьёт по сути продукта: смотреть чужие кадры и есть смысл галереи.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Кадр, открытый на весь экран, показывает preview (полный препросмотр), а не thumbnail (миниатюру)
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Рядом с frameOf в src/frames.ts встал openFrameOf: preview_url, эскиз — запас под ним; общая поправка «ready без производной = упавший кадр» вынесена в один приватный frameWith. src/memory/frames.tsx читает открытый кадр через openFrameOf, плитки сетки и ленты — по-прежнему через frameOf. Тесты: четыре в src/frames.test.ts на новую функцию, пин исходника в src/memory-screens.test.ts переписан. 232 теста и tsc зелёные. Ветка task-120-open-frame-preview в репозитории mobile, мердж за лидом.

Важно для лида: у фото крупной производной сейчас нет вообще. Воркер по media_preview делает для фото только эскиз 640px, а preview_url — это 720p-копия видео (architecture.md, montage/media.py). Поэтому мобильная сторона теперь берёт preview, когда он есть, но видимое мыло на фото уйдёт только после того, как montage начнёт делать крупную производную для фото, а api отдавать её. Прямое чтение preview_url без запаса повесило бы «Показывать нечего» над каждым фото.
<!-- SECTION:NOTES:END -->
