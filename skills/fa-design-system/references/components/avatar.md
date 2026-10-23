# Avatar

A person's or company's picture, with initials or an icon when there is no image.
`AvatarLabelGroup` adds a name and a second line; `AvatarProfilePhoto` is the large photo on a
profile page. Figma: Avatars/Avatar, Avatars/Avatar label group, Avatars/Avatar profile photo.

```ts
import { Avatar } from "@/components/base/avatar/avatar";
import { AvatarLabelGroup } from "@/components/base/avatar/avatar-label-group";
import { AvatarProfilePhoto } from "@/components/base/avatar/avatar-profile-photo";
import { AvatarAddButton, AvatarCompanyIcon } from "@/components/base/avatar/base-components";
import { AvatarCount } from "@/components/base/avatar/base-components/avatar-count";
import { getInitials } from "@/components/base/avatar/utils";
```

## Use when

- A byline, comment, account menu or table row shows who someone is.
- A person needs name + role or e-mail next to the picture: `AvatarLabelGroup`.
- The header of a profile or journalist page: `AvatarProfilePhoto`.

## Use something else when

- A company or fund in a list: a logo from `fa-icons` if one exists, else `Avatar` with initials
  (`initials="EQ"`) and `rounded={false}`.
- An icon on a tinted shape for emphasis, not a person: `FeaturedIcon`.
- A row of several people (avatar group): **not in code yet**. Stand-in: `Avatar`s with `border` in
  a `flex -space-x-2` row, the overflow as `<Avatar initials="+4" />`, and `AvatarAddButton` at the
  end. Tell the person it has no library component.

## Rules

- **avatar-alt** MUST Pass `alt` with the person's name when `src` is set, and `alt=""` when the name
  is already printed next to it (as in `AvatarLabelGroup`). Because the image is otherwise read as
  an unnamed graphic, or the name is read twice.
- **avatar-fallback** MUST Pass `initials` (use `getInitials(name)`) alongside `src` for people.
  Because a broken image falls back to initials, then to the `User` icon; initials are more useful.
- **avatar-one-indicator** SHOULD Use only one of `status`, `verified`, `count` and `badge`. Because
  the avatar shows the first that is set, in that order, and drops the rest.
- **avatar-count-is-a-dot** NEVER Use `count` or `AvatarCount` for "+N more". Because it is a 14px
  red notification bubble in the corner, not an overflow avatar.
- **avatar-label-group-size** MUST Pass `size` to `AvatarLabelGroup` (`sm` · `md` · `lg` · `xl`);
  it is required, and `xs` / `2xl` don't exist there.
- **avatar-focusable** SHOULD Set `focusable` when the avatar is the only content of a link or button
  (wrapper with the `group` class). Because the focus ring is drawn on the avatar through
  `group-focus-visible`.
- **avatar-no-restyle** NEVER Change size or fill with `className`; use `size`. `className` is for
  layout and the `-space-x-*` overlap.

## Props

| Prop              | Values                                                                   | Default |
| :---------------- | :----------------------------------------------------------------------- | :------ |
| `size`            | `xs` (24px) · `sm` (32) · `md` (40) · `lg` (48) · `xl` (56) · `2xl` (64) | `md`    |
| `src` / `alt`     | string                                                                   |         |
| `initials`        | string                                                                   |         |
| `placeholderIcon` | icon component (instead of `User`)                                       |         |
| `placeholder`     | ReactNode                                                                |         |
| `rounded`         | boolean (`false` = rounded square)                                       | `true`  |
| `border`          | boolean (outer ring, for overlapping rows)                               |         |
| `status`          | `online` · `offline`                                                     |         |
| `verified`        | boolean (blue tick)                                                      |         |
| `count`           | number (red bubble)                                                      |         |
| `badge`           | ReactNode, e.g. `<AvatarCompanyIcon size="md" src=… />`                  |         |
| `focusable`       | boolean                                                                  | `false` |

`AvatarLabelGroup`: all of the above plus `title`, `subtitle` (both required), `avatarClassName`;
it always draws `border`. `AvatarProfilePhoto`: `size` `sm` (72px) · `md` (96) · `lg` (160), plus
`src`, `alt`, `initials`, `placeholderIcon`, `placeholder`, `status`, `verified`, `badge`.
`AvatarAddButton`: `size` `xs` · `sm` · `md`, `title` (tooltip and label; default is English "Add
user", so always pass one), React Aria `Button` props (`onPress`).

## Accessibility

- `status` is visual only. If being online matters, say it in text too ("Pålogget").
- `AvatarAddButton` gets its accessible name and tooltip from `title`.

## Example

```tsx
<AvatarLabelGroup
    size="md"
    src="/forfattere/ingrid-solberg.jpg"
    alt=""
    initials={getInitials("Ingrid Solberg")}
    title="Ingrid Solberg"
    subtitle="Børsjournalist"
/>

<div className="flex -space-x-2">
    <Avatar size="sm" border src="/forfattere/lars-haugen.jpg" alt="Lars Haugen" initials="LH" />
    <Avatar size="sm" border initials="KB" />
    <Avatar size="sm" border initials="+4" />
    <AvatarAddButton size="sm" title="Legg til deltaker" className="ml-2" />
</div>
```

## Figma parity

Avatar group (xs / sm / md, "+N", add button) exists in Figma but not in code. The online indicator
has sizes up to `4xl` in code (used by `AvatarProfilePhoto`), Figma only to `2xl`.

## See also

Storybook: Base components / Avatars. Related: [featured-icon](featured-icon.md),
[dropdown](dropdown.md), [badge](badge.md).
