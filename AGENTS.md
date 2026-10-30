# AGENTS.md

Instructions for coding agents working in this repo (Claude Code reads `CLAUDE.md`, which holds the
same pointers and more detail).

- **Changing the library** (components, tokens, icons, Storybook): read `CLAUDE.md` first. Key
  points: code is the source of truth and Figma is where changes are explored, so a component or
  variant may be designed in Figma first or built in code first, as long as the other side follows
  or the gap is logged in `docs/figma-parity.md`; tokens live in `styles/theme.css` and are checked
  against the Figma snapshot `tokens/figma-tokens.json`; icons come from the `fa-icons` package;
  file names are kebab-case; `react-aria-components` imports are prefixed `Aria*`.
- **Building UI with the library** (demos, stories, patterns, pages): read
  `skills/fa-design-system/SKILL.md`, then the reference page of each component you use in
  `skills/fa-design-system/references/components/`.
- Before committing: `npm test` (type-check, lint, prettier, token parity, skill drift, unit tests).
