---
id: TASK-404
title: >-
  mobile: буквы недели в календаре (en) не рвутся, подписи концов ползунка не
  слипаются, касание над клавиатурой на шаге «История» убирает клавиатуру
status: In Progress
assignee: []
created_date: '2026-09-26 13:34'
updated_date: '2026-09-26 13:34'
labels:
  - from-chief
milestone: m-28
dependencies:
  - TASK-403
priority: high
type: bug
ordinal: 395000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Независимая проверка на рендере оставила три дефекта: английские буквы недели в календаре рвутся по буквам («MO/N», «TU/E») на крупных ступенях, подписи концов ползунка слипаются («0:1010:00 · everything there is»), между кнопкой «Дальше» и клавиатурой на шаге «История» есть полоса ~38 pt, касание в которую не убирает клавиатуру.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Календарь (Create, правка воспоминания, лист фильтра) на iPhone SE, 17e и 17 Pro Max, ступени L, XXXL, AX-XL, AX-XXXL, ru и en: буквы недели не рвутся по буквам (мерка ширины берётся по самому длинному варианту из обоих языков, а не по «ПН»), цифры дней помещаются в клетку; тест закрепляет
- [ ] #2 Ползунок длины (MontageBuild): подписи концов («0:10» и «10:00 · everything there is») не слипаются и не выходят за карточку на iPhone SE и 17e на ступенях AX-XL и AX-XXXL, ru и en (перенос или зазор); тест закрепляет
- [ ] #3 Шаг «История ролика» (MontageStory) на iPhone SE и 17e, ступени L, XXXL, AX-XXXL, клавиатура вверх: касание в любом пустом месте между кнопкой «Дальше» и клавиатурой убирает клавиатуру (нет мёртвой полосы); тест закрепляет; полный npm test зелёный, тесты адаптивности не ослаблены, подтверждено на стенде
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Коммит в ветке worktree сервиса, слияние в dev — за лидом
- [ ] #2 Автотесты приложения зелёные
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Пакет FINAL-3. Источник: результаты независимой проверки — /private/tmp/m28-final/report/violations-classified.csv|json (строки D1–D4), report/snapshots/ (D1, D2, D3, D4, MontageStory), сырые деревья и снимки /private/tmp/m28-final/f2b, f3, story/. Места: D1 — src/kit/calendar.tsx:94 (fitCell для букв недели, LETTERS_EM = 1.8 снят с «ПН», en «MON/TUE/WED/THU/SUN» шире ≈2.5 em; буквы календаря без подписи доступности, проверка слова их не видит — тест сам должен мерить по файлу шрифта); D2 — src/kit/slider.tsx:222 (ends: space-between без зазора и переноса, рамки касаются, проверка стенда их не ловит); D3 — нижний отступ подвала доски вне DISMISS_KEYBOARD (src/kit/interaction.ts, src/kit/bars.tsx, KeyboardAvoidingView). D4 (порванное слово в первом кадре холодного старта, один кадр ~0.3 с) — НЕ в этом пакете, отдельный черновик. Стенд: свой экземпляр (копия /private/tmp/m28-visual-stand; образцы — /private/tmp/m28-final/stand-b (правки порта 3901 в cli.mjs portTaken), /private/tmp/m28-401/…; порты 3981/8102, ОТДЕЛЬНЫЙ TMPDIR для Metro — кэш общий и запекает адрес api и чужой checkout; проверь адрес api в бандле grep -a 127.0.0.1:39xx), устройство m28-404-…, одно, без окна, удалить после; ловушки: simctl ui content_size перезапускает приложение, очередь загрузки живёт в хранилище Expo Go. Мерить глазом по снимкам: слепые пятна проверок стенда (D1 и D2 найдены только глазом).
<!-- SECTION:NOTES:END -->
