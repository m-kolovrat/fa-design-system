# Shared assets

Decorative pieces for marketing, onboarding and account pages: a faint geometric backdrop
(`BackgroundPattern`), a line drawing with an icon badge (`Illustration`), a scannable code with
brand corner handles (`QRCode`, with `GradientScan`), a phone frame around a screenshot
(`IPhoneMockup`) and a hairline between page sections at the container width (`SectionDivider`).
They add depth, not information. Not for data pages: quote lists, portfolios, tables and article
feeds get their structure from cards, headers and borders. Figma: none has a local main component
(see Figma parity).

```ts
import { BackgroundPattern } from "fa-design-system/components/shared-assets/background-patterns";
import { Illustration } from "fa-design-system/components/shared-assets/illustrations";
import { IPhoneMockup } from "fa-design-system/components/shared-assets/iphone-mockup";
import { GradientScan, QRCode } from "fa-design-system/components/shared-assets/qr-code";
import { SectionDivider } from "fa-design-system/components/shared-assets/section-divider";
```

## Use when

- A landing, campaign or subscription page (Abonner, app download, Kapital 500) needs a hero or
  call to action with depth: `BackgroundPattern` behind the heading or a featured icon.
- An onboarding or upload step with nothing to show yet needs a picture: `Illustration` (`box` for
  an empty folder or upload, `cloud` for search, `documents` for files, `credit-card` for payment).
- Sending a desktop reader to the app: `QRCode` next to a visible link or app store button.
- Showing the Finansavisen app itself: `IPhoneMockup` around a 750 × 1624 screenshot, with a dark
  screenshot for dark mode.
- Separating marketing sections on a page: `SectionDivider`.

## Use something else when

- Nothing to show in a list, table or search: `EmptyState` / `ErrorState`. They draw a featured
  icon, not an illustration; the Figma states have no illustration.
- A hairline inside a card, list or form: `border-t border-secondary` on the element, or the
  component's own divider (`CardHeader`).
- Dividers between sidebar navigation sections: `SidebarNavigationSectionDividers` (see
  [app-navigation](app-navigation.md)).
- An icon on a tinted shape: `FeaturedIcon`. A person or company: `Avatar`.
- A play control over a video poster: `PlayButtonIcon` (see [dot-icon](dot-icon.md)).
- A photo, logo or chart: `<img>`, `fa-icons` logos, `Charts`.

## Rules

- **shared-assets-marketing-only** MUST Use these on marketing, onboarding and account pages
  (landing, Abonner, app download, "Velkommen"), never on data pages (quotes, portfolios, tables,
  article lists). Because they decorate; the data pages' Figma frames have none of them.
- **shared-assets-pattern-behind** MUST Position `BackgroundPattern` absolutely (`absolute -z-10`,
  centered with `top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`) inside a
  `relative isolate overflow-hidden` parent. Because it renders at a fixed pixel size (336–960 px)
  and would push layout otherwise; `isolate` keeps `-z-10` above the parent's own background. It's
  `pointer-events-none`, so it never blocks clicks.
- **shared-assets-pattern-size** MUST Use `size="lg"` only with `circle`, `square` and `grid`.
  Because `grid-check` has `sm` and `md` only; `lg` has no drawing and throws at render.
- **shared-assets-pattern-color** SHOULD Recolor `circle`, `square` and `grid` only with a text
  token in `className` (`text-border-primary`, `text-fg-brand-secondary`), and leave `grid-check`
  as it is. Because the first three draw with `currentColor` (default `text-border-secondary`) and
  fade out towards the edges; `grid-check` has fixed light-gray fills that don't follow dark mode.
- **shared-assets-illustration-icon** SHOULD Pass a `fa-icons` component as `children` that matches
  the message (`<Upload className="size-7" />`, `<Search />`, `<Alert />`), or `children={null}`
  for no badge. Because the default is a generic placeholder (`Upload` for `box` and `documents`,
  `Search` for `cloud`, `Alert` for `credit-card`) on a round `bg-alpha-black/20` chip in front of
  the drawing.
- **shared-assets-illustration-text** MUST Keep the meaning in a heading and a sentence next to the
  illustration ("Ingen dokumenter ennå", "Last opp årsregnskapet for å komme i gang"). Because the
  SVG has no title and the wrapper is a plain `div`; it's decorative.
