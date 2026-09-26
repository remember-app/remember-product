---
id: TASK-403
title: >-
  test: повторная проверка на настоящем рендере после пакетов слов и поля
  истории — экраны из перебора, SE и 17e
status: Done
assignee: []
created_date: '2026-09-26 10:21'
updated_date: '2026-09-26 13:34'
labels:
  - from-chief
milestone: m-28
dependencies:
  - TASK-400
  - TASK-401
priority: high
type: feat
ordinal: 394000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Кодеры сами повторили перебор по своим экранам; нужна независимая проверка тем, кто перебор проводил: те же экраны, те же ступени, что раньше дали нарушения, плюс регрессия на обычном размере против макета.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Перебор экранов из корней R1–R4 отчёта /private/tmp/m28-sweep/report/summary.md (Account, MemorySettings, Contacts, SheetFrameInfo, Viewer, ViewerVideo, SheetLiveFile, SheetConfirmMemory, SheetFilter, шапки лент, MontageLiveDone, Main, MontageSummary, MontageMusic, MontageMusicNone, MontageStory, MontageTemplate, InviteDead, UploadQueue, UploadAccess, SheetRejected, HomeOffline, FramesPicking, MemoryDated, MemoryScrub) на iPhone SE и 17e и 17 Pro Max, ступени L, XXXL, AX-XL, AX-XXXL, ru и en (для MontageStory и экранов с полями — клавиатура вверх/вниз); нарушения классов word-broken, text-truncated (кроме оставленных по спеке — список в отчёте TASK-400) и unreachable — нет, либо названы с классом и корнем
- [x] #2 Регрессия на обычном размере: все 56 состояний на 17e (ночь, ru) заново сняты и сверены с раундом 2 (/private/tmp/m28-visual-compare/round2/): число расхождений с макетом не выросло, новых нет; отличия названы
- [x] #3 Ничего не правится тестером; после себя не оставлено устройств вне стенда, процессов, worktree и временных файлов в репозиториях; раздача стендом проверяемого checkout подтверждена
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 Отчёт передан лиду
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Стенд /private/tmp/m28-visual-stand (README.md) + исправленные рецепты и лёгкие прогонщики /private/tmp/m28-sweep/ (states-fixed.mjs, lite.mjs, sweep-lite-*.mjs, pass.sh, resetWorld перед ячейкой). Ловушки: отдельный TMPDIR для Metro; simctl ui content_size перезапускает приложение; tapTile/picking привязаны к окну y 120…750 — на SE при L плитки на 0.5 пт ниже; пожелание к треку / SheetLiveFile на крупном шрифте; системный вопрос о фото на AX-XXXL; слепое пятно проверок: имя трека «Спокой…» не ловится — проверять глазом; keyboard-stuck и overlap на LoginCode — шум. Приложение — снимок dev в отдельном worktree (git worktree add --detach /private/tmp/m28-final-app dev; убрать после). Известные оставленные по спеке многоточия (не нарушения): капсула ленты, история в итоге (4 строки), пожелание к треку в «Выбрано», запись под этапом (2 строки), имя застрявшего файла, имя лейбла в строке.
<!-- SECTION:NOTES:END -->
