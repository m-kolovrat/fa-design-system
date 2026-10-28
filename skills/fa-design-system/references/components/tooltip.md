# Tooltip

A short dark label that appears on hover and keyboard focus of its trigger, with an optional second
line. Figma: Tooltips/Tooltip (Help icon is the `tooltip` prop on fields).

```ts
import { Tooltip, TooltipTrigger } from "fa-design-system/components/base/tooltip/tooltip";
```

## Use when

- Naming an icon-only control ("Kopier lenke", "Legg til i favoritter").
- A short explanation of a term next to a label or column header ("P/E", "Direkteavkastning").
- Showing the full value of something that is truncated.

## Use something else when

- An icon-only button: `ButtonUtility` with its `tooltip` prop (already wired).
- Help next to a form field's label: the field's `tooltip` prop (`Input`, `Textarea`, `Select` …,
  a string title only), which renders the `Help` icon trigger for you. A second line
  (`tooltipDescription`) exists only on `Label`; fields don't pass it through. `Label`'s help
  icon is named by its `tooltip` text (override with `tooltipLabel`) and shows the focus ring.
- Help next to a sortable table header: `Table.Head` `tooltip`.
- More than two short lines, links or buttons inside: a popover-style `Dropdown` or an inline hint.
- Anything a touch user must read: put it on the page; tooltips don't open on tap.

## Rules

- **tooltip-focusable-trigger** MUST Wrap a focusable React Aria element: `TooltipTrigger`, a
  library `Button`, or another React Aria `Button`/`Link`. Because the tooltip opens on hover and
  focus of that element; a plain `div` or `<button>` never opens it.
- **tooltip-trigger-label** MUST Give an icon-only `TooltipTrigger` an `aria-label` (usually the
  same text as `title`). Because the tooltip is only a description (`aria-describedby`); the button
  itself has no name.
- **tooltip-trigger-focus** MUST Show focus on a `TooltipTrigger`: it ships with `outline-hidden`,
  so add `focus-visible:text-fg-quaternary_hover` (the library's pattern) or the focus-ring classes.
  Because keyboard users otherwise can't see where they are.
- **tooltip-not-essential** NEVER Put information that's needed to complete a task only in a
  tooltip. Because touch screens and many screen-reader users never see it.
- **tooltip-short** SHOULD Keep `title` to a few words and `description` to one sentence; the
  tooltip is at most `max-w-xs` wide.
- **tooltip-placement** SHOULD Keep the default `placement="top"`; change it only when the trigger
  sits at the top edge. React Aria flips it when it doesn't fit.

## Props

| Prop                                                  | Values                                                                                                      | Default |
| :---------------------------------------------------- | :---------------------------------------------------------------------------------------------------------- | :------ |
| `title`                                               | ReactNode (required)                                                                                        |         |
| `description`                                         | ReactNode (second, lighter line)                                                                            |         |
| `arrow`                                               | boolean                                                                                                     | `false` |
| `placement`                                           | `top` · `bottom` · `left` · `right` · `top left` · `top right` · `bottom left` · … (React Aria `Placement`) | `top`   |
| `delay`                                               | ms before opening                                                                                           | `300`   |
| `closeDelay`                                          | ms                                                                                                          | `0`     |
| `offset`                                              | px from the trigger                                                                                         | `6`     |
| `trigger`                                             | `"focus"` to open on focus only                                                                             |         |
| `isDisabled`, `isOpen`, `defaultOpen`, `onOpenChange` | React Aria trigger state                                                                                    |         |

`TooltipTrigger` takes React Aria `Button` props (`onPress`, `aria-label`, `className`). It renders
an unstyled button (`h-max w-max`).

## Accessibility

- Escape closes the tooltip. It also opens on keyboard focus, so it works without a mouse.
- Don't put interactive content inside; it can't be reached.

## Example

```tsx
<div className="flex items-center gap-1">
    <span className="text-sm font-medium text-secondary">Direkteavkastning</span>
    <Tooltip title="Direkteavkastning" description="Siste utbytte delt på dagens kurs.">
        <TooltipTrigger
            aria-label="Hva er direkteavkastning?"
            className="cursor-pointer text-fg-quaternary transition hover:text-fg-quaternary_hover focus-visible:text-fg-quaternary_hover"
        >
            <Help className="size-4" />
        </TooltipTrigger>
    </Tooltip>
</div>

<Tooltip title="Legg til i favoritter" arrow>
    <Button color="tertiary" iconLeading={Star} aria-label="Legg til i favoritter" />
</Tooltip>
```

## See also

Storybook: Base components / Tooltips. Related: [button](button.md) (`ButtonUtility`),
[input](input.md), [table](table.md).
