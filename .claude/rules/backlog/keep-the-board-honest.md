# Keep the board honest — every card says where the work came from and where it stands

A board earns its place by being faster to trust than asking, and it loses that in a day. An agent
settles on a piece of work, writes it down as though someone had asked for it, and goes and does it. A
card sits in progress with nobody on it. A third is closed with half its criteria unticked. None of
that looks broken from outside, and each one teaches the next reader to go and ask a person instead —
at which point the board is pure overhead.

- **Every card carries an origin label naming whose requirement it is, never whose hand wrote it.** It
  is recorded when the card opens or it is never recoverable; work written down on someone else's
  behalf still belongs to whoever wanted it.
- **Work an agent thought up is ruled on before anyone is spent on it; what a human asked for is not.**
  The ruling comes when the card is about to be worked, not when it is written — writing costs nothing
  and keeps the thought, and it is the doing that spends the day.
- **Never take up a piece of work you invented for yourself.** Write it down, leave it to whoever owns
  the board, and carry on with what you were given; a mind that sets its own next task has stopped
  being accountable to anyone.
- **A card names the thing it serves and carries criteria someone other than its executor can check.**
  One serving nothing is work aimed at nothing, and that is the kind that swallows a week.
- **Never edit a card by hand — every change goes through the board's own tool.** Its sections are
  delimited by markers that tool writes and reads; a hand-edited card loses its relationships and its
  history, and nothing warns anyone that it did.
- **In progress means someone is holding it at this moment.** A card in progress that nobody is working
  is the worst thing a board can say, because the work looks owned and is not.
- **A blocked card names what blocks it, and the blocker exists as a card too.** Blocked and silent is
  indistinguishable from abandoned, and gets treated as abandoned soon enough.
- **A card closes only when every criterion on it is ticked, and only by whoever owns the board.** Never
  by the one who did the work: nobody rules on their own, and a single hand on status is what keeps the
  board's account of who holds what true.
- **The board is neither the plane nor a report.** What the product must be is written elsewhere and is
  never invented on a card; work that is done is closed, not narrated for a reader who will never come.
- **The human at the keyboard is the exception, and the only one.** Told directly to open a card, take
  one up or move it, do it — and let the card say so, because an unrecorded exception is just a lie
  with a good reason behind it.

A card is opened in this shape and no other, `--dod` only where the work could sprawl:

```
backlog task create "<the change, named as what is true once it is done>" \
  -d  "<a sentence or two: what the work is>" \
  -l  <from-human|from-chief|from-lead|from-worker> \
  -m  "<F00N — the feature it serves>" \
  --ac "<something a reader who did not do the work can check>" \
  --ac "<one flag per criterion>" \
  --dod "<the boundary, set before the work starts>"
```
