---
id: TASK-400
title: >-
  mobile: подписи и имена переносятся, а не режутся; слова в ряду с соседом не
  рвутся по буквам
status: In Progress
assignee: []
created_date: '2026-09-26 06:23'
updated_date: '2026-09-26 06:23'
labels:
  - from-chief
milestone: m-28
dependencies:
  - TASK-396
priority: high
type: bug
ordinal: 391000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Перебор экранов на настоящем рендере нашёл два общих корня: имя, дата или подпись в ряду с соседом режутся многоточием вместо переноса (уже на обычном размере текста на узком iPhone SE: «Лиза Мороз…», «340 кадр…») и слова рвутся по буквам («Сохрани/ть», «Поделит/ься», «Проявля/ем…», «Отпр/авляе/м», «ВЫБ/РАН/О», «Приглаше/ние не/ действуе/т»).
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Корень R1: имена, даты, меты и подписи на экранах Account, MemorySettings, Contacts, SheetFrameInfo, Viewer, SheetLiveFile, SheetConfirmMemory, SheetFilter, шапках лент (MemoryFrames, MemoryDated, MemoryScrub, FramesByPeople, FramesEmpty, FilmsEmpty), MontageLiveDone, Main, MontageSummary переносятся на следующую строку, а не режутся многоточием, на iPhone SE (375×667), 17e и 17 Pro Max на ступенях XS, L, XXXL, AX-XL, AX-XXXL, ru и en; многоточие остаётся только там, где спека прямо его требует и на строке лежит вторичное представление — такие места названы списком в отчёте для решения дизайнера
- [ ] #2 Корень R2: слова не рвутся по буквам — «Сохранить»/«Поделиться» и плитки-числа («просмотрел», «склейки») на MontageLiveDone, «Проявляем…» в плитке ленты (MemoryFrames, MemoryDated, MemoryScrub, FramesPicking), «Отправляем» в карточке очереди (UploadQueue, UploadAccess), метка «ВЫБРАНО» на MontageMusicNone, заголовок InviteDead; общее правило в ките (перестройка «WordRoom» по факту разрыва для любых слов в ряду с соседом; потолок роста заголовка пустого состояния под 375), а не заплатки по экранам
- [ ] #3 Подтверждено повторным перебором на стенде тех же экранов, устройств, ступеней и языков: нарушений классов word-broken и defect/text-truncated по перечисленным экранам нет; на обычном размере текста раскладка на 390×844 не изменилась; полный npm test зелёный, тесты адаптивности не ослаблены и падают при возврате дыры (намеренная порча)
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Коммит в ветке worktree сервиса, слияние в dev — за лидом
- [ ] #2 Автотесты приложения зелёные
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Пакет WORDS. Источник: /private/tmp/m28-sweep/report/summary.md, report/violations-classified.csv|json (экран, устройство, ступень, язык, клавиатура, вид, класс, корень, элемент, снимок), снимки и деревья в /private/tmp/m28-sweep/p1…p4, ручные проверки manual/, burst/. Классы: defect / known-ceiling (потолок ×2 оставил строку обрезанной) / known / env / noise. Шум (не чинить): overlap на LoginCode (скрытое поле кода лежит поверх ячеек по замыслу), vanished (рецепт снял другое), keyboard-stuck (эвристика), text-truncated у кнопки-значка «Ещё/More». Вероятные места: src/kit/text.tsx (TYPE_MOST, HEADING_MOST, numberOfLines у ролей meta/metaSm/barTitle, WordRoom), bars.tsx, rows.tsx, member.tsx, card-memory.tsx, tile.tsx, upload.tsx, montage-order.tsx (метка ВЫБРАНО), empty.tsx (emptyTitle 1.93 слишком высок для 375), app/invite.tsx, app/memory/[id]/montage/[montageId]/done.tsx. Правило по умолчанию: текст, несущий смысл (имя, дата, мета, подпись), переносится; высоты — минимальные; ряд с соседом переносится (rows-wrap). Спека 10.11 и раздел 8 говорят, где многоточие сознательно (например, однострочные имена треков, заголовки шапок) — сверяйся; спорное называй, не решай. Основной стенд /private/tmp/m28-visual-stand: копия для своего экземпляра (см. /private/tmp/m28-398/ — образец уже удалён; порты свободные 3979/8100; отдельный TMPDIR для Metro; устройство m28-400-…; по одному; удалить). Инструменты перебора тестера: /private/tmp/m28-sweep/ (states-fixed.mjs — исправленные рецепты tapTile/picking и учёт light/photos; lite.mjs, sweep-lite-*.mjs, pass.sh; resetWorld перед ячейкой); ловушки стенда: simctl ui content_size перезапускает приложение; sweep.mjs не сбрасывает мир между экранами.
<!-- SECTION:NOTES:END -->
