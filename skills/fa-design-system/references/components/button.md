# Button

Starts an action ("Lagre", "Abonner"), or links somewhere styled as an action ("Se alle").
Figma: Buttons/Button, Buttons/Button destructive (a `color` here), Buttons/Button utility,
Buttons/Button close X, Social button, Mobile app store badge.

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
- **button-on-press** MUST Use `onPress`, not `onClick`. `Button` takes React Aria `Button` props
  (`onPress`, `type`, `form`, …), or `Link` props when `href` is set. Because `onPress` handles
  touch, keyboard and pointer alike.
- **button-close-label** MUST Pass `label="Lukk"` to `CloseButton`. Because its accessible name
  otherwise defaults to English "Close".
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

`ButtonUtility`:

| Prop               | Values                                          | Default     |
| :----------------- | :---------------------------------------------- | :---------- |
| `size`             | `xs` (16px icon) · `sm` (20px icon)             | `sm`        |
| `color`            | `secondary` (bordered) · `tertiary` (no border) | `secondary` |
| `icon`             | icon component or element                       |             |
| `tooltip`          | string: the tooltip, and the accessible name    |             |
| `tooltipPlacement` | React Aria `Placement`                          | `top`       |
| `isDisabled`       | boolean (`opacity-50`)                          |             |
| `href`             | string: renders a link                          |             |

`CloseButton`:

| Prop    | Values                                          | Default   |
| :------ | :---------------------------------------------- | :-------- |
| `size`  | `sm` (36px) · `md` (40px) · `lg` (44px)         | `sm`      |
| `theme` | `light` · `dark` (on dark or image backgrounds) | `light`   |
| `label` | string: the accessible name                     | `"Close"` |
| `slot`  | string or `null` (`"close"` closes a `Dialog`)  | `"close"` |

`SocialButton`:

| Prop       | Values                                                          | Default |
| :--------- | :-------------------------------------------------------------- | :------ |
| `social`   | `google` · `facebook` · `apple` · `twitter` (required)          |         |
| `theme`    | `brand` (service fill) · `color` (white, colored logo) · `gray` | `brand` |
| `size`     | `md` · `lg`                                                     | `lg`    |
| `children` | the label; leave out for icon-only                              |         |
| `disabled` | boolean (not `isDisabled`)                                      |         |
| `href`     | string: renders a link                                          |         |

App store badges (`GooglePlayButton`, `AppStoreButton`, `GalaxyStoreButton`, `AppGalleryButton`;
`GooglePlayWhiteButton` in the black set only):

| Prop         | Values                      | Default |
| :----------- | :-------------------------- | :------ |
| `size`       | `md` (40px) · `lg` (44px)   | `md`    |
| `href`       | string                      | `"#"`   |
| `aria-label` | string (default is English) |         |

## Social and app store buttons

```ts
import { AppStoreButton, GooglePlayButton } from "fa-design-system/components/base/buttons/app-store-buttons";
// Outline badges: no fill, drawn in the text color (`text-fg-primary`):
import { AppStoreButton as AppStoreButtonOutline } from "fa-design-system/components/base/buttons/app-store-buttons-outline";
import { SocialButton } from "fa-design-system/components/base/buttons/social-button";
```

- `SocialButton` is the "Logg inn med …" button of a login form: stack them `w-full` in a column,
  or use icon-only ones in a row with an `aria-label` each. Disable it with `disabled`.
- App store badges link to the app's store page: always pass `href`, and an `aria-label` in
  Norwegian ("Last ned i App Store"). Their artwork is the stores' English badge.

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
