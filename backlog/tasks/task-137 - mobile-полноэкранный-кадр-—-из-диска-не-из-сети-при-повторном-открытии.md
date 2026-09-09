---
id: TASK-137
title: 'mobile: полноэкранный кадр — из диска, не из сети при повторном открытии'
status: Done
assignee: []
created_date: '2026-09-09 09:20'
updated_date: '2026-09-09 09:26'
labels:
  - from-lead
milestone: m-19
dependencies: []
type: feat
ordinal: 144000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
`openFrameOf` (src/frames.ts) уже верно выбирает `preview_url` с откатом на `thumbnail_url`, и это уже покрыто тестами (frames.test.ts) — не трогать. Проблема в самом просмотрщике: `src/memory/frames.tsx` рисует открытый кадр через `Image` из `react-native` — у него нет управляемого дискового кеша. Сетка тайлов (`kit/tile.tsx`) уже использует `Image` из `expo-image` (уже установленная зависимость), у которой дисковый кеш есть по умолчанию (`cachePolicy: 'disk'`).

Важно: ссылки подписаны и живут 15 минут (`R2_DOWNLOAD_TTL_SECONDS`), при каждом новом чтении галереи `preview_url`/`thumbnail_url` — новый URL с новой подписью. Ключ кеша у expo-image по умолчанию — сам `uri`; если оставить так, второй показ того же кадра после переподписи всё равно уйдёт в сеть, хотя байты те же. Кеш-ключ должен быть завязан на что-то стабильное — на `id` записи.

Сделать:
1. В `src/memory/frames.tsx` заменить `Image` (react-native) на `Image` (expo-image) в просмотрщике: те же пропсы (`resizeMode="contain"` → `contentFit="contain"`), плюс явный `cacheKey`, построенный из `id` открытой записи — не из URL.
2. Ограничить дисковый кеш по размеру. iOS: `Image.configureCache({ maxDiskSize: 262144000 })` (250 МБ) — у SDWebImage (то, на чём построен expo-image на iOS) по умолчанию лимита нет (0 = безлимит), это и есть источник бесконечного роста. Android не трогать: там expo-image уже поднимает Glide с его собственным дисковым кешем по умолчанию 250 МБ и вытеснением LRU из коробки — число выбрано тем же, для симметрии между платформами. Вызов — один раз при старте приложения (рядом с `lockPortrait()` в `src/app/_layout.tsx`), строго под `Platform.OS === 'ios'`: на Android этого метода в нативном модуле нет, безусловный вызов может уронить старт. Своего кеша не писать — только конфигурация уже установленной библиотеки.
3. Поправить комментарий над `openFrameOf` в `src/frames.ts` — сейчас там написано «у фото такой копии нет сегодня»; после соседней задачи в montage (TASK-136) это больше не так.

Не входит: сама логика выбора preview/thumbnail, видео-плеер (expo-video), сетка тайлов — не трогать, вне жалобы человека.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Просмотрщик рисует открытый кадр через Image из expo-image, а не из react-native
- [x] #2 У этого Image cacheKey не зависит от подписи в URL (например, id записи) — второй показ того же кадра при новом подписанном URL берётся из кеша, а не перекачивается
- [x] #3 На iOS дисковый кеш expo-image ограничен явным configureCache({ maxDiskSize: 262144000 }), вызов сделан один раз при старте и не выполняется на Android
- [x] #4 Автотест (в духе уже существующих raw-текстовых проверок memory-screens.test.ts/frames.test.ts) подтверждает: expo-image в просмотрщике, стабильный cacheKey, вызов configureCache с ограничением под iOS-гейтом
- [x] #5 npm test и npm run typecheck в mobile зелёные
<!-- AC:END -->
