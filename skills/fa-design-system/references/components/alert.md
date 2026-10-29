# Alert

An in-page message that stays until the situation changes or the reader closes it: a card
(`floating`) or a banner across the top of the page (`full-width`). Color only changes the small
featured icon. Figma: Alert (Color × Size = Floating / Full-width).

```ts
import { Alert, type AlertColor } from "fa-design-system/components/application/alerts/alert";
```

## Use when

- Something about this page or account needs attention: "Betalingen for abonnementet feilet",
  "Kursene er forsinket 15 minutter", "Børsen er stengt i dag (2. pinsedag)".
- A site-wide notice above the header or content: `variant="full-width"`.
- A form-level error summary above the fields.

## Use something else when

- Confirming an action the reader just did ("Lagret", "Lagt til i favoritter"): `notify()` toast
  ([notification](notification.md)).
- An error on one field: the field's `isInvalid` + `hint`.
- A list or panel has nothing to show, or failed to load: `EmptyState` / `ErrorState`.
- A decision the reader must make before going on: `PromptModal`.
- A short status label: `Badge`.

## Rules

- **alert-color-meaning** MUST Pick `color` by meaning: `error` failed or blocked, `warning`
  attention or risk, `success` a lasting good state, `brand` news or an offer, `gray` (default)
  neutral info. Because the icon is the only visual signal; the card itself stays neutral.
- **alert-title-says-it** MUST Put the whole point in `title` (one sentence) and details or the
  next step in `description`. Because the title is the bold line people read.
- **alert-actions-buttons** MUST Pass actions as library `Button`s, matching the variant: floating
  `size="sm"` with `color="link-gray"` (dismiss / secondary) + `"link-color"` (main); full-width
  `size="md"` with `secondary` + `primary`. Because those are the Figma pairs.
- **alert-close** SHOULD Pass `onClose` only when the alert can really go away, and remove it from
  state in the handler. Because the alert has no internal open state; the × only calls `onClose`.
- **alert-sparingly** SHOULD Show at most one alert per region. Because every alert has
  `role="alert"` and is read out as soon as it appears; several at once compete.
- **alert-icon-override** SHOULD Keep the default icon (`Info`, `Alert`, `Success`); pass `icon` only
  for a more specific one from `fa-icons` (`Clock` for delays, `Lock` for access).
- **alert-no-restyle** NEVER Tint the card with `className` (`bg-error-primary`). Because Figma's
  alerts are white with a colored icon; `className` is for layout (`mb-6`).

## Props

| Prop          | Values                                                                      | Default    |
| :------------ | :-------------------------------------------------------------------------- | :--------- |
| `title`       | ReactNode (required)                                                        |            |
| `description` | ReactNode                                                                   |            |
| `color`       | `gray` · `brand` · `error` · `warning` · `success`                          | `gray`     |
| `variant`     | `floating` (card) · `full-width` (banner, bottom border, `max-w-container`) | `floating` |
| `actions`     | ReactNode (buttons)                                                         |            |
| `icon`        | icon component, overrides the color's icon                                  |            |
| `onClose`     | `() => void`; shows the close button                                        |            |
| `className`   | layout                                                                      |            |

## Notes

- The full-width banner hides its icon below `md` and stacks the actions full width.
- The banner's content is `max-w-container` (1280 px) inside the component, so on a 1376 px page
  (`page-patterns.md`, Page width) it is narrower than the content below it. Known; don't pad it by hand.

## Accessibility

- `role="alert"` (assertive). Render an alert when the condition is known; don't mount a page full
  of them on load.
- The close button's accessible name is the English "Dismiss" (fixed in code); if that matters for
  the page, report it rather than hiding the button.

## Example

```tsx
<Alert
    color="error"
    title="Betalingen for abonnementet ditt feilet"
    description="Kortet som slutter på 4242 er utløpt. Oppdater betalingsmåten innen 30. oktober for å beholde tilgangen."
    actions={
        <>
            <Button size="sm" color="link-gray" onPress={() => setShow(false)}>Senere</Button>
            <Button size="sm" color="link-color" href="/konto/betaling">Oppdater kort</Button>
        </>
    }
    onClose={() => setShow(false)}
/>

<Alert variant="full-width" color="warning" title="Oslo Børs er stengt i dag." description="Kursene viser sluttkurs fra fredag 22. oktober." />
```

## See also

Storybook: Application / Alerts. Related: [notification](notification.md),
[empty-state](empty-state.md), [prompt-modal](prompt-modal.md), [featured-icon](featured-icon.md).
