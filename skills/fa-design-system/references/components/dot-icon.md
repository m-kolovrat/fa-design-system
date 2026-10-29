# Dot and play button icons

Two small drawings that aren't in `fa-icons`: `Dot`, a filled circle in `currentColor` that marks a
status next to text (Åpen, Live, Betalt), and `PlayButtonIcon`, an 80 px frosted disc with a play
or pause glyph for the middle of a video poster. Figma: \_Dot (`Dot`); the play button is
code-only.

```ts
import { Dot } from "fa-design-system/components/foundations/dot-icon";
import { PlayButtonIcon } from "fa-design-system/components/foundations/play-button-icon";
```

## Use when

- The library already places `Dot` for you: `BadgeWithDot`, `Tag` with `dot`, Select
  `Type=Dot leading` and Button group `Icon=Dot`. Pass it yourself only in those slots
  (`icon={<Dot … />}` on `Select` and its items, `iconLeading={<Dot … />}` on a
  `ButtonGroupItem`) or in a custom status line that a badge can't hold ("Børsen er åpen" in a
  header).
- `PlayButtonIcon`: over a video thumbnail or an article's video teaser, inside the control that
  opens or plays the video.

## Use something else when

- A status with its own label: `BadgeWithDot` (sizes and colors are done, see [badge](badge.md)).
- A removable or selectable label with a dot: `Tag` with `dot` (see [tags](tags.md)).
- A live marker: there is no live indicator component yet; `references/page-patterns.md` gives the
  stand-in. Don't animate a `Dot` on your own.
- A bullet or separator in text ("Oslo · 14:32"): typography, not a `Dot`.
- A play or pause glyph in a button label or a toolbar: the `fa-icons` icon directly.
- Player controls (seek, volume, fullscreen): there is no video player (`docs/figma-parity.md`
  §2). Ask before building one.

## Rules

- **dot-icon-color-token** MUST Color `Dot` with a text token in `className`
  (`text-fg-success-secondary`, `text-fg-error-secondary`, `text-fg-warning-secondary`,
  `text-fg-quaternary`). Because it fills and strokes with `currentColor` and has no color prop;
  every library slot uses `text-fg-success-secondary` for "on".
- **dot-icon-size-in-slots** MUST In a `Select` or `ButtonGroupItem` slot, size the dot with a
  class, as the library's demos do: `<Dot className="size-2.5 text-fg-success-secondary" />` in
  `Select` (`size-2` at `size="sm"`), `<Dot className="mx-0.75 size-2 text-fg-success-secondary" />`
  in a `ButtonGroupItem`. Because those slots size only component-reference icons; a JSX dot keeps
  its own 8 or 10 px unless a class overrides it.
- **dot-icon-text-carries-meaning** MUST Pair the dot with a word ("Åpen", "Stengt", "Live") and
  mark it `aria-hidden`. Because the SVG has no title, and color alone isn't readable.
- **dot-icon-not-a-bullet** NEVER Use `Dot` as a list bullet or a spacer between inline items.
  Because that's text (`·`, `list-disc`), and a colored dot reads as a status.
- **play-button-icon-wrap-in-control** MUST Put `PlayButtonIcon` inside a real control (`AriaButton`
  or `AriaLink` with `aria-label="Spill av video"`), with `group` on the control and
  `pointer-events-none` on the disc. Because it's a `div` with no role, focus or keyboard handling;
  its `group-hover:` style brightens it when the control is hovered.
- **play-button-icon-on-image** MUST Center it over an image or video poster (`absolute inset-0
m-auto`). Because its frosted `bg-alpha-white/30 backdrop-blur` disc and white glyph only read on
  a picture; on a plain surface it looks like a loading indicator.
- **play-button-icon-state** SHOULD Pass `isPlaying` from the player so the glyph flips to pause.
  Because it's the only prop; the disc holds no state.
- **play-button-icon-size** SHOULD Keep the default 80 px (`size-20`); shrink with `className`
  (`size-14`) only on small teasers. Because the glyph is a fixed 20 px and a disc under about 48 px
  crowds it.

## Props

### Dot

| Prop        | Values                                                     | Default |
| :---------- | :--------------------------------------------------------- | :------ |
| `size`      | `sm` (8 px, radius 2.5) · `md` (10 px, radius 4)           | `md`    |
| `className` | color (`text-*`); a size class (`size-2`) overrides `size` |         |

Plus attributes spread onto the `<svg>` (`aria-hidden`, `style`). One `circle`, `currentColor`
fill and stroke.

### PlayButtonIcon

| Prop        | Values                                                                       | Default |
| :---------- | :--------------------------------------------------------------------------- | :------ |
| `isPlaying` | boolean: `true` shows the pause glyph                                        | `false` |
| `className` | classes on the disc (`size-20 rounded-full bg-alpha-white/30 backdrop-blur`) |         |

Plus `div` attributes. `onClick` works but gives no keyboard access or role; wrap it (see rules).
Glyph: 20 px, white; hover `bg-alpha-white/50`, also via a parent `group`.

## Accessibility

- `Dot` is decorative: `aria-hidden`, with the status in text.
- `PlayButtonIcon` has no semantics of its own. The wrapping control carries the label, the focus
  ring and the keyboard behavior.

## Example

```tsx
<span className="inline-flex items-center gap-1.5 text-sm font-medium text-secondary">
    <Dot size="sm" className="text-fg-success-secondary" aria-hidden />
    Børsen er åpen
</span>

<Select label="Marked" placeholder="Velg marked" icon={<Dot className="size-2.5 text-fg-success-secondary" />}>
    <Select.Item id="ose" icon={<Dot className="size-2.5 text-fg-success-secondary" />}>
        Oslo Børs
    </Select.Item>
    <Select.Item id="omx" icon={<Dot className="size-2.5 text-fg-success-secondary" />}>
        Nasdaq Stockholm
    </Select.Item>
</Select>

<AriaButton
    aria-label="Spill av: Equinor-sjefen om kvartalstallene"
    onPress={play}
    className="group relative block aspect-video w-full overflow-hidden rounded-xl"
>
    <img src="/images/equinor-intervju.jpg" alt="" className="size-full object-cover" />
    <PlayButtonIcon isPlaying={isPlaying} className="pointer-events-none absolute inset-0 m-auto" />
</AriaButton>
```

`AriaButton` is `import { Button as AriaButton } from "react-aria-components";`.

## Figma parity

`Dot` is Figma's `_Dot` (`docs/figma-parity.md` §1, named differently): a part inside Badge, Tag,
Select and Button group, not a component to place on its own. `PlayButtonIcon` is code-only (§3,
small marketing helpers: accept as code-only, or remove); nothing in the library uses it. Neither
has a Storybook story of its own.

## See also

Storybook: `Dot` appears in the Badges, Tags, Select and Button groups stories; the play button
isn't shown. Related: [badge](badge.md), [tags](tags.md), [select](select.md),
[button-group](button-group.md), [shared-assets](shared-assets.md), [carousel](carousel.md).
