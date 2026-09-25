---
id: TASK-311
title: 'Человек: запись в Cloudflare для адреса сервера Remember'
status: To Do
assignee:
  - '@human'
created_date: '2026-09-25 07:24'
labels:
  - from-chief
milestone: m-29
dependencies: []
priority: high
type: feat
ordinal: 308000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Своего домена пока нет — живём на noxlabs.xyz, как соседние dev-сервисы. Адрес сервера для телефонов заводится записью в Cloudflare; делает человек руками.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 В зоне noxlabs.xyz есть проксированная запись (оранжевое облако) dev-api-remember, указывающая туда же, куда соседние dev-хосты (тип и цель — скопировать у записи соседа, например dev-deppa или dev-api-assist)
- [ ] #2 Лид проверил, что имя резолвится и отвечает по https снаружи
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Человек подтвердил лиду, что запись заведена
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Имя хоста: dev-api-remember.noxlabs.xyz (по образцу соседей dev-api-assist.noxlabs.xyz, dev-deppa.noxlabs.xyz). Шаги: Cloudflare → зона noxlabs.xyz → DNS → Records → найти запись dev-deppa (или dev-api-assist) → посмотреть её Type и Content/Target → Add record: тот же Type, Name = dev-api-remember, тот же Content, Proxy status = Proxied → Save. Сертификат выдаёт Cloudflare (режим Full), cert-manager в кластере нет. Отдельно проверяется, не закрыт ли хост правилом доступа «только офис и VPN» (docs/SPLIT_DNS_AUTHENTIK.md в репозитории инфраструктуры): решающая проверка с телефона по мобильной сети — открыть https://dev-api-remember.noxlabs.xyz/health, ждём {"status":"ok"}.
<!-- SECTION:NOTES:END -->
