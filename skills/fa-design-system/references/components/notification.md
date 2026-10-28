# Notification

A short message card that confirms or reports something that just happened, usually shown as a
toast in the top right with `notify()` and gone after 6 seconds. Built on `sonner`. Figma:
Notification (Type = Primary icon / Gray icon / Error / Warning / Success / No icon / Avatar /
Image / Progress indicator).

```ts
import { Notification, NotificationToaster, type NotificationType, notify } from "fa-design-system/components/application/notifications/notification";
```

## Setup

Mount `<NotificationToaster />` **once** at the app root (layout), not per page or per component.
Without it `notify()` shows nothing. It places toasts top right, 24px in (8px on mobile).

```tsx
// app/layout.tsx
<body>
    {children}
    <NotificationToaster />
</body>
```

## Use when

- Confirming an action: "Lagt til i favoritter", "Varselet er lagret", "Artikkelen er delt".
- Reporting a background result: "Eksporten er klar", an upload in progress (`type="progress"`).
- Something new from a person or with an image (a reply, a new article): `avatar` / `image`.

## Use something else when

- The message is about the page and must stay: `Alert`.
- The reader must decide before going on: `PromptModal`.
- An error on a field: the field's `isInvalid` + `hint`.

## Rules

- **notification-toaster-once** MUST Mount exactly one `NotificationToaster`. Because two toasters
  show every toast twice.
- **notification-type-meaning** MUST Pick `type` by meaning: `success` done, `error` failed,
  `warning` risk, `brand` (default) news, `gray` neutral or system, `none` text only. Because the
  icon color is the visual signal.
- **notification-short** MUST Keep `title` to one line and `description` to one or two sentences.
  Because the toast disappears after 6 s (`duration` in the second argument changes it).
- **notification-no-only-toast** NEVER Put the only copy of important information or an
  irreversible result in a toast. Because it vanishes and screen readers may miss it; also update
  the page.
- **notification-actions** SHOULD Use at most two `size="sm"` buttons: `link-gray` (dismiss) +
  `link-color` (main), e.g. "Angre" / "Se varsler". Dismiss in their handler with
  `toast.dismiss(id)` (`import { toast } from "sonner"`), `id` being `notify()`'s return value.
  Because buttons in `actions` don't close the toast by themselves.
- **notification-progress** SHOULD For `type="progress"`, pass `progress` (0–100). `notify()` can't
  update a toast in place; render `<Notification type="progress" progress={n} />` yourself (or
  re-issue with sonner's `toast.custom(…, { id })`) while the value changes.
- **notification-inline-close** MUST Pass `onClose` when you render `<Notification>` inline and it
  should be closable (`notify()` wires it for you).

## Props

| Prop                | Values                                                                                        | Default |
| :------------------ | :-------------------------------------------------------------------------------------------- | :------ |
| `title`             | ReactNode (required)                                                                          |         |
| `description`       | ReactNode                                                                                     |         |
| `type`              | `brand` · `gray` · `error` · `warning` · `success` · `none` · `avatar` · `image` · `progress` | `brand` |
| `actions`           | ReactNode (buttons)                                                                           |         |
| `icon`              | icon component, overrides the type's icon; ignored for `none`, `avatar` and `image`           |         |
| `avatarSrc`, `meta` | for `avatar` only (meta = "for 2 min siden"); the avatar always shows the online dot          |         |
| `imageSrc`          | for `image` (decorative, `alt=""`)                                                            |         |
| `progress`          | 0–100, for `progress`                                                                         | `0`     |
| `onClose`           | shows the close button (inline use)                                                           |         |
| `className`         | classes on the card                                                                           |         |

`notify(props, { duration? })`: same props without `onClose`; returns the toast id. Width 400px
(`image`: 496px), full width on mobile.

## Accessibility

- The card has `role="status"` (polite). The close button is named "Dismiss" (English, fixed in
  code).

## Example

```tsx
const onSave = async () => {
    await saveAlert({ ticker: "NHY", above: 72.5 });
    const id = notify({
        type: "success",
        title: "Kursvarsel lagret",
        description: "Du får beskjed når Norsk Hydro passerer 72,50 kr.",
        actions: (
            <>
                <Button size="sm" color="link-gray" onPress={() => toast.dismiss(id)}>
                    Lukk
                </Button>
                <Button size="sm" color="link-color" href="/varsler">
                    Se varsler
                </Button>
            </>
        ),
    });
};
```

## See also

Storybook: Application / Notifications. Related: [alert](alert.md), [button](button.md),
[progress](progress.md).
