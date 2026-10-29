# Tokens

The closed list. Use a token through its Tailwind class; never a hex value, a Tailwind palette color
(`gray-500`) or a primitive ramp step (`brand-700`). Source: `styles/theme.css`, synced from the
Figma file (see `TOKENS.md` in the library repo). All color tokens switch for dark mode
(`.dark-mode`) on their own.

How the class is spelled: text colors are `text-<name>` (`text-primary`), backgrounds
`bg-<name>` (`bg-primary`), borders `border-<name>` and also `ring-<name>` / `outline-<name>`
(`border-secondary`, `ring-primary`). Foreground tokens are used with any prefix:
`text-fg-quaternary`, `bg-fg-brand-primary`, `stroke-fg-tertiary`.

## Text Color

Use text color variables to manage all text fill colors in your designs across light and dark modes.

| Name                       | Usage                                                                                                                                                                |
| :------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| text-primary               | Primary text such as page headings.                                                                                                                                  |
| text-primary_on-brand      | Primary text when used on solid brand color backgrounds. Commonly used for brand theme website sections (e.g. CTA sections).                                         |
| text-secondary             | Secondary text such as labels and section headings.                                                                                                                  |
| text-secondary_hover       | Secondary text when in hover state.                                                                                                                                  |
| text-secondary_on-brand    | Secondary text when used on solid brand color backgrounds. Commonly used for brand theme website sections (e.g. CTA sections).                                       |
| text-tertiary              | Tertiary text such as supporting text and paragraph text.                                                                                                            |
| text-tertiary_hover        | Tertiary text when in hover state.                                                                                                                                   |
| text-tertiary_on-brand     | Tertiary text when used on solid brand color backgrounds. Commonly used for brand theme website sections (e.g. CTA sections).                                        |
| text-quaternary            | Quaternary text for more subtle and lower-contrast text, such as footer column headings.                                                                             |
| text-quaternary_on-brand   | Quaternary text when used on solid brand color backgrounds. Commonly used for brand theme website sections (e.g. footers).                                           |
| text-white                 | Text that is always white, regardless of the mode.                                                                                                                   |
| text-placeholder           | Default color for placeholder text such as input field placeholders. This can be changed to gray-400, but gray-500 is more accessible because it is higher contrast. |
| text-placeholder_subtle    | A lower-contrast alternative to text-placeholder for placeholder text that should recede further, such as a secondary field in a multi-part input.                   |
| text-disabled              | Default text color for disabled form elements and controls.                                                                                                          |
| text-brand-primary         | Primary brand text useful for headings (e.g. cards in pricing page headers).                                                                                         |
| text-brand-secondary       | Secondary brand text for brand buttons, as well as accented text, highlights, and subheadings (e.g. subheadings in blog post cards).                                 |
| text-brand-secondary_hover | Secondary brand text when in hover state (e.g. brand buttons).                                                                                                       |
| text-brand-tertiary        | Tertiary brand text for lighter accented text and highlights (e.g. numbers in metric cards).                                                                         |
| text-brand-tertiary_alt    | An alternative to tertiary brand text that is lighter in dark mode (e.g. numbers in metric cards).                                                                   |
| text-error-primary         | Default error state semantic text color (e.g. input field error states).                                                                                             |
| text-warning-primary       | Default warning state semantic text color.                                                                                                                           |
| text-success-primary       | Default success state semantic text color.                                                                                                                           |

## Border Color

Use border color variables to manage all stroke colors in your designs across light and dark modes. You can use the same values for `ring-` and `outline-` as well (i.e. `ring-primary` `outline-secondary`).

| Name                   | Usage                                                                                                                                                                                   |
| :--------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| border-primary         | High contrast borders. These are used for components such as input fields, button groups, and checkboxes.                                                                               |
| border-secondary       | Medium contrast borders. This is the most commonly used border color and is the default for most components (e.g. file uploaders), cards (such as tables), and content dividers.        |
| border-secondary_alt   | An alternative to secondary border that uses alpha transparency. This is used exclusively for floating menus such as input dropdowns and notifications to create sharper bottom border. |
| border-tertiary        | Low contrast borders useful for very subtle dividers and borders such as line and bar chart axis dividers.                                                                              |
| border-brand           | Default brand border color. Useful for active states in components such as input fields.                                                                                                |
| border-brand_alt       | An brand border color that switches to gray when in dark mode. Useful for components such as brand-style variants of banners and footers.                                               |
| border-error           | Default error state semantic border color. Useful for error states in components such as input fields and file uploaders.                                                               |
| border-error_subtle    | A more subtle (lower contrast) alternative for error state semantic borders such as error state input fields.                                                                           |
| border-disabled        | Border for disabled controls (e.g. disabled radio cards and inputs in Figma).                                                                                                           |
| border-disabled_subtle | Subtler disabled border (e.g. disabled secondary buttons).                                                                                                                              |

## Foreground Color

