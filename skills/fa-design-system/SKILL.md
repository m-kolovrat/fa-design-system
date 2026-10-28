---
name: fa-design-system
description: Rules for building UI with the Fa Design System (Finansavisen, Kapital, Motor). Use when building or changing any page, screen, component, form, story, demo or style with Fa components, when porting a screen onto the system, or when checking UI against it.
---

# Fa Design System

React components on React Aria and Tailwind CSS v4, kept in sync with the Figma file "Fa Design
System". One library serves three publications: Finansavisen (`fa`), Kapital (`kapital`) and Motor
(`motor`). Build with these components and tokens before writing any markup of your own.

## Setup

- In the app's main stylesheet, import the system's styles right after Tailwind. They bring the
  tokens, typography, plugins and the `dark` variant, and point Tailwind at the components:

    ```css
    @import "tailwindcss";
    @import "fa-design-system/styles/index.css";
    ```

- Dark mode is the `.dark-mode` class on `<html>` or a root element. Every semantic token switches
  on its own.
- The publication is the `brand` prop on `SiteHeader` / `SiteFooter` (`"fa" | "kapital" | "motor"`).
  Everything else is shared.
- Import paths below are the package paths (`fa-design-system/components/...`). Inside the library
  repo itself (its demos and stories), the same files are imported as `@/components/...`.
- Mentions of `docs/figma-parity.md`, `docs/overrides.md`, `docs/icons.md`, `TOKENS.md` and `CLAUDE.md` refer to
  files in the library repo. In an app they're under `node_modules/fa-design-system/`; open them
  only when a reference page sends you there.

## Steps

