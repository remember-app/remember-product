---
id: TASK-188
title: 'design: заново разложить обновлённый макет (56 экранов) в спецификацию'
status: In Progress
assignee: []
created_date: '2026-09-21 12:24'
updated_date: '2026-09-21 12:25'
labels:
  - from-chief
milestone: m-24
dependencies: []
priority: high
type: feat
ordinal: 195000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Спецификация design/spec.md описывает прошлую версию макета. Разложить обновлённый макет целиком: детали со всеми видами и состояниями, токены, и сборка каждого из 56 экранов — включая экраны лейблов, заказа ролика и монтажа в прямом эфире, которые делают соседние вехи. По этому документу три соседние вехи и эта строят экраны.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Каждый из 56 экранов из design/screens описан: из каких деталей и в каком состоянии собран
- [ ] #2 Каждая деталь описана со всеми видами и состояниями; рядом с каждой отмечено, чем она стала относительно нынешнего кита в projects/mobile/src/kit: совпала, изменилась или новая — по этой таблице строится кит
- [ ] #3 Токены обеих тем, шрифты и шкала сверены с design/README.md разделы 1–2
- [ ] #4 Два места, которых нет в макете, дорисованы в спецификации по тому же макету: переименование и удаление лейбла (лист «Лейблы») и раздел «Лейблы» в фильтрах (слово chief 2026-09-21)
- [ ] #5 Устаревшее из прежней спецификации убрано; расхождения макета с кодом и открытые вопросы к человеку — отдельным разделом
- [ ] #6 Оригиналы design/screens и design/index.html не изменены; спецификация закоммичена в main корневого репозитория
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Ничего лишнего не оставлено
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Читать первым: design/README.md (раздел 5 — что макет меняет в коде). Skill designer-import, ориентир качества — designer-craft. Экраны: 56 в design/screens/. Убраны из макета: MemoryFilms, MemoryPeople, MontageProgress. Новые: MemoryScrub, MemoryDated, MemorySettings, MontageTemplate, MontageMusicNone, MontageSummary, MontageLive, MontageLiveStage, MontageLiveDone, SheetLiveFile, SheetFrameInfo, SheetLabels, SheetLabelNew. Заметно изменены: Create, MemoryFrames, FramesByPeople, FramesEmpty, FilmsEmpty, FramesPicking, Upload, Viewer, ViewerVideo, SheetFilter, SheetSort, SheetFrame, MontageBuild, MontageMusic, MontageStory. Сверять с нынешним китом: projects/mobile/src/kit/*. Оригиналы не менять. Коммитить только design/spec.md путевым коммитом (git commit -- design/spec.md): в корневом дереве одновременно работают другие вехи, их доска и указатели в коммит попасть не должны. Слить в main корня и сообщить лиду.
<!-- SECTION:NOTES:END -->
