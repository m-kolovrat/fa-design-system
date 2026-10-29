# Tokens

The closed list. Use a token through its Tailwind class; never a hex value, a Tailwind palette color
(`gray-500`) or a primitive ramp step (`brand-700`) (rule 7 in `SKILL.md`). Source:
`styles/theme.css`, synced from the Figma file (see `TOKENS.md` in the library repo). All color
tokens switch for dark mode (`.dark-mode`) on their own.

How the class is spelled: text colors are `text-<name>` (`text-primary`), backgrounds
`bg-<name>` (`bg-primary`), borders `border-<name>` and also `ring-<name>` / `outline-<name>`
(`border-secondary`, `ring-primary`). Foreground tokens are used with any prefix:
`text-fg-quaternary`, `bg-fg-brand-primary`, `stroke-fg-tertiary`.

Grouped rows: `text-tertiary` (+ `_hover`, `_on-brand`) lists `text-tertiary`, `text-tertiary_hover`
and `text-tertiary_on-brand`; `bg-error-primary` / `-secondary` lists both. `_hover` is the hover
shade, `_on-brand` the same role on a brand or dark card, `_subtle` a lighter step, `-solid` the
filled dark version, `_alt` a twin that swaps to another token in dark mode.

## Text Color

| Name                                       | Use                                           |
| :----------------------------------------- | :-------------------------------------------- |
| `text-primary` (+ `_on-brand`)             | Headlines, page titles, table figures         |
| `text-secondary` (+ `_hover`, `_on-brand`) | Labels, table header text, section headings   |
| `text-tertiary` (+ `_hover`, `_on-brand`)  | Excerpts, article lead, supporting text       |
| `text-quaternary` (+ `_on-brand`)          | Faintest text: footer column headings         |
| `text-white`                               | White in both themes (text on a photo)        |
| `text-placeholder` (+ `_subtle`)           | Placeholders; `_subtle` for a secondary field |
| `text-disabled`                            | Disabled inputs and ButtonGroup items         |
| `text-brand-primary`                       | Brand-colored headings                        |
| `text-brand-secondary` (+ `_hover`)        | Link buttons, accented subheadings            |
| `text-brand-tertiary` (+ `_alt`)           | Lighter brand accent (metric card figures)    |
| `text-error-primary`                       | Field errors, a negative change figure        |
| `text-warning-primary`                     | Warning text in alerts                        |
| `text-success-primary`                     | Success text, a positive change figure        |

## Border Color

| Name                            | Use                                              |
| :------------------------------ | :----------------------------------------------- |
| `border-primary`                | Inputs, button groups, checkboxes                |
| `border-secondary` (+ `_alt`)   | Card and row borders; `_alt` on floating menus   |
| `border-tertiary`               | Faint dividers, chart axis lines                 |
| `border-brand` (+ `_alt`)       | Focused input; `_alt` turns gray in dark mode    |
| `border-error` (+ `_subtle`)    | Invalid input border                             |
| `border-disabled` (+ `_subtle`) | Disabled RadioCard and input (`_subtle`: Button) |

## Foreground Color

| Name                                | Use                                                |
| :---------------------------------- | :------------------------------------------------- |
| `fg-primary`                        | Highest contrast icons                             |
| `fg-secondary` (+ `_hover`)         | Icons beside primary text                          |
| `fg-tertiary` (+ `_hover`)          | Icons beside secondary text                        |
| `fg-quaternary` (+ `_hover`)        | Input, button and help icons; the most used        |
| `fg-white`                          | White icons in both themes                         |
| `fg-brand-primary` (+ `_alt`)       | Brand icons, progress bar; `_alt` gray in dark     |
| `fg-brand-secondary` (+ `_alt`)     | Brand arrows and accents; `_alt` gray in dark      |
| `fg-error-primary` / `-secondary`   | Error FeaturedIcon / ticker-bar down arrow         |
| `fg-warning-primary` / `-secondary` | Warning FeaturedIcon / warning icon in text        |
| `fg-success-primary` / `-secondary` | Success FeaturedIcon / ticker-bar up arrow, dots   |
| `fg-disabled` (+ `_subtle`)         | Disabled Button; `_subtle` ButtonGroup icons, dots |

## Background Color

| Name                                           | Use                                                         |
| :--------------------------------------------- | :---------------------------------------------------------- |
| `bg-primary` (+ `_alt`, `_hover`)              | White; `_alt` is the card; `_hover` menu item hover         |
| `bg-primary-solid`                             | Dark fill: tooltips, emphasis card                          |
| `bg-secondary` (+ `_alt`, `_hover`, `_subtle`) | Gray surface, row hover; `_alt` is the page                 |
| `bg-secondary-solid`                           | Dark gray fill (gray FeaturedIcon)                          |
| `bg-tertiary`                                  | Inset inside a card, toggle track                           |
| `bg-quaternary`                                | Slider and progress tracks, chart grid                      |
| `bg-active`                                    | Selected menu item or table row                             |
| `bg-overlay`                                   | Modal scrim (owned by the component)                        |
| `bg-brand-primary` (+ `_alt`)                  | Light brand tint; `_alt` selected chip, active tab          |
| `bg-brand-secondary`                           | Brand FeaturedIcon, brand badge                             |
| `bg-brand-solid` (+ `_hover`)                  | Primary button, toggle on, emphasis card                    |
| `bg-brand-section` (+ `_subtle`)               | Full-width brand band (newsletter, subscribe CTA)           |
| `bg-error-primary` / `-secondary`              | Error alert and badge fill / error FeaturedIcon             |
| `bg-error-solid` (+ `_hover`)                  | Destructive button, negative metric                         |
| `bg-warning-primary` / `-secondary`            | Warning alert and badge fill / FeaturedIcon                 |
| `bg-warning-solid`                             | Solid warning fill                                          |
| `bg-success-primary` / `-secondary`            | Success alert and badge fill / FeaturedIcon                 |
| `bg-success-solid`                             | Solid success fill, positive metric                         |
| `bg-disabled` (+ `_subtle`)                    | Disabled Button; `_subtle` ButtonGroup, RadioCard, PinInput |

