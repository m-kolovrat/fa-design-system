# Card footer

The footer of a card: a divider, then one md Link gray button with a trailing chevron that leads
to more ("Se alle", "Alle nyheter"). Figma: "Card footer (draft)" on the "Test" page.

```ts
import { CardFooter } from "fa-design-system/components/application/card-footer/card-footer";
```

## Use when

- A card shows a part of a list or a view, and the full version is somewhere else.

## Use something else when

- The card's only action is opening the full list and it has a header: a sm icon-only `Button` in
  the [`CardHeader`](card-header.md)'s `actions` is enough. Don't add both for the same link.
- A table card: pagination or a link under `TableCard` (see [table](table.md)).

## Rules

- **card-footer-one-link** MUST Pass only the label as `children`, with `href` (or `onPress`).
  NEVER Put other buttons, text or icons in it. Because the footer is one link, and the component
  draws the button, chevron and padding.
- **card-footer-label** SHOULD Keep the label short and say where it goes ("Se alle vinnere"
  rather than "Klikk her"). Because a screen reader lists links by their text.
- **card-footer-last** MUST Put it last in the card, straight after the body. Give the body `pb-4`
  above it (rule `card-header-padding` in [card header](card-header.md)).

## Props

| Prop        | Values                              | Default |
| :---------- | :---------------------------------- | :------ |
| `children`  | ReactNode (required): the label     |         |
| `href`      | string: where the link goes         |         |
| `onPress`   | function: an action, when no `href` |         |
| `className` | layout only                         |         |

## Accessibility

- With `href` it is a real link; with `onPress` a button.

## Example

```tsx
<section aria-labelledby="card-winners" className="overflow-hidden rounded-2xl border border-secondary bg-primary_alt">
    <CardHeader titleId="card-winners" title="Vinnere" divider={false} />
    <div className="px-4 pb-4 md:px-6">{/* rows */}</div>
    <CardFooter href="/bors/vinnere">Se alle vinnere</CardFooter>
</section>
```

## See also

Storybook: Application / Card footer. Related: [card header](card-header.md), [button](button.md).
