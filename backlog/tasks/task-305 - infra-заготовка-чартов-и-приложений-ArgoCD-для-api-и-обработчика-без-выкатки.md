---
id: TASK-305
title: >-
  infra: заготовка чартов и приложений ArgoCD для api и обработчика (без
  выкатки)
status: In Progress
assignee:
  - '@devops'
created_date: '2026-09-25 07:17'
updated_date: '2026-09-25 07:18'
labels:
  - from-chief
milestone: m-29
dependencies: []
priority: high
type: feat
ordinal: 302000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Подготовить в репозитории инфраструктуры компании чарты сервера и обработчика и файлы приложений ArgoCD — на локальной ветке, ничего не сливая и не пуша: слияние в main этого репозитория и есть выкатка, а её разрешает только человек.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 На локальной ветке репозитория инфраструктуры (в своём worktree, main не тронут) лежат чарты api и обработчика по образцу qe-life (ioc-helm/nox/remember/api и .../montage, values.yaml и values-dev.yaml) и два файла Application (argocd-apps/apps/dev/dev-remember-api.yaml и dev-remember-montage.yaml), по правилам именования {среда}-{проект}-{компонент}
- [ ] #2 Секреты в чартах НЕ значениями: секрет берётся из существующего Secret кластера (existingSecret, как у deppa); в файлах нет ни одного настоящего секрета, даже «заглушки»; в чарте перечислены имена ключей, которые должен содержать этот Secret
- [ ] #3 Сервер: одна реплика, Service, Ingress на хост под noxlabs.xyz по образцу соседних dev-хостов, пробы на /health, NODE_ENV=production, обход входа без почты не задан, миграции — хук перед выкатом на том же образе; обработчик: одна реплика, без Service и Ingress, адрес сервера — внутренний адрес Service api, инициализация таблиц перед стартом, лимиты памяти и диска под ffmpeg, пробы без HTTP (командная или без liveness)
- [ ] #4 helm lint и helm template для обоих чартов с values-dev проходят без ошибок; рендер просмотрен и не содержит секретов, привилегированных контейнеров, работы от root
- [ ] #5 Отчёт называет: порядок выкатки, что должно существовать до синка (namespace, секрет реестра, Secret с ключами, база, DNS-запись), сколько ресурсов запрошено и помещается ли это в пул dev при известной загрузке узлов
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Коммит на локальной ветке репозитория инфраструктуры; не запушено, не слито; worktree убран по завершении лидом
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Репозиторий: /Users/kubik/Nox/infra/nox-infra-dev. Разбор — TASK-298 (принят): namespace предлагается dev-remember (project dev в ArgoCD пускает только dev и dev-*), секрет реестра regcred заведён руками только в default — копия в dev-remember делается человеком; хост вида dev-api-remember.noxlabs.xyz — DNS в Cloudflare заводит человек; ingress: tls: [] и без аннотации cert-manager (cert-manager в кластере нет, https даёт Cloudflare, режим Full); образец Application — argocd-apps/apps/dev/dev-qe-life-redis.yaml (project dev, автосинк, prune, selfHeal, CreateNamespace, ServerSideApply); образец чарта — ioc-helm/qe-life/backend; хук миграций — ioc-helm/deppa/templates/database-migration-job.yaml. Образы: git.dapp-devs.com:5050/nox-labs/nox/remember/api и .../montage, тег по SHA (пока заглушка-плейсхолдер, не выдуманное значение). Команды образов: api — node src/server.ts (npm start) и npm run migrate; обработчик — python -m montage run, python -m montage init (до старта, таблицу jobs создаёт он, не api), python -m montage tracks (разовая выкладка музыки). Окружение api: DATABASE_URL, PORT, NODE_ENV=production, R2_ENDPOINT/R2_BUCKET/R2_ACCESS_KEY_ID/R2_SECRET_ACCESS_KEY/R2_REGION, SMTP_HOST/SMTP_PORT/SMTP_SECURE/SMTP_USER/SMTP_PASSWORD/MAIL_FROM, INTERNAL_WORKER_TOKEN, EXPO_PUSH_URL по умолчанию; обработчика: DATABASE_URL, R2_*, AI_PROVIDER=gemini, GEMINI_API_KEY, API_URL, INTERNAL_WORKER_TOKEN. Где лежит база — пока не решено человеком (общая, своя в кластере или отдельный экземпляр GCP): чарты берут DATABASE_URL из Secret и от вида базы не зависят. Ёмкость: на узлах пула dev свободно ~1.4 ГиБ памяти, CPU простаивает. Значения секретов не читать и не писать; в репозитории продуктов ничего не менять. Промежуточные чарты: без HPA и PDB, пока не нужны.
<!-- SECTION:NOTES:END -->
