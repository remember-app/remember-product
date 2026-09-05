---
id: TASK-55
title: 'mobile: ролик — заказ, список, скачать/поделиться, повтор; заглушка убрана'
status: To Do
assignee: []
created_date: '2026-09-05 04:24'
labels:
  - from-lead
milestone: m-9
dependencies:
  - TASK-53
priority: high
type: feat
ordinal: 59000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Заменить заглушку карточки ролика (TASK-41, doc-03 была заморожена) на настоящий экран: список роликов воспоминания своим блоком (не смешивается с галереей), заказ с выбором длины и трека, скачивание и «поделиться» наружу, повтор упавшей сборки — по трём состояниям кита (design/kit.html, секция 10) через уже готовый CardMontage (src/kit/card-montage.tsx — presentation-only, менять не нужно). Контракт — TASK-53 (api): GET/POST /memories/:id/montages, POST .../:montageId/retry; поля montage — id, memory_id, ordered_by, status (queued|processing|ready|failed), duration_seconds, params({target_seconds, music_track_id}), error_text, created_at, video_url (подписана, только пока status=ready); каталог треков — id 'warm'|'bright'|'calm' (подписи для человека — по вкусу экрана, как уже сделано для ролей и статусов вклада на этом же экране).
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 src/api.ts: тип Montage + orderMontage/listMontages/retryMontage по образцу listMedia/startUpload/removeMember
- [ ] #2 src/app/memory/[id].tsx: убрана строка-заглушка CardMontage state="failed" title="A montage, one day" и её комментарий-пометка про doc-03/заглушку целиком
- [ ] #3 Список роликов воспоминания — отдельным блоком на месте заглушки (самое видное место, как и было для неё решено), виден всем участникам независимо от роли (viewer тоже); не смешивается с галереей и её кнопкой
- [ ] #4 Каждый ролик — CardMontage с состоянием, вычисленным из status: 'queued'/'processing' → pending, 'ready' → ready, 'failed' → failed; подписи экрана честные, без выдуманных чисел и прогресса, которых на самом деле нет
- [ ] #5 Ready: play открывает видео тем же способом, что галерея открывает превью (expo-video/VideoView в модалке, как в gallery.tsx), по video_url; в actions — кнопка скачать на телефон (тот же приём saveToPhone, что и в gallery.tsx) и после сохранения — системное «поделиться» (Share.share локальным файлом), doc-03 требует и то, и другое
- [ ] #6 Failed: показывает error_text по-своему и кнопку «Повторить» (retryMontage), доступна только organizer'у
- [ ] #7 Кнопка заказа («Смонтировать ролик», главное действие со свечением кита) видна только organizer'у, открывает лист (Sheet, как у Invite) с выбором длины (несколько вариантов) и трека (три варианта из фиксированных id, подписи на усмотрение экрана); по подтверждению — orderMontage, список сразу показывает новую запись в pending
- [ ] #8 src/push.ts: пуш с data.montageId (в дополнение к memoryId, который уже несёт invite-пуш) при тапе открывает экран воспоминания (не экран загрузки, как для приглашения); существующая ветка для приглашения (только memoryId) не меняется
- [ ] #9 typecheck и все существующие тесты приложения проходят
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Контракт закреплён в TASK-53. Скачивание/поделиться можно вынести в общий хелпер рядом с saveToPhone или продублировать по месту — на усмотрение исполнителя, лишь бы поведение совпадало с тем, что уже работает в галерее. Не зависит от montage-воркера (TASK-52/пайплайн) — mobile говорит только с api.
<!-- SECTION:NOTES:END -->
