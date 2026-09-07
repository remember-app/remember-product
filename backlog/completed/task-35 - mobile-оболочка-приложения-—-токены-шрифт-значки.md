---
id: TASK-35
title: 'mobile: оболочка приложения — токены, шрифт, значки'
status: Done
assignee: []
created_date: '2026-09-04 14:20'
updated_date: '2026-09-04 14:30'
labels:
  - from-chief
milestone: m-7
dependencies: []
priority: high
ordinal: 39000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Кит «Тёмная комната» (design/kit.html) переносится в приложение: токены цвета/ритма/формы, шрифт заголовков Bricolage Grotesque, набор значков Lucide, и экранная оболочка (без белого системного хедера, тёмный фон между экранами). Это основа, от которой берут все остальные задачи вехи m-7.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 src/theme.ts (или аналог) содержит все именованные токены кита: цвета ink/surface/raise/line/paper/muted/ember/fixed/rust, --glow, шаг ритма 4..48, радиусы r-frame/r-card/r-pill, длительности fast/slow и ease — имена и значения совпадают с design/kit.html 1:1
- [x] #2 Bricolage Grotesque подключён через @expo-google-fonts/bricolage-grotesque и используется для display/title ролей; всё остальное — системный шрифт
- [x] #3 lucide-react-native (или эквивалентный пакет того же набора Lucide) установлен и доступен для всех экранов
- [x] #4 родной хедер Stack скрыт (headerShown:false) во всей навигации, фон между экранами и во время переходов — ink, а не белый/системный
- [x] #5 typecheck и существующие тесты проходят
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Читать design/kit.html целиком перед началом — единственный источник правды. Секция 0 (:root) — токены. Строки 34-37 — шрифты. Строка 796 (Голос/пол доступности) упоминает значки без подписи. Splash сейчас держится до status !== 'loading' (src/app/_layout.tsx) — учесть загрузку шрифта в этом же гейте, чтобы не мелькнул системный шрифт. Ничего в API и в поведении экранов не меняется — только оболочка и токены.
<!-- SECTION:NOTES:END -->
