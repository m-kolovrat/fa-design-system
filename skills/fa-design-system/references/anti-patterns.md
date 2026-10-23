# Anti-patterns

Habits of generated UI that don't belong in Fa pages. Each rule has the same format as the global
rules in `SKILL.md`.

Every rule here must be backed by the library (its code, Figma, `CLAUDE.md` conventions) or by
the live Finansavisen pages. A rule that contradicts what a library component already does is
wrong: the component wins. Taste rules not yet checked against the live pages are under
[Provisional](#provisional); treat them as SHOULD, and follow the page when it shows otherwise.

## Styling

- **anti-hand-built** NEVER Rebuild a button, input, select, modal, dropdown, tooltip or tab bar
  from `div`s and classes. Because the library version has the keyboard behavior, focus ring and
  states; a copy has none of them.
    - Wrong: `<div onClick={open} className="cursor-pointer rounded-md border px-3 py-2">Velg</div>`
- **anti-palette-colors** NEVER Use Tailwind's palette (`gray-*`, `slate-*`, `blue-*`, `red-*`,
  `green-*`) or `white` / `black` for text and surfaces. Use `text-primary`, `bg-primary`,
  `text-white` only where the design is white in both modes. Because palette colors don't switch in
  dark mode.
    - Wrong: `<div className="bg-white text-gray-900">`
- **anti-dark-variant** NEVER Fix a dark-mode color with `dark:`. Pick the semantic token that
  already switches. Because a `dark:` override is a second source of truth for the same color.
    - Wrong: `<p className="text-gray-700 dark:text-gray-300">`
- **anti-classname-restyle** NEVER Change a library component's fill, border, text color or size
  through `className`. Use its `color` / `size` props, or report a missing variant. Because the
  restyle is an untracked override (see `docs/overrides.md`).
    - Wrong: `<Badge className="bg-blue-100 text-blue-700">Ny</Badge>`
- **anti-arbitrary-values** SHOULD Avoid arbitrary values (`p-[13px]`, `text-[15px]`,
  `rounded-[9px]`) when a scale step exists. Because values off the scale drift from Figma's
  variables.
- **anti-hover-fade** NEVER Add `duration-*`, `ease-*` or `transition-all` to hover states.
  Because hover is instant by design.
    - Wrong: `className="transition-all duration-300 hover:bg-primary_hover"`

## Effects

- **anti-invented-effects** NEVER Add a gradient, blur, shadow or background effect that no library
  component or Figma frame has. Effects that come with a component stay as they are (the blurred
  overlay behind `Modal` and `PromptModal`, the blur on carousel arrows and pagination dots).
  Because effects are part of the design system; one invented at a call site has no Figma source.
    - Wrong: `<section className="bg-gradient-to-br from-brand-500 to-purple-500">`

## Content

- **anti-placeholder-data** NEVER Use Lorem ipsum, "John Doe", "Company Inc." or `$1,234.56`.
  Use believable Norwegian names, Oslo Børs tickers, NOK with Norwegian formatting
  (`1 234,50 kr`, `+2,4 %`) and dates near today. Because Finansavisen content is long
  Norwegian headlines, company names and figures; shorter or English sample text hides wrapping and
  number alignment problems.
- **anti-untitled-examples** NEVER Copy Untitled UI sample content (`olivia@untitledui.com`,
  "Olivia Rhye", Untitled logos). Because it reads as a template, not Finansavisen.

## Behavior

- **anti-unmounted-overlay** MUST Open `Modal`, `PromptModal` and `SlideoutMenu` through their
  `.Trigger` or by passing `isOpen` / `onOpenChange`, and keep them rendered. Wrapping them in
  `{open && …}` is wrong. Because React Aria plays the closing animation and returns focus to the
  trigger only while the component is still in the tree.
- **anti-div-buttons** NEVER Put `onClick` on a `div` or `span`. Use `Button`, `ButtonUtility` or an
  `AriaButton`. Because a `div` isn't focusable and has no keyboard activation.

## Layout

- **anti-nested-cards** SHOULD Inside a card, group content with an inset (`rounded-xl
bg-tertiary`, no border, see `layout.md`), not with another bordered card. Because that's how the live
  pages nest (the earning-call tiles on Rapporter), and two white bordered boxes blur together.

## Provisional

Not confirmed by the live pages yet. Treat each as SHOULD; when a page or Figma frame does it, the
page wins. Evidence for every decision is in `docs/agents/page-analysis.md` in the library repo.

- **anti-scroll-reveal** SHOULD Don't fade or slide content in as it scrolls into view.
- **anti-emoji** SHOULD No emoji in copy, buttons or as icons; use `fa-icons`. The forum's category
  markers (🏥 Helse, ⚓ Shipping) are the one existing use; don't extend it.
- **anti-hype** SHOULD No marketing filler ("sømløst", "lynrask", invented urgency); state what
  happens, as the live copy does ("Lag din egen watchlist – helt gratis").
