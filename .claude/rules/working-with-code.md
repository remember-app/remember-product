# Working with Code

- **Errors loud and at the root** — Surface errors with context instead of swallowing them; fix the cause, not the symptom. A fix you can't explain is a guess, and a symptom that disappears without explanation is patched, not solved.
- **Log with levels** — Grade every log message by severity (error, warn, info, debug), phrase actions in the present tense, include enough context to be useful on its own, and never log secrets.
- **Modular bricks** — Build small single-purpose units with narrow interfaces that compose. If you can only describe a function with "and", it's two functions.
- **Write less code** — Reuse before writing; fewer lines means fewer moving parts. Solve only today's task and delete dead code in the same breath.
- **No noise in code** — Don't restate code in comments or narrate edits as "was X, now Y". Comment only the non-obvious why; let the code read as its final state.
- **Follow SOLID** — One responsibility per unit, open to extension but closed to modification, depend on abstractions not concretions. Each principle is a boundary that keeps the change small.
- **Refactor before you build** — Before making a change, judge whether the code it touches needs reshaping first. If a refactor would make the work land cleaner, do it first; never bolt new code onto a tangle that a reshape would fix.
