# Card header

The header of a card: a title with an optional badge and supporting text, and up to three actions on
the right. Every card that has a title uses it, whether it holds a widget, a list or plain page
content. Figma: Card header (the table header on the Tables page has the same anatomy; the draft
with icon-only actions is "Card header (draft)" on the "Test" page).

```ts
import { CardHeader } from "fa-design-system/components/application/card-header/card-header";
```

## Use when

- A card on a page needs a title: a market widget (Vinnere, Ordredybde), a list (Siste nytt), a chart,
  or a block of page content.

## Use something else when

- A table card: `TableCard.Header` (see [table](table.md)), until the two are merged.
- A modal: `ModalHeader` (see [modal](modal.md)).
- The page's own title: an `h1` above the cards, not a card.

## Rules

- **card-header-always** MUST Give every titled card a `CardHeader`; never build a card title row from
  a `div`, an icon tile and a `ButtonUtility`. Because one header keeps every card on every page the
  same, and the tinted icon tile is not part of it.
- **card-header-actions** MUST Put up to three actions in `actions`, as md icon-only `Button`s
  (`size="md"`, `iconLeading`, `aria-label`) in any hierarchy (`primary`, `secondary`, `tertiary`),
  or a labelled `Button` or `Dropdown` when the action needs words. Never `ButtonUtility`. Because the
  header's actions are the Figma md buttons, 12px apart.
- **card-header-one-primary** SHOULD Use at most one `primary` action, last in the row. Because one
  filled button per area is the rule on every page.
- **card-header-padding** MUST Leave the card itself without padding and give the body under the
  header `px-4 py-5 md:px-6`. Because the header sets its own padding (16px sides on mobile, 24px from
  `md`), and the body lines up with it.
- **card-header-heading** SHOULD Keep `headingLevel={2}` under the page's `h1`, `3` for a card inside
  a section that already has an `h2`. Pass `titleId` and `aria-labelledby` on the card `section`.

## Props

| Prop           | Values                                      | Default |
| :------------- | :------------------------------------------ | :------ |
| `title`        | ReactNode (required)                        |         |
| `badge`        | string (brand pill `Badge`) or an element   |         |
| `description`  | ReactNode: the line under the title         |         |
| `actions`      | ReactNode: up to three buttons              |         |
| `divider`      | boolean: a `border-secondary` line under it | `true`  |
| `headingLevel` | `2` · `3`                                   | `2`     |
| `titleId`      | string: the heading's id                    |         |

## Notes

- The card is the level-2 surface from [layout.md](../layout.md), plus `overflow-hidden` so the
  divider meets the border: `overflow-hidden rounded-2xl border border-secondary bg-primary_alt`.
- Tabs inside the card go in the body as `type="button-minimal"` `size="sm"` (rule
  `tabs-type-by-place` in [tabs](tabs.md)).

## Accessibility

- The title is a real heading (`h2` or `h3`), so screen-reader users can jump between cards.
- Every icon-only action needs an `aria-label` ("Se alle vinnere", "Last ned"); a link action uses
  `href` on the `Button`.

## Example

```tsx
<section aria-labelledby="card-winners" className="overflow-hidden rounded-2xl border border-secondary bg-primary_alt">
    <CardHeader
        titleId="card-winners"
        title="Vinnere"
        actions={<Button color="secondary" size="md" iconLeading={ChevronRight} href="/bors/vinnere" aria-label="Se alle vinnere" />}
    />
    <div className="px-4 py-5 md:px-6">{/* rows */}</div>
</section>
```

## See also

Storybook: Application / Card header. Related: [button](button.md), [table](table.md),
[tabs](tabs.md), [modal](modal.md).
