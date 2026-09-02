# Remember

## North Star
Решить проблему разрозненных фото и видео с мероприятий — собрать всё в одном месте от всех
участников, без уговоров и общих чатов, и смонтировать из этого ролик.

## Status
- **In production:** no
<!-- yes = something is live and in use: every change must be safe and backward-compatible.
     no = greenfield: speed over caution. Every layer below weighs this in all work. -->

## Description
Мобильное приложение, в котором создаются воспоминания в виде папок; приглашённые участники
загружают туда свои фото и видео со смартфона. Так формируется единое место, куда стекается весь
материал с мероприятия. Организатор в любой момент может смонтировать из него ролик с помощью
нейросетей — сам ролик и есть награда за то, что все скинули медиа.

## Sub-projects
<!-- The declared list every mycrew layer reads instead of scanning for .git. -->
- **Layout:** polyrepo with submodules
- `projects/mobile/` — мобильное приложение (Expo / React Native), iOS + Android; единственный клиент.
- `projects/api/` — бэкенд-API (TypeScript); единственная точка входа для приложения.
- `projects/montage/` — фоновый обработчик (Python): превью медиа и сборка роликов.

Каждый сервис — отдельный git-репозиторий, подключён сабмодулем под `projects/`; в этом (корневом)
репозитории — `docs/` и конфигурация деплоя.

Технические решения по MVP — в `architecture.md`.
