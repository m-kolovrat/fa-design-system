## Project Overview

The **Fa Design System**: the component library for Finansavisen, Kapital and Motor, kept in sync
with the Figma file "Fa Design System". Forked from Untitled UI React and built with:

- **React 19** with TypeScript
- **Tailwind CSS v4.3** for styling
- **React Aria Components** as the foundation for accessibility and behavior

## Two kinds of work

- **Changing the library** (a component's code, tokens, icons, Storybook setup): follow this file.
- **Building UI with the library** (demos, stories, patterns, pages, and any app that uses these
  components): load the **`fa-design-system` skill** in `skills/fa-design-system/`. It holds the
  usage rules, the token reference, a page per component and the anti-patterns. When you change a
  component's props, sizes or colors, update its page in `skills/fa-design-system/references/components/`
  in the same change.

## Key Architecture Principles

### Component Foundation

- All components are built on **React Aria Components** for consistent accessibility and behavior
- Components follow the compound component pattern with sub-components (e.g., `Select.Item`, `Select.ComboBox`)
- TypeScript is used throughout for type safety

### Import Naming Convention

**CRITICAL**: All imports from `react-aria-components` must be prefixed with `Aria*` for clarity and consistency:

```typescript
// ✅ Correct
import { Button as AriaButton, TextField as AriaTextField } from "react-aria-components";
// ❌ Incorrect
import { Button, TextField } from "react-aria-components";
```

This convention:

- Prevents naming conflicts with custom components
- Makes it clear when using base React Aria components
- Maintains consistency across the entire codebase

### File Naming Convention

**IMPORTANT**: All files must be named in **kebab-case** for consistency:

```
✅ Correct:
- date-picker.tsx
- user-profile.tsx
- api-client.ts
- auth-context.tsx

❌ Incorrect:
- DatePicker.tsx
- userProfile.tsx
- apiClient.ts
- AuthContext.tsx
```

This applies to all file types including:

- Component files (.tsx, .jsx)
- TypeScript/JavaScript files (.ts, .js)
- Style files (.css, .scss)
- Test files (.test.ts, .spec.tsx)
- Configuration files (when creating new ones)

## Development Commands

This repo is a component library viewed through Storybook. There is no app dev server or production build. Use **npm** (`package-lock.json` is the lockfile in use).

```bash
npm install --legacy-peer-deps   # first time only (eslint peer conflict)
npm run storybook                # Storybook at http://localhost:6006
npm test                         # type-check + lint + prettier + token parity (run before every commit)
npm run lint                     # eslint --fix on components/
npm run prettier                 # prettier --write on the repo
npm run tokens:check             # styles/theme.css vs tokens/figma-tokens.json (see TOKENS.md)
npm run build-storybook          # static Storybook in ./storybook-static
```

**Restart Storybook after adding a new component file.** Tailwind doesn't pick up classes from files created while Storybook is running, so a new component renders unstyled (missing paddings, colors, rings) until Storybook is restarted. Edits to existing files hot-reload normally.

## Project Structure

There is no `src/` folder. Everything sits at the repo root, and the `@/` import alias maps to the root (`@/components/...` → `./components/...`).

```
components/
├── base/              # Building blocks: buttons, inputs, select, checkbox, radio, toggle, badges, avatar, tags, tooltip…
├── application/       # Composed patterns: alerts, notifications, modals, pagination, table, tabs, date-picker, navigation…
├── foundations/       # Featured icon, payment and social icons, logo, rating stars, dot icon
├── shared-assets/     # Illustrations, background patterns, QR code, iPhone mockup, section divider
└── internal/          # Storybook-only helpers (decorators); not part of the library
hooks/                 # use-breakpoint, use-clipboard, use-resize-observer, use-active-item
styles/                # globals.css, theme.css (tokens), typography.css
tokens/                # figma-tokens.json: the committed Figma variable extract
scripts/               # check-token-parity.mjs
utils/                 # cx.ts, is-react-component.ts, countries, timezones
docs/                  # figma-parity.md, overrides.md
.storybook/            # Storybook config: theme switcher, viewports, story order
```

Related docs: `TOKENS.md` (how design tokens map to Figma and how to change them), `docs/figma-parity.md` (Figma ↔ code gaps), `docs/overrides.md` (style overrides of library components), `CONTRIBUTING.md`.

### Component files

Each component lives in its own kebab-case folder:

```
components/<category>/<component-name>/
├── <component-name>.tsx         # The component (exported)
├── <component-name>.demo.tsx    # Example usages (optional; stories import from here)
└── <component-name>.story.tsx   # Storybook stories (Storybook loads components/**/*.story.tsx)
```

Stories can link to their Figma frame through a `design` parameter holding Figma node ids:

```typescript
Table01DividerLine.parameters = {
    design: { desktop: "1227-110480", mobile: "1227-110588" },
};
```

Dark mode is the `.dark-mode` class (Storybook's theme switcher toggles it); the `dark:` variant targets it. All semantic color tokens switch automatically.

### Component Patterns

#### 1. Base Components

Located in `components/base/`, these are the building blocks:

- `Button`, `ButtonGroup`, `ButtonUtility`, `CloseButton` - Buttons
- `Input`, `InputGroup`, `InputDate`, `InputNumber`, `InputFile`, `InputTags`, `PinInput` - Inputs
- `Select` (with `Select.ComboBox`), `MultiSelect`, `TagSelect` - Dropdown selections
- `Checkbox`, `RadioButton` / `RadioGroup`, `RadioCard` / `RadioCardGroup`, `Toggle` - Form controls
- `Avatar`, `AvatarLabelGroup`, `Badge`, `Tag`, `Tooltip` - Display components

#### 2. Application Components

Located in `components/application/`, these are complex UI patterns:

- `Alert`, `Notification` (+ `notify()` toast helper) - Feedback
- `Modal` with `ModalHeader` / `ModalBody` / `ModalFooter` (+ `Modal.Trigger`) - Fixed header and footer around a scrolling body; a bottom sheet (`mobile="sheet"`) or full screen (`mobile="fullscreen"`) on mobile
- `PromptModal` with `PromptModalHeader` / `PromptModalActions` (+ `PromptModal.Trigger`) - Short, focused prompts (confirm, delete, a few fields); the body is a free slot
- `DatePicker`, `DateRangePicker` - Calendar-based date selection
- `Pagination*` - Page, card, button-group and advanced variants
- `Table`, `Tabs`, `Carousel`, `SlideoutMenu`, `LoadingIndicator`, charts, app navigation

#### 3. Styling Architecture

- Uses a `sortCx` utility for organized style objects
- Follows size variants: `sm`, `md`, `lg`, `xl`
- Color variants: `primary`, `secondary`, `tertiary`, `destructive`, etc.
- Responsive and state-aware styling with Tailwind

#### 4. Component Props Pattern

Components extend the React Aria props of the element they wrap, and add `size`, `color` and icon props on top:

```typescript
import type { ButtonProps as AriaButtonProps } from "react-aria-components";

interface CommonProps {
    size?: "sm" | "md" | "lg";
    isDisabled?: boolean;
    isLoading?: boolean;
}

interface ButtonProps extends CommonProps, Omit<AriaButtonProps, "children" | "className"> {
    color?: "primary" | "secondary" | "tertiary";
    iconLeading?: FC<{ className?: string }> | ReactNode;
    iconTrailing?: FC<{ className?: string }> | ReactNode;
}
```

## Styling Guidelines

### Colors

Use semantic token classes only (`text-primary`, `bg-secondary`, `border-secondary`,
`text-fg-quaternary`), never Tailwind palette colors (`text-gray-900`, `bg-blue-700`) or hex. A
component may use a primitive ramp step (`brand-700`) only when its Figma component is bound to that
primitive (as in `site-brands.ts`). The full token list with what each one is for is in
`skills/fa-design-system/references/tokens.md`.

### Changing tokens (including the brand color)

Color, radius, spacing and type tokens are synced from Figma. Don't edit `styles/theme.css` values on your own: change Figma first, update `tokens/figma-tokens.json`, then `theme.css`, and run `npm run tokens:check`. `TOKENS.md` explains the layers, where each token lives and how to read values from Figma. Semantic tokens (e.g. `bg-brand-solid`) switch between light and dark through `.dark-mode`.

### Style Organization

```typescript
export const styles = sortCx({
    common: {
        root: "base-classes-here",
        icon: "icon-classes-here",
    },
    sizes: {
        sm: { root: "small-size-classes" },
        md: { root: "medium-size-classes" },
    },
    colors: {
        primary: { root: "primary-color-classes" },
        secondary: { root: "secondary-color-classes" },
    },
});
```

### Utility Functions

- `cx()` - Class name utility (from `@/utils/cx`)
- `sortCx()` - Organized style objects
- `isReactComponent()` - Component type checking

## Icon Usage

### Available Libraries

- `fa-icons` - The Fa icon set from the Figma file ("Icons V2": line icons plus `-filled` variants), and the flags and logos. Built from Figma in the separate repo `github:m-kolovrat/fa-icons`.
- `@untitledui/file-icons` - File type icons

Untitled UI icons (`@untitledui/icons`) are no longer used. If a design needs an icon that `fa-icons` doesn't have, it's designed in Figma first and added to `fa-icons`; don't pull in another icon library.

### Import & usage

Named imports; names are the Figma names in PascalCase (`chevron-down` → `ChevronDown`). Pass an
icon to a component prop as a reference (`iconLeading={ChevronDown}`), or as JSX with `data-icon`.
Icons are 20px by default (`size-4` / `size-5` / `size-6` to change), colored with `text-fg-*`
(`currentColor`), and `aria-hidden` unless given `aria-hidden={false}` and an `aria-label`. The
stroke is 1.5px at 20px and scales with the size; never override it with `stroke-*`.

The `flag` icon is exported as `FlagIcon` (`Flag` is the country flag component). Name an import
`<Name>Icon` (e.g. `Calendar as CalendarIcon`) when it clashes with a component in the file.

### Adding or updating icons, flags and logos

Figma is the source, the [`fa-icons`](https://github.com/m-kolovrat/fa-icons) repo builds the
package, and this repo only installs it. Never add an SVG or icon component here.

1. **Figma** (file "Fa Design System"): each asset is a component in its section. Icons V2
   (node `17218-803`), Flag (`17201-14733`), Logos (`17204-1131`). The component name is the
   kebab-case code name (`arrow-left`). Icons and flags are 20×20 frames. Icons keep their
   strokes; don't outline them.
2. **Export** each changed component as SVG ("Include id attribute" off). Without manual export,
   use the Figma MCP: `use_figma` with `node.exportAsync({ format: "SVG_STRING", svgIdAttribute: false })`
   per component. A call returns at most 48 KB, so batch about 40 icons or 15 flags per call.
3. **`fa-icons`** (sibling checkout, `~/Projects/fa-icons`): put the files in `svg/icons`,
   `svg/flags` or `svg/logos`, then run `npm run check`, `npm test` and `npm run preview`
   (http://localhost:4310, every component with size, color and dark controls). A new
   brand-colored logo goes in `keepColors`, a name that clashes with an export in
   `componentNames` (`scripts/config.mjs`). Release: `npm version minor` (major when an asset is
   renamed or removed), then `git push --follow-tags`.
4. **This repo**: change the tag in `package.json` (`"fa-icons": "github:m-kolovrat/fa-icons#vX.Y.Z"`),
   run `npm install --legacy-peer-deps`, check the stories that use the asset, and `npm test`.
   Removed or renamed assets are breaking changes: update every import in the same PR.

## Form Handling

- Form fields (`Input`, `Select`, `Checkbox`, `TextArea`, …) take `label`, `hint`, `isRequired`, `isInvalid` and `isDisabled`.
- `Form` (`components/base/form/form.tsx`) wraps React Aria's form; `HookForm` / `FormField` (`hook-form.tsx`) connect fields to `react-hook-form`.

## Animation and Interactions

### Animation Libraries

- `motion` (Framer Motion) for complex animations
- `tailwindcss-animate` for utility-based animations
- CSS transitions for simple state changes

### CSS Transitions

**Hover and other state changes are instant — no duration, no easing.** Use the bare utility:

```typescript
className = "transition";
```

This isn't an omission. `--default-transition-duration` / `--default-transition-timing-function`
in `styles/theme.css` resolve it to `0ms linear`, so every hover in the library lands with no
fade — which reads as more responsive than a delay does. Retiming every hover at once is a
one-line change to those two tokens; don't add `duration-*`/`ease-*` back at a call site to
"fix" a hover — that's the 53-site duplication this convention replaced.

**The `--transition-duration-*` / `--ease-*` scale is for movement and overlays only — never
hover.** Reach for it when the transition _is_ the state change, not decoration: a sliding
toggle knob, a modal or popover entering/exiting. See **Foundations → Motion** in Storybook for
the scale, the shared overlay presets (popover / modal / drawer), and why. `TOKENS.md` §8 covers
where these tokens live relative to the Figma-synced ones.

### Loading States

- `Button` and `InputFile` take `isLoading` (spinner; the control is non-interactive while loading).
- For standalone spinners use `LoadingIndicator` (`components/application/loading-indicator`).

### Disabled states

Most components use `opacity-50` for disabled states instead of individual disabled color tokens:

```typescript
// Default (v8) — used by inputs, checkboxes, etc.
"disabled:cursor-not-allowed disabled:opacity-50";
```

**Exceptions — `Button`, `ButtonGroup`, `RadioCard` and `PinInput`** match Figma exactly (RadioCard: `bg-disabled_subtle` fill and `ring-disabled` border; PinInput digit boxes: the same fill and border with `fg-disabled_subtle` digits). `Button` and `ButtonGroup` (ButtonGroup: `bg-disabled_subtle` fill, `text-disabled` text, `fg-disabled_subtle` icons/dots, unchanged border). `Button` uses the neutral disabled tokens
(`bg-disabled_subtle`, `border-disabled_subtle`, `fg-disabled`), not `opacity-50`. Disabled text and icon
are both `fg-disabled`. Primary and secondary disabled (destructive too) use the `bg-disabled_subtle` fill;
secondary also keeps a `border-disabled_subtle`, primary is fill-only (no border). No disabled shadows.
Shared text/icon greying lives in `common.root`; per-hierarchy fill/border in each color variant.
The disabled tokens are defined in `styles/theme.css` (bound to the `neutral` ramp at Figma's Gray
step numbers, light + dark). See `components/base/buttons/button.tsx`. If you convert other
components to Figma-accurate disabled states, reuse those same tokens rather than re-introducing
per-component greys.

## Common Patterns

### Compound Components

```typescript
const Select = SelectComponent as typeof SelectComponent & {
    Item: typeof SelectItem;
    ComboBox: typeof ComboBox;
};
Select.Item = SelectItem;
Select.ComboBox = ComboBox;
```

### Conditional Rendering

```typescript
{label && <Label isRequired={isRequired}>{label}</Label>}
{hint && <HintText isInvalid={isInvalid}>{hint}</HintText>}
```

## State Management

- Use React Aria's built-in state management (selection, open/close, focus).
- Local state for component-specific data; context for state shared by a compound component (e.g. `SelectContext`, the radio group size context).
- There are no app-level providers in this repo. Theming is the `.dark-mode` class.

## Key Files and Utilities

- `utils/cx.ts` - `cx()` (tailwind-merge) and `sortCx()`
- `utils/is-react-component.ts` - Component type checking
- `hooks/` - `useBreakpoint`, `useClipboard`, `useResizeObserver`, `useActiveItem`
- `styles/theme.css` - All design tokens (colors, radius, spacing, type, motion), light + dark
- `styles/globals.css` - Global styles and the `dark` variant
- `styles/typography.css` - Typography styles
- `tokens/figma-tokens.json` + `scripts/check-token-parity.mjs` - Figma token extract and its parity check

## Figma Parity

The code is kept in sync with the Figma file "Fa Design System". Known gaps are tracked in
[`docs/figma-parity.md`](docs/figma-parity.md): components named differently, things missing on
either side, partial builds, variant differences and settled decisions.

- **Before working on a component**, check it in `docs/figma-parity.md`. If it's listed, point out
  the gap and the suggested action to the user before starting.
- **When Figma and code disagree** on which sizes, variants, states or components exist, report it
  and let the user decide. Don't map, delete or add variants on your own.
- **When a gap is closed or a new one is found**, update `docs/figma-parity.md` in the same change,
  including the "Last verified" date.

### Style overrides

Restyling a library component for one context (a different fill, border or text color) is an
override, tracked in [`docs/overrides.md`](docs/overrides.md), not in the parity doc. Keep each one
in a single place on each side: a `_` sub-component in Figma that wraps the library component, and
one config or wrapper in code (e.g. `siteBrands[brand].search`). Never repeat it on instances or
call sites. When a second place needs the same restyle, propose a real variant instead.

### Figma first: custom components and assets

- **Custom components** (e.g. a card header): the main component is designed in Figma first, then
  recreated in code from it. Don't invent a new component in code without its Figma frame.
- **Logos and country flags** come from the [`fa-icons`](https://github.com/m-kolovrat/fa-icons)
  package, which is built from SVGs exported from the Figma file (no runtime loading from external
  URLs). Single-color logos use `currentColor`, so the page decides the color with a `text-*`
  class; only logos with fixed brand colors keep their fills. Import them from `"fa-icons"`:
  `<FaLargeLogo />`, `<Flag name="argentina-ars" />` (flags are named exactly as in Figma, 20×20).
  To add or change one, follow "Adding or updating icons, flags and logos" under Icon Usage.
  Storybook shows them under Foundations → Flags / Logos.

## Best Practices for AI Assistance

### When Adding New Components

1. Follow the existing component structure
2. Use React Aria Components as foundation
3. Implement proper TypeScript types
4. Add only the sizes and colors the Figma component has
5. Include accessibility features
6. Follow the naming conventions
7. Add components to appropriate folders (`base/`, `application/`, etc.)
8. Add a `.story.tsx` (and `.demo.tsx` if useful); restart Storybook so Tailwind sees the new file
9. Check `docs/figma-parity.md`, and update it if the component closes or opens a gap
10. Add its page to `skills/fa-design-system/references/components/` (copy the structure of
    `button.md`) and list it in the component index of `skills/fa-design-system/SKILL.md`
11. Run `npm test` and check the stories in Storybook (light, dark, mobile width) before committing
