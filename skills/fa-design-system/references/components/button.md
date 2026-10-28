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
| `noTextPadding`        | boolean (drops the label's `px-0.5`; always on for link colors, `false` has no effect there)                                                                      |           |

Plus React Aria `Button` props (`onPress`, `type`, `form`, …) or `Link` props when `href` is set.
Use `onPress`, not `onClick`.

| Part            | Props                                                                                                    | Default                |
| :-------------- | :------------------------------------------------------------------------------------------------------- | :--------------------- |
| `ButtonUtility` | `size`: `xs` (16px icon) · `sm` (20px icon)                                                              | `sm`                   |
|                 | `color`: `secondary` · `tertiary`                                                                        | `secondary`            |
|                 | `icon`, `tooltip` (also the `aria-label`), `tooltipPlacement`, `isDisabled`, `href` (renders a link)     | `tooltipPlacement` top |
| `CloseButton`   | `size`: `sm` (36px) · `md` (40px) · `lg` (44px)                                                          | `sm`                   |
|                 | `theme`: `light` · `dark` (on dark or image backgrounds)                                                 | `light`                |
|                 | `label`: the `aria-label` (English "Close" when not set)                                                 |                        |
|                 | `slot`: React Aria slot; `"close"` closes a parent `Dialog` / `Modal` without a handler, `null` opts out | `"close"`              |
|                 | plus React Aria `Button` props (`onPress`)                                                               |                        |

## Accessibility

- Focus ring is built in; don't remove it.
- Loading puts the button in React Aria's pending state (`isPending`: non-interactive, still
  focusable); announce the result elsewhere (a `notify()` toast or inline
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
