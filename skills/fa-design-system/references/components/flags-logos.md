# Flags and logos

Round country flags and the Hegnar Media publication logos, from the `fa-icons` package (built
from the Figma file, never from SVGs in this repo). Payment and social icons live in
`components/foundations`. Figma: Misc icons → Flag (`17201-14733`), Misc icons → Logos (`17204-1131`).

```ts
import { FaLargeLogo, Flag, type FlagName, KapitalLargeLogo, MotorLogo, NorwayNokFlag, flags } from "fa-icons";
import { MastercardIcon, VisaIcon } from "@/components/foundations/payment-icons";
import { Facebook, Instagram, LinkedIn, X } from "@/components/foundations/social-icons";
```

## Use when

- **Flag**: next to a currency, market or index (`NOK`, `USD`, Nasdaq), in a currency select or a
  `BadgeWithFlag`. 59 flags, named `<country>-<currency>` as in Figma, plus `globe`.
- **Logos**: the publication mark in a header, footer, newsletter or partner block: `FaLargeLogo` /
  `FaSmallLogo`, `KapitalLargeLogo` / `KapitalSmallLogo`, `MotorLogo`, `HegnarLogo` and the Hegnar
  sub-brands, `InteriorMagasinetLogo`, the Kapital lists (`KapitalList400Logo`, …),
  `PinpointLogo`, `VippsLargeLogo` / `VippsSmallLogo`, `FaBokLogo`.
- **Payment icons**: the card or wallet in a payment method row (`RadioCard type="payment"`,
  `PaymentInput`). 34×24 card-shaped, fixed brand colors.
- **Social icons**: links to the publication's profiles (the site footer uses `Facebook`,
  `Instagram`, `LinkedIn`, `TikTok`, `X`). 22 platforms, `size` prop (default 24).

## Use something else when

- The site header or footer logo: pass `brand` to `SiteHeader` / `SiteFooter`; they pick the logo
  from `siteBrands`.
- "Sign in with Google/Apple": `SocialButton` (see [button](button.md)).
- A generic UI icon: an `fa-icons` icon (`FlagIcon` is the flag _icon_, `Flag` is the country lookup).

## Rules

- **flags-by-name** MUST Use `<Flag name="norway-nok" />` with a `FlagName` when the country comes
  from data, or the named export (`NorwayNokFlag`) when it's fixed. Check the name exists in `flags`;
  there is no Croatia flag on purpose, and Hong Kong / Taiwan have flags but no entry in
  `utils/countries.tsx`.
- **flags-size** SHOULD Size flags with `size-4` (in badges, 16px) or `size-5` (20px, the Figma
  frame); `size-6` in lists.
- **flags-label** MUST Keep the country or currency as visible text next to the flag. If the flag
  stands alone, pass `aria-hidden={false}` and `aria-label="Norge"`. Because flags are
  `aria-hidden` by default.
- **logos-current-color** MUST Color single-color logos with a `text-*` class (`text-fg-primary`,
  `text-white` on a brand surface); they use `currentColor`. Never recolor the fixed-color logos
  (Pinpoint, Vipps, the four `KapitalList*`, the orange accent of `HegnarBokLogo`).
- **logos-size** MUST Size logos by height with auto width (`className="h-6 w-auto"`). Because
  they keep their Figma aspect ratio.
- **logos-name** MUST Give a logo used as the home link an accessible name (`aria-label="Finansavisen
– til forsiden"` on the link). Because the SVG itself is hidden.
- **assets-from-figma** NEVER Paste an SVG, add a flag or logo component in this repo, or load one
  from a URL. Because new assets are drawn in Figma, exported to `fa-icons` and released there
  (see `CLAUDE.md` → Adding or updating icons, flags and logos).
- **payment-icons-label** SHOULD Pair a payment icon with its name in text ("Visa •••• 4242"); the
  icons have no title or `aria-hidden`, so add `aria-hidden` when the name is printed.

## Props

| Component            | Props                                                   |
| :------------------- | :------------------------------------------------------ |
| `Flag`               | `name: FlagName` (required), SVG props (`className`)    |
| `<Name>Flag`, icons  | `size` (default 20), SVG props                          |
| `<Name>Logo`         | SVG props; Figma width and height by default            |
| Payment `<Name>Icon` | SVG props (34×24 by default)                            |
| Social icons         | `size` (default 24), SVG props; most are `currentColor` |

## Example

```tsx
<div className="flex items-center gap-2">
    <Flag name="norway-nok" className="size-5" />
    <span className="text-sm font-medium text-primary">NOK</span>
    <span className="text-sm text-tertiary tabular-nums">10,84 per USD</span>
</div>

<a href="/" aria-label="Kapital – til forsiden" className="rounded-xs outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2">
    <KapitalLargeLogo className="h-7 w-auto text-fg-primary" />
</a>

<div className="flex items-center gap-3">
    <VisaIcon aria-hidden />
    <span className="text-sm text-secondary">Visa •••• 4242</span>
</div>
```

## Figma parity

Payment icons: code has 57 brands, Figma 39 (code adds Afterpay, Venmo, Zelle, Revolut, …). Social
icons: Figma has 34 platforms in brand and gray styles, code 22 (no Framer, Notion, PayPal, Slack,
Spotify, Stripe, Twitch, Webflow, WhatsApp, Wise). Don't draw the missing ones; report the gap.

## See also

Storybook: Foundations / Flags, Foundations / Logos, Foundations / Payment Icons. Related:
[badge](badge.md) (`BadgeWithFlag`), [select](select.md), [radio](radio.md),
[site-header](site-header.md), [site-footer](site-footer.md).
