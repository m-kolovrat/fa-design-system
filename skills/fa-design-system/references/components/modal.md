# Modal

A dialog with a fixed header and footer around a scrolling body: forms, settings, terms, longer
content. Centered from `sm` up; below `sm` a bottom sheet or full screen. Figma: Modal (Breakpoint =
Desktop / Mobile sheet / Mobile full screen), \_Modal header, \_Modal footer, \_Sheet handle.

```ts
import { Modal, ModalBody, ModalFooter, ModalHeader } from "@/components/application/modals/modal";
```

## Use when

- The content is longer than a short question, or may scroll (a form with several fields, a list,
  terms).
- The header and the actions must stay visible while the body scrolls.
- On mobile it should slide up as a sheet, or take the whole screen for a form.

## Use something else when

- A short confirmation, a destructive "are you sure?", or one or two fields: `PromptModal`.
- A side panel that keeps page context (filters, details next to a list): `SlideoutMenu`.
- A message that doesn't need a decision: `Alert` (stays in the page) or `notify()` (toast).
- A menu of commands: `Dropdown`.

## Rules

- **modal-vs-prompt** MUST Use `Modal` for scrolling content or fixed bars, `PromptModal` for short
  focused prompts. Because they are two separate Figma components (decided 2026-10-21) with
  different mobile behavior; don't fake one with the other.
- **modal-trigger** MUST Wrap the opening button and the `Modal` in `Modal.Trigger`, or control it
  with `isOpen` / `onOpenChange`. Because the trigger restores focus to the button on close.
- **modal-structure** MUST Build the content from `ModalHeader`, `ModalBody` and (optionally)
  `ModalFooter`, in that order. Because only `ModalBody` scrolls; anything outside it is fixed.
- **modal-header-title** MUST Always pass `title` to `ModalHeader`. Because it renders the dialog's
  heading (`slot="title"`), which names the dialog for screen readers.
- **modal-mobile** SHOULD Use `mobile="fullscreen"` for forms with inputs, the default `"sheet"`
  for read-only or short content. Because a sheet leaves little room above the keyboard.
- **modal-width** SHOULD Set a wider desktop width only through `className` with an `sm:max-w-*`
  step (`sm:max-w-140`); never restyle fill, radius or padding. Because Figma has no Size variant;
  the width is set per use and the default is 480px.
- **modal-footer-buttons** MUST Put buttons in `ModalFooter` with `size="lg"`, secondary first and
  primary last; one primary. Because the footer lays them out equal-width on mobile and right-aligned
  from `sm`, matching Figma.
- **modal-close** SHOULD Close from a footer button with the `close` render prop
  (`{({ close }) => …}`). Because the header's `CloseButton`, Escape and an overlay click already
  close it; don't add a second X.

## Props

| Prop                        | Values                                   | Default        |
| :-------------------------- | :--------------------------------------- | :------------- |
| `mobile`                    | `sheet` · `fullscreen` (below `sm` only) | `sheet`        |
| `className`                 | desktop width (`sm:max-w-*`)             | `sm:max-w-120` |
| `isDismissable`             | boolean (overlay click closes)           | `true`         |
| `isKeyboardDismissDisabled` | boolean                                  |                |
| `isOpen`, `onOpenChange`    | controlled state                         |                |
| `children`                  | nodes, or `({ close }) => nodes`         |                |

`ModalHeader`: `title` (required), `badge` (a string renders a small brand `Badge`; or pass an
element), `description`, `showCloseButton` (default `true`), `divider` (default `true`), `className`.
`ModalBody`: `children`, `className` (it is already `flex-col gap-4` with padding).
`ModalFooter`: `children`, `divider` (default `true`), `className`.

## Accessibility

- Focus moves into the dialog on open, is trapped, and returns to the trigger on close.
- The heading from `ModalHeader` labels the dialog. `Modal` has no prop that puts an `aria-label`
  on the dialog itself, so always keep a `ModalHeader`.
- The `CloseButton` label defaults to "Close" (English); the sheet handle is decorative.
- The footer pads for `env(safe-area-inset-bottom)` on phones; don't add your own spacer.

## Example

```tsx
<Modal.Trigger>
    <Button color="secondary">Legg til i porteføljen</Button>
    <Modal mobile="fullscreen" className="sm:max-w-140">
        {({ close }) => (
            <>
                <ModalHeader title="Ny transaksjon" badge="Equinor" description="Registrer et kjøp i porteføljen din." />
                <ModalBody>
                    <Input label="Antall aksjer" placeholder="100" isRequired />
                    <Input label="Kurs" placeholder="312,40" hint="Oppgitt i NOK" isRequired />
                    <Checkbox label="Varsle meg ved kursendring over 5 %" />
                </ModalBody>
                <ModalFooter>
                    <Button size="lg" color="secondary" onPress={close}>
                        Avbryt
                    </Button>
                    <Button size="lg" onPress={close}>
                        Lagre transaksjon
                    </Button>
                </ModalFooter>
            </>
        )}
    </Modal>
</Modal.Trigger>
```

## Figma parity

Settled (`docs/figma-parity.md` §6, "Modal vs Prompt modal"): no Size variant; desktop width is
per use. Figma has no safe-area spacers; code pads the footer.

## See also

Storybook: Application / Modals. Related: [prompt-modal](prompt-modal.md),
[slideout-menu](slideout-menu.md), [button](button.md).
