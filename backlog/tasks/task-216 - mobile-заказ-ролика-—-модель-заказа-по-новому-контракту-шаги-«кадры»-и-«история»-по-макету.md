---
id: TASK-216
title: >-
  mobile: заказ ролика — модель заказа по новому контракту, шаги «кадры» и
  «история» по макету
status: Done
assignee: []
created_date: '2026-09-21 13:31'
updated_date: '2026-09-21 14:08'
labels:
  - from-chief
milestone: m-26
dependencies: []
priority: high
type: feat
ordinal: 223000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Мастер заказа ролика переходит на новый контракт сервера — музыка списком, длина любым числом, итог, шаблоны — и получает первые два шага по обновлённому макету: какие кадры взять (с листом «что сняли автоматически») и история ролика.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Шаг «Какие кадры взять» выглядит и ведёт себя как в макете: кадры взятые, снятые автоматом с причиной и снятые рукой различимы; «Что сняли» открывает лист с тремя причинами, «Вернуть» и «Вернуть все» возвращают кадры; если сняли всё — «Дальше» недоступна и подпись просит оставить кадр
- [x] #2 Шаг «Как смонтировать» по макету: плашка шаблона, длинное поле с историей, правка текста заменяет плашку на «Свой текст»; шаг пропускается без ввода
- [x] #3 Шапка мастера — «Шаг N из 4» со шкалой, «Назад», «Отмена» — из кита; переходы между шагами не теряют введённое
- [x] #4 Тело запроса собирается по новому контракту: снятое автоматом минус возвращённое плюс снятое рукой уходит в исключённые, треки — списком по порядку и всегда (пустой — без музыки), пожелания только при треках; клиенты шаблонов, итога и заказа описаны и покрыты тестами
- [x] #5 Заказ проходит до конца на новой модели, подпись музыки на карточке ролика читает новый список треков и старые строки
- [x] #6 Тесты и проверка типов зелёные; новые строки в ru и en
- [x] #7 Экраны собраны из деталей кита без своих цветов и проверены на обе темы — светлая подстановкой токенов по образцу HomeDay (слово chief: отдельной вехи под светлую тему не будет)
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 Коммит в ветке worktree, слияние в main — за лидом
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
СДЕЛАНО (ветка worktree-agent-a0d11bedb12a92f05, коммит 3723c53 + слияние свежего main fda5875; сливать и двигать указатель — лиду).

ГДЕ ЧТО ЛЕЖИТ (для TASK-217/218/219):
- Мастер разобран на маршруты: src/app/memory/[id]/order/_layout.tsx (только провайдер и <Stack/>, экраны по именам НЕ перечисляет), index.tsx — шаг 1 «Какие кадры взять», story.tsx — шаг 2, music.tsx — шаг 3 (старый, перенесён), build.tsx — шаг 4 (старый, перенесён, он же шлёт заказ). Старый src/app/memory/[id]/order.tsx удалён.
- Общее — src/order-wizard.tsx: OrderProvider (материал читается один раз, order, change(), leave(), short + лист «Материала пока мало»), useOrder(), WizardStep (шапка, шкала, «Назад», «Отмена», ожидание, отказ чтения, notice, донная кнопка), useStillHere(), STEPS=4, TEMPLATE_SIGN (иконка характера по id шаблона).
- КАК ВТЫКАТЬ ШАГ: добавить файл в папку order/, экспортировать компонент, обернуть тело в <WizardStep step={N} title note head notice above action>{body}</WizardStep>, состояние брать из useOrder(). Ни _layout.tsx, ни соседние шаги править не нужно. Для итога (TASK-218): step={'summary'} — шкалы не будет, в шапке встанет s.montage.summaryStep («Итог»); экран назвать order/summary.tsx, последняя кнопка шага 4 тогда ведёт на него вместо отправки. Для шаблонов (TASK-219): order/template.tsx плюс поменять ссылку входа в src/memory/films.tsx на /memory/[id]/order/template; index.tsx («Настроить самому») трогать не надо.
- Модель заказа — src/montage.ts: Order{dropped, returned, story, template, ownStory, tracks: PickedTrack[], note, seconds: number|null, orientation}, PickedTrack{key, name|null} (key — id полки или ключ music/<uuid>), shelfTrack(key), wishes(items, order) — тело запроса.
- Клиенты — src/api.ts (только добавлением): MontageTemplateId, MontageTemplate, listMontageTemplates, MontagePreview, previewMontage; MontageWishes получил music_tracks и music_note, старые music_track_id/key помечены как «только на чтение».
- Кит: новая деталь ChipTemplate (src/kit/montage-order.tsx) — плашка шаблона над историей, токены accentSoft/accentEdge, история в montage-order.test.tsx.
- Строки (ru и en): keepAtLeast, summaryStep, template (шесть названий по id), fromTemplate, ownText; storyTitle стал «Как смонтировать этот ролик»; storyNote и seeds убраны — в новом макете их нет.

ТЕЛО ЗАПРОСА: в exclude_media_ids уходит всё, чего в ролике не будет (снятое автоматом минус возвращённое плюс снятое рукой) — по нему api считает итог; возвращённое из автоотсева уходит в include_media_ids (без имени воркер снимет его снова, montage/director.py); music_tracks шлётся всегда, пустой — без музыки; music_note — только при треках; target_seconds не шлётся, пока длину не назвали (api ставит своё и зажимает в предел). Границы длины и итог приложение не считает — только preview.

ТЕСТЫ: vitest 693 зелёных, tsc чист (линтера в проекте нет). Новое: src/order-screens.test.ts (10 тестов по экранам мастера), в montage.test.ts — новое тело запроса, список треков, пожелания, shelfTrack; в api.test.ts — три клиента заказа; в kit/montage-order.test.tsx — история плашки. Правлены под переезд: memory-screens.test.ts (заказные проверки переехали в order-screens.test.ts), screen-theme.test.tsx (в обмётку тем попал order-wizard.tsx), strings.test.ts (short_form одинаков в обоих языках — это названия сайтов).

ОСТАЛОСЬ ЗА КАРТОЧКОЙ: шаг длины на preview и «Без музыки» — TASK-217 (сейчас на шаге 4 старые три пресета, и они шлют число как есть: у воспоминания с коротким материалом пресет может не влезть в предел и получить 400 — уйдёт вместе с ползунком); итог — TASK-218; шаблоны и автопилот — TASK-219 (плашка шаблона и TEMPLATE_SIGN уже есть, но выставить order.template пока некому).

СЛИЯНИЕ С MAIN (2026-09-21, по просьбе лида): подтянул текущий main (TASK-209 и соседние M-24), коммит слияния db9c7a8 в той же ветке worktree-agent-a0d11bedb12a92f05. Конфликт был один — src/memory-screens.test.ts: обе стороны переписали одни и те же проверки. Оставил новые экраны main (edit и settings вместо лица «Люди», приглашение отдельным листом) со всеми его проверками; со своей стороны убрал чтение удалённого app/memory/[id]/order.tsx, проверку «ни одно лицо не заказывает само» перевёл на новый состав экранов, счёт главных кнопок мастера остался в order-screens.test.ts. Само слились app/_layout.tsx, strings.ts, api.ts, api.test.ts, screen-theme.test.tsx (order-wizard.tsx по-прежнему в обмётке тем) и README. После слияния: tsc чист, vitest 742/742 зелёных.
<!-- SECTION:NOTES:END -->
