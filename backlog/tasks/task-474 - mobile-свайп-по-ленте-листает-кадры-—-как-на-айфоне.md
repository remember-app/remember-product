---
id: TASK-474
title: 'mobile: свайп по ленте листает кадры — как на айфоне'
status: To Do
assignee: []
created_date: '2026-10-03 16:53'
labels:
  - from-human
milestone: m-34
dependencies: []
priority: high
type: bug
ordinal: 463000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Лента под открытым кадром должна вести себя как на айфоне: текущий элемент всегда по центру, а листание ленты меняет кадр на экране. Сейчас лента прокручивается пальцем, но кадр на ней не меняется, и приходящий извне кадр не всегда встаёт в центр.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Листание ленты пальцем открывает тот кадр, на который встал текущий элемент
- [ ] #2 Смена кадра с экрана или ленты ставит его по центру ленты
- [ ] #3 Крайние кадры: листание за них ничего не делает, лента не уезжает в пустоту
- [ ] #4 Автотесты зелёные
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Kit-компонент Filmstrip (projects/mobile/src/kit/filmstrip.tsx) и экран просмотра (src/screens/memory/frame-viewer.tsx). Сейчас Filmstrip умеет только scrollToIndex по изменившемуся index — обратной связи от прокрутки нет вовсе, отсюда и «не меняет элементы при листании». Макет: ViewerPortraitTall.html, полоса внизу, текущий 44, соседи 30 с прозрачностью по расстоянию (0.75 / 0.6 / 0.45).
<!-- SECTION:NOTES:END -->