Use foreground color variables to manage all non-text foreground elements in your designs across light and dark modes. Can be used via `text-`, `bg-`, `ring-`, `outline-`, `stroke-`, `fill-`, etc.

| Name                   | Usage                                                                                                                                                         |
| :--------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| fg-primary             | Highest contrast non-text foreground elements such as icons.                                                                                                  |
| fg-secondary           | High contrast non-text foreground elements such as icons.                                                                                                     |
| fg-secondary_hover     | Secondary foreground elements when in hover state.                                                                                                            |
| fg-tertiary            | Medium contrast non-text foreground elements such as icons.                                                                                                   |
| fg-tertiary_hover      | Tertiary foreground elements when in hover state.                                                                                                             |
| fg-quaternary          | Low contrast non-text foreground elements such as icons in buttons, help icons and icons used in input fields.                                                |
| fg-quaternary_hover    | Quaternary foreground elements when in hover state, such as help icons.                                                                                       |
| fg-white               | Foreground elements that are always white, regardless of the mode.                                                                                            |
| fg-brand-primary       | Primary brand color non-text foreground elements such as featured icons and progress bars.                                                                    |
| fg-brand-primary_alt   | An alternative for primary brand color non-text foreground elements that switches to gray when in dark mode such as active horizontal tabs.                   |
| fg-brand-secondary     | Secondary brand color non-text foreground elements such as accents and arrows in marketing site sections (e.g. hero header sections).                         |
| fg-brand-secondary_alt | An alternative for secondary brand color non-text foreground elements that switches to gray when in dark mode such as brand buttons.                          |
| fg-error-primary       | Primary error state color for non-text foreground elements such as featured icons.                                                                            |
| fg-error-secondary     | Secondary error state color for non-text foreground elements such as icons in error state input fields and negative metrics item charts and icons.            |
| fg-warning-primary     | Primary warning state color for non-text foreground elements such as featured icons.                                                                          |
| fg-warning-secondary   | Secondary warning state color for non-text foreground elements.                                                                                               |
| fg-success-primary     | Primary success state color for non-text foreground elements such as featured icons.                                                                          |
| fg-success-secondary   | Secondary success state color for non-text foreground elements such as button dots, avatar online indicator dots, and positive metrics item charts and icons. |
| fg-disabled            | Disabled text and icons in buttons.                                                                                                                           |
| fg-disabled_subtle     | Subtler disabled foreground (e.g. button group icons and dots).                                                                                               |

## Background Color

Use background color variables to manage all fill colors for elements in your designs across light and dark modes.

| Name                    | Usage                                                                                                                                                                                         |
| :---------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| bg-primary              | The primary background color (white) used across all layouts and components.                                                                                                                  |
| bg-primary_alt          | An alternative primary background color (white) that switches to bg-secondary when in dark mode.                                                                                              |
| bg-primary_hover        | Primary background hover color. This acts as the default hover state background color for components with white backgrounds (e.g. input dropdown menu items).                                 |
| bg-primary-solid        | The primary dark background color used across layouts and components. This switches to bg-secondary when in dark mode and is useful for components such as tooltips and Text editor tooltips. |
| bg-secondary            | The secondary background color used to create contrast against white backgrounds, such as website section backgrounds.                                                                        |
| bg-secondary_alt        | An alternative secondary background color that switches to bg-primary when in dark mode. Useful for components such as border-style horizontal tabs.                                          |
| bg-secondary_hover      | Secondary background hover color. Useful for hover states for components with gray-50 backgrounds such as active states (e.g. navigation items and date pickers).                             |
| bg-secondary_subtle     | An alternative secondary background color that is slightly lighter and more subtle in light mode. This is useful for components such as banners.                                              |
| bg-secondary-solid      | The secondary dark background color used across layouts and components. This is useful for components such as featured icons.                                                                 |
| bg-tertiary             | The tertiary background color used to create contrast against light backgrounds such as toggles.                                                                                              |
| bg-quaternary           | The quaternary background color used to create contrast against light backgrounds, such as sliders and progress bars.                                                                         |
| bg-active               | Default active background color for components such as selected menu items in input dropdowns.                                                                                                |
| bg-overlay              | Default background color for background overlays. These are useful for overlay components such as modals.                                                                                     |
| bg-brand-primary        | The primary brand background color. Useful for components such as check icons.                                                                                                                |
| bg-brand-primary_alt    | An alternative primary brand background color that switches to bg-secondary when in dark mode. Useful for components such as active horizontal tabs.                                          |
| bg-brand-secondary      | The secondary brand background color. Useful for components such as featured icons.                                                                                                           |
| bg-brand-solid          | Default solid (dark) brand background color. Useful for components such as toggles and messages.                                                                                              |
| bg-brand-solid_hover    | Solid brand background color when in hover state. Useful for components such as toggles.                                                                                                      |
| bg-brand-section        | This is the default dark brand color background used for website sections such as CTA sections and testimonials. Switches to bg-secondary when in dark mode.                                  |
| bg-brand-section_subtle | An alternative brand section background color to provide contrast for website sections such as FAQ sections. Switches to bg-primary when in dark mode.                                        |
| bg-error-primary        | Primary error state background color for components such as buttons.                                                                                                                          |
| bg-error-secondary      | Secondary error state background color for components such as featured icons.                                                                                                                 |
| bg-error-solid          | Default solid (dark) error state background color for components such as buttons, featured icons and metric items.                                                                            |
| bg-error-solid_hover    | Default solid (dark) error hover state background color for components such as buttons.                                                                                                       |
| bg-warning-primary      | Primary warning state background color for components.                                                                                                                                        |
| bg-warning-secondary    | Secondary warning state background color for components such as featured icons.                                                                                                               |
| bg-warning-solid        | Default solid (dark) warning state background color for components such as featured icons.                                                                                                    |
| bg-success-primary      | Primary success state background color for components.                                                                                                                                        |
| bg-success-secondary    | Secondary success state background color for components such as featured icons.                                                                                                               |
| bg-success-solid        | Default solid (dark) success state background color for components such as featured icons and metric items.                                                                                   |
| bg-disabled             | Fill for disabled solid controls (e.g. disabled primary buttons).                                                                                                                             |
| bg-disabled_subtle      | Subtle disabled fill (e.g. selected + disabled button group items, disabled radio cards).                                                                                                     |

