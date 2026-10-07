# light-rsi

A lightweight recursive self-improvement (RSI) loop.
Install shape: `<project-root>/.light-rsi/`. The host project's `AGENTS.md` points here once per round.

## Scope

Owned by this directory:

| Path | Role |
| --- | --- |
| `goal.md` | The loop's goal and done criteria. Anchors every round. |
| `memory/positive.md` | Reusable experience about the loop: rules that worked. |
| `memory/negative.md` | Reusable experience about the loop: paths that failed. |
| `AGENTS.md` | The loop protocol. |
| `agents/web-research.md` | External-evidence agent. |
| `agents/evaluator.md` | Blank-context diagnosis and evaluation agent. |

Owned by the host project, never managed here: plans, state, traces, logs, code, data, results, project-level memory.

Runtime files are created from their templates and stay git-ignored: `goal.md`, `memory/positive.md`, `memory/negative.md`.

## Hard rules (bind every round)

1. **Terse by default.** Use the fewest words that keep the meaning. No filler, no restating, no repeated summaries, no decorative prose. Terseness never removes facts, numbers, evidence, uncertainty, or blockers.
2. **No slacking.** No fake completion, no superficial patch, no skipped check, no invented result. If it was not run, write `not verified`.
3. **Evidence only.** Every conclusion points to a file, command, source, or reproducible run. Keep facts, inferences, and unknowns separate.
4. **Goal first.** Read `goal.md` before acting. If the objective or its done criteria are unclear or uncheckable, fix the goal before implementing.
5. **Blind review.** The independent agent never receives the main agent's reasoning, conclusions, or expectations.

## Goal

`goal.md` is the most important file here: the loop's anchor lives inside this directory while plans, state, and logs stay outside.

- One objective, one sentence.
- Done criteria must be checkable by a command, file, or observation, not by an adjective.
- Constraints and non-goals bound the search space; state them explicitly.
- Status: `active | done | blocked`.
- Only a redefinition by the user rewrites the objective; the loop updates `Status` and `Updated` at closeout.
- If the harness has a goal or loop mode, point it at this file: "complete the goal in `.light-rsi/goal.md`".

## Loop

1. **Open.** Read `goal.md` and both memory files; create missing runtime files from templates. Check the host project's current state read-only. State this round's target, boundary, and acceptance checks in the fewest words.
2. **Diagnose.** State the gap between current and goal state. Visualize first when the material allows it, then layered statistics, then model and experiment checks. List competing hypotheses with expected evidence, falsifiers, and the cheapest test.
3. **Independent diagnosis.** For complex, high-risk, or conflicting problems, dispatch `agents/evaluator.md` in `diagnosis` mode with a blank context: goal, raw artifact paths, questions, output contract. It rebuilds the phenomenon from raw evidence. Skip only for simple problems and say why.
4. **Brainstorm.** Open candidate routes around the diagnosed core contradiction. No fixed quota; each route gives feasibility, biggest risk, and first test. Test the cheapest critical assumption first.
5. **Gather evidence.** Dispatch `agents/web-research.md` with uncertain hypotheses, discriminating facts, and current candidates. Search order: answer-first, BFS similar problems, weaker subproblems, DFS leading route, reverse and failure questions, trends. Re-search every round; previous routes are inputs, not a plan. Reuse mature solutions when they fit; external information is evidence, not a conclusion.
6. **Implement.** Smallest verifiable step. Leave artifacts and a reproducible entry point.
7. **Independent evaluation.** Dispatch `agents/evaluator.md` in `evaluation` mode with a blank context: goal, artifact paths, done criteria. It checks whether the diagnosis chain closed and whether claims survive the evidence.
8. **Iterate.** Blockers go back to step 2. A local patch is not a fix.
9. **Close.** Stop only when every done criterion is met with evidence, no blocker or higher-value action remains, memory is reviewed, and the host project's own records are updated by its own rules.

No fixed round count. Continue or stop only by evaluation result plus remaining value.

## Memory (RSI-scoped)

Memory records only how this loop performs: which rules, checks, and search moves worked or failed. It never stores project knowledge, task results, code details, or host state.

Fields per entry: ID and date; status `candidate | verified | retired`; rule; scope; evidence; limits, counterexamples, failure conditions; compatibility `exact | partial | none | unknown`; retry condition.

Compatibility gate. Compare task type, inputs and outputs, constraints, environment and version, evaluation method, scale, and failure mode:

- `exact`: may be reused directly as a prior.
- `partial` or `unknown`: candidate only; run the cheapest adaptation test first.
- `none`: contrast only; record the difference and retry. Never force it.
- Conflict with new evidence: retire the old entry, add a new one, keep history.
- Sub-agents may only propose candidates with evidence, scope, limits, and compatibility; the main agent reads the current file before writing.
- Promotion: a rule leaves memory only after cross-task verification or explicit user confirmation, and only into the host project's `AGENTS.md`.

## Thinking discipline

- Core contradiction and constraints before routes.
- Visualization must enter the conclusion, not decorate it.
- Correlation is not causation; check confounding, selection, leakage, order, and intervention.
- Look for a ready answer before reinventing one; BFS opens the space, DFS closes a route down to its failure conditions.
- Route count follows the problem, never a quota.
- Re-search and re-brainstorm every round.
- Two rounds of parameter-only or wording-only changes mean churn: change the approach.
- Label unverified claims as unverified.

## Sub-agent dispatch

Give exactly: goal, known inputs (paths and facts), current focus, output contract from the agent file. Nothing about your own reasoning.

- `agents/evaluator.md` always runs with a blank context.
- Sub-agents are read-only except for a designated output directory.
- Blockers are quoted verbatim; never soften or delete them.

## Stop conditions

All must hold:

- Every done criterion is met and reproducible.
- The diagnosis chain is closed: competing hypotheses have support, refutation, or an explicit unknown.
- The independent evaluation reports no blocker and no higher-value next action.
- No unverified number, citation, or conclusion is presented as fact.
- Memory was reviewed; new candidates were written or the review is recorded as none.

## Hygiene

- Keep run artifacts, logs, caches, and secrets out of this directory.
- Do not rewrite files another session is reading.
- Do not delete files of unknown origin.
