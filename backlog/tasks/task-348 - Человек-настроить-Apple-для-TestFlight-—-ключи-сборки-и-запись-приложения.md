---
id: TASK-348
title: 'Человек: настроить Apple для TestFlight — ключи сборки и запись приложения'
status: To Do
assignee:
  - '@human'
created_date: '2026-09-25 09:00'
labels:
  - from-chief
milestone: m-29
dependencies: []
priority: high
type: feat
ordinal: 341000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Сборку для TestFlight нельзя собрать без интерактивных шагов Apple (вход и двухфакторная проверка), а запись приложения в App Store Connect можно создать только руками. Шаги короткие; после них devops собирает и отправляет сам.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Выполнены шаги А (терминал, папка projects/mobile: eas credentials -p ios, профиль testflight, вход в Apple, All: Set up all the required credentials, повторное использование сертификата распространения; затем в том же меню App Store Connect API Key: выбрать уже загруженный ключ для EAS Submit или добавить новый) и Б (App Store Connect: Apps → + → New App: iOS, имя Remember (или свободное), Bundle ID com.noxlabs.remember, SKU remember, полный доступ)
- [ ] #2 Человек прислал лиду число Apple ID приложения (App Store Connect → приложение → App Information → General Information → Apple ID) — оно не секретное; если вверху баннер о соглашении, его принимает владелец аккаунта в разделе Business
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Человек подтвердил лиду шаги и прислал Apple ID приложения
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Основание — отчёт devops (TASK-341): у приложения в EAS есть ключ пушей и сертификат распространения, но только для Ad Hoc; конфигурации и профиля для магазина нет; ключ App Store Connect к приложению не назначен; без интерактивного входа eas сборку не создаёт. Шаги А: eas credentials -p ios → профиль testflight → «Do you want to log in to your Apple account?» Yes → Apple ID, пароль, код → «Build Credentials: Manage everything needed to build your project» → «All: Set up all the required credentials to build your project» → на «Reuse this distribution certificate?» ответить Yes → затем «App Store Connect: Manage your API Key» → «Use an existing API Key for EAS Submit» (или «Add a new API Key For EAS Submit») → Exit. Ключу App Store Connect лучше роль App Manager, не Admin. Шаги Б: см. критерий. После этого devops добавляет в eas.json блок submit с ascAppId (не секрет; разрешено лидом) и выполняет сборку и отправку с флагом --no-auto-testflight-setup (иначе eas сам создаст внутреннюю группу со всеми админами команды).
<!-- SECTION:NOTES:END -->
