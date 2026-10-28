# Carousel

A row of slides you page through with arrows, dots, swipe or arrow keys. Headless parts on
Embla Carousel: the library gives structure and behavior, the demo gives the Figma look. Figma:
Carousel image + \_Carousel arrow (kept on Figma's Pagination page).

```ts
import { Carousel, useCarousel } from "fa-design-system/components/application/carousel/carousel-base";
import { PaginationDot } from "fa-design-system/components/application/pagination/pagination-dot";
```

Pattern: `components/application/carousel/carousel.demo.tsx` (`CarouselMd`, `CarouselLg`, and a
`CarouselIndicator` that wires `PaginationDot` to the carousel). Start from it.

## Use when

- A photo series in an article or a Motor car test (3–10 images).
- A swipeable row of cards on mobile where a grid doesn't fit (related articles, podcast episodes).

## Use something else when

- Content the reader must see (prices, key facts, the main story): show it in the page; slides after
  the first are rarely seen.
- Switching between views of the same data: `Tabs` or `ButtonGroup`.
- A scrolling ticker: `TickerBar` in the [site header](site-header.md).
- Paging through a list of results: `Pagination`.

## Rules

- **carousel-structure** MUST Nest as `Carousel.Root` > `Carousel.Content` > `Carousel.Item`, with
  `PrevTrigger`, `NextTrigger` and the indicator inside `Root`. Because they read state from the
  root's context (`useCarousel` throws outside it).
- **carousel-labels** MUST Give the root an `aria-label` ("Bilder fra prøvekjøringen") and give the
  arrows a Norwegian label (`aria-label="Forrige bilde"`): as a prop on `PrevTrigger` /
  `NextTrigger`, on the `asChild` child, or on your own `<button>` in the render prop. Because the
  built-in labels are English ("Previous slide", "Next slide", "Go to slide 1") and only apply when
  you pass none.
- **carousel-indicator** SHOULD Use `PaginationDot` for the dots, as the demo's `CarouselIndicator`
  does (`page={selectedIndex + 1}`, `total={scrollSnaps.length}`, `onPageChange` →
  `api.scrollTo`). `framed` when it sits on a photo. Because it is the Figma dot pagination.
- **carousel-alt** MUST Give every image a real Norwegian `alt` (what it shows), or `alt=""` with a
  visible caption. Because slides are images first.
- **carousel-no-autoplay** NEVER Add an autoplay plugin without a pause button and a reduced-motion
  check. Because moving content that can't be stopped fails WCAG 2.2.2.
- **carousel-arrow-style** SHOULD Copy the arrow classes from the demo (white circle, `size-9` md /
  `size-11` lg, `text-fg-secondary`, focus ring, `disabled:opacity-50`) and keep the focus ring.

## Props

| Part                           | Props                                                                                                                                                                  |
| :----------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Carousel.Root`                | `opts` (Embla options: `loop`, `align`, …), `plugins`, `orientation` `horizontal` · `vertical`, `setApi`, `div` props                                                  |
| `Carousel.Content`             | `overflowHidden` (default `true`), `className` (gap: `gap-2`)                                                                                                          |
| `Carousel.Item`                | `div` props; `basis-full` by default, set `basis-1/2 md:basis-1/3` for several per view                                                                                |
| `PrevTrigger` / `NextTrigger`  | `children` (node, or `({ isDisabled, onClick }) => node`), `asChild`, `aria-label`, `className` (string or `({ isDisabled }) => string`; ignored with the render prop) |
| `IndicatorGroup` / `Indicator` | low-level dots; prefer `PaginationDot`                                                                                                                                 |

## Notes

- `useCarousel()` (inside `Carousel.Root`) returns `api`, `selectedIndex`, `scrollSnaps`,
  `canScrollPrev`, `canScrollNext`, `scrollPrev`, `scrollNext`.
- `PaginationDot` for the position: `size` `md` · `lg`, `framed`, `isBrand`.

## Accessibility

- Root is `role="region"`, slides `role="group"` with `aria-roledescription`. Left/Right arrow keys
  page when focus is inside the carousel.
- Disabled arrows (first/last slide without `loop`) get `disabled`; with the render prop, pass
  `isDisabled` to your button's `disabled` yourself.

## Example

```tsx
const arrow =
    "absolute top-1/2 z-10 flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-alpha-white/90 p-2 text-fg-secondary outline-focus-ring backdrop-blur-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

<Carousel.Root aria-label="Bilder fra prøvekjøringen av Volvo EX30" className="relative aspect-[1.6] max-w-160">
    <Carousel.PrevTrigger>
        {({ onClick, isDisabled }) => (
            <button type="button" aria-label="Forrige bilde" onClick={onClick} disabled={isDisabled} className={`${arrow} left-4`}>
                <ChevronLeft className="size-5" />
            </button>
        )}
    </Carousel.PrevTrigger>
    <Carousel.NextTrigger>
        {({ onClick, isDisabled }) => (
            <button type="button" aria-label="Neste bilde" onClick={onClick} disabled={isDisabled} className={`${arrow} right-4`}>
                <ChevronRight className="size-5" />
            </button>
        )}
    </Carousel.NextTrigger>
    <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2">
        <CarouselIndicator framed />
    </div>
    <Carousel.Content className="gap-2">
        {bilder.map((b) => (
            <Carousel.Item key={b.src} className="overflow-hidden rounded-xl">
                <img src={b.src} alt={b.alt} className="size-full object-cover" />
            </Carousel.Item>
        ))}
    </Carousel.Content>
</Carousel.Root>;
```

`arrow` is `CarouselMd`'s trigger classes without the side; `CarouselIndicator` is copied from
`carousel.demo.tsx`.

## See also

Storybook: Application / Carousels. Related: [pagination](pagination.md), [tabs](tabs.md).
