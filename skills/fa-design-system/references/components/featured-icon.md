# Featured icon

An icon on a tinted circle or tile that marks the topic or tone of a block (a modal header, an
empty state, a feature list). Decorative. Figma: Featured icon, Featured icon outline (a `theme`
here).

```ts
import { FeaturedIcon } from "fa-design-system/components/foundations/featured-icon/featured-icon";
```

## Use when

- The header of a `PromptModal` (`icon={<FeaturedIcon … size="lg" />}`).
- A feature or benefit list ("Sanntidskurser", "Børsvarsler") where each item gets an icon.
- A custom card or section that needs the same emphasis as the library's alerts and states.

## Use something else when

- An empty list or a failed load: `EmptyState` / `ErrorState` (they draw the featured icon).
- An in-page message: `Alert` (it draws its own `sm` featured icon from `color`).
- A person or company: `Avatar`.
- An icon in running text, a button or an input: the bare `fa-icons` component.
- The icon is the action: `ButtonUtility` or `Button` with an icon.

## Rules

- **featured-icon-color-meaning** MUST Match `color` to the message: `success` done, `error`
  destructive or failed, `warning` attention, `brand` neutral-positive, `gray` neutral. Because the
  same color means the same thing in modals, alerts and states.
- **featured-icon-modern-gray** MUST Use `theme="modern"` and `theme="modern-neue"` only with
  `color="gray"`. Because `modern-neue` has no icon or ring color for the other colors (it renders
  broken), and `modern` is specified gray-only in Figma and the stories.
- **featured-icon-light-default** SHOULD Use `theme="light"` (the library's default for modals,
  alerts and states). Use `modern` (gray) for neutral UI tiles such as upload and radio cards, as
  the library does. `gradient`, `dark` and `outline` only when the Figma frame shows them.
- **featured-icon-icon-prop** MUST Pass `icon` as a component reference (`icon={Bell}`). Because
  the component tags it `data-icon` and sizes it per `size`; a JSX element is wrapped but not sized.
- **featured-icon-decorative** MUST Keep the meaning in the text next to it (title, message).
  Because the icon is `aria-hidden` and the wrapper is a plain `div`.

## Props

| Prop    | Values                                                                 | Default |
| :------ | :--------------------------------------------------------------------- | :------ |
| `color` | `brand` · `gray` · `success` · `warning` · `error` (required in types) | `brand` |
| `theme` | `light` · `gradient` · `dark` · `modern` · `modern-neue` · `outline`   | `light` |
| `size`  | `sm` (32px) · `md` (40) · `lg` (48) · `xl` (56)                        | `sm`    |
| `icon`  | icon component (or element)                                            |         |

Also `className`, `children`, `ref`.

## Shapes

`light`, `gradient` and `outline` are round; `dark`, `modern` and `modern-neue` are rounded squares.
`outline` draws two faint rings outside its box, so leave room around it.

## Accessibility

- Decorative only. Never use a featured icon as the only label of an action or a status.

## Example

```tsx
<ul className="grid gap-6 md:grid-cols-3">
    <li className="flex flex-col gap-3">
        <FeaturedIcon icon={Bell} color="brand" theme="light" size="md" />
        <h3 className="text-md font-semibold text-primary">Børsvarsler</h3>
        <p className="text-sm text-tertiary">Få beskjed når EQNR eller DNB beveger seg mer enn 3 %.</p>
    </li>
    <li className="flex flex-col gap-3">
        <FeaturedIcon icon={GraphUp} color="brand" theme="light" size="md" />
        <h3 className="text-md font-semibold text-primary">Sanntidskurser</h3>
        <p className="text-sm text-tertiary">Kurser fra Oslo Børs uten forsinkelse.</p>
    </li>
</ul>

<FeaturedIcon icon={Upload} color="gray" theme="modern" size="md" />
```

## See also

Storybook: Base components / Featured Icons. Related: [prompt-modal](prompt-modal.md),
[empty-state](empty-state.md), [alert](alert.md), [avatar](avatar.md).
