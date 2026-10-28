## Project Overview

The **Fa Design System**: the component library for Finansavisen, Kapital and Motor, kept in sync
with the Figma file "Fa Design System". React 19 with TypeScript, Tailwind CSS v4.3, and React Aria
Components for accessibility and behavior.

## Two kinds of work

- **Changing the library** (a component's code, tokens, icons, Storybook setup): follow this file.
- **Building UI with the library** (demos, stories, patterns, pages, and any app that uses these
  components): load the **`fa-design-system` skill** in `skills/fa-design-system/`. It holds the
  usage rules, the token reference and a page per component. When you change a
  component's props, sizes or colors, update its page in `skills/fa-design-system/references/components/`
  in the same change, and its row in `references/figma-map.md` when the change affects Figma
  variants.

Rules for using components, tokens and icons live in the skill only; this file doesn't repeat them.

## Development Commands

A component library viewed through Storybook and installed in apps from a git tag. There is no app
dev server. Use **npm** (`package-lock.json`).

```bash
npm install --legacy-peer-deps   # first time only (eslint peer conflict)
npm run storybook                # Storybook at http://localhost:6006
npm test                         # type-check + lint + prettier + token parity (run before every commit)
npm run lint                     # eslint --fix on components/
npm run prettier                 # prettier --write on the repo
npm run tokens:check             # styles/theme.css vs tokens/figma-tokens.json (see TOKENS.md)
npm run build-storybook          # static Storybook in ./storybook-static
npm run build                    # the installable package in ./dist (also runs on install via `prepare`)
```

**Restart Storybook after adding a new component file.** Tailwind doesn't pick up classes from
files created while Storybook is running, so a new component renders unstyled until restarted.

Releasing, what ships and why import paths are public API: [`docs/releasing.md`](docs/releasing.md).

## Project Structure

There is no `src/` folder. The `@/` import alias maps to the repo root.

```
components/
├── base/              # Building blocks: buttons, inputs, select, checkbox, radio, toggle, badges, avatar, tags, tooltip…
├── application/       # Composed patterns: alerts, notifications, modals, pagination, table, tabs, date-picker, navigation…
├── foundations/       # Featured icon, payment and social icons, logo, rating stars, dot icon
├── shared-assets/     # Illustrations, background patterns, QR code, iPhone mockup, section divider
└── internal/          # Storybook-only helpers (decorators); not part of the library
hooks/                 # use-breakpoint, use-clipboard, use-resize-observer, use-active-item
styles/                # index.css (shipped), globals.css (Storybook), theme.css (tokens), typography.css
tokens/                # figma-tokens.json: the committed Figma variable extract
scripts/               # check-token-parity, build-package, setup
utils/                 # cx.ts (cx, sortCx), is-react-component.ts, countries, timezones
public/images/         # Storybook-only assets (placeholder avatars); not shipped
docs/                  # figma-parity, overrides, icons, releasing, storybook-docs
skills/                # the fa-design-system skill (ships with the package)
```

Each component lives in its own kebab-case folder:

```
components/<category>/<component-name>/
├── <component-name>.tsx         # The component (exported)
├── <component-name>.demo.tsx    # Example usages (optional; stories import from here)
└── <component-name>.story.tsx   # Storybook stories (Storybook loads components/**/*.story.tsx)
```

Stories link to their Figma frame through a `design` parameter holding Figma node ids:
`Table01DividerLine.parameters = { design: { desktop: "1227-110480", mobile: "1227-110588" } };`

Dark mode is the `.dark-mode` class (Storybook's theme switcher toggles it); semantic tokens switch
on their own.

## Code conventions

- **Kebab-case file names** for every file (`date-picker.tsx`, not `DatePicker.tsx`).
- **`Aria*` prefix** on every import from `react-aria-components`, so library components and the
  primitives they wrap stay apart: `import { Button as AriaButton } from "react-aria-components";`
- **Props** extend the React Aria props of the wrapped element and add `size`, `color` and icon
  props (`iconLeading`, `iconTrailing`). Add only the sizes and colors the Figma component has.
- **Styles** go in one `sortCx` object per component, with `common`, `sizes` and `colors` keys
  (see `components/base/buttons/button.tsx`). Combine classes with `cx()` (tailwind-merge).
- **Compound components** attach their parts as statics (`Select.Item`, `Select.ComboBox`); state
  shared between parts goes through a context (`SelectContext`).
- No app-level providers; theming is the `.dark-mode` class.

## Styling the library

The usage rules (semantic tokens only, no palette colors or hex, `fa-icons` only) are in the
skill's rules and `references/tokens.md`. What's specific to building components:

### Tokens

A component may use a primitive ramp step (`brand-700`) only when its Figma component is bound to
that primitive (as in `site-brands.ts`). Color, radius, spacing and type tokens are synced from
Figma: don't edit `styles/theme.css` values on your own. Change Figma first, update
`tokens/figma-tokens.json`, then `theme.css`, and run `npm run tokens:check`. `TOKENS.md` explains
the layers and how to read values from Figma.

### Transitions

Hover and other state changes are instant. Use bare `transition`: `--default-transition-duration` /
`--default-transition-timing-function` in `theme.css` resolve it to `0ms linear`, so retiming
every hover is a one-line change there. Don't add `duration-*` / `ease-*` at a call site to "fix" a
hover. The `--transition-duration-*` / `--ease-*` scale is for movement and overlays only (a
sliding toggle knob, a modal or popover entering). Storybook **Foundations → Motion** has the
scale and the overlay presets; `TOKENS.md` §8 says where these tokens live. For complex animation
use `motion`; for utility animations `tailwindcss-animate`.

### Disabled states

Most components use `disabled:cursor-not-allowed disabled:opacity-50`. **Exceptions** match Figma
exactly with the neutral disabled tokens from `theme.css`:

- `Button`: disabled text and icon `fg-disabled`; primary, secondary and destructive get the
  `bg-disabled_subtle` fill, secondary also a `border-disabled_subtle`. No disabled shadows. Text
  and icon greying is in `common.root`, fill and border in each color variant.
- `ButtonGroup`: `bg-disabled_subtle` fill, `text-disabled` text, `fg-disabled_subtle` icons and
  dots, border unchanged.
- `RadioCard`: `bg-disabled_subtle` fill and `ring-disabled` border.
- `PinInput` digit boxes: the same fill and border with `fg-disabled_subtle` digits.

When converting another component to Figma-accurate disabled states, reuse these tokens.

### Icons

Icons, flags and logos come from the `fa-icons` package; file type icons from
`@untitledui/file-icons`. Never add an SVG or icon component here. To add or change one, follow
[`docs/icons.md`](docs/icons.md) (Figma → `fa-icons` → bump the tag here).

## Figma Parity

Known gaps between Figma and code are tracked in [`docs/figma-parity.md`](docs/figma-parity.md).

- **Before working on a component**, check it there. If it's listed, point out the gap and the
  suggested action to the user before starting.
- **When Figma and code disagree** on which sizes, variants, states or components exist, report it
  and let the user decide. Don't map, delete or add variants on your own.
- **When a gap is closed or a new one is found**, update `docs/figma-parity.md` in the same change,
  including the "Last verified" date.
- **Style overrides** (restyling a library component for one context) are tracked in
  [`docs/overrides.md`](docs/overrides.md). Keep each one in a single place on each side: a `_`
  sub-component in Figma, one config or wrapper in code (e.g. `siteBrands[brand].search`). When a
  second place needs the same restyle, propose a real variant instead.
- **Figma first:** a new component is designed in Figma, then recreated in code from it. Don't
  invent one in code without its Figma frame.

## Adding a new component

1. Use React Aria Components as the foundation and follow the conventions above.
2. Add only the sizes and colors the Figma component has.
3. Put it in the right folder (`base/`, `application/`, …).
4. Add a `.story.tsx` (and `.demo.tsx` if useful); restart Storybook so Tailwind sees the new file.
5. Check `docs/figma-parity.md`, and update it if the component closes or opens a gap.
6. Add its page to `skills/fa-design-system/references/components/` (copy the structure of
   `button.md`), list it in the component index of `skills/fa-design-system/SKILL.md`, and add its
   Figma variants to `skills/fa-design-system/references/figma-map.md`. Attach that page to the story
   file with `parameters.skillDoc`, so Storybook's Docs page shows it, and document props with JSDoc
   rather than `argTypes` ([`docs/storybook-docs.md`](docs/storybook-docs.md)).
7. Run `npm test` and check the stories in Storybook (light, dark, mobile width) before committing.
