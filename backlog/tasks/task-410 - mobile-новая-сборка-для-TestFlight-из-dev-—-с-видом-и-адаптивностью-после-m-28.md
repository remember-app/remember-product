---
id: TASK-410
title: >-
  mobile: новая сборка для TestFlight из dev — с видом и адаптивностью после
  m-28
status: In Progress
assignee:
  - '@devops'
created_date: '2026-09-26 14:55'
updated_date: '2026-09-26 14:55'
labels:
  - from-chief
milestone: m-29
dependencies: []
priority: high
type: feat
ordinal: 398000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Сборка 2 в TestFlight — вчерашняя, без прохода по виду и адаптивности (клавиатура, заголовки, лист «Новый лейбл», сведение с макетом). Собрать новую из dev приложения и положить во внутреннюю группу, где человек уже сидит. На проверку Apple не отправляем.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Облачная сборка iOS профилем testflight собрана из dev приложения на коммите 55d2855 (или новее, если dev ушёл вперёд — назвать коммит); номер сборки поднят автоматически (3), app.json с новым номером закоммичен и слит в dev; адрес сервера в сборке — https://dev-api-remember.noxlabs.xyz (по итоговой конфигурации сборки)
- [ ] #2 Сборка отправлена в App Store Connect (eas submit), Apple обработал её (processingState VALID); в отчёте — номер сборки и стоит ли она во внутренней группе, где сидит человек: попала ли туда сама или нужно нажатие человека (какое именно)
- [ ] #3 На проверку Apple не отправлялась, внешних групп и Test Information не трогали; секретов (токен Expo, .p8, ключи подписи) нет ни в отчёте, ни в карточках, ни в репозиториях, ни в новых файлах
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Отчёт devops: номер сборки, коммит, что человеку нажать; временные файлы убраны
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Порядок и команды — projects/mobile/README.md, раздел «Раздача через TestFlight», шаги 5–6 (первый раз уже пройден: подпись, ключ пушей, запись приложения 6816034455, вход eas на машине человека выполнен). Профиль testflight в eas.json, appVersionSource local, autoIncrement. Прошлая сборка — TASK-341 (сборка 2). Работа в изолированном worktree projects/mobile, слияние в dev — после успешной отправки. Деньги: сборка EAS — расход человека на облачную сборку, одна штука; повторно не собирать без причины.
<!-- SECTION:NOTES:END -->
