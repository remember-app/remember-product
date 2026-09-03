# Working with Backlog

- **Set all required metadata when a task is created.** Status, type, priority, labels (`from-human`/`from-chief`/`from-lead`/`from-specialist`), and definition of done. No task opens without these.
- **Optional metadata** — label, milestone, dependencies, assignee (human / chief / lead / specialist), acceptance criteria — set when they apply, never silently skipped if a task needs them.
- **Names and descriptions are written for the human.** Brief and human-readable — a person reads them to know what the task is. Detail for agents goes in implementation notes, never in the description.
- **Origin is whose requirement, not whose hand.** The `from-*` label records who wanted the work. Agent-born work waits as a draft until approved; what a human or chief asked for is a task straight away.
- **Never edit a task by hand.** Every change goes through the tool's CLI, or the task loses its relationships and history.
- **Feature specs live in `./backlog/docs/features`.** A feature is functionality the product has. A spec is written per feature and stays stable — code is written to it, it is not changed to match code.
- **A milestone is a deadline, not a feature.** A milestone is a step or release stage — work to be done by a point in time. Tasks link to a milestone by when they must land.
- **A feature is functionality the product has, separate from any milestone.** Its spec lives in `./backlog/docs/features` and stays stable. The relation is many-to-many: a feature can span several milestones, a milestone can hold several features.
- **Card names what it serves and carries criteria someone other than the executor can check.** Blocked names what blocks it, and the blocker exists as a card.
- **In progress means the executor is holding it now.** A card in progress nobody is working looks owned and is not — the worst thing a board can say.
- **The specialist moves its own card.** Pull the task → move it to in progress → on finishing, move it to done. Status moves belong to the hand doing the work; the lead verifies the finished task against its acceptance criteria and accepts or sends it back — nobody rules on their own work.
- **Human at the keyboard is the exception, the only one.** Told directly to open, take up, or move a task — do it, and let the task say so. An unrecorded exception is just a lie with a good reason.
