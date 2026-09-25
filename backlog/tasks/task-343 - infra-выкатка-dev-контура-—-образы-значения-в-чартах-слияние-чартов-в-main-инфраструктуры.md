---
id: TASK-343
title: >-
  infra: выкатка dev-контура — образы, значения в чартах, слияние чартов в main
  инфраструктуры
status: Done
assignee:
  - '@devops'
created_date: '2026-09-25 08:46'
updated_date: '2026-09-25 12:19'
labels:
  - from-chief
milestone: m-29
dependencies:
  - TASK-329
  - TASK-330
  - TASK-327
  - TASK-342
priority: high
type: feat
ordinal: 336000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Вынести сервер и обработчик на инфраструктуру компании: отправить dev наших репозиториев (CI соберёт образы), подставить значения в чарты и слить чарты в main репозитория инфраструктуры — ArgoCD сам развернёт. Появиться должно ровно то, что в согласованном списке, и ничего чужого.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Пуш ветки dev репозиториев api и montage (не main) выполнен по слову человека; CI собрал образы (в реестре есть образы api и montage с тегом по SHA); джоба выкатки на первом запуске упала на отсутствии файла чарта — ожидаемо
- [ ] #2 В значениях чартов dev подставлено: тег образа (SHA собранных образов), имена бакетов, ключ хранилища, строка подключения к базе, пароль почты и остальные настройки почты, ключ Gemini, общий секрет INTERNAL_WORKER_TOKEN (случайный, одинаковый в обоих чартах), настройка входа рецензента (адрес и код случайные) — значения берутся из ~/.remember-secrets.env, из ~/.remember-secrets.gcs.json, из projects/montage/.env человека и из значений qe-life для почты; ни одно значение не попало в отчёт, карточки и репозитории продукта; helm lint и template с ними проходят
- [ ] #3 Ветка чартов слита в main репозитория инфраструктуры и запушена по слову человека; появилось ровно то, что в списке (два приложения ArgoCD, ресурсы dev-remember-api и dev-remember-montage в пространстве default), чужие ресурсы и приложения не изменены
- [ ] #4 Выкатка подтверждена без доступа к кластеру: https://dev-api-remember.noxlabs.xyz/health отвечает {"status":"ok"}; по открытому Prometheus поды сервера и обработчика Running и готовы, нет ImagePullBackOff и перезапусков по кругу, задачи миграций и выкладки музыки завершились успешно; в бакете лежат треки музыки
- [ ] #5 Записано созданное: что появилось, где и под каким именем, как откатить (вернуть тег или убрать приложения); повторный пуш в dev выкатывает сам (CI) — проверено одним пустым изменением документации, если человек разрешил
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Отчёт devops со списком созданного и откатом принят лидом
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Выполнять только после: живой проверки родного доступа Google и переписывания хранилища (TASK-328–330), памяти сборки ролика (TASK-327), двери рецензента (TASK-342), ревью и тестов; слово человека на пуш dev api/montage и слияние чартов — через chief с конкретным списком. Чарты: локальная ветка remember-charts репозитория инфраструктуры (/Users/kubik/Nox/infra/nox-infra-dev/.claude/worktrees/remember-charts), обновить под родной доступ Google (STORAGE_DRIVER=google, GOOGLE_STORAGE_BUCKET, GOOGLE_STORAGE_CREDENTIALS вместо R2_*), ресурсы обработчика по итогам TASK-327, exec-форма команды и terminationGracePeriodSeconds не меньше 30 (подбор брошенных задач TASK-319). Секрет реестра — существующий regcred в default. Значения секретов — открытым текстом в values-dev, как у qe-life (decision-15).
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Выкатка dev-контура 2026-09-25: dev запушен (api b84f197, montage 8cb12d0; пайплайны 17828/17829, dev_build зелёные), ветка чартов слита в main инфраструктуры владельцем (b70f3aee → 08d8a89a, быстрая перемотка; сам пуш система прав исполнителю запретила из-за секретов в значениях — decision-15). ArgoCD подхватил за 3 минуты: приложения dev-remember-api и dev-remember-montage в пространстве default; миграции прошли, init обработчика отработал, выкладка музыки прошла (bright.mp3 в бакете под remember/dev-media/tracks), оба пода Running и готовы, перезапусков нет; https://dev-api-remember.noxlabs.xyz /health, /auth/methods, /privacy отвечают верно. Откат: git revert c80c655e^..08d8a89a в main инфраструктуры (миграции в базе remember, треки в бакете и секреты в истории откат не отменяет). Риск: наши поды попали на узел пула gitlab (109 из 110 подов), где живут раннеры CI, — нужен nodeSelector на пул dev.
<!-- SECTION:FINAL_SUMMARY:END -->
