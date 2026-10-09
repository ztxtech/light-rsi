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
6. **Parallel-benefit gate.** Before any decomposition, including diagnosis or brainstorming, record expected gain, coordination cost, and risk. Dispatch parallel agents only when expected gain is higher than their combined coordination cost and risk.
7. **Comments by contract.** Write thorough critical comments in the current user's interaction language, or the language the user explicitly requests. Document contracts, invariants, assumptions, failure modes, trade-offs, and verification; update comments when behavior changes.
8. **Abstraction before implementation.** Expose the abstract flow before concrete details. Keep implementation inside focused functions or classes behind stable contracts so the main path can be reviewed without reading every detail.

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
2. **Diagnose.** If the gap requires decomposition, complete the parallel-benefit gate first. State the gap between current and goal state. Visualize first when the material allows it, then layered statistics, then model and experiment checks. List competing hypotheses with expected evidence, falsifiers, and the cheapest test.
3. **Independent diagnosis.** For complex, high-risk, or conflicting problems, dispatch `agents/evaluator.md` in `diagnosis` mode with a blank context: goal, raw artifact paths, questions, output contract. It rebuilds the phenomenon from raw evidence. Skip only for simple problems and say why.
4. **Brainstorm.** Reuse the gate record when scope is unchanged; update it before a new decomposition. If the gate says `serial`, open routes directly. If it says `parallel`, fill every usable slot with isolated blank-context brainstorming agents and merge by the rules below. Either way, each route gives feasibility, biggest risk, and first test; test the cheapest critical assumption first.
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

## Development discipline

Comments are part of the interface, not decoration.

- Language: use the current user's primary interaction language by default. Follow an explicit language request or an established project convention when one exists.
- Required coverage: public APIs, module and class responsibilities, non-obvious control flow, state transitions, concurrency, external I/O, security and data boundaries, assumptions, invariants, failure modes, retries, trade-offs, and verification steps.
- Content: explain intent, contract, consequences, and why the code is shaped this way. Do not restate syntax or narrate obvious assignments.
- Placement: keep each comment beside the code it governs. Update code and comments in the same change.

Structure code from abstraction to implementation:

1. Put the public entry point or module-level flow first. Name the major steps and show their order with minimal glue code.
2. Define stable contracts for each step: inputs, outputs, side effects, errors, and ownership.
3. Put concrete details in focused functions or classes behind those contracts. Do not bury the main flow in low-level branching, parsing, I/O, or framework glue.
4. Keep dependencies pointing inward. A concrete implementation must not force unrelated callers to know its internals.
5. Add an abstraction only when it names a real responsibility and makes the flow easier to inspect. Avoid pass-through wrappers and speculative layers.

The review path must let a reader verify the abstract behavior first, then inspect implementation details without reconstructing the overall flow.

## Parallel-benefit gate and dispatch

Give exactly: goal, known inputs (paths and facts), current focus, and the output contract from the applicable agent file or the brainstorm contract below. Nothing about your own reasoning.

- `agents/evaluator.md` always runs with a blank context.
- Sub-agents are read-only except for a designated output directory.
- A dispatched worker does not spawn more agents unless its contract explicitly authorizes it.
- Blockers are quoted verbatim; never soften or delete them.

Before any decomposition, record or update the gate in the host project's designated round record, never in RSI memory. Reuse the record while scope is unchanged:

- Task and core contradiction.
- Expected gain: what independent routes could show that a serial pass cannot.
- Coordination cost: prompts, waiting, integration, compute, time, and conflict handling.
- Risk: isolation leakage, merge loss, unsupported claims, or weakened blind review.
- Decision: `parallel` only when expected gain is greater than combined coordination cost and risk, at least one usable slot exists, and the work can be isolated; otherwise `serial`.
- Slot accounting and exclusive output paths or return channels when the decision is `parallel`.

When the gate selects `parallel` brainstorming:

1. Determine usable slots from the harness. Reserve a slot only when the harness counts the main agent against the total.
2. Put one isolated blank-context brainstorming agent in every usable slot. Do not use a fixed agent count.
3. Give each agent the same raw brief plus one preassigned, mutually exclusive exploration axis: goal and acceptance checks, known input paths and facts, core contradiction, axis, constraints, exclusive output destination, and the brainstorm output contract.
4. Omit the main agent's reasoning, conclusions, expectations, other agents' inputs or outputs, and any sign that other agents exist. Launch all agents before reading any result.
5. After every agent finishes, read the raw outputs. Keep provenance separate from judgment; cluster routes by content and evidence rather than by source or agreement. Preserve dissent, mark unsupported claims `unknown`, and rank routes by evidence, information gain, feasibility, cost, and risk. Select the cheapest critical test.

Brainstorm output contract: axis; routes, each with mechanism, evidence or `unknown`, feasibility, biggest risk, and first test; assumptions; unknowns. Return raw findings only; no preferred conclusion, peer comparison, or file edits.

Give the independent evaluator only the goal, done criteria, artifact paths (including gate record, raw brainstorm outputs, and merged record), and output contract; never give it the main agent's merge reasoning or preferred route.

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