## Focus ring

- `outline-focus-ring` / `ring-focus-ring`: the brand focus color. Pattern:
  `outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2`.
- `focus-ring-error`: the focus color on invalid fields.

## Utility colors (badges, featured icons, charts)

`utility-<color>-<step>` for `gray`, `brand`, `error`, `warning`, `success`, `blue-light`, `purple`,
`pink`, `orange-dark`. They exist for components with a color prop (Badge, FeaturedIcon, charts).
In page code, prefer a component's `color` prop over these classes.

## Alpha (see-through fills)

For a see-through fill use `alpha-white` or `alpha-black` with an opacity modifier
(`bg-alpha-white/90`, `bg-alpha-black/20`), never `bg-white/50` or `bg-black/20`. The step is the
Figma variable's number (`alpha-white-90` → `bg-alpha-white/90`).

- `alpha-white`: white in light mode, the dark surface color in dark mode. A see-through
  **surface**: a control on a photo (carousel arrows, a play button).
- `alpha-black`: black in light mode, white in dark mode. A see-through **contrast** layer: a
  darkening wash over an image.
- Steps in use in the library: `alpha-white/30`, `/50`, `/90`, `alpha-black/20`.
- The scrim behind a modal is `bg-overlay` and belongs to the component; don't add your own.

## Type

Font: Inter (`font-body`, `font-display`); `font-mono` only for code. Figures that must align use
`tabular-nums`.

| Class                      | Use (from the live pages)                                                            |
| :------------------------- | :----------------------------------------------------------------------------------- |
| `text-xs font-medium`      | Meta (time, source, "Publisert …"), badges, table header labels; the most used       |
| `text-sm`                  | Table cells, excerpts, list rows                                                     |
| `text-md`                  | Text in cards and widgets; `font-bold` for small teaser headlines                    |
| `text-lg font-semibold`    | Card titles (`CardHeader`) ("Vinnere", "Mest omsatte")                               |
| `text-lg`                  | Live article body (18/30); the `prose` class sets 16/24: keep `prose`, report it     |
| `text-xl`                  | Section titles ("Mest lest"), article subheadings (`font-bold`)                      |
| `text-display-xs` – `-sm`  | Page titles, key figures, article lead (`text-display-xs font-medium text-tertiary`) |
| `text-display-md` – `-2xl` | Front-page and article headlines                                                     |

The live site sets `text-lg` and `text-xl` on a 24 px line height, uses headline sizes between the
display steps (44, 62, 68 px) and a serif italic (Merriweather) for opinion headlines; none has a
token. Open questions for the design owner: use the nearest token and mention it, don't add
arbitrary sizes or a font.

Uppercase only for tickers (`EQNR`). Everything else, table header labels included, is sentence case.

Weights: `font-normal`, `font-medium` (meta, labels), `font-semibold` (titles, buttons),
`font-bold` (headlines). Running article text uses the `prose` class (`styles/typography.css`).

## Radius

`rounded-xxs` 2px · `rounded-xs` 4px · `rounded-sm` 6px · `rounded-md` 8px · `rounded-lg` 10px ·
`rounded-xl` 12px · `rounded-2xl` 16px · `rounded-3xl` 20px · `rounded-4xl` 24px · `rounded-full`.

## Shadow

`shadow-xs` · `shadow-sm` · `shadow-md` · `shadow-lg` · `shadow-xl` · `shadow-2xl` · `shadow-3xl`,
plus `shadow-xs-skeuomorphic` / `shadow-skeuomorphic` (used inside buttons and inputs). No colored
shadows.

## Spacing and layout

- Spacing: Tailwind's numeric scale on a 4px base (`p-2` = 8px), the same values as Figma's
  `spacing-*`. An arbitrary value such as `p-[13px]` only to match a Figma measurement that has no
  step.
- Page gutter: `px-4 md:px-8` (16 px on mobile, 32 px from `md`); cards keep their radius on
  mobile. Page widths: 1376, 1280 (`max-w-container`) and 980 px, see "Page width" in
  `page-patterns.md`. Gap between cards: `gap-6` (24 px).
- Breakpoints: Tailwind's (`sm` 640, `md` 768, `lg` 1024, `xl` 1280, `2xl` 1536) plus `xxs` 320 and
  `xs` 600. The site header and footer switch layout at `md` (tablet) and `lg` (desktop).

## Motion

- Hover and other color changes: bare `transition`, which resolves to 0ms. Never add
  `duration-*` / `ease-*` to a hover.
- Movement and overlays only: `duration-fast` 100ms · `duration-moderate` 150ms · `duration-slow`
  200ms · `duration-slower` 300ms, with `ease-out`, `ease-in-out` or `ease-drawer`. Respect
  `motion-reduce:`.
