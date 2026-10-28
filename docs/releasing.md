# Releasing the package

Apps install the library like `fa-icons`: `"fa-design-system": "github:m-kolovrat/fa-design-system#vX.Y.Z"`.
Installing runs `prepare`, which builds `dist/` with `scripts/build-package.mjs` (`tsc` with
`tsconfig.build.json`, one file per source file so every `"use client"` survives, then `tsc-alias`
turns `@/` imports into relative ones). `dist/` is not committed.

- **What ships** is set by `files` and `exports` in `package.json`: the built components, their
  source (for ejecting), `styles/` (apps import `fa-design-system/styles/index.css`), the skill and
  the docs it refers to. Stories, demos and `components/internal` don't ship.
- **Import paths are public API.** An app imports `fa-design-system/components/<path>`, the same
  path as `@/components/<path>` here. A folder with an `index.tsx` needs its own `exports` entry.
- **Release:** run `npm test` and `npm run build`, then `npm version minor` (`patch` for fixes only,
  `major` when a component, prop or export is renamed or removed), then `git push --follow-tags`.
- `styles/index.css` holds everything the components need except `@import "tailwindcss"`;
  `styles/globals.css` adds that for Storybook. Put new global CSS in `index.css`.
- `npx fa-design-system setup` (`scripts/setup.mjs`) links the skill into an app's
  `.claude/skills/` and adds the `AGENTS.md` block.
