# Button

Starts an action ("Lagre", "Abonner"), or links somewhere styled as an action ("Se alle").
Figma: Buttons/Button, Buttons/Button destructive (a `color` here), Buttons/Button utility,
Buttons/Button close X.

```ts
import { Button } from "fa-design-system/components/base/buttons/button";
import { ButtonUtility } from "fa-design-system/components/base/buttons/button-utility";
import { CloseButton } from "fa-design-system/components/base/buttons/close-button";
```

## Use when

- The person triggers an action, submits a form, or opens an overlay.
- A standalone link should look like an action: `href` + `color="link-color"` or `"link-gray"`.

## Use something else when

- Icon-only action in a toolbar or row (edit, more, copy): `ButtonUtility` with a `tooltip`.
- Closing a modal, alert or panel: `CloseButton`.
- Choosing one of a few views or filters (1D / 1U / 1Å): `ButtonGroup`.
- A command list behind a button: `Dropdown`.
- A setting that applies at once: `Toggle`.
- A link inside running text: a plain `<a>` in `prose`.

## Rules

- **button-one-primary** SHOULD One `primary` per view or section; the rest `secondary`,
  `tertiary` or a link color. Because one filled button tells the reader where to go next.
- **button-destructive** MUST Use `primary-destructive` only for the confirming action of a
  destructive flow (usually in a `PromptModal`); use `secondary-destructive` / `tertiary-destructive`
  / `link-destructive` to start one. Because a red fill on the first click makes deleting look like
  the expected path.
- **button-states-by-prop** MUST Use `isDisabled` and `isLoading`, never classes. `isLoading` makes
  the button non-interactive; add `showTextWhileLoading` when the label should stay. Because the
  disabled look uses Figma's `bg-disabled_subtle` / `fg-disabled` tokens, not `opacity-50`.
- **button-icons** MUST Pass icons as a component reference (`iconLeading={Plus}`), or as JSX with
  `data-icon` (`iconLeading={<Plus data-icon className="size-5" />}`). Because the button sizes and
  colors icons only through those hooks.
- **button-icon-label** MUST Give an icon-only button an `aria-label` (or use `ButtonUtility` with
  `tooltip`). Because screen readers otherwise announce "button".
- **button-no-restyle** NEVER Override fill, border, radius or padding with `className`; `className`
  is for layout (`w-full`, `self-start`, margins). Because sizes and colors match Figma exactly.
- **button-verb-label** SHOULD Say what pressing it does ("Last ned rapport", "Start abonnement"),
  capitalizing only the first word as Norwegian does. Avoid vague labels like "OK" or "Klikk her".

## Props

| Prop                   | Values                                                                                                                                                            | Default   |
| :--------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------- |
| `size`                 | `sm` (36px) · `md` · `lg` · `xl`                                                                                                                                  | `sm`      |
| `color`                | `primary` · `secondary` · `tertiary` · `link-color` · `link-gray` · `primary-destructive` · `secondary-destructive` · `tertiary-destructive` · `link-destructive` | `primary` |
| `iconLeading`          | icon component or element                                                                                                                                         |           |
| `iconTrailing`         | icon component or element                                                                                                                                         |           |
| `isDisabled`           | boolean                                                                                                                                                           |           |
| `isLoading`            | boolean (spinner, non-interactive)                                                                                                                                |           |
| `showTextWhileLoading` | boolean                                                                                                                                                           |           |
| `href`                 | string: renders a link (React Aria `Link`)                                                                                                                        |           |
| `noTextPadding`        | boolean (on by default for link colors)                                                                                                                           |           |

Plus React Aria `Button` props (`onPress`, `type`, `form`, …) or `Link` props when `href` is set.
Use `onPress`, not `onClick`.

`ButtonUtility`: `size` `xs` · `sm`, `color` `secondary` · `tertiary`, `icon`, `tooltip`,
`tooltipPlacement`.

## Accessibility

- Focus ring is built in; don't remove it.
- Loading sets the button disabled; announce the result elsewhere (a `notify()` toast or inline
  text) when the action finishes.
- `type="submit"` on the submit button of a form.

## Example

```tsx
<div className="flex gap-3">
    <Button color="secondary" onPress={close}>
        Avbryt
    </Button>
    <Button iconLeading={Check} isLoading={saving} showTextWhileLoading type="submit">
        Lagre endringer
    </Button>
</div>

<Button href="/bors" color="link-color" iconTrailing={ArrowRight}>
    Se alle aksjer
</Button>
```

## See also

Storybook: Base components / Buttons / Button. Related: [button-group](button-group.md),
[dropdown](dropdown.md), [toggle](toggle.md).
