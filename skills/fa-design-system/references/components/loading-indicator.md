# Loading indicator

A standalone brand-colored spinner with an optional label under it, for content that is on its
way. Three styles, four sizes. Figma: none yet (Figma only has the button spinner; see parity).

```ts
import { LoadingIndicator } from "fa-design-system/components/application/loading-indicator/loading-indicator";
```

## Use when

- A region, panel or page is loading and its size is unknown: a chart fetching prices, a search
  running, a modal body waiting for data.
- A route change or a long first load needs one centered spinner.

## Use something else when

- A button started the work: `Button isLoading` (the spinner sits in the button).
- A file upload: `InputFile isLoading`, or a file-upload row with a progress bar.
- The share done is known (upload %, steps): `ProgressBar` ([progress](progress.md)).
- The content's shape is known (a list of articles, a table): a skeleton built from `bg-tertiary`
  blocks is calmer than a spinner; there is no skeleton component, so say you composed one.
- Loading failed: `ErrorState`.

## Rules

- **loading-announce** MUST Wrap the indicator in an element with `role="status"` and give it a
  `label` (or an `sr-only` text), and set `aria-busy="true"` on the region that is loading. Because
  the component renders a bare SVG with no role or name; screen readers get nothing.
- **loading-label-text** SHOULD Write the label in Norwegian and say what loads ("Henter kurser …",
  "Laster artikler …"), not "Loading...".
- **loading-one-at-a-time** SHOULD Show one spinner per region, centered in the space the content
  will take (`min-h-*` so the layout doesn't jump). Never one per row.
- **loading-delay** SHOULD Show the spinner only if loading takes longer than about 300 ms.
  Because a flash of spinner on fast loads reads as flicker.
- **loading-type** SHOULD Use the default `line-simple` across a product; `line-spinner` and
  `dot-circle` only where a Figma frame shows them. Use only one `dot-circle` per page (its SVG
  gradient ids are fixed, so two on a page share one definition).
- **loading-size** SHOULD Use `sm` (32px) in cards and panels, `md` (48px) for a page section,
  `lg` / `xl` (56 / 64px) for a full-page load.

## Props

| Prop    | Values                                             | Default       |
| :------ | :------------------------------------------------- | :------------ |
| `type`  | `line-simple` · `line-spinner` · `dot-circle`      | `line-simple` |
| `size`  | `sm` · `md` · `lg` · `xl`                          | `sm`          |
| `label` | string, shown under the spinner (`text-secondary`) |               |

## Notes

- It takes no `className`; position it with a wrapper.

## Accessibility

- The spin is a CSS `animate-spin` loop, one of the two looping animations the system allows (the
  other is the ticker bar's scroll).
- Move focus to the loaded content (or announce it) when loading ends if the reader triggered it.

## Example

```tsx
<section aria-busy={isLoading} aria-labelledby="kurser-tittel" className="min-h-60">
    <h2 id="kurser-tittel" className="text-lg font-semibold text-primary">
        Kurser i dag
    </h2>
    {isLoading ? (
        <div role="status" className="flex min-h-48 items-center justify-center">
            <LoadingIndicator size="sm" label="Henter kurser fra Oslo Børs …" />
        </div>
    ) : (
        <PriceTable rows={rows} />
    )}
</section>
```

## Figma parity

Code-only (`docs/figma-parity.md` §3): line simple, line spinner and dot circle × sm / md / lg / xl
exist in code; Figma has only the button spinner. Suggested action there: add them to Figma.

## See also

Storybook: Application / Loading indicators. Related: [button](button.md) (`isLoading`),
[progress](progress.md), [empty-state](empty-state.md).
