# Prompt modal

A short, focused dialog: confirm, delete, publish, or one or two fields. A floating card at every
width. Figma: Prompt modal, \_Prompt modal header, \_Prompt modal actions.

```ts
import { PromptModal, PromptModalActions, PromptModalHeader } from "@/components/application/prompt-modal/prompt-modal";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
```

## Use when

- The person must confirm or cancel one thing ("Slett varsel?", "Avslutt abonnementet?").
- A quick input of one or two fields (rename a watchlist, enter an e-mail).
- Telling the person something finished, with one action to continue.

## Use something else when

- Content scrolls, or needs fixed header and footer bars, or several form sections: `Modal`.
- A side panel: `SlideoutMenu`.
- No decision needed: `notify()` toast or `Alert`.

## Rules

- **prompt-modal-short** MUST Keep it to a header, at most a few fields, and the actions. Because it
  has no fixed bars; longer content belongs in `Modal` (decided in `docs/figma-parity.md` §6).
- **prompt-modal-trigger** MUST Wrap the opening button and the `PromptModal` in
  `PromptModal.Trigger`, or control it with `isOpen` / `onOpenChange`. Because the trigger returns
  focus to the button on close.
- **prompt-modal-title** MUST Always render a `PromptModalHeader` with `title`. Because the title is
  the dialog's accessible name.
- **prompt-modal-icon** SHOULD Pass a `<FeaturedIcon size="lg" theme="light" />` as `icon`, colored by
  meaning (`error` for destructive, `success` for done, `brand` or `gray` otherwise). Because that is
  the Figma header.
- **prompt-modal-body-padding** MUST Wrap any body between header and actions in
  `<div className="flex flex-col gap-4 px-4 sm:px-6">`. Because the body is a free slot with no
  padding of its own.
- **prompt-modal-padding-bottom** SHOULD Set `paddingBottom={false}` on the header when actions
  follow it directly. Because the actions already add top spacing.
- **prompt-modal-destructive** MUST Confirm a destructive action with `color="primary-destructive"`
  and a verb label ("Slett", not "OK"); keep a secondary "Avbryt". Because a red fill marks the
  irreversible choice.
- **prompt-modal-button-order** MUST Order buttons by `layout`: `horizontal` and `horizontal-right`
  take secondary first, primary last; `vertical` takes primary first. Because the layouts reverse
  or stack the children to match Figma on mobile.
- **prompt-modal-buttons-lg** SHOULD Use `size="lg"` buttons. Because the Figma actions use them.

## Props

| Prop                     | Values                           | Default     |
| :----------------------- | :------------------------------- | :---------- |
| `className`              | card width (`max-w-*`)           | `max-w-100` |
| `isDismissable`          | boolean                          | `true`      |
| `isOpen`, `onOpenChange` | controlled state                 |             |
| `children`               | nodes, or `({ close }) => nodes` |             |

`PromptModalHeader`: `title` (required), `description`, `icon`, `align` `left` · `center` ·
`horizontal` (default `left`; Figma Left aligned / Center aligned / Horizontal left aligned),
`showCloseButton` (default `true`), `paddingBottom` (default `true`), `divider` (default `false`).

`PromptModalActions`: `layout` `vertical` · `horizontal` · `horizontal-right` (default
`horizontal`), `leading` (left content for `horizontal-right`, e.g. a `Checkbox`), `divider`
(default `false`), `children` (the buttons).

## Accessibility

- Focus is trapped while open and returns to the trigger. Escape and an overlay click close it;
  set `isDismissable={false}` only when an answer is required.
- The close X is labelled "Close" (English default of `CloseButton`).
- Featured icons are decorative; the title carries the meaning.

## Example

```tsx
<PromptModal.Trigger>
    <Button color="secondary-destructive" iconLeading={Trash}>
        Slett liste
    </Button>
    <PromptModal>
        {({ close }) => (
            <>
                <PromptModalHeader
                    icon={<FeaturedIcon icon={Trash} color="error" theme="light" size="lg" />}
                    title="Slette «Mine oljeaksjer»?"
                    description="Listen med 12 aksjer slettes for godt. Varsler knyttet til listen slås av."
                    paddingBottom={false}
                />
                <PromptModalActions>
                    <Button size="lg" color="secondary" onPress={close}>
                        Avbryt
                    </Button>
                    <Button size="lg" color="primary-destructive" onPress={close}>
                        Slett liste
                    </Button>
                </PromptModalActions>
            </>
        )}
    </PromptModal>
</PromptModal.Trigger>
```

With a field: put `<div className="flex flex-col gap-4 px-4 sm:px-6"><Input label="Navn på listen" /></div>`
between the header (default `paddingBottom`) and `PromptModalActions`.

## Figma parity

Figma keeps 46 ready-made Prompt modal layouts as a showcase; code gives the three parts and a free
body (settled, `docs/figma-parity.md` §6).

## See also

Storybook: Application / Prompt modals. Related: [modal](modal.md),
[featured-icon](featured-icon.md), [button](button.md).
