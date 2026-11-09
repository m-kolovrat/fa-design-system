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
- **slideout-heading** MUST Put a real heading (`<h2 id="…" className="text-lg font-semibold
text-primary">`) first in `SlideoutMenu.Header` and pass its id as `aria-labelledby` on
  `SlideoutMenu` (or pass `aria-label`). Because the dialog is named by them; without either it falls
  back to a generic name.
- **slideout-close** SHOULD Pass `onClose={close}` to `SlideoutMenu.Header` (as the story does), and
  close from footer buttons with the same `close`. Because the header's X already closes through the
  dialog's `close` slot; `onClose` is where extra work on close goes. Don't add a second X.
- **slideout-no-restyle** NEVER Pass `className` to `SlideoutMenu` to change the panel. Because it is
  applied to both the overlay and the panel; the width is fixed at `max-w-100`.

## Props

| Prop                     | Values                            | Default |
| :----------------------- | :-------------------------------- | :------ |
| `children`               | nodes, or `({ close }) => nodes`  |         |
| `isOpen`, `onOpenChange` | controlled state                  |         |
| `isDismissable`          | boolean (overlay click closes)    | `false` |
| `dialogClassName`        | classes on the inner dialog       |         |
| `aria-labelledby`        | id of the heading that names it   |         |
| `aria-label`             | the name when there is no heading |         |

`SlideoutMenu.Header`: `onClose`, plus `<header>` props. `SlideoutMenu.Content`: `<div>` props (no
role). `SlideoutMenu.Footer`: `<footer>` props, with a top divider. The overlay sits at `z-50`, above
sticky headers.

## Notes

- `slideout-menu.tsx` also exports `ModalOverlay`, `Modal` and `Dialog`, the React Aria parts it is
  built from. They are not the dialog `Modal` from `modals/modal.tsx`: an auto-import that picks this
  `Modal` renders a side panel instead of a dialog. Import `Modal` from
  `fa-design-system/components/application/modals/modal` and `SlideoutMenu` from here.

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
    <SlideoutMenu isDismissable aria-labelledby="filtrer-tittel">
        {({ close }) => (
            <>
                <SlideoutMenu.Header onClose={close}>
                    <h2 id="filtrer-tittel" className="text-lg font-semibold text-primary">
                        Filtrer aksjer
                    </h2>
                    <p className="text-sm text-tertiary">Oslo Børs og Euronext Growth</p>
                </SlideoutMenu.Header>
                <SlideoutMenu.Content>
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