1. **Plan before you write code.** Read [references/page-patterns.md](references/page-patterns.md)
   and pick the page shell that fits. Then write the plan into your reply: each section of the
   page, top to bottom, and the component (from the [index](#component-index)) or stand-in (from
   [Coverage gaps](#coverage-gaps)) that covers it. For a Figma frame, map each layer with
   [references/figma-map.md](references/figma-map.md). For a reference product, name what each of
   its parts becomes here; take its structure, not its look. Anything with no match goes into the
   plan as "not in the system" before you build it.
2. Lay the page out with the surfaces, card grid and text pairings in
   [references/layout.md](references/layout.md).
3. **Open each component's reference page before using it**: it says when to use it, which props,
   sizes and colors exist, and that component's rules.
4. Build only from those components and the tokens in [references/tokens.md](references/tokens.md).
   Something the plan marked "not in the system" is composed from existing components and tokens;
   tell the person what you built and that it has no Figma frame yet. Never invent a token, size or
   variant.
5. Before handing over, go through the rules below, look at the result at mobile and desktop width
   in both themes, and run the project's checks (`npm test` in the library repo). In your reply,
   list anything you couldn't resolve, such as a missing component or a rule you had to bend.

## Redesigning an existing page

The page-level rules (layout, surfaces, text pairings, page patterns) are still being settled, so
they're flexible: when the page or its design does something else, follow it rather than forcing
the rule. But always report it. Before handing over a redesign, add a short **Patterns** section to
your reply with:

- **New patterns:** anything on the page that none of the reference files describe (a layout, a
  card arrangement, a text pairing, a recurring element), with where it appears.
- **Clashes:** places where the page or design contradicts a rule or another page (for example a
  card without a border, a different gap, two ways of showing the same thing), with both sides.

Don't resolve a clash on your own and don't update the reference files; the design system owner
decides which way it goes. Write "No new patterns or clashes" when there are none.

## Changing a component

When a component doesn't do what the screen needs, take the lightest option that works, in this
order, and say in your reply which one you used:

1. **Props and layout classes.** Use the component's props; `className` only for layout (width,
   margins, placement, grid spans), never for color, size or radius.
2. **Wrap it** in an app component for app-specific behavior or content, keeping the library
   component inside unchanged.
3. **Ask for a variant.** A missing size, color or state goes to the design system owner: it's
   designed in Figma, added to the library and shipped in the next version. Use the closest
   existing variant until then and say so.
4. **Patch it temporarily** with `patch-package` for an urgent bug fix, and report the bug so the
   patch can be removed after the next release.
5. **Try a branch.** Point the dependency at a branch or tag of the library
   (`github:m-kolovrat/fa-design-system#fix-table`) to test a change before it's released.
6. **Eject it** only when the app really needs its own version: copy the source from
   `node_modules/fa-design-system/components/<path>.tsx` into the app, change its `@/…` imports to
   `fa-design-system/…`, and import the copy instead. The app then owns that file and stops getting
   its updates. Ejecting always needs the person's go-ahead, and it's reported as a clash.

## Priority order

When two rules pull in different directions, settle it with these questions, in order:

1. Can everyone use it: keyboard, screen reader, contrast?
2. Does it match Figma: the component's own variants and the frame you were given?
3. Does it stay inside the system: library components, semantic tokens, the scales?
4. Anything else.

## Rules

Every rule in the system lives in one place: here when it applies everywhere, on a component's page
when it's about that component. A component rule that seems to contradict one of these is the more
specific one; follow it.

### Components

1. **fa-components-first** MUST Use a library component before writing markup, and open its
   reference page first. Never rebuild a button, input, select, modal, dropdown, tooltip or tab bar
   from `div`s, and never put `onClick` on a `div` or `span`. Because library components are the
   code side of the Figma components: they already match the design and handle keyboard, focus and
   states.
    - Correct: `import { Button } from "fa-design-system/components/base/buttons/button";`
    - Wrong: `<button className="rounded-lg bg-brand-solid px-4 py-2 text-white">Lagre</button>`,
      `<div onClick={open} className="cursor-pointer rounded-md border px-3 py-2">Velg</div>`
2. **fa-no-invented-variants** NEVER Add a size, color, variant or token that the component or
   `theme.css` doesn't have, and never change a component's fill, border, text color, radius or
   size through `className` to fake one. Report the gap instead. Because Figma is the source; a
   variant that exists only in code drifts from design, and a restyle is an untracked override.
    - Wrong: `<Button className="bg-success-solid">Kjøp</Button>`, `<Badge className="bg-blue-100 text-blue-700">Ny</Badge>`
3. **fa-state-props** MUST Express states with the component's props (`isDisabled`, `isLoading`,
   `isInvalid`, `isSelected`), never with classes. Because each component maps states to the Figma
   tokens (Button and ButtonGroup use the disabled tokens, inputs use `opacity-50`).
    - Wrong: `<Button className="pointer-events-none opacity-50">`
4. **fa-overlays-mounted** MUST Open `Modal`, `PromptModal` and `SlideoutMenu` through their
   `.Trigger` or with `isOpen` / `onOpenChange`, and keep them rendered; never wrap them in
   `{open && …}`. Because React Aria plays the closing animation and returns focus to the trigger
   only while the component is still in the tree.
5. **fa-links** MUST Use `Button` with `href` and `color="link-color"` / `"link-gray"` for
   standalone action links ("Se alle", "Les mer"). Plain links inside running text stay `<a>` and
   follow the `prose` styles. Because there is no separate Link component, and a hand-styled link
   misses the focus ring and hover token.
6. **fa-brand-via-prop** MUST Change publication looks only through `brand` and the existing brand
   config (`siteBrands`). Never restyle a component per brand at the call site. Because overrides
   live in exactly one place (see `docs/overrides.md`).

### Tokens and styling

7. **fa-semantic-tokens** MUST Use semantic color classes (`text-primary`, `bg-secondary`,
   `border-secondary`, `text-fg-quaternary`). Never a hex value, a Tailwind palette color
   (`gray-500`, `blue-600`), a primitive ramp step (`brand-700`), `white` / `black` (except
   `text-white` where the design is white in both themes), an inline `style={{ color }}`, or a
   `dark:` variant. Because semantic tokens switch for dark mode and follow Figma; a raw value or a
   `dark:` override is a second source of truth that stays behind.
    - Correct: `<p className="text-sm text-tertiary">`
    - Wrong: `<p className="text-sm text-gray-600">`, `<div className="bg-[#035CB5]">`,
      `<p className="text-gray-700 dark:text-gray-300">`
8. **fa-scale-values** SHOULD Use the spacing, type and radius scales; an arbitrary value
   (`p-[13px]`, `rounded-[9px]`) only to match a Figma measurement that has no step. Because values
   off the scale drift from Figma's variables.
9. **fa-no-invented-effects** NEVER Add a gradient, blur, shadow, animation or background effect
   that no library component or Figma frame has. Effects that come with a component stay (the
   blurred overlay behind `Modal`, the ticker bar's scroll). Don't fade or slide content in as it
   scrolls into view. Because effects are part of the design system; one invented at a call site
   has no Figma source.
    - Wrong: `<section className="bg-gradient-to-br from-brand-500 to-purple-500">`
10. **fa-instant-hover** NEVER Add `duration-*`, `ease-*` or `transition-all` to a hover or color
    change; use bare `transition`. The `--transition-duration-*` / `--ease-*` scale is only for
    movement and overlays (a sliding knob, a modal entering). Because hovers in the library are
    instant by design.
    - Wrong: `className="transition-all duration-300 hover:bg-primary_hover"`

### Icons and accessibility

11. **fa-icons-only** MUST Take icons from `fa-icons` (file-type icons from
    `@untitledui/file-icons`); no emoji as icons. Pass a component reference to `icon` props, or a
    JSX element with `data-icon`. Size with `size-4` / `size-5` / `size-6`, color with `text-fg-*`,
    never `stroke-*`. Because the set is built from Figma, and the stroke scales with the size.
    - Correct: `<Button iconLeading={Plus}>Legg til</Button>`, `<Bell className="size-5 text-fg-quaternary" />`
    - Wrong: `import { Bell } from "lucide-react";`
    - The `flag` icon is exported as `FlagIcon`; `Flag` is the country flag component. Rename an
      icon import that clashes with a component (`Calendar as CalendarIcon`).
12. **fa-icon-names** MUST Leave an icon unnamed when text next to it says the same thing; icons are
    hidden from screen readers by default. Name an icon-only button or link on the control
    (`aria-label` on `Button`, `tooltip` on `ButtonUtility`), never on the icon inside it. Give an
    icon an `aria-label` only when it carries meaning on its own (a flag standing for a market, a
    lock marking a Pluss article, a warning next to a figure); `fa-icons` then exposes it as an
    image. Because a screen reader skips every unnamed icon, so meaning that lives only in an icon,
    or only in a color, is lost.
    - Correct: `<ButtonUtility icon={Edit} tooltip="Rediger" />`, `<Lock aria-label="Pluss-artikkel" />`
    - Wrong: `<Button iconLeading={<Edit data-icon aria-label="Rediger" />} />` (the button still has
      no name)
    - Color alone isn't a name: a green or red change value is fine because its sign says the same;
      a status dot with no text needs text next to it.
13. **fa-label-fields** MUST Give every input, select, textarea, checkbox and toggle a `label` (or
    `aria-label` when a visible label is impossible, as in a table row). A placeholder is not a
    label. Errors go through `isInvalid` + `hint`. Because screen readers name a field by its label;
    without one it's announced only as "edit text".
    - Correct: `<Input label="E-post" placeholder="navn@firma.no" isInvalid hint="Ugyldig e-post" />`
14. **fa-focus-visible** MUST Keep every interactive element keyboard-reachable with the focus ring
    (`outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2`). Never
    `outline-none` without that replacement. Because the ring is the only sign of which element a
    keyboard user is on.

### Content

15. **fa-real-content** MUST Write content the way Finansavisen would: Norwegian headlines and
    labels, Oslo Børs companies and tickers, NOK with Norwegian formatting (`1 234,50 kr`,
    `+2,4 %`), dates near today. Never Lorem ipsum, "John Doe", "Company Inc." or `$1,234.56`. When
    the screen depends on a real number you don't have (a share price, a subscription price), use a
    plausible value and say in your reply that it needs replacing. Because Finansavisen content is
    long Norwegian headlines, company names and figures; short English placeholders hide wrapping
    and number alignment problems.
16. **fa-plain-copy** SHOULD State what happens, as the live copy does ("Lag din egen watchlist –
    helt gratis"); no marketing filler ("sømløst", "lynrask", invented urgency) and no emoji in copy
    or buttons. Provisional: the forum's category markers (🏥 Helse) are the one existing emoji;
    don't extend them.
17. **fa-local-images** NEVER Load sample avatars or logos from another site. In an app, use
    `initials` on `Avatar` until real photos exist; in the library's stories and demos, the
    placeholder portraits in `public/images/avatars/`. Because an outside image can disappear or
    change, and it ships someone else's content.

### Layout and files

18. **fa-layout** SHOULD Build pages from the surface levels, card grid and text pairings in
    [references/layout.md](references/layout.md), which owns the layout rules. Flexible for now;
    report where a design differs.
19. **fa-aria-prefix** MUST Import anything from `react-aria-components` with an `Aria` prefix.
    Because it keeps library components and the primitives they wrap apart.
    - Correct: `import { Button as AriaButton } from "react-aria-components";`
20. **fa-kebab-files** MUST Name every new file in kebab-case (`stock-table.tsx`).

## Choosing between similar components

- **Modal vs PromptModal:** `PromptModal` for short, focused prompts (confirm, delete, a few
  fields). `Modal` when the content scrolls or has fixed header and footer bars; on mobile it
  becomes a bottom sheet (`mobile="sheet"`) or full screen (`mobile="fullscreen"`).
- **Alert vs Notification:** `Alert` sits in the page and stays. `Notification` is a toast
  (`notify()`) that confirms an action and goes away.
- **Select vs ComboBox vs MultiSelect vs TagSelect vs NativeSelect:** one choice from a short list,
  one choice with search, several choices, several shown as tags, the browser's own select.
- **Tabs vs ButtonGroup:** `Tabs` switch between panels of content. `ButtonGroup` switches a view
  or filter of the same content (1D / 1U / 1Å on a chart).
- **Toggle vs Checkbox:** `Toggle` applies at once. `Checkbox` is part of a form that is submitted.
- **EmptyState vs ErrorState:** nothing to show yet, versus something failed to load.

## Coverage gaps

Not in code yet (Figma has them, see `docs/figma-parity.md` §2). Don't build a full version on your
own; use the stand-in and say so.

- Avatar group: `Avatar`s in a `flex -space-x-2` row, with `<Avatar initials="+4" />` for the
  overflow (not `AvatarCount`, which is a notification bubble).
- Progress steps, command bar, activity feed, messaging, calendar views, code snippet, text
  editor, video player: no stand-in. Ask before building.
- Finansavisen patterns with no component yet: widget card, filter chip, change value (`+1,65 %`),
  period selector, live indicator, news feed item, article teaser and header, key-figure row, logo
  stack, follow chips, AI prompt chips, paywall box.
  [references/page-patterns.md](references/page-patterns.md) gives the stand-in for each. Compose
  it from library parts as shown there, and say in your reply that it has no Figma component yet.

## Component index

Each entry links to its reference page. Open it before using the component.

### Actions

- [Button](references/components/button.md): an action or an action-style link; also
  `ButtonUtility` (icon-only), `CloseButton`, `SocialButton`, app store buttons.
  `fa-design-system/components/base/buttons/button`
- [Button group](references/components/button-group.md): a row of segmented options, such as
  chart periods. `fa-design-system/components/base/button-group/button-group`
- [Dropdown](references/components/dropdown.md): a menu of commands behind a button.
  `fa-design-system/components/base/dropdown/dropdown`

### Inputs

- [Input](references/components/input.md): one line of text; also `InputGroup`, `Label`,
  `HintText`. `fa-design-system/components/base/input/input`
- [Input variants](references/components/input-variants.md): `InputDate`, `InputNumber`,
  `InputFile`, `InputTags`, `PaymentInput`. `fa-design-system/components/base/input/*`
- [Pin input](references/components/pin-input.md): a verification code.
  `fa-design-system/components/base/input/pin-input`
- [Textarea](references/components/textarea.md): several lines of text.
  `fa-design-system/components/base/textarea/textarea`
- [Select](references/components/select.md): `Select`, `Select.ComboBox`, `MultiSelect`,
  `TagSelect`, `NativeSelect`. `fa-design-system/components/base/select/select`
- [Date picker](references/components/date-picker.md): `DatePicker`, `DateRangePicker`.
  `fa-design-system/components/application/date-picker/date-picker`
- [Slider](references/components/slider.md): a value or range on a track.
  `fa-design-system/components/base/slider/slider`
- [File upload](references/components/file-upload.md): drop zone and file list, `FileTrigger`.
  `fa-design-system/components/application/file-upload/file-upload-base`
- [Form](references/components/form.md): `Form`, `HookForm`, `FormField` (react-hook-form).
  `fa-design-system/components/base/form/form`

### Selection

- [Checkbox](references/components/checkbox.md). `fa-design-system/components/base/checkbox/checkbox`
- [Radio](references/components/radio.md): `RadioGroup` / `RadioButton`, `RadioCardGroup` /
  `RadioCard`. `fa-design-system/components/base/radio-buttons/radio-buttons`
- [Toggle](references/components/toggle.md): a setting that applies at once.
  `fa-design-system/components/base/toggle/toggle`
- [Tags](references/components/tags.md): removable or selectable labels.
  `fa-design-system/components/base/tags/tags`

### Display

- [Badge](references/components/badge.md): a short status or label; `BadgeWithDot`,
  `BadgeWithIcon`, `BadgeGroup`. `fa-design-system/components/base/badges/badges`
- [Avatar](references/components/avatar.md): `Avatar`, `AvatarLabelGroup`, `AvatarProfilePhoto`.
  `fa-design-system/components/base/avatar/avatar`
- [Featured icon](references/components/featured-icon.md): an icon on a tinted shape for emphasis.
  `fa-design-system/components/foundations/featured-icon/featured-icon`
- [Tooltip](references/components/tooltip.md): a short label on hover and focus.
  `fa-design-system/components/base/tooltip/tooltip`
- [Progress](references/components/progress.md): bars and circles.
  `fa-design-system/components/base/progress-indicators/progress-indicators`
- [Rating](references/components/rating.md): `RatingStars`, `RatingBadge`.
  `fa-design-system/components/foundations/rating-stars`
- [Table](references/components/table.md): rows of data to scan and sort.
  `fa-design-system/components/application/table/table`
- [Charts](references/components/charts.md): line, bar, pie, radar, gauges (Recharts).
  `fa-design-system/components/application/charts/charts-base`
- [Carousel](references/components/carousel.md): a row of slides.
  `fa-design-system/components/application/carousel/carousel-base`
- [Flags and logos](references/components/flags-logos.md): `Flag`, publication logos from
  `fa-icons`.

### Feedback

- [Alert](references/components/alert.md): an in-page message that stays.
  `fa-design-system/components/application/alerts/alert`
- [Notification](references/components/notification.md): a toast via `notify()`.
  `fa-design-system/components/application/notifications/notification`
- [Empty state](references/components/empty-state.md): `EmptyState`, `ErrorState`.
  `fa-design-system/components/application/empty-state/empty-state`
- [Loading indicator](references/components/loading-indicator.md): a standalone spinner.
  `fa-design-system/components/application/loading-indicator/loading-indicator`

### Overlays

- [Modal](references/components/modal.md): `Modal` with `ModalHeader` / `ModalBody` /
  `ModalFooter`. `fa-design-system/components/application/modals/modal`
- [Prompt modal](references/components/prompt-modal.md): `PromptModal` with `PromptModalHeader` /
  `PromptModalActions`. `fa-design-system/components/application/prompt-modal/prompt-modal`
- [Slideout menu](references/components/slideout-menu.md): a side panel.
  `fa-design-system/components/application/slideout-menus/slideout-menu`

### Navigation

- [Site header](references/components/site-header.md): the publication header with `TickerBar`
  and `SiteMenuPanel`. `fa-design-system/components/application/site-header/site-header`
- [Site footer](references/components/site-footer.md).
  `fa-design-system/components/application/site-footer/site-footer`
- [Tabs](references/components/tabs.md). `fa-design-system/components/application/tabs/tabs`
- [Pagination](references/components/pagination.md).
  `fa-design-system/components/application/pagination/pagination`
- [Breadcrumbs](references/components/breadcrumbs.md).
  `fa-design-system/components/application/breadcrumbs/breadcrumbs`
- [App navigation](references/components/app-navigation.md): sidebar and header navigation for
  app-style (logged-in) screens. `fa-design-system/components/application/app-navigation/*`

## Tokens

The closed list, with what each token is for, the type, radius and shadow scales, spacing, page
gutter and breakpoints: [references/tokens.md](references/tokens.md).
