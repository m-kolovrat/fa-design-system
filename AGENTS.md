# AGENTS.md

Instructions for coding agents working in this repo (Claude Code reads `CLAUDE.md`, which holds the
same pointers and more detail).

- **Changing the library** (components, tokens, icons, Storybook): read `CLAUDE.md` first. Key
  points: Figma is the source of truth, tokens come from `tokens/figma-tokens.json`, icons from the
  `fa-icons` package, file names in kebab-case, `react-aria-components` imports prefixed `Aria*`.
- **Building UI with the library** (demos, stories, patterns, pages): read
  `skills/fa-design-system/SKILL.md`, then the reference page of each component you use in
  `skills/fa-design-system/references/components/`.
- Before committing: `npm test` (type-check, lint, prettier, token parity).
