# Sandbox

A place to build pages with the design system and to run experiments, apart from the library.
Nothing here is part of the library or the package.

## What keeps it apart

- **Nothing imports it.** `components/`, the skill and the tokens never import from `sandbox/`.
- **Not shipped.** `package.json` `files` doesn't include `sandbox/` or `.storybook-sandbox/`.
- **Not in the library's checks.** `npm test` skips `sandbox/` (root `tsconfig.json` excludes it,
  `.prettierignore` lists it). A broken sandbox page never blocks a library change.
- **Own Storybook.** `npm run sandbox` (port 6008) shows only sandbox stories; the library
  Storybook (`npm run storybook`) shows only the library.

Sandbox pages render with the **current** library, so a page can change when a component changes.
To keep what a page looked like on a given day, save screenshots with it.

## Commands

```bash
npm run sandbox          # sandbox Storybook at http://localhost:6008
npm run sandbox:check    # type-check and prettier for sandbox/ only
npm run sandbox:build    # static sandbox Storybook in ./sandbox-static
```

## Layout

```
sandbox/
├── pages/<page>/            # one page built from a prompt
│   ├── <page>.tsx           # the page
│   ├── <page>.story.tsx     # Desktop and Mobile stories, title "Pages/<page>"
│   └── <page>.notes.md      # the prompt, components used, stand-ins, new patterns, clashes
└── runs/<date>-<name>/      # an experiment run (briefs, prototypes, evaluations)
```

## Building a page from a prompt

**What to give:** what the page is for and what's on it (a description, a PM brief or a prompt).
Optional: the publication (`fa`, `kapital`, `motor`), logged in or out, real figures to use, a
Figma frame or a live page to follow, and which model should build it.

**What the builder does:**

1. Loads the `fa-design-system` skill and follows its steps: picks the page shell, plans each
   section and the component or stand-in that covers it.
2. Creates `pages/<page>/` with the page, its stories and its notes. Imports the library only by
   its package paths, as an app would:
   `import { CardHeader } from "fa-design-system/components/application/card-header/card-header";`
   Never `@/…`, and never a copy of a component.
3. Runs `npm run sandbox:check`, then looks at the page in the sandbox Storybook at 1440 and 375 px
   in light and dark, and fixes what's wrong.
4. Writes the notes: components used, stand-ins, placeholder figures, and the **Patterns** section
   from the skill (new patterns, clashes). That list is what tells us what the system is missing.

What a page finds goes to the design system the usual way: designed in Figma, then built in the library. Sandbox
code is never moved into `components/`.

## Experiment runs

- A run is a dated folder under `runs/`. Never edit a finished run; its scores and evaluations
  describe exactly those files.
- To measure again, start a new run folder: reuse the briefs and ground truth from an earlier run,
  build into the new folder, evaluate, and compare the scores.
- Story titles start with `Runs/<date>/`.

Runs so far: [2026-10-27 Finansavisen prototypes](runs/2026-10-27-finansavisen-prototypes/README.md)
(built from the skill as it was on 27 Oct; a snapshot, not reference pages).
