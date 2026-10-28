---
id: TASK-565
title: 'design: экраны «нет доступа» и «галерея пуста» — один вид с семьёй'
status: Done
assignee: []
created_date: '2026-10-28 13:48'
updated_date: '2026-10-28 13:57'
labels:
  - from-lead
milestone: m-38
dependencies: []
priority: medium
type: feat
ordinal: 544000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Человек решил (decision-28): свести к одному виду и два крайних экрана семьи кадров — «нет доступа к галерее» и «галерея пуста». Они всё ещё носят старую простую полосу, тогда как остальные экраны семьи уже переведены на стеклянную полосу и общий язык.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Оба экрана приведены к тому же виду, что остальная семья: та же стеклянная полоса, тот же язык, тот же порядок
- [ ] #2 Экраны обновлены в design/screens, design/index.html и design/README.md, решения словами — в design/spec.md
- [ ] #3 Поведение не меняется — только вид
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Экраны: design/screens/UploadAccess.html и design/screens/UploadEmpty.html. Образец вида — design/screens/Upload.html, на него уже сведены UploadQueue и UploadLimited (TASK-555). Смотреть design/spec.md, раздел про эти экраны, и design/README.md. После дизайнера — отдельная карточка на код.
<!-- SECTION:NOTES:END -->
