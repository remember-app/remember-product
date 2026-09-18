---
id: TASK-162
title: 'mobile: мастер заказа ролика — выбор кадров, история, музыка, длина'
status: In Progress
assignee: []
created_date: '2026-09-18 14:40'
updated_date: '2026-09-18 14:41'
labels:
  - from-chief
milestone: m-23
dependencies: []
priority: high
type: feat
ordinal: 169000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
doc-03, макет «Афиша»: организатор заказывает ролик не тремя переключателями на одном листе, как сейчас, а мастером из четырёх шагов. Вид, тексты и раскладка — design/spec.md раздел 8 «Ролик: заказ по шагам» (там же — общая рамка мастера: шапка «Шаг N из 4», шкала прогресса, кнопка «Дальше»/«Смонтировать») и картинкой design/screens/MontageSelect.html, SheetRejected.html, MontageStory.html, MontageMusic.html, MontageBuild.html, SheetTooLittle.html. Библиотека деталей (src/kit) уже слита в main веткой Afisha (M-21) — часть имён и пропсов сменилась относительно старых экранов src/app и src/memory, не берите их за образец вида, только сам src/kit и spec.md.

Экраны этой задачи: MontageSelect (шаг 1, какие кадры взять), SheetRejected (лист «что сняли автоматически»), MontageStory (шаг 2, история), MontageMusic (шаг 3, музыка), MontageBuild (шаг 4, длина/формат/сводка/«Смонтировать»), SheetTooLittle (вместо шага 1, когда материала мало). Экран прогресса сборки (MontageProgress) — отдельная задача, в эту не входит: по нынешнему поведению заказанный ролик просто попадает в список воспоминания, как сейчас.

Точка входа: кнопка организатора «Смонтировать» в src/memory/films.tsx сейчас открывает простой Sheet с тремя полями (длина/трек/ориентация) и сразу шлёт заказ — замените его вызовом мастера. Перед шагом 1 — проверка, хватает ли материала (как сейчас 409 на заказе, но заранее, по числу готовых кадров воспоминания): не хватает — SheetTooLittle вместо шага 1.

Данные и контракт заказа (api, уже слито): POST /memories/:memoryId/montages принимает target_seconds, orientation, music_track_id ИЛИ music_track_key (не оба), story_text, include_media_ids/exclude_media_ids — см. src/montages/montages.ts и его README в projects/api. Библиотека треков — пять id (bright/warm/calm/night/road под «Яркая»/«Тёплая»/«Спокойная»/«Ночь»/«Дорога», в этом порядке) — если TASK-161 (api) ещё не слита на момент вашей работы, список из трёх старых id в api временно уже, чем в макете; ориентируйтесь на пять, api вот-вот догонит. Свой трек — POST /memories/:memoryId/music (intent) → загрузка кусками в R2 → POST .../music/:trackId/complete, ответ отдаёт key для music_track_key (см. src/montages/music.ts в api).

Автоматический отсев (для тайлов шага 1 и листа SheetRejected): GET /memories/:memoryId/media отдаёt на каждом кадре screening_rejected (boolean|null) и screening_reason (text|null) — null, пока анализ не готов; это предложение, а не решение, организатор правит его в любую сторону на шаге 1. Мобильный клиент (src/api.ts) эти поля пока не знает — добавить в тип медиа.

Мобильный клиент (src/api.ts) не знает новых полей заказа и своего трека вовсе — добавить типы и обёртки под контракт выше.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Кнопка «Смонтировать» открывает мастер (не старый Sheet); материала мало — открывается SheetTooLittle вместо шага 1
- [ ] #2 Шаг 1 (MontageSelect) показывает сетку кадров с состояниями по screening_rejected/вручную снятыми/включёнными/видео; SheetRejected показывает причины и позволяет вернуть один или все разом; отмеченное на шаге 1 сохраняется в состоянии мастера
- [ ] #3 Шаг 2 (MontageStory) — необязательное поле истории с счётчиком символов, шаг 3 (MontageMusic) — выбор одного из пяти треков библиотеки или загрузка своего с телефона
- [ ] #4 Шаг 4 (MontageBuild) — длина и ориентация, сводка трёх предыдущих шагов ссылками назад, «Смонтировать» шлёт один заказ POST /memories/:memoryId/montages со всеми полями (story_text, include_media_ids/exclude_media_ids, music_track_id или music_track_key, target_seconds, orientation)
- [ ] #5 Отмена на любом шаге закрывает мастер без заказа и без побочных загрузок (кроме уже загруженного своего трека, если он был)
- [ ] #6 Автотесты покрывают: отбор кадров и его отправку в include/exclude, выбор своего трека, отказ SheetTooLittle, весь путь до успешного заказа
<!-- AC:END -->