- **shared-assets-qr-text** MUST Show the destination as text next to the `QRCode` ("Skann for å
  laste ned Finansavisen-appen" and the URL or an app store button). Because the generated SVG has
  no accessible name, `QRCode` forwards only `className`, and a reader on a phone can't scan their
  own screen.
- **shared-assets-qr-stable-props** MUST Keep `value` and `options` stable (a constant, or
  `useMemo`), never an inline object literal. Because the component builds and appends a new code
  whenever `value`, `size` or `options` change identity, without removing the previous one.
- **shared-assets-qr-contrast** SHOULD Leave the dots black on white and use `options` only for a
  centre logo (`image`) or a corner shape. Because contrast is what makes the code scan; the brand
  color is already in the corner handles the component draws (`border-brand_alt`).
- **shared-assets-gradient-scan** SHOULD Place `GradientScan` after the `QRCode` in a `relative`
  wrapper, once per block. Because it's an absolutely positioned overlay on the bottom half of its
  parent (brand tint with a radial fade and a `border-brand` top line) that reads as "scanning".
- **shared-assets-mockup-image** MUST Pass `image` (and `imageDark` when the screenshot has a dark
  version) as a 750 × 1624 px screenshot of the screen only, without the device status bar. Because
  the SVG scales the image by exactly 1/750 × 1/1624 and draws its own status bar and home
  indicator; other proportions stretch.
- **shared-assets-mockup-theme** SHOULD Omit `theme` so the status bar follows `.dark-mode`; set
  `theme="dark"` only when the mockup sits on a fixed dark or brand background. Because `theme`
  locks the status bar and its background to one mode.
- **shared-assets-mockup-width** SHOULD Size the mockup with `className` (`w-64 max-w-full`) rather
  than `width`/`height`. Because it's 314 px wide with `h-auto` by default and keeps its 314:640
  ratio; an explicit `height` without `width` distorts it.
- **shared-assets-divider-page-level** MUST Use `SectionDivider` only between page sections, as a
  direct child of the page, outside any padded container. Because it centers itself at
  `max-w-container` (1280 px) with `px-4 md:px-8`; inside a padded container it ends up narrower or
  doubly inset compared with its siblings.
- **shared-assets-divider-not-inside** NEVER Use `SectionDivider` inside a card, list, form or
  navigation. Because those have their own hairlines (`border-secondary`, `CardHeader`'s divider,
  the sidebar's section dividers).

## Props

### BackgroundPattern

| Prop        | Values                                                      | Default                                |
| :---------- | :---------------------------------------------------------- | :------------------------------------- |
| `pattern`   | `circle` · `square` · `grid` · `grid-check` (required)      |                                        |
| `size`      | `sm` · `md` · `lg`                                          | `lg` (`grid-check`: `md`, has no `lg`) |
| `className` | classes on the `<svg>`: color (`text-*`), position, `-z-10` |                                        |

Rendered sizes (square, px): `circle` and `grid` 336 / 480 / 768; `square` 336 / 480 / 910;
`grid-check` 960 at both `sm` (64 px cells) and `md` (96 px cells). The type extends SVG props,
but only `className` reaches the SVG; `style`, `aria-*` and other attributes are dropped. Always
`pointer-events-none`.

### Illustration

| Prop                | Values                                                                        | Default                                                                                                       |
| :------------------ | :---------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------ |
| `type`              | `box` · `cloud` · `documents` · `credit-card` (required)                      |                                                                                                               |
| `size`              | `sm` (152–161 px wide) · `md` (172–185) · `lg` (220–230)                      | `lg`                                                                                                          |
| `children`          | the icon on the round badge in front; `null` removes the badge                | `Upload` (`box`, `documents`) · `Search` (`cloud`) · `Alert` (`credit-card`); `size-6` at `sm`, else `size-7` |
| `svgClassName`      | classes on the drawing (`size-full stroke-inherit text-inherit`)              |                                                                                                               |
| `childrenClassName` | classes on the badge (`size-12 rounded-full bg-alpha-black/20 text-fg-white`) |                                                                                                               |

Plus `div` attributes (`className`, `aria-hidden`). Lines are `border-secondary_alt`, fills
`bg-secondary` / `utility-gray-200/300`, so the drawing follows dark mode.

### QRCode

| Prop        | Values                                                                                 | Default |
| :---------- | :------------------------------------------------------------------------------------- | :------ |
| `value`     | the string to encode, usually a URL (required)                                         |         |
| `size`      | `md` (96 px code, `p-2`) · `lg` (128 px, `p-3`)                                        | `md`    |
| `options`   | `Options` from `qr-code-styling`, merged over `width`, `height`, `data`, `type: "svg"` |         |
| `className` | classes on the wrapper                                                                 |         |

No other props: `QRCode` doesn't take `aria-*` or `style`. Four `border-brand_alt` corner handles
sit on the wrapper. `GradientScan` takes `div` attributes and renders `absolute bottom-0 h-1/2
w-full` inside its `relative` parent.

### IPhoneMockup

| Prop        | Values                                                   | Default              |
| :---------- | :------------------------------------------------------- | :------------------- |
| `image`     | URL of a 750 × 1624 screenshot (required)                |                      |
| `imageDark` | URL shown in `.dark-mode` instead of `image`             | `image`              |
| `theme`     | `light` · `dark`: the status bar text and its background | follows `.dark-mode` |

Plus SVG attributes (`className`, `aria-hidden`, `role`, `aria-label`). Renders a 314 × 640
viewBox, 314 px wide, `h-auto`. The bezel is a fixed dark gray; only the status bar switches.

### SectionDivider

Only `div` attributes (`className`). Draws a 1 px `bg-border-secondary` line inside
`mx-auto max-w-container px-4 md:px-8`.

## Accessibility

- All five are decorative: no roles, no accessible names. The message lives in the text next to
  them.
- `Illustration`, `IPhoneMockup` and `SectionDivider` accept `aria-hidden`. `BackgroundPattern`
  drops it (a title-less SVG with no role is skipped anyway); `QRCode` has no way to take one, so
  the link text beside it is the accessible version.
- When the phone screenshot carries content a reader needs, describe it: `role="img"` and
  `aria-label="Forsiden i Finansavisen-appen"` on `IPhoneMockup`.

## Example

```tsx
<section className="relative isolate overflow-hidden bg-primary px-4 py-16 md:px-8">
    <BackgroundPattern pattern="circle" size="lg" className="absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2" />
    <div className="mx-auto grid max-w-container items-center gap-12 md:grid-cols-2">
        <div className="flex flex-col gap-6">
            <h2 className="text-display-sm font-semibold text-primary">Finansavisen i lomma</h2>
            <p className="text-lg text-tertiary">Kurser, nyheter og varsler fra Oslo Børs, så fort de skjer.</p>
            <div className="flex items-center gap-4">
                <div className="relative w-fit">
                    <QRCode value={APP_URL} size="lg" />
                    <GradientScan />
                </div>
                <p className="text-sm text-secondary">
                    Skann for å laste ned appen, eller gå til <a href={APP_URL} className="font-medium text-brand-secondary">finansavisen.no/app</a>
                </p>
            </div>
        </div>
        <IPhoneMockup image="/images/app-forside-lys.png" imageDark="/images/app-forside-mork.png" className="mx-auto w-64 max-w-full" aria-hidden />
    </div>
</section>

<SectionDivider />

<div className="flex flex-col items-center gap-4 py-12 text-center">
    <Illustration type="documents" size="md" aria-hidden>
        <Upload className="size-7" />
    </Illustration>
    <h3 className="text-lg font-semibold text-primary">Ingen dokumenter ennå</h3>
    <p className="text-sm text-tertiary">Last opp årsregnskapet for å komme i gang.</p>
</div>
```

`APP_URL` is a constant (`const APP_URL = "https://www.finansavisen.no/app";`) so the QR code is
built once; `Upload` comes from `fa-icons`.

## Figma parity

None of the five has a local main component in the Figma file; `docs/figma-parity.md` §3 lists
them as code-only. Illustrations: "Nothing in code uses them; the new Figma states use a featured
icon instead" (add to Figma, or remove from code). Background patterns: Figma uses a pattern from
another library with no local main component (add to Figma). QR code, iPhone mockup and section
divider: small marketing helpers (accept as code-only, or remove). Use them only when the brief
asks for them, and say in your reply that the Figma frame has no component for it.

## See also

Storybook: not shown in Storybook yet. Related: [featured-icon](featured-icon.md),
[empty-state](empty-state.md), [dot-icon](dot-icon.md), [app-navigation](app-navigation.md);
page widths in "Page width" of `references/page-patterns.md`.
