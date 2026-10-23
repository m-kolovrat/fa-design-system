# Site footer

The publication footer on every newspaper page: logo, publisher lines, "Kontakt oss" and social
links, link columns, the app box and the data-provider credits. Same `brand` and breakpoints as
`SiteHeader`. Figma: Footer (Type = Mobile / Tablet / Desktop, Brand).

```ts
import { SiteFooter } from "fa-design-system/components/application/site-footer/site-footer";
import type { SiteNavItem } from "fa-design-system/components/application/site-header/site-brands";
```

## Use when

- The bottom of any finansavisen.no, Kapital or Motor page, paired with `SiteHeader`.

## Use something else when

- App-style logged-in screens: no site footer; the sidebar from [app-navigation](app-navigation.md)
  carries secondary links.
- A footer bar inside a dialog or panel: `ModalFooter` / `SlideoutMenu.Footer`.

## Rules

- **site-footer-brand** MUST Use the same `brand` as the page's `SiteHeader`. NEVER recolor the
  footer with `className`. Because the surface, sunken app box, muted text and logo come from
  `siteBrands` (the header's config).
- **site-footer-app-copy** MUST Pass `appTitle` (and `appDescription`) for `kapital` and `motor`.
  Because the defaults name Finansavisen ("Bruk Finansavisen-appen", "… FA-opplevelse").
- **site-footer-links** SHOULD Pass `links` as two or three short columns (`SiteNavItem[][]`):
  services first, legal and privacy last. Because columns have no headings; grouping is the only
  structure.
- **site-footer-legal** MUST Keep publisher info, copyright and the data-provider `disclaimer`
  accurate for the publication. Because they are legal credits (Hegnar Media, Millistream, Nikkei,
  TradingView), not decoration.
- **site-footer-social** SHOULD List only platforms the publication uses, via `socialLinks`
  (`x` · `facebook` · `instagram` · `tiktok` · `linkedin`). Because the icons come with the
  component; NEVER add other icon sets for more platforms.
- **site-footer-real-hrefs** MUST Pass real `contactHref`, `appStoreHref` and `googlePlayHref`.
  Because they default to `"#"`.
- **site-footer-once** MUST Render one `SiteFooter` per page, after `<main>`. Because it renders the
  page's `<footer>` landmark and the "Bunnmeny" nav.

## Props

| Prop             | Values                                            | Default                                                |
| :--------------- | :------------------------------------------------ | :----------------------------------------------------- |
| `brand`          | `fa` · `kapital` · `motor`                        | `fa`                                                   |
| `links`          | `SiteNavItem[][]` (required)                      |                                                        |
| `publisherInfo`  | `string[]` (required), one line each              |                                                        |
| `copyright`      | string (required)                                 |                                                        |
| `disclaimer`     | ReactNode (required)                              |                                                        |
| `disclaimerHref` | string; adds "Les mer." after the disclaimer      |                                                        |
| `socialLinks`    | `{ platform, href }[]`                            | `[]`                                                   |
| `contactHref`    | string ("Kontakt oss")                            | `"#"`                                                  |
| `appTitle`       | string                                            | `"Bruk Finansavisen-appen"`                            |
| `appDescription` | string                                            | `"Få nyhetsvarsler og en personalisert FA-opplevelse"` |
| `appStoreHref`   | string                                            | `"#"`                                                  |
| `googlePlayHref` | string                                            | `"#"`                                                  |
| `appImageSrc`    | string; app screenshot, desktop only (decorative) |                                                        |
| `homeHref`       | string                                            | `"/"`                                                  |
| `className`      | layout only                                       |                                                        |

## Accessibility

- The logo link is named after the publication; social buttons are named after the platform.
- Link columns sit in a `nav` labelled "Bunnmeny". The app screenshot has empty `alt`.
- App store badges are in English (accepted, `docs/figma-parity.md` §6).

## Example

```tsx
<SiteFooter
    brand="kapital"
    links={[
        [
            { label: "eAvis", href: "/eavis" },
            { label: "Annonse", href: "/annonse" },
            { label: "Bedriftsabonnement", href: "/bedrift" },
        ],
        [
            { label: "Personvernerklæring", href: "/personvern" },
            { label: "Vilkår", href: "/vilkar" },
            { label: "Samtykkeinnstillinger", href: "/samtykke" },
        ],
    ]}
    publisherInfo={["Utgis av Hegnar Media AS", "Hoffsveien 70 A, 0214 Oslo"]}
    copyright="©2026 Hegnar Media AS"
    disclaimer="Børsdata levert av Millistream."
    disclaimerHref="/om-data"
    socialLinks={[
        { platform: "facebook", href: "https://facebook.com/kapital" },
        { platform: "instagram", href: "https://instagram.com/kapital" },
    ]}
    contactHref="/kontakt-oss"
    appTitle="Bruk Kapital-appen"
    appDescription="Les nye utgaver og arkivet der du er"
    appStoreHref="https://apps.apple.com/no/app/kapital"
    googlePlayHref="https://play.google.com/store/apps/details?id=no.kapital"
/>
```

## Figma parity

Mapped in `docs/figma-parity.md` §1; settled in §6 ("Site header and footer"): white social
buttons with gray icons, English app store badges and library button sizes are accepted
differences from production.

## See also

Storybook: Application / Site footer (Fa, Kapital, Motor). Related: [site-header](site-header.md),
[button](button.md).