## Focus ring

- `outline-focus-ring` / `ring-focus-ring`: the brand focus color. Pattern:
  `outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2`.
- `focus-ring-error`: the focus color on invalid fields.

## Utility colors (badges, featured icons, charts)

`utility-<color>-<step>` for `gray`, `brand`, `error`, `warning`, `success`, `blue-light`, `purple`,
`pink`, `orange-dark`. They exist for components with a color prop (Badge, FeaturedIcon, charts).
In page code, prefer a component's `color` prop over these classes.

## Alpha (see-through fills)

For a see-through fill, use `alpha-white` or `alpha-black` with an opacity modifier, never
`bg-white/50` or `bg-black/20`: `bg-alpha-white/90`, `bg-alpha-black/20`. The step is the Figma
variable's number (`alpha-white-90` → `bg-alpha-white/90`).

- `alpha-white` is white in light mode and the dark surface color in dark mode: a see-through
  **surface**, such as a control sitting on a photo (carousel arrows, a play button).
- `alpha-black` is black in light mode and white in dark mode: a see-through **contrast** layer,
  such as a darkening wash over an image.
- Steps in use in the library: `alpha-white/30`, `/50`, `/90`, `alpha-black/20`.
- The scrim behind a modal is `bg-overlay`, and it belongs to the component; don't add your own.

## Type

Font: Inter (`font-body`, `font-display`); `font-mono` only for code. Figures that must align use `tabular-nums`.

| Class                      | Use (from the live pages)                                                                                       |
| :------------------------- | :-------------------------------------------------------------------------------------------------------------- |
| `text-xs font-medium`      | Meta (time, source, "Publisert …"), badges, table header labels. The most used size                             |
| `text-sm`                  | Table cells, excerpts, list rows                                                                                |
| `text-md`                  | Text in cards and widgets; `font-bold` for small teaser headlines                                               |
| `text-lg font-semibold`    | Card titles (`CardHeader`) ("Vinnere", "Mest omsatte")                                                          |
| `text-lg`                  | Live article body size (18/30); the library `prose` class sets 16/24, so keep `prose` and report the difference |
| `text-xl`                  | Section titles ("Mest lest"), article subheadings (`font-bold`)                                                 |
| `text-display-xs` – `-sm`  | Page titles, key figures, article lead (`text-display-xs font-medium text-tertiary`)                            |
| `text-display-md` – `-2xl` | Front-page and article headlines                                                                                |

The live site sets `text-lg` and `text-xl` on a 24 px line height and uses headline sizes between
the display steps (44, 62, 68 px), and opinion headlines use a serif italic (Merriweather) that has
no token. These are open questions for the design owner: use the nearest token and mention it,
don't add arbitrary sizes or a font.

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
  `layout.md`. Gap between cards: `gap-6` (24 px).
- Breakpoints: Tailwind's (`sm` 640, `md` 768, `lg` 1024, `xl` 1280, `2xl` 1536) plus `xxs` 320 and
  `xs` 600. The site header and footer switch layout at `md` (tablet) and `lg` (desktop).

## Motion

- Hover and other color changes: bare `transition`, which resolves to 0ms. Never add
  `duration-*` / `ease-*` to a hover.
- Movement and overlays only: `duration-fast` 100ms · `duration-moderate` 150ms · `duration-slow`
  200ms · `duration-slower` 300ms, with `ease-out`, `ease-in-out` or `ease-drawer`. Respect
  `motion-reduce:`.
