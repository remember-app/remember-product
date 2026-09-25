---
id: TASK-311
title: 'Человек: запись в Cloudflare для адреса сервера Remember'
status: Done
assignee:
  - '@human'
created_date: '2026-09-25 07:24'
updated_date: '2026-09-25 07:59'
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
- [ ] #1 В зоне noxlabs.xyz в Cloudflare есть проксированная запись dev-api-remember, того же типа и с тем же содержимым, что у соседнего dev-хоста (скопировано у существующей записи, соседи не изменены); до создания проверено, что такого имени не было
- [ ] #2 Имя резолвится на адреса Cloudflare и отвечает по https (ответ ingress до выкатки может быть 404 — это нормально); записано созданное и как снести
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Человек подтвердил лиду, что запись заведена
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
СТОП 2026-09-25 (слово chief): доступа к DNS у человека нет — noxlabs.xyz не его зона, свой домен ещё не куплен. Devops запись сам не заводит и обходных путей (чужие зоны, туннели) не ищет. Нужна запись для имени dev-api-remember.noxlabs.xyz: проксированная, того же типа и с тем же содержимым, что у соседнего dev-хоста (адрес входного балансировщика кластера) — её заведёт тот, у кого есть доступ к зоне noxlabs.xyz; либо то же по форме в собственном домене человека, когда он будет. Пока записи нет: сервисы можно поднять в кластере (правило входа для неизвестного имени бездействует), но вход снаружи, проверка с телефона и адрес в сборке для TestFlight ждут её.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Записи заведены коллегой (слово chief): dev-api-remember, api-remember, dev-remember, remember в зоне noxlabs.xyz. Проверено 2026-09-25 с мака: все четыре имени разрешаются на адреса Cloudflare и отвечают по https (404 от входа кластера, приложения ещё нет). Для пилота используются dev-api-remember (сервер) и dev-remember (приложение и ссылки позже); боевая пара не трогается. Проверка снаружи с телефона — человек: всё на noxlabs.xyz открывается.
<!-- SECTION:FINAL_SUMMARY:END -->
