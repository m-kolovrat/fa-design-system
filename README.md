# Fa Design System

React components for the Fa Design System, built with React 19, Tailwind CSS v4.3, TypeScript and React Aria.
The code is kept in sync with the [Fa Design System Figma file](https://www.figma.com/design/ycDcr4jjOWyIneuxyL1xAd/Fa-Design-System).

[Storybook](https://fa-design-system-mkolovrat-proficohrs-projects.vercel.app) • [Figma](https://www.figma.com/design/ycDcr4jjOWyIneuxyL1xAd/Fa-Design-System) • [Icons, flags and logos (`fa-icons`)](https://github.com/m-kolovrat/fa-icons)

## Using it in an app

Install a released version from its git tag (React 19 and Tailwind CSS v4.3 are peer dependencies):

```bash
npm install github:m-kolovrat/fa-design-system#v0.1.1
```

Import the styles in the app's main stylesheet, right after Tailwind. They bring the tokens,
typography, plugins and the `dark` variant, and point Tailwind at the components:

```css
@import "tailwindcss";
@import "fa-design-system/styles/index.css";
```

Import components by their path in this repo, with `fa-design-system/` instead of `@/`:

```tsx
import { Button } from "fa-design-system/components/base/buttons/button";
```

Dark mode is the `.dark-mode` class on `<html>`.

### Coding agents

```bash
npx fa-design-system setup
```

This links the `fa-design-system` skill (usage rules, tokens, layout, a page per component) into
`.claude/skills/` and adds a short block to the app's `AGENTS.md`. The skill comes from the
installed version, so it always matches the components. When a component doesn't fit, the skill's
"Changing a component" section lists the options, from props to ejecting a single component.

## Working on the library

```bash
npm install --legacy-peer-deps
npm run storybook   # http://localhost:6006
npm test            # type-check, lint, prettier and token parity
npm run build       # the package in dist/ (also runs on install)
```

## Documentation

- [`CLAUDE.md`](CLAUDE.md): project structure and conventions for changing the library
- [`skills/fa-design-system`](skills/fa-design-system/SKILL.md): rules for building UI with the library
- [`TOKENS.md`](TOKENS.md): how design tokens map to Figma and how to change them
- [`docs/figma-parity.md`](docs/figma-parity.md): where Figma and code differ
- [`CONTRIBUTING.md`](CONTRIBUTING.md): how to contribute

## License

MIT. The Fa Design System started from [Untitled UI React](https://www.untitledui.com/react), which is MIT-licensed; its copyright notice is kept in [`LICENSE`](LICENSE).
