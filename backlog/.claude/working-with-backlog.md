# Working with Backlog

- **Set all required metadata when a task is created.** Status, type, priority, labels (`from-human`/`from-chief`/`from-lead`/`from-specialist`), and definition of done. No task opens without these.
- **Optional metadata** — label, milestone, dependencies, assignee (human / chief / lead / specialist), acceptance criteria — set when they apply, never silently skipped if a task needs them.
- **Names and descriptions are written for the human.** Brief and human-readable — a person reads them to know what the task is. Detail for agents goes in implementation notes, never in the description.
- **Origin is whose requirement, not whose hand.** The `from-*` label records who wanted the work. Agent-born work waits as a draft until approved; what a human or chief asked for is a task straight away.
- **Never edit a task by hand.** Every change goes through the tool's CLI, or the task loses its relationships and history.
- **Feature specs live in `./backlog/docs/features`.** A feature is functionality the product has. A spec is written per feature and stays stable — code is written to it, it is not changed to match code.
- **A milestone is a deadline, not a feature.** A milestone is a step or release stage — work to be done by a point in time. Tasks link to a milestone by when they must land.
- **A feature is functionality the product has, separate from any milestone.** Its spec lives in `./backlog/docs/features` and stays stable. The relation is many-to-many: a feature can span several milestones, a milestone can hold several features.
- **Feature vs Component vs Task.** A feature is standalone functionality — the user can name it in one sentence and get value from it independently. A component is a piece that only makes sense inside a parent feature; components live inside the feature's spec, never as separate documents. A task is concrete engineering work — a fix, a build, a refactor — that a specialist carries. Something that takes less than a day or is a bug fix is a task, not a feature. When classification is unclear, ask: "Is this a standalone feature or part of something larger?"
- **Card names what it serves and carries criteria someone other than the executor can check.** Blocked names what blocks it, and the blocker exists as a card.
- **In progress means the executor is holding it now.** A card in progress nobody is working looks owned and is not — the worst thing a board can say.
- **The specialist moves its own card.** Pull the task → move it to in progress → on finishing, move it to done. Status moves belong to the hand doing the work; the lead verifies the finished task against its acceptance criteria and accepts or sends it back — nobody rules on their own work.
- **Human at the keyboard is the exception, the only one.** Told directly to open, take up, or move a task — do it, and let the task say so. An unrecorded exception is just a lie with a good reason.

---

## Appendix: Feature Spec Template

Each feature spec lives at `./backlog/docs/<feature-name>.md`. Create it with
`backlog doc create "<title>" -t specification`. The chief writes the spec before work
begins. It stays stable — code is written to it, never the other way around.

### The template

```markdown
# <Feature Name>

## What it does
<One paragraph — what this feature gives the user, in plain language.>

## What it doesn't
<Limits and edge cases explicitly excluded, scope boundaries. Prevents scope creep.>

## Components
<Parts that must all ship for the feature to work. Each is a checkbox.>
- [ ] <Component 1 — one line, what it covers>
- [ ] <Component 2>
- [ ] ...

## Dependencies
<What must exist before this feature can be built — other features, external services, data.>
- [ ] <Dependency 1>
- [ ] <Dependency 2>
- [ ] None

## Done when
<Verification criteria someone other than the builder can check.>
- [ ] All components complete
- [ ] <Specific acceptance criterion>
- [ ] <Another criterion>
```

### Rules for the template

- **Every section must be present.** If one doesn't apply, write "None" — never skip the section.
- **Components are not tasks.** A component is a logical piece of the feature; only the lead turns
  components into tasks on the board. One component may become zero, one, or several tasks.
- **The spec is written for humans.** Keep it brief. Agent-level detail goes in task implementation
  notes, never here.
- **The spec is stable.** Once written, it is not changed to match code — code changes to match it.
- **Classify before creating.** Always decide first: is this a standalone feature, or a component of
  an existing one? If a component, add it to the parent feature's Components section — don't open a
  new document. If unclear, ask the human.
