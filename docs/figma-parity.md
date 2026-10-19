# Figma ↔ code parity

Tracks where the code in this repo and the Figma file [Fa Design System](https://www.figma.com/design/ycDcr4jjOWyIneuxyL1xAd/Fa-Design-System) (file key `ycDcr4jjOWyIneuxyL1xAd`) don't line up: different names, things that exist on only one side, and partial builds.

**Last verified:** 2026-10-19, against the `visual-updates` branch.

**How to use it**

- Before working on a component, check it here. If it's listed, mention the gap and the suggested action before starting.
- When a gap is closed, or a new one is found, update this file in the same PR.
- Don't decide a mismatch on your own (map, delete or add variants). List the options and let the design owner choose. Then record the decision under [Decided](#6-decided-and-accepted).

---

## 1. Named differently

Same thing, different name. No action needed; use this to find the counterpart.

| Figma                                                                            | Code                                                                                          | Note                                                                                                                                                                                                           |
| -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Verification code input field                                                    | `PinInput` (`base/input/pin-input.tsx`)                                                       | Storybook calls it both "Verification code input" and "Input OTP"                                                                                                                                              |
| \_Mega input field base                                                          | `PinInput.Slot`                                                                               | The digit boxes                                                                                                                                                                                                |
| Buttons/Button close X                                                           | `CloseButton`                                                                                 |                                                                                                                                                                                                                |
| Buttons/Button utility                                                           | `ButtonUtility`                                                                               |                                                                                                                                                                                                                |
| Buttons/Button destructive                                                       | `Button` with `color="*-destructive"`                                                         | A color option in code, not a separate component                                                                                                                                                               |
| Buttons/Button loading icon                                                      | `Button isLoading`                                                                            | The standalone `LoadingIndicator` is code-only (see §3)                                                                                                                                                        |
| Checkbox (Type = Radio)                                                          | `RadioButton`                                                                                 | Figma keeps checkbox and radio in one component                                                                                                                                                                |
| Radio group / Radio group item                                                   | `RadioCardGroup` / `RadioCard` (`base/radio-buttons/radio-cards.tsx`)                         | Type: Icon simple → `icon`, Icon card → `card`, Payment icon → `payment`, Radio button → `radio`                                                                                                               |
| Horizontal tabs / Vertical tabs                                                  | `Tabs` with `orientation`                                                                     |                                                                                                                                                                                                                |
| Featured icon outline                                                            | `FeaturedIcon theme="outline"`                                                                |                                                                                                                                                                                                                |
| Select, Type = Search / Tags                                                     | `Select.ComboBox` / `TagSelect`                                                               |                                                                                                                                                                                                                |
| Help icon                                                                        | Tooltip built into `Label` and `Input` (`tooltip` prop)                                       | No standalone component in code                                                                                                                                                                                |
| Mobile app store badge                                                           | `AppStoreButton`, `GooglePlayButton`, …                                                       | One export per store                                                                                                                                                                                           |
| Carousel image + \_Carousel arrow                                                | `Carousel`                                                                                    | Figma keeps these on the Pagination page                                                                                                                                                                       |
| Star icon                                                                        | `RatingStars`                                                                                 |                                                                                                                                                                                                                |
| \_Dot                                                                            | `Dot` icon (`dot-icon.tsx`)                                                                   |                                                                                                                                                                                                                |
| Chart marker                                                                     | Chart tooltip in `charts-base`                                                                |                                                                                                                                                                                                                |
| Line and bar chart                                                               | `LineChart` / `BarChart` stories                                                              | One Figma component, separate code examples                                                                                                                                                                    |
| Date picker dropdown                                                             | `DatePicker` / `DateRangePicker`                                                              | Single / dual dates                                                                                                                                                                                            |
| \_Modal header / \_Modal actions                                                 | `ModalHeader` / `ModalActions` (`application/modals/modal.tsx`)                               | Type: Left aligned → `left`, Center aligned → `center`, Horizontal left aligned → `horizontal`; actions Vertical / Horizontal fill / Horizontal right aligned → `vertical` / `horizontal` / `horizontal-right` |
| Alert, Size = Floating / Full-width                                              | `Alert variant="floating" \| "full-width"`                                                    |                                                                                                                                                                                                                |
| Notification, Type = Primary icon / Gray icon / … / No icon / Progress indicator | `Notification type="brand" \| "gray" \| … \| "none" \| "progress"`                            |                                                                                                                                                                                                                |
| Input date / Input file / Input number / Input tags outer                        | `InputDate` / `InputFile` / `InputNumber` / `InputTagsOuter`                                  |                                                                                                                                                                                                                |
| Pagination, Type = Page default, Card minimal …, Card advanced …                 | `PaginationPageDefault`, `PaginationCardMinimal align=…`, `PaginationCardAdvanced align=…`, … | Figma "Card button group" → `PaginationButtonGroup`                                                                                                                                                            |
| Badge color "Orange"                                                             | `orange-dark`                                                                                 |                                                                                                                                                                                                                |

---

## 2. In Figma, missing in code

| Figma page     | Component                   | What Figma has                                                                                        | Suggested action                     |
| -------------- | --------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------ |
| Command menus  | Command bar                 | 6 types (users, actions, menus, empty state), input, menu items, shortcuts, footer                    | Build in code, or mark as Figma-only |
| Progress steps | Progress steps              | 5 layouts (minimal icons, connected, text with line, icons centered, icons with text), sm / md        | Build in code                        |
| Activity feeds | Activity feed               | Notifications / messages, 4 divider styles                                                            | Build in code, or mark as Figma-only |
| Messaging      | Message, Message action     | 9 message types, 3 composer types                                                                     | Build in code, or mark as Figma-only |
| Calendars      | Calendar views              | Month, week and day. Code only has the date-picker calendar                                           | Build in code, or mark as Figma-only |
| Code snippets  | Code snippet                | Simple / tabs                                                                                         | Build in code                        |
| Text editors   | Text editor                 | Default / floating toolbar, sm / md                                                                   | Build in code, or mark as Figma-only |
| Video players  | Video player 16:9           | sm / md / lg, playing / paused, action bar, volume                                                    | Build in code, or mark as Figma-only |
| Avatars        | Avatar group                | xs / sm / md, "+N" and add button. Code has the parts (`AvatarCount`, `AvatarAddButton`) but no group | Build `AvatarGroup` in code          |
| Misc icons     | Check icon, Check item text | Pricing-style check marks and check-list rows                                                         | Build in code                        |
| Misc icons     | Folder icon                 | Brand / gray / noise, open / closed                                                                   | Build in code                        |
| Misc icons     | Emoji                       | 18 emoji, used by message reactions                                                                   | Only needed with Messaging           |

### Partially built

| Component                 | Figma                      | Code                                                                                                                                    | Suggested action                                        |
| ------------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| Navigation featured cards | 13 card types              | 2 (progress bar, progress circle), and only as demos in `featured-cards.demo.tsx`, not exported components                              | Decide which cards are needed; build them as components |
| Social icons              | 34 platforms, brand / gray | 22. Missing: Framer, Notion, PayPal, Slack, Spotify, Stripe, Twitch, Webflow, WhatsApp, Wise, plus the second Discord and Framer styles | Add the missing icons in code                           |
| App store badges          | 5 stores, brand / outline  | 4 stores (no Mac App Store), plus a white Google Play that Figma doesn't have                                                           | Add Mac App Store in code; decide on white Google Play  |

---

## 3. In code, missing in Figma

| Code                                                                    | Notes                                                                                                                                                         | Suggested action                              |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `LoadingIndicator` (`application/loading-indicator`)                    | Line simple, line spinner, dot circle × sm / md / lg / xl. Figma only has the button spinner                                                                  | Add to Figma                                  |
| Slideout menu (`application/slideout-menus`)                            | Side panel overlay                                                                                                                                            | Add to Figma                                  |
| File upload trigger                                                     | Button that opens the file picker                                                                                                                             | Add to Figma, or accept as code-only          |
| `MultiSelect`, native select                                            | Figma's Select has Search and Tags types but nothing for multi-select or the native select                                                                    | Add to Figma                                  |
| Dropdown flavors (`base/dropdown`)                                      | Account cards (xs / sm / md), account button, account breadcrumb, search (simple / advanced), context menus. Figma has button, icon and avatar dropdowns only | Add to Figma, or remove unused ones from code |
| Illustrations (box, cloud, credit card, documents)                      | Nothing in code uses them; the new Figma states use a featured icon instead                                                                                   | Add to Figma, or remove from code             |
| Background patterns (circle, grid, grid check, square)                  | Figma uses a pattern from another library, with no local main component                                                                                       | Add to Figma                                  |
| QR code, iPhone mockup, section divider, rating badge, play button icon | Small marketing helpers                                                                                                                                       | Accept as code-only, or remove                |
| Payment icons                                                           | Code has 57 brands, Figma 39. All Figma brands exist in code; code adds 18 (Afterpay, Venmo, Zelle, Revolut…)                                                 | Add to Figma if needed                        |
| Form, hook form                                                         | Logic only, nothing visual                                                                                                                                    | None needed                                   |

---

## 4. Same component, different variants

| Component               | Figma                                                                                               | Code                                      | Suggested action                                    |
| ----------------------- | --------------------------------------------------------------------------------------------------- | ----------------------------------------- | --------------------------------------------------- |
| Badge colors            | 12: Gray, Brand, Error, Warning, Success, Blue light, Blue, Indigo, Purple, Pink, Orange, Blue gray | 9: no Blue, Indigo, Blue gray             | Add the 3 colors to code, or remove them from Figma |
| Textarea                | One size                                                                                            | sm, md                                    | Add a size to Figma, or drop one in code            |
| Avatar online indicator | xs – 2xl                                                                                            | xs – 4xl                                  | Add 3xl / 4xl to Figma, or drop them in code        |
| Pagination Shape        | "Card button group" types are still labelled Square; all other types are Circle only                | No shape option (round page numbers only) | Cosmetic: rename or drop the Square label in Figma  |

---

## 5. Known Figma housekeeping

Not code gaps, but worth fixing in Figma:

- **New input sets** (Input date, Input file, Input number, Input tags outer) only have Size / State / Orientation variants. They don't have the Label, Hint text and icon booleans that Input field has.
- **Small verification code sizes** (xxxs / xxs / xs): the dash between digit groups in the 6-digit variants is scaled down to fit. Code keeps the large dash at every size (no small code example shows one).
- **Disabled states** in the new input sets use Figma's disabled tokens. Code inputs use `opacity-50` by convention (see `CLAUDE.md` → Disabled states), except `PinInput`, whose digit boxes use Figma's `bg-disabled_subtle` / `fg-disabled_subtle` / `border-disabled`.

---

## 6. Decided and accepted

Settled; don't re-raise unless the design changes.

| Topic                          | Decision                                                                                                                                                                                                                                                                                                                                                              |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Table cells                    | Figma has 15 cell components; code composes content inside a generic `Table.Cell`. Accepted, like a slot.                                                                                                                                                                                                                                                             |
| Modal layouts                  | Figma's 46 ready-made layouts stay as examples. Code provides the shell + `ModalHeader` + `ModalActions`, with the body as a free slot.                                                                                                                                                                                                                               |
| Pagination page numbers        | Circle only. Square removed from Figma; `rounded` prop removed from code. Active page uses `bg-brand-primary_alt` + `text-brand-secondary` (same as selected tabs).                                                                                                                                                                                                   |
| Alert colors                   | No "Default" color; Gray is the default.                                                                                                                                                                                                                                                                                                                              |
| Size naming                    | Input field and Select follow code naming: sm / md / lg = 36 / 40 / 44px. Verification code input has xxxs / xxs / xs / sm / md / lg in both.                                                                                                                                                                                                                         |
| Removed from code (2026-10-16) | Empty state (with the table's empty/error examples), Credit card, Integration icons (with the integration dropdown). Empty state came back on 2026-10-19 as `EmptyState` / `ErrorState`, rebuilt from Figma's States page (one size, featured icon only).                                                                                                             |
| Flags                          | Figma's 59 flags (Misc icons → Flag, `<country>-<currency>` + `globe`) are `Flag` / `flags` in `foundations/flags`, keyed by the Figma name. `utils/countries.tsx` only lists countries with a flag (55; Hong Kong and Taiwan have flags but no country entry). Croatia has no flag on purpose.                                                                       |
| Custom components              | Designed as a main component in Figma first, then recreated in code.                                                                                                                                                                                                                                                                                                  |
| Logos and country flags        | Added to Figma, then exported into code. Logos (Misc icons → Logos) are components in `foundations/logo`, named as in Figma. Most follow the text color (`currentColor`); pinpoint, vipps and the four Kapital list versions (`kapital-list-*`) keep fixed colors, and hegnar-bok keeps its orange accent. The Fa logos replaced the Untitled UI logos in navigation. |
| Button icon stroke             | Figma: every Button / Button destructive icon is 1.67px (24px icon at 20px). Code keeps the 1.5px stroke prototype in `button.tsx` for now.                                                                                                                                                                                                                           |

---

## 7. Figma components that don't need code

- **Documentation and foundations:** \_Swatch base, \_Type scale base, \_Shadow card, \_Focus ring card, \_Blur card, \_Radius card, \_Container, Design note, Design system header / footer, Measure + spacing guide, Numeric key, Cursor, the Thumbnail page.
- **Asset libraries the code gets from packages:** icons (`@untitledui/icons`), file type icons (`@untitledui/file-icons`).
- **Building blocks** (names starting with `_`): the internal parts Figma assembles a component from, such as \_Tab button base, \_Toggle base, \_Checkbox base, \_Nav item base, \_Tag close X, \_Pagination number base, \_Select menu item and \_Calendar cell. In code they live inside their parent component. Building blocks of components that are missing in code (§2) are missing too.
