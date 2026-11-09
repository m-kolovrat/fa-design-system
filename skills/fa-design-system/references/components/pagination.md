# Pagination

Moves through pages of a long list or table, or shows position in a carousel. Figma: Pagination
(Type = Page default, Page minimal center, Card default, Card minimal, Card button group, Card
advanced), plus the dot and line indicators.

```ts
import {
    PaginationButtonGroup,
    PaginationCardAdvanced,
    PaginationCardDefault,
    PaginationCardMinimal,
    PaginationPageDefault,
    PaginationPageMinimalCenter,
} from "fa-design-system/components/application/pagination/pagination";
import { PaginationDot } from "fa-design-system/components/application/pagination/pagination-dot";
import { PaginationLine } from "fa-design-system/components/application/pagination/pagination-line";
```

## Which one

| Export                        | Use for                                                                                            |
| :---------------------------- | :------------------------------------------------------------------------------------------------- |
| `PaginationPageDefault`       | Under a page-level list (article archive, search results). Link-gray prev/next.                    |
| `PaginationPageMinimalCenter` | The same, with outlined prev/next buttons.                                                         |
| `PaginationCardDefault`       | The bottom row inside a card or `Table`: prev / numbers / next.                                    |
| `PaginationCardMinimal`       | Card bottom without page numbers: "Side X av Y" + page-size select. `align` left · center · right. |
| `PaginationButtonGroup`       | Card bottom as one segmented `ButtonGroup`. `align` left · center · right.                         |
| `PaginationCardAdvanced`      | Data tables: page input, rows per page, first / last. `align` space-between · center.              |
| `PaginationDot`               | Position in a carousel or onboarding steps (few pages).                                            |
| `PaginationLine`              | Same as dots, as line segments.                                                                    |

## Use something else when

- A slide show with arrows and images: `Carousel`, with `PaginationDot` as its indicator (see the
  carousel demo).
- Loading more items into the same list ("Vis flere"): a `Button color="secondary"`.
- Switching sections: [tabs](tabs.md).

## Rules

- **pagination-controlled** MUST Hold the page in state and pass `page` + `onPageChange` (and
  `total`). Because every variant is controlled; without `onPageChange` the buttons do nothing.
- **pagination-total** MUST Pass `total` as the number of pages, not the number of items. Because
  it defaults to `10`.
- **pagination-page-size** MUST Pass `pageSize` + `onPageSizeChange` with `PaginationCardMinimal`
  and `PaginationCardAdvanced`, and recompute `total` when the size changes. Because the select
  offers 10 · 25 · 50 · 100 and doesn't change `total` itself.
- **pagination-placement** SHOULD Use the `Page*` variants under page content and the `Card*` /
  `ButtonGroup` variants inside a bordered card or table. Because the card variants carry card
  padding and a top divider.
- **pagination-one-per-list** SHOULD Show one pagination per list, below it. Because two controls
  for the same list drift out of sync.
- **pagination-dots-few** SHOULD Use `PaginationDot` / `PaginationLine` only for up to about 7 pages.
  Because the dots show no numbers.
- **pagination-no-restyle** NEVER Restyle page numbers (shape, fill). Because they are circle-only
  with the selected-tab colors by decision (`docs/figma-parity.md` §6).

## Props

`PaginationPageDefault`, `PaginationPageMinimalCenter`, `PaginationCardDefault`:
`page` (default 1), `total` (default 10), `onPageChange`, `siblingCount` (default 1), `labels`
(overrides `strings.pagination`), `className` (ignored by `PaginationCardDefault`).

`PaginationButtonGroup`: the same plus `align` `left` · `center` · `right` (default `left`).

`PaginationCardMinimal`: `page`, `total`, `pageSize` (default 10), `onPageChange`,
`onPageSizeChange`, `align` `left` · `center` · `right` (default `left`), `labels`, `className`.

`PaginationCardAdvanced`: the same as Card minimal, with `align` `space-between` · `center`
(default `space-between`).

`PaginationDot`: `page`, `total` (both required), `onPageChange`, `size` `md` · `lg` (default
`md`), `isBrand` (for use on brand surfaces), `framed` (pill background for use over images),
`className`. `PaginationLine`: the same without `isBrand`.

## Accessibility

- The current page has `aria-current="page"` and each page number is labelled "Page 3". Prev/next
  disable at the ends, and page changes stay within 1..total (the advanced page input ignores
  anything that isn't a number).
- Built-in texts are Norwegian (`strings.pagination` in `utils/strings`): "Forrige" / "Neste",
  "Side 3 av 10", "Rader per side", and the names "Sidenavigasjon", "Forrige side" / "Neste side",
  "Første side" / "Siste side", "Side 4". Every variant takes `labels` to override any of them.
- Prev/next arrows are named "Forrige side" / "Neste side" (the name replaces the visible "Forrige" /
  "Neste").

## Example

```tsx
const [page, setPage] = useState(1);
const [pageSize, setPageSize] = useState(25);
const total = Math.ceil(transactions.length / pageSize);

{/* last child of the table card, under the rows */}
<PaginationCardAdvanced
    page={page}
    total={total}
    pageSize={pageSize}
    onPageChange={setPage}
    onPageSizeChange={(size) => {
        setPageSize(size);
        setPage(1);
    }}
/>

<PaginationPageDefault page={archivePage} total={48} onPageChange={setArchivePage} />
```

## Figma parity

`docs/figma-parity.md` §4: Figma's "Card button group" types are still labelled Square; code is
circle only (cosmetic, fix in Figma).

## See also

Storybook: Application / Pagination. Related: [table](table.md), [carousel](carousel.md),
[button-group](button-group.md).
