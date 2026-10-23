# Slideout menu

A panel that slides in from the right over a dimmed page: details, filters or a short edit form
next to a list. Code only, no Figma frame yet.

```ts
import { SlideoutMenu } from "fa-design-system/components/application/slideout-menus/slideout-menu";
```

## Use when

- Details or an edit form for one row of a list (a holding, an alert) while the list stays in view.
- A set of filters for a long list or table.

## Use something else when

- A decision or a short form that needs full attention: `PromptModal` or `Modal`.
- The newspaper's main menu: `SiteHeader` with `menu` (it opens `SiteMenuPanel`).
- App navigation on mobile: the sidebar components already include their own drawer
  (see [app-navigation](app-navigation.md)).

## Rules

- **slideout-figma-gap** MUST Tell the person that Slideout menu has no Figma frame
  (`docs/figma-parity.md` §3, "Add to Figma") when you use it in a new design. Because Figma is the
  source and this one isn't designed there yet.
- **slideout-structure** MUST Build the content from `SlideoutMenu.Header`, `SlideoutMenu.Content`
  and (optionally) `SlideoutMenu.Footer`. Because the content area scrolls between them and they carry
  the panel's padding.
- **slideout-trigger** MUST Wrap the opening button and the menu in `SlideoutMenu.Trigger`, or
  control it with `isOpen` / `onOpenChange`. Because focus returns to the trigger on close.
- **slideout-heading** MUST Put a real heading (`<h2 className="text-lg font-semibold text-primary">`)
  first in `SlideoutMenu.Header`. Because the dialog's accessible name is fixed to the English
  "Slideout menu" and can't be changed through props; the heading is what tells people where
  they are.
- **slideout-close** SHOULD Pass `onClose={close}` to `SlideoutMenu.Header` (as the story does), and
  close from footer buttons with the same `close`. Because the header's X already closes through the
  dialog's `close` slot; `onClose` is where extra work on close goes. Don't add a second X.
- **slideout-content-role** SHOULD Pass `role="region"` (or `role={undefined}`) and an `aria-label`
  to `SlideoutMenu.Content` when the page already has a `<main>`. Because `Content` defaults to
  `role="main"`, which would add a second main landmark.
- **slideout-no-restyle** NEVER Pass `className` to `SlideoutMenu` to change the panel. Because it is
  applied to both the overlay and the panel; the width is fixed at `max-w-100`.

## Props

| Prop                     | Values                           | Default |
| :----------------------- | :------------------------------- | :------ |
| `children`               | nodes, or `({ close }) => nodes` |         |
| `isOpen`, `onOpenChange` | controlled state                 |         |
| `isDismissable`          | boolean (overlay click closes)   | `false` |
| `dialogClassName`        | classes on the inner dialog      |         |

`SlideoutMenu.Header`: `onClose`, plus `<header>` props. `SlideoutMenu.Content`: `<div>` props
(`role` defaults to `"main"`). `SlideoutMenu.Footer`: `<footer>` props, with a top divider.

## Accessibility

- Focus is trapped in the panel and returns to the trigger on close; Escape closes it.
- The header close button is labelled "Close" and the dialog "Slideout menu" (English defaults in
  code).
- Pass `isDismissable` so a click on the dimmed page closes the panel, as people expect.

## Example

```tsx
<SlideoutMenu.Trigger>
    <Button color="secondary" iconLeading={Filter}>
        Filtrer
    </Button>
    <SlideoutMenu isDismissable>
        {({ close }) => (
            <>
                <SlideoutMenu.Header onClose={close}>
                    <h2 className="text-lg font-semibold text-primary">Filtrer aksjer</h2>
                    <p className="text-sm text-tertiary">Oslo Børs og Euronext Growth</p>
                </SlideoutMenu.Header>
                <SlideoutMenu.Content role="region" aria-label="Filtre">
                    <Input label="Minste markedsverdi" placeholder="500 000 000 kr" />
                    <Checkbox label="Bare aksjer med utbytte" />
                </SlideoutMenu.Content>
                <SlideoutMenu.Footer>
                    <div className="flex justify-end gap-3">
                        <Button color="secondary" onPress={close}>
                            Nullstill
                        </Button>
                        <Button onPress={close}>Vis 84 aksjer</Button>
                    </div>
                </SlideoutMenu.Footer>
            </>
        )}
    </SlideoutMenu>
</SlideoutMenu.Trigger>
```

## Figma parity

Listed in `docs/figma-parity.md` §3 (in code, missing in Figma). Suggested action: add to Figma.

## See also

Storybook: Application / Slideout menu. Related: [modal](modal.md), [prompt-modal](prompt-modal.md).
