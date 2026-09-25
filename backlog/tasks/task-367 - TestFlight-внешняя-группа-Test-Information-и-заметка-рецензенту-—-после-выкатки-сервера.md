---
id: TASK-367
title: >-
  TestFlight: внешняя группа, Test Information и заметка рецензенту — после
  выкатки сервера
status: To Do
assignee:
  - '@human'
created_date: '2026-09-25 10:46'
labels:
  - from-chief
milestone: m-29
dependencies:
  - TASK-343
priority: high
type: feat
ordinal: 359000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Сборка 2 лежит в TestFlight и обработана. Внешняя группа требует проверки Apple, а рецензенту нужен работающий сервер и вход. Делается после выкатки (TASK-343): в App Store Connect заполняется описание, страница политики, данные рецензента; создаётся внешняя группа; сборка отправляется на проверку.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 В App Store Connect (приложение Remember, TestFlight → Test Information) заполнены: описание, почта для отзывов dev@noxlabs.xyz, Privacy Policy URL https://dev-api-remember.noxlabs.xyz/privacy, данные рецензента, галка «Sign-in required» с адресом и постоянным кодом двери; заметка рецензенту — из отчёта devops (адрес и код подставлены после выкатки)
- [ ] #2 Создана внешняя группа (например Friends), в неё добавлена сборка; по требованию Apple заранее создана внутренняя группа только из владельца; включена публичная ссылка на группу или добавлены почты друзей — по слову человека; сборка отправлена на Beta App Review только когда сервер выкачен и отвечает
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Человек подтвердил лиду, что группа создана и сборка отправлена на проверку; ссылка на группу передана
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Точные нажатия и черновик заметки — в отчётах devops по TASK-341: (1) TestFlight → Test Information; (2) боковая панель → «+» у External Testing → имя группы → Create; (3) в группе Builds → «+» → выбрать сборку 2 → What to Test → Submit Review; Apple может потребовать сначала внутреннюю группу (минимум — владелец). Проверка обычно до суток, иногда до 48 ч. Адрес и код двери генерирует выкатка (TASK-343) и кладёт в значения dev; devops передаёт их для заметки. Приложение входит по коду из письма; у рецензента дверь: адрес строчными буквами и шесть цифр; вход через Apple и Google на сервере выключен, в заметке не упоминаются.
<!-- SECTION:NOTES:END -->
