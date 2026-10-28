# Finansavisen prototype experiment (27 Oct 2026)

Can an agent build a real Finansavisen page from a short PM brief with only the `fa-design-system`
skill, without inventing components the system should provide? Report with screenshots:
https://claude.ai/artifact/MwwsAanS41WDumXDR12BF7

## Setup

- `briefs/`: five PM-style briefs (content and intent only, no layout or component names),
  written by a separate session from the logged-in live pages.
- `ground-truth/`: what the real pages contain, section by section. Builders never saw these.
- `opus/`, `sonnet/`, `haiku/`: one folder per page and model with the prototype, its stories
  (Storybook → Experiments) and the builder's own notes (components used, stand-ins, clashes,
  gaps). Builders worked from the brief and the skill only and were not allowed to open Storybook.
- `reports/eval/`: one independent evaluation per page, scored 0–3 on component reuse, rule
  compliance, fidelity, visual quality, accessibility and honesty of notes, with screenshots
  taken at 1440 and 375 px in light and dark.
- `reports/`: setup audit, best-practice research, debt scan of `components/`, compliance scan of
  the prototypes.

## Scores (max 18)

| Page           | Opus | Sonnet | Haiku |
| :------------- | ---: | -----: | ----: |
| Forside        |   17 |     11 |    12 |
| Pluss-artikkel |   16 |     13 |     – |
| Børs           |   15 |     11 |     – |
| Aksje: Equinor |   15 |     14 |     – |
| Bjellesauer    |   16 |     14 |    10 |
| **Average**    | 15.8 |   12.6 |  11.0 |

## Re-running

Keep the briefs as the eval set. For each model, start a fresh agent with the prompt "load the
`fa-design-system` skill, read only `briefs/<page>.md`, build `<model>/<page>/`", then run an
evaluator against `ground-truth/`. Compare the scores and the compliance scan between skill
versions.

The prototypes are experiments, not golden pages: they contain placeholder data and the
workarounds listed in their notes.
