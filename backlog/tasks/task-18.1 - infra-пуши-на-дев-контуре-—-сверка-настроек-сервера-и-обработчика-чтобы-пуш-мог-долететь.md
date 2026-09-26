---
id: TASK-18.1
title: >-
  infra: пуши на дев-контуре — сверка настроек сервера и обработчика, чтобы пуш
  мог долететь
status: In Progress
assignee:
  - '@devops'
created_date: '2026-09-26 14:57'
updated_date: '2026-09-26 14:57'
labels:
  - from-chief
milestone: m-29
dependencies: []
parent_task_id: TASK-18
priority: high
type: feat
ordinal: 399000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Перед проверкой пушей на телефоне убедиться со стороны сервера, что ничего не мешает: настройки у сервера и обработчика, связь между ними, путь к логам. Только чтение, ничего не менять.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 По чартам dev-remember-api и dev-remember-montage (репозиторий инфраструктуры) подтверждено, без вывода значений: у сервера отправка пушей не выключена (EXPO_PUSH_URL не пустой), общий секрет INTERNAL_WORKER_TOKEN задан и совпадает у сервера и обработчика, обработчик знает адрес сервера (API_URL), по которому до него дойдёт из кластера, и он не упирается в Cloudflare
- [ ] #2 Названо, как с этой машины прочитать логи сервера и обработчика (строки «invite push sent/failed/refused», «montage push …», «ready callback») и увидеть строку push_tokens: что есть без обхода прав и чего не хватает; что нужно от человека — точной строкой
- [ ] #3 Проверено (или названо, что проверить нечем и почему): ключ пушей APNs привязан в EAS к com.noxlabs.remember; сеть кластера пускает наружу к exp.host; актуальный образ сервера содержит обработку пушей (коммит api в теге образа)
- [ ] #4 Ни одно значение секрета не попало в отчёт, карточки и репозитории; ничего в кластере и в репозитории инфраструктуры не изменено
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Отчёт devops: что в порядке, что мешает, что нужно от человека; временные файлы убраны
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Ничего необратимого. Код отправки: projects/api/src/memories/push.ts (POST https://exp.host/--/api/v2/push/send без токена доступа; ответ Expo с ошибками по устройствам сервер не разбирает — лишь логирует «push sent»), маршрут обратного вызова — projects/api/src/montages/ready.ts (POST /internal/montages/:id/ready с общим секретом). Чарты: репозиторий инфраструктуры /Users/kubik/Nox/infra/nox-infra-dev, значения dev — открытым текстом (decision-15). Кластера с этой машины не видно (нет kubeconfig) — при необходимости искать другой путь: Grafana/Loki/Prometheus компании, но права не обходить и учётных данных не заводить.
<!-- SECTION:NOTES:END -->
