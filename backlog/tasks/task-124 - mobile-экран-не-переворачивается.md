---
id: TASK-124
title: 'mobile: экран не переворачивается'
status: Done
assignee: []
created_date: '2026-09-09 06:37'
updated_date: '2026-09-09 07:01'
labels: []
milestone: m-17
dependencies: []
priority: high
ordinal: 128000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Человек 2026-09-09: поворот устройства ничего не меняет, приложение живёт только в вертикальном виде. Решить, где поворот нужен целиком, а где нет: полноэкранный просмотр кадра и ролик — первые кандидаты.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Полноэкранный просмотр кадра и просмотр ролика поворачиваются вместе с телефоном
- [x] #2 Остальные экраны приложения остаются вертикальными при повороте устройства
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Корень: app.json держал expo.orientation = portrait — статический нативный замок (Info.plist / AndroidManifest), выше любого JS, поэтому supportedOrientations на обоих Modal не работал.

Сделано (mobile, ветка worktree-agent-abf6ca49c31b4df6f, коммит d0fb7d3):
- app.json: orientation portrait -> default;
- добавлена зависимость expo-screen-orientation (~57.0.2);
- новый src/orientation.ts: lockPortrait() и хук useTurnsWithPhone(open) — unlockAsync (политика DEFAULT) на открытии просмотра, портрет обратно на закрытии/анмаунте;
- lockPortrait() вызывается в src/app/_layout.tsx на старте приложения, поэтому все прочие экраны остаются вертикальными;
- хук подключён в src/memory/frames.tsx (открытый кадр) и src/memory/films.tsx (плеер ролика), логика одна на два места;
- src/orientation.test.ts: мок expo-screen-orientation, подмена useEffect, плюс проверки по исходникам (app.json не portrait, вызов в layout, хук ровно в двух лицах);
- README: раздел «Оболочка и токены» — как теперь держится вертикальность и что dev-билд надо пересобрать.

Зелено: vitest 27 файлов / 223 теста, npx tsc --noEmit.

Человеку: репозиторий managed (папок ios/android нет), но правка нативная — на телефоне поворот появится только после новой сборки dev-клиента (EAS development build); в Expo Go/симуляторе новая ориентация читается из манифеста при перезапуске. Мердж ветки в main делает лид.
<!-- SECTION:NOTES:END -->
