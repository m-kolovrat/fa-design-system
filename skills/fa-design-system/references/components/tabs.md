# Tabs

Switches between panels of content on the same page, or between the pages of one section (Oversikt
/ Nøkkeltall / Nyheter / Forum on a stock page). Figma: Horizontal tabs, Vertical tabs (both are `Tabs`, with `orientation`).

```ts
import { Tabs } from "fa-design-system/components/application/tabs/tabs";

// also exported by name: TabList (= Tabs.List), Tab (= Tabs.Item), TabPanel (= Tabs.Panel)
```

## Use when

- Content splits into a few peer sections and only one should show at a time.
- A settings or profile screen with sections down the side (`orientation="vertical"`).
- Optionally, navigation between the pages of one section, such as the sub-pages of an instrument
  or of Bjellesauer: link tabs (see **tabs-as-links**).

## Use something else when

- Switching a view or filter of the same content (Liste / Kort): `ButtonGroup`. Chart periods
  (1D / 1M / 1Y): [period selector](period-selector.md).
- The site's main navigation (Børs, Forum, Bjellesauer): `SiteHeader`; in logged-in app screens,
  [app-navigation](app-navigation.md).
- Paging through a long list: [pagination](pagination.md).

## Rules

- **tabs-type-per-orientation** MUST Use a `type` that exists for the orientation: horizontal
  `button-brand` · `button-gray` · `button-border` · `button-minimal` · `underline`; vertical
  `button-brand` · `button-gray` · `button-border` · `button-minimal` · `line`. Because `underline` is
  horizontal-only and `line` vertical-only; there are no other types.
- **tabs-orientation-on-root** MUST Set `orientation` on `Tabs`, not only on `Tabs.List`. Because
  `Tabs` drives keyboard arrows and the list reads the orientation from it.
- **tabs-ids** MUST Give each `Tabs.Item` an `id` and the matching `Tabs.Panel` the same `id`
  (link tabs share one panel, see **tabs-as-links**).
  Because that pairs tab and panel for selection and `aria-controls`.
- **tabs-label** MUST Name the list with `aria-label` on `Tabs.List` ("Aksjeinformasjon").
  Because a tab list without a name is announced only as "tab list".
- **tabs-mobile** SHOULD Below `md`, show a `NativeSelect` with the same options and hide the tabs
  (`max-md:hidden`) when there are more than three or four tabs. Because tabs don't scroll or wrap,
  and the storybook demos use exactly this pattern.
- **tabs-type-by-place** MUST Pick the type by where the tabs sit, always `size="sm"`: near the top
  of the page, switching the whole content below (instrument sub-pages, Bjellesauer views):
  horizontal `type="underline"`; inside a card: `type="button-minimal"`, in the card body under the
  `CardHeader`. Because the same job then looks the same on every page.
- **tabs-as-links** Tabs can optionally be page navigation. The default is tabs that switch
  panels on one page; make them link tabs only when each tab has its own URL (the sub-pages of an
  instrument or of Bjellesauer). Then give each `Tabs.Item` an `href`, set `selectedKey` on `Tabs`
  from the current route, and render one `Tabs.Panel` with `id={selectedKey}` around the page
  content. Because each tab is then a real link (back button, open in new tab, shareable URL) with
  the same look and keyboard behavior.

    ```tsx
    <Tabs selectedKey={pathname}>
        <Tabs.List type="underline" aria-label="Equinor">
            <Tabs.Item id="/aksje/EQNR" href="/aksje/EQNR" label="Oversikt" />
            <Tabs.Item id="/aksje/EQNR/nyheter" href="/aksje/EQNR/nyheter" label="Nyheter" />
            <Tabs.Item id="/aksje/EQNR/forum" href="/aksje/EQNR/forum" label="Forum" />
        </Tabs.List>
        <Tabs.Panel id={pathname}>{children}</Tabs.Panel>
    </Tabs>
    ```

- **tabs-badge** SHOULD Use `badge` only for counts ("Nyheter 3"). Because badges are hidden below
  `md` and turn brand only on `underline`, `line` and `button-brand`.
- **tabs-no-restyle** NEVER Restyle selected or hover states with `className`; pick another `type`.
  Because the selected look matches Figma (and pagination's active page).

## Props

| Prop (`Tabs`)                      | Values                    | Default      |
| :--------------------------------- | :------------------------ | :----------- |
| `orientation`                      | `horizontal` · `vertical` | `horizontal` |
| `selectedKey`, `onSelectionChange` | controlled selection      |              |
| `defaultSelectedKey`               | uncontrolled start tab    | first tab    |
| `keyboardActivation`               | `manual` · `automatic`    | `manual`     |
| `disabledKeys`                     | ids                       |              |

| Prop (`Tabs.List`) | Values                                                 | Default        |
| :----------------- | :----------------------------------------------------- | :------------- |
| `type`             | see **tabs-type-per-orientation**                      | `button-brand` |
| `size`             | `sm` · `md`                                            | `sm`           |
| `fullWidth`        | boolean (tabs share the width)                         |                |
| `items`            | array; render with `{(tab) => <Tabs.Item {...tab} />}` |                |

`Tabs.Item`: `id`, `label` (or `children`), `icon`, `badge` (number or string), `isDisabled`,
`href`. `Tabs.Panel`: `id`, `children`, plus React Aria `TabPanel` props.

## Accessibility

- Arrow keys move between tabs; with the default `keyboardActivation="manual"` Enter or Space
  selects. Use `automatic` only when panels render instantly.
- Panels get a focus ring and are reachable with Tab after the list.

## Example

```tsx
const tabs = [
    { id: "oversikt", label: "Oversikt", icon: Grid },
    { id: "nokkeltall", label: "Nøkkeltall", icon: GraphLine },
    { id: "nyheter", label: "Nyheter", icon: BulletList, badge: 3 },
];

const [selected, setSelected] = useState<Key>("oversikt");

<NativeSelect
    aria-label="Velg visning"
    value={selected as string}
    onChange={(event) => setSelected(event.target.value)}
    options={tabs.map((tab) => ({ label: tab.label, value: tab.id }))}
    className="md:hidden"
/>
<Tabs selectedKey={selected} onSelectionChange={setSelected}>
    <Tabs.List type="underline" aria-label="Aksjeinformasjon for Equinor" items={tabs} className="max-md:hidden">
        {(tab) => <Tabs.Item {...tab} />}
    </Tabs.List>
    <Tabs.Panel id="oversikt" className="pt-6">…</Tabs.Panel>
    <Tabs.Panel id="nokkeltall" className="pt-6">…</Tabs.Panel>
    <Tabs.Panel id="nyheter" className="pt-6">…</Tabs.Panel>
</Tabs>
```

Imports for the example: `NativeSelect` from `fa-design-system/components/base/select/select-native`,
`type Key` from `react-aria-components`, icons from `fa-icons`.

## See also

Storybook: Application / Tabs. Related: [button-group](button-group.md),
[app-navigation](app-navigation.md), [select](select.md).
