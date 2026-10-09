# light-rsi

[![Project page](https://img.shields.io/badge/Project-GitHub_Pages-0F7B4F?logo=github)](https://ztxtech.github.io/light-rsi/)
[![Repository](https://img.shields.io/badge/GitHub-light--rsi-181717?logo=github)](https://github.com/ztxtech/light-rsi)
[![Harness](https://img.shields.io/badge/Harness-any_AGENTS.md-4B5563?logo=openai)](https://agents.md)
[![Dependencies](https://img.shields.io/badge/Dependencies-none-0F7B4F)](#install)
[![Terse](https://img.shields.io/badge/Output-terse_by_default-4B5563)](#hard-rules)

A lightweight recursive self-improvement (RSI) loop that drops into any project following the `AGENTS.md` convention. No SDK, no runtime, no configuration to wire up: clone the folder, point the agent at `goal.md`, and run.

## What it is

light-rsi keeps only the part that lets a system improve itself:

```
goal → diagnose → independent diagnosis → gated brainstorm
     → external evidence → implement → independent evaluation → iterate → close
```

Two specialist prompts support the loop: a web-research agent that brings in outside information, and a blank-context evaluator that diagnoses and judges without inheriting the main agent's reasoning. A mandatory gate precedes every decomposition and decides whether brainstorming is serial or fills the harness's usable concurrency slots with isolated agents.

Everything else stays outside. Plans, state, logs, traces, code, data, and results belong to the host project and are never managed here.

| Inside `.light-rsi/` | Outside `.light-rsi/` |
| --- | --- |
| `goal.md`: objective and done criteria | The host project's plans and state files |
| `memory/positive.md`, `memory/negative.md`: what the loop learned about itself | Logs, traces, run artifacts |
| `AGENTS.md`: the loop protocol | Code, data, results |
| `agents/`: the two specialist prompts | Project-level memory and domain knowledge |

Memory is RSI-scoped on purpose: it records which loop rules, checks, and search moves worked or failed, never project knowledge. Entries carry a status, evidence, limits, and a compatibility judgment (`exact`, `partial`, `none`, `unknown`). Only `exact` matches may be reused as a prior; `partial` or `unknown` matches must pass the cheapest adaptation test first; `none` is contrast only, and the loop retries instead of forcing an old answer onto a new problem.

<a id="hard-rules"></a>
## Hard rules

- **Terse by default.** The fewest words that keep the meaning. No filler, no restating, no padding. Terseness never removes facts, evidence, uncertainty, or blockers.
- **No slacking.** No fake completion, no superficial patch, no skipped check, no invented result. Anything not run is labeled `not verified`.
- **Goal first.** The objective and its done criteria are read before any work, and every round is judged against them.
- **Blind review.** The evaluator never receives the main agent's reasoning or expected conclusion.
- **Parallel-benefit gate.** Before any decomposition, the loop records expected gain, coordination cost, and risk. Parallel agents run only when expected gain is higher than their combined cost and risk.
- **Comments by contract.** Critical comments use the current user's language and explain contracts, assumptions, failure modes, trade-offs, and verification. Comments change with the code.
- **Abstraction before implementation.** Public flow comes first; concrete details stay in focused functions or classes behind stable contracts.

## Install

1. Clone into the project root:

```bash
git clone https://github.com/ztxtech/light-rsi <project-root>/.light-rsi
```

2. Add one section to the host project's `AGENTS.md`:

```markdown
## RSI loop

Before each round, read `.light-rsi/AGENTS.md` and run its loop.
The goal is `.light-rsi/goal.md`.
```

3. On the first run the loop creates `goal.md` and `memory/positive.md` / `memory/negative.md` from the shipped templates. These runtime files are git-ignored, so they never conflict with upstream updates.
4. Optional: add `.light-rsi/` to the host project's `.gitignore`, or vendor it as a submodule.

## Goal mode

light-rsi does not depend on a specific harness. It follows the `AGENTS.md` convention, so any agent that reads `AGENTS.md` can run it: Codex, Claude Code, OpenCode, or a custom loop.

If the harness has a goal or loop mode, point it at `.light-rsi/goal.md` and say: *complete the goal in `.light-rsi/goal.md`*. The protocol takes over from there: it reads the goal, gates any decomposition, diagnoses the gap, brings in external evidence, implements the smallest verifiable step, evaluates with a blank context, and keeps iterating until the done criteria are met.

## Why this design works

1. **A system must see what it is missing.** Recursive improvement starts with gap detection. Without it, the loop only re-runs what it already knows and mistakes motion for progress.
2. **Judgment must have discriminating power.** A weak evaluator cannot separate real progress from activity, so it stops early or churns. The evaluator here starts from raw artifacts with a blank context, and it may not say "can stop" while any blocker or higher-value action remains.
3. **Solving requires new information.** Pure self-analysis converges to a fixed point: the system keeps re-deriving its own assumptions. The loop therefore opens the search space outward (answer-first search, similar problems, weaker subproblems, leading-route DFS, failure questions, cross-domain literature) and treats the result as evidence, not as a conclusion.
4. **Parallelism must earn its coordination cost.** When the gate selects it, blank-context brainstorming agents receive separate exploration axes and isolated outputs, cannot see one another, and return raw results. The merge clusters evidence, preserves disagreement, and gives the evaluator artifacts rather than the main agent's preferred route.
5. **Critical comments belong to the interface.** They record the contracts and decisions a reviewer cannot safely infer from syntax, and they are written in the language the user is using.
6. **Abstract flow comes first.** The main path shows the named steps and their order. Concrete parsing, I/O, branching, and framework details live behind those steps so review can start at the right level.

## Structure

| Path | Role |
| --- | --- |
| `AGENTS.md` | Loop protocol: scope, hard rules, development discipline, goal, memory, gated parallel dispatch, nine-step loop, stop conditions |
| `agents/web-research.md` | External-evidence agent: answer-first, BFS, decomposition, DFS, failure questions, trends |
| `agents/evaluator.md` | Blank-context diagnosis and evaluation agent |
| `goal.template.md` | Goal schema, copied to `goal.md` on first run |
| `memory/*.template.md` | Memory schema, copied to `memory/*.md` on first run |
| `docs/` | Project page |

## Acknowledgments

light-rsi is a lightweight extraction of the RSI loop from [AION](https://github.com/ztxtech/aion), a harness built for time-series work. AION is a good project; it simply did not have enough compute and experiment hardware behind it. So we pulled its RSI loop out into a small external component that can be used every day.

It does not favor any harness: it follows the `AGENTS.md` convention. Your harness only needs a goal mode. Point it at the goal in `.light-rsi/` and it can keep going, because the agent starts from this directory and runs the whole loop here.
