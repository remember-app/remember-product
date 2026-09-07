---
id: TASK-86
title: 'mobile: перевести все экраны и сообщения об ошибках на словарь'
status: Done
assignee: []
created_date: '2026-09-07 09:49'
updated_date: '2026-09-07 10:35'
labels:
  - from-human
milestone: m-13
dependencies:
  - TASK-83
priority: medium
type: feat
ordinal: 90000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Пройти по всем экранам (src/app и вложенные memory/**, кроме src/app/_layout.tsx — его трогает задача по теме) и по src/api.ts, src/username-form.tsx, src/uploads.ts — заменить зашитые в код строки на ключи словаря из задачи TASK-83. Названия строк заголовков экранов в _layout.tsx (Stack.Screen options.title) не трогать — они не видны человеку, headerShown выключен везде. Переключатель языка в профиле сюда не входит — отдельная задача.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Ни один экран (кроме _layout.tsx) и ни один из перечисленных файлов не содержит зашитого читаемого человеком текста — всё идёт через словарь TASK-83
- [x] #2 Ошибки (errorMessage и подобные), пустые состояния, подписи кнопок и полей переведены на оба языка
- [x] #3 На телефоне с русским языком приложение полностью русское, с английским — полностью английское, без смеси на одном экране
- [x] #4 Существующие и новые тесты проходят
<!-- AC:END -->
