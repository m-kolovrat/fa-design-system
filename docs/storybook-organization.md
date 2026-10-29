# Storybook organization: proposal

Status: **proposal, not applied.** Nothing has been moved or rewritten yet. Approve or adjust the
decisions in [§6](#6-decisions-needed), then follow the migration plan.

---

## TL;DR

- Drop the "Base components" / "Application" split. Use three roots: **Foundations**, **Components** and **Patterns**.
- **One sidebar entry per component.** Its stories are the variants and states of that component. A
  folder exists only for a family of 3 or more related components (Buttons, Inputs, Charts), and
  everything inside a folder is a component, never a loose story.
- **Use a Controls dropdown for the props of one component** (size, state, icon, the add-on type of
  `InputGroup`). **Don't use one to switch between different components** (Input, Tag input, Pin
  input, …). They have different props, Figma frames and tests.
- To see all variants in one place, give each family a **docs page** (autodocs) and an **"All
  variants"** story, not a component-switching dropdown.
- **Leave the folders on disk as they are.** The sidebar comes from explicit `title`s. A small check
  in `npm test` keeps the titles within the allowed roots.

---

## 1. Audit: what's there today

**Scale:** 46 story files and 228 stories. 29 `*.demo.tsx` files feed 29 of the story files. The
other 17 render inline.

### Sidebar roots in use

| Root                                        | Files | Notes                                                                                                                   |
| :------------------------------------------ | ----: | :---------------------------------------------------------------------------------------------------------------------- |
| `Base components/…`                         |    24 | Includes `Featured Icons`, though the file lives in `components/foundations/`                                           |
| `Application/…`                             |    20 | `Charts` is 6 files merged into one title (25 stories). `Application navigation` is 2 files merged into one (9 stories) |
| `Foundations` / `Foundations/Payment Icons` |     2 | `Foundations` itself is a component node with 4 stories (Colors, Typography, Effects, Motion)                           |

### Inconsistencies found

1. **Several files share one title**, so unrelated stories end up in one flat list:
    - `Base components/Inputs`: `inputs.story.tsx` (14) + `pin-input.story.tsx` (7) = 21 stories. "Input OTP SM" sits next to "Tag inputs outer".
    - `Application/Charts`: 6 files, 25 stories (activity gauges, bars, lines, pies, progress circles, radar).
    - `Application/Application navigation`: header + sidebar, 9 stories.
2. **Nesting is uneven.** `Base components/Buttons/Button`, `…/Buttons/Social buttons` and
   `…/Inputs/Textarea` are nested. Inputs, Select and Dropdown menus aren't. As a result,
   `Base components/Inputs` is both a component (with stories) and a folder (holding `Textarea`).
3. **Names are inconsistent.** Most are plural ("Avatars", "Tooltips"), but some are singular
   ("Modal", "Select", "Form", "Slideout menu"). Most are sentence case, but there's "Featured
   Icons" and "Payment Icons". Story names repeat the component ("Verification code input sm") and
   mix size casing ("Input OTP SM" vs "… sm").
4. **`storySort` in `.storybook/preview.ts` is out of date.** It lists `Dropdowns`, `Textarea`,
   `Verification Code Input`, `Shared Assets`, `Modals`, `Command menus`, `Slideout menus` and
   `Empty states`, which don't match any current title. It doesn't list `Avatars`, `Checkboxes` and
   others, which fall back to alphabetical order. `Foundations` isn't in the order at all.
5. **Story format.** 45 of 46 files use CSF2 (`() => <Demo />` plus `.storyName`, untyped
   `export default`) with **no args**. Only `button.story.tsx` uses CSF3 with `args`/`argTypes` and a
   `Playground`.
6. **Docs aren't wired up.** `button.story.tsx` sets `tags: ["autodocs"]`, but
   `@storybook/addon-docs` isn't installed or registered, so no docs page renders.
   `@chromatic-com/storybook` is in `package.json` but not in `main.ts` addons.
7. **The `design` parameter isn't read by anything.** It holds `{ desktop, mobile }` Figma node ids
   on 20 stories in 4 files (`table`, `header-navigation`, `sidebar-navigation`, `featured-cards`).
   No addon or script reads it. It's metadata only.
8. **Config otherwise:** `main.ts` loads `components/**/*.story.tsx` with explicit titles (no
   auto-title). `preview.ts` sets fullscreen layout, two custom viewports (Mobile 375, Desktop
   1440), `withThemeByClassName` (light / dark via `.dark-mode`) and a `themes` list. `wrapper.tsx`
   loads Inter and blocks form submits and link clicks. `manager.ts` sets the Fa chrome theme.
9. **No story URLs are referenced in the repo** (searched for `?path=`, `linkTo` and story ids).

## 2. What current practice says

**Storybook docs (v10):**

- **Hierarchy:** Storybook's sidebar has category → folder → component → docs/story levels. Top-level
  groups render as non-collapsible uppercase **roots**. The docs suggest matching names to the file
  hierarchy for large Storybooks, but explicit `title`s are equally supported.
- **Stable ids:** a story id is `kebab(title)--kebab(exportName)`, so retitling breaks URLs. Meta
  can carry an `id` to keep the old URL after a move.
- **Autodocs:** turned on with the `autodocs` tag (per component or globally in `preview`). The page
  shows the description, the first story with live controls, the args table and every other story.
  It needs `@storybook/addon-docs`.
- **Tags:** `dev` (show in sidebar), `test`, `autodocs`, `manifest`. The documented pattern for
  variant-heavy components: individual variant stories get `!dev` (and optionally `!autodocs`), so
  they're still **tested** but **out of the sidebar**. A combined "all variants" story is visible
  and documented. The sidebar can also filter by tag.
- **`storySort`:** `order` plus `'*'` for "everything else", then `method: "alphabetical"`.

**Reference design systems:**

- **GitHub Primer:** `Components/Button` holds a `Playground` (args-driven) and a `Default`.
  `Components/Button/Features` holds one small story per feature (Primary, Danger, Leading visual,
  Disabled, …). `TextInput` follows the same pattern (`Playground`, `Default`, then
  `Features/WithLeadingVisual`, `…/Error`, `…/Small`, …). The sidebar is flat and alphabetical under
  one root, with one node per component.
- **Shopify Polaris:** one node per component under a single root. The first story is `All`, a
  gallery of every variant. Then there's one story per variant (Default, Critical, Plain, Primary,
  Slim, Large, FullWidth, …).
- **Atlassian / Radix / shadcn** keep their main docs on a separate site, not Storybook. Their
  navigation is still **one page per component**, grouped by a few purpose categories. None of them
  switches between different components inside one story.

**Takeaway:** the leading Storybooks use args and controls to **explore one component's props**.
They keep **one sidebar node per component** and **one story per meaningful variant**, which is what
visual tests and deep links use. "See everything at once" is handled by a gallery story or the docs
page.

## 3. Proposed sidebar

```
FOUNDATIONS
  Colors
  Typography
  Effects
  Motion
  Featured icon
  Payment icons

COMPONENTS
  Alert
  Avatar
  Badge
  Badge group
  Breadcrumbs
  Buttons/
    Button
    Button group
    Social button
    App store button
  Carousel
  Charts/
    Activity gauge
    Bar chart
    Line chart
    Pie chart
    Progress circle
    Radar chart
  Checkbox
  Date picker
  Dropdown
  File upload
  File upload trigger
  Form
  Inputs/
    Input
    Input group        ← leading/trailing add-ons: one dropdown, see §4
    Date input
    File input
    Number input
    Payment input
    Pin input
    Tag input
    Textarea
  Loading indicator
  Modal
  Notification
  Pagination
  Progress indicator
  Radio button
  Radio card
  Select
  Slideout menu
  Slider
  Table
  Tabs
  Tag
  Toggle
  Tooltip

PATTERNS
  Header navigation
  Sidebar navigation
  Featured cards
```

Inside every component node, stories follow the same order:

```
Docs            (autodocs page: description, Playground with controls, props table, every story)
Playground      (args-driven; every prop that's meaningful to toggle)
All variants    (optional gallery, à la Polaris "All", for at-a-glance review in light/dark)
Sizes / States / With leading icon / …   (one story per meaningful variant)
```

**Why this tree:**

- The **Base/Application split goes away.** It mirrors the Untitled UI Figma pages, but readers
  look for "Pagination", not "is pagination a base or application component?". Patterns is kept
  small: composed screens and sections, not reusable components.
- **Foundations** gets one node per token topic (it's currently one node with four stories),
  plus the icon and asset components.
- **Families get a folder only when there are 3 or more components**: Buttons, Charts, Inputs.
  Badge / Badge group and Radio button / Radio card already sort next to each other alphabetically,
  so they don't need a folder.

### Naming rules

1. **Roots:** only `Foundations`, `Components` and `Patterns`. Enforced by a check (see §7).
2. **Titles are singular, sentence case, and match the exported component:** `Button group`, not
   `Button groups`. `Date picker`, not `Date pickers`. `Payment icons` stays plural because it's a
   set of icons.
3. **Depth:** at most `Root/Family/Component`. A node has either stories or children, never both.
4. **One file per title.** Two story files must not share a `title`. Split them or merge them.
5. **Story names don't repeat the component name** and don't encode the size when a `Sizes` story
   already covers it. "Verification code input sm/md/lg" becomes one `Sizes` story under `Pin input`.
   "Input OTP SM/MD/LG" either becomes a second `Sizes` (if it's a different visual) or goes away.
6. **The first story is `Playground`** when the component has props worth exploring. Pure assets,
   such as payment icons, can start with `All`.
7. **Story ids stay derivable.** Don't set `name` overrides that drift away from the export name.
   Use the export name (`WithLeadingIcon`) and let Storybook start-case it.

## 4. Controls dropdown vs. separate stories

### Verdict on the "Inputs" dropdown idea

The idea is a single Inputs story whose Controls panel switches between Default, Leading icon,
Leading dropdown, Trailing button, Payment, Tags, Date, Number, File, …. That list covers **9
different components**: `Input`, `InputGroup`, `PaymentInput`, `InputDate`, `InputNumber`,
`InputFile`, `InputTags`, `InputTagsOuter` and `PinInput`. Here's how a switching dropdown fares:

| Concern                       | Effect of one switching story                                                                                                                                           |
| :---------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Controls panel                | Shows one union of props. `orientation` (Number), `maxTags` (Tags) and `length` (Pin) appear even when irrelevant. You'd need `argTypes.if` on every prop to hide them. |
| Docs / props table            | The autodocs props table describes one `component`. The others get no props documentation.                                                                              |
| Visual tests (Chromatic etc.) | Only the default args are snapshotted. Regressions in Tags, Date, File and the rest go unseen.                                                                          |
| Figma links                   | One story can hold one `design` link. Each input type has its own Figma component set.                                                                                  |
| Deep links & search           | Sidebar search for "tag input" finds nothing. `&args=variant:tags` URLs work but are fragile and undiscoverable.                                                        |
| Sidebar noise                 | ✅ Fewer entries. This is the real win, and the proposed tree gets most of it anyway (21 flat stories become 9 component nodes with 2–4 stories each).                  |

**Recommendation:** use a dropdown where the options are **values of a prop on the same
component**, and separate nodes where they're **different components**. The Figma file gives a good
test: if Figma models it as a **variant property** of one component set (Size, State, Type), it's a
control. If it's a **separate component set**, it gets its own node.

So for the Inputs family:

- `Inputs/Input` → Playground with `size`, `isDisabled`, `isInvalid`, `isRequired`, `label`,
  `hint`, `tooltip`, and an `icon` select (None / Mail / …).
- `Inputs/Input group` → Playground with an **`addon` select**: Leading text, Leading dropdown,
  Trailing dropdown, Trailing button. These are the same `InputGroup` with different
  `leadingAddon`/`trailingAddon`, so a dropdown is the right tool here. It replaces 4 of today's 14
  stories.
- Every other input type gets its own node with Playground and Sizes/States.
- An optional **`Inputs/Overview`** docs page (MDX) or `All variants` story shows every input type
  stacked, for the "see everything in one place" need.

### Code sketch

```tsx
// components/base/input/input.story.tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Mail01, SearchLg } from "@untitledui/icons";
import { Input } from "./input";

const meta = {
    title: "Components/Inputs/Input",
    component: Input,
    tags: ["autodocs"],
    parameters: { layout: "centered" },
    decorators: [
        (Story) => (
            <div className="w-80">
                <Story />
            </div>
        ),
    ],
    args: {
        size: "md",
        label: "Email",
        placeholder: "olivia@untitledui.com",
        hint: "This is a hint text to help user.",
        tooltip: "This is a tooltip",
        isRequired: true,
    },
    argTypes: {
        size: { control: "inline-radio", options: ["sm", "md", "lg"] },
        // Map readable labels to icon components so the control stays serializable.
        icon: { control: "select", options: ["None", "Mail", "Search"], mapping: { None: undefined, Mail: Mail01, Search: SearchLg } },
        isDisabled: { control: "boolean" },
        isInvalid: { control: "boolean" },
    },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const States: Story = {
    render: (args) => (
        <div className="flex flex-col gap-6">
            <Input {...args} />
            <Input {...args} isDisabled />
            <Input {...args} isInvalid hint="This is an error message." />
        </div>
    ),
};

export const Sizes: Story = {
    render: (args) => (
        <div className="flex flex-col gap-6">
            {(["sm", "md", "lg"] as const).map((size) => (
                <Input key={size} {...args} size={size} />
            ))}
        </div>
    ),
};
```

```tsx
// components/base/input/input-group.story.tsx: the "dropdown" case, done right
import type { ComponentProps, ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "@/components/base/buttons/button";
import { InputBase } from "./input";
import { InputGroup } from "./input-group";

const addons = {
    "Leading text": { leadingAddon: <InputGroup.Prefix>https://</InputGroup.Prefix> },
    "Leading dropdown": { leadingAddon: /* NativeSelect, as in inputs.demo.tsx */ null as ReactNode },
    "Trailing dropdown": { trailingAddon: /* … */ null as ReactNode },
    "Trailing button": { trailingAddon: <Button color="secondary">Copy</Button> },
} satisfies Record<string, Partial<ComponentProps<typeof InputGroup>>>;

type Args = ComponentProps<typeof InputGroup> & { addon: keyof typeof addons };

const meta = {
    title: "Components/Inputs/Input group",
    component: InputGroup,
    tags: ["autodocs"],
    args: { addon: "Leading text", label: "Website", hint: "This is a hint text to help user.", size: "md" },
    argTypes: {
        addon: { control: "select", options: Object.keys(addons) },
        leadingAddon: { table: { disable: true } },
        trailingAddon: { table: { disable: true } },
    },
    render: ({ addon, ...args }) => (
        <InputGroup {...args} {...addons[addon]}>
            <InputBase placeholder="www.untitledui.com" />
        </InputGroup>
    ),
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

// One story per add-on, kept for visual tests and Figma links, hidden from the sidebar.
export const LeadingText: Story = { args: { addon: "Leading text" }, tags: ["!dev"] };
export const TrailingButton: Story = { args: { addon: "Trailing button" }, tags: ["!dev"] };
// …
```

The `!dev` stories at the end let you have both: a short sidebar (Playground only), while every add-on
still gets a snapshot, a docs-page example and its own `design` link.

## 5. Disk layout vs. sidebar

**Recommendation: don't move files. Decouple the two with explicit titles.**

- `@/components/base/...` and `@/components/application/...` are the **import paths** that apps
  copy and use. Moving folders to match the sidebar breaks every consumer import, and it conflicts
  with the in-progress `visual-updates` branch. The sidebar is a docs concern and can change
  without touching code.
- Auto-titles (`titlePrefix` in `main.ts`) would **bring back** the base/application split, because
  they derive the title from the folder. So keep explicit `title`s.
- A few small file renames are worth doing alongside the retitle, because they fix "one file per
  title":
    - `inputs.story.tsx` → `input.story.tsx` + `input-group.story.tsx` + one per input type
    - `pin-input.story.tsx` keeps its name and gets its own title
    - The 6 chart files and 2 navigation files already exist separately and only need their own titles.
    - `foundations.story.tsx` → one file per topic (`colors.story.tsx`, `typography.story.tsx`, …),
      or keep one file with four stories. See §6.

## 6. Decisions needed

1. **Roots:** `Foundations / Components / Patterns` (recommended), or a single flat `Components`
   root à la Primer/Polaris, or purpose groups (`Actions`, `Forms`, `Feedback`, `Navigation`,
   `Overlays`, `Data display`)?
2. **Family folders:** only Buttons, Charts and Inputs (3 or more components), or no folders at all
   (fully flat alphabetical list)?
3. **Inputs:** separate nodes per input type plus a dropdown only for `InputGroup` add-ons
   (recommended), or the single switching story you described (with the trade-offs in §4)?
4. **Docs pages:** add `@storybook/addon-docs` and turn on autodocs globally? This is recommended. It
   also gives you the "one page shows every variant" view.
5. **Foundations:** one node per topic (Colors, Typography, Effects, Motion), or keep them as four
   stories under one `Foundations` node?
6. **Old URLs:** let story ids change (recommended, since nothing in the repo links to them), or set
   meta `id` on retitled files to keep old links working (only matters if Figma dev resources, Jira
   or Slack link to Storybook).

## 7. Migration plan

| Phase                     | What                                                                                                                                                                                                                                                                                                                                                        | Effort                                    | Risk                                                                               |
| :------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------- | :--------------------------------------------------------------------------------- |
| **0. Infra**              | Add `@storybook/addon-docs` (and register `@chromatic-com/storybook` if you use it). Replace the stale `storySort` with `order: ["Foundations", "Components", "Patterns", "*"]` + alphabetical. Add a `scripts/check-story-titles.mjs` to `npm test` (allowed roots, no shared titles, max depth 3, sentence case). Add a "Stories" section to `CLAUDE.md`. | ~½ day                                    | Low                                                                                |
| **1. Retitle**            | Change the `title` in all 46 files to the new tree. Rename story names per §3 rules. Split the shared-title files (inputs/pin-input, charts are already separate files). No render changes.                                                                                                                                                                 | ~2–3 h                                    | URLs change (see risks). Conflicts with `visual-updates` if done before it merges. |
| **2. CSF3 + Playground**  | Per component: typed `meta`, `component`, `args`/`argTypes`, `Playground`, then curated stories. `*.demo.tsx` stays the source for curated stories. Do Inputs, Select, Checkbox, Toggle, Badge, Avatar, Tag and Tooltip first (most prop-driven). Charts, Patterns and Table stay demo-driven.                                                              | ~30–60 min per component, ~3–5 days total | Low per file. Components with `ReactNode`/`FC` props need `mapping` in argTypes.   |
| **3. Docs**               | Turn on autodocs globally (`tags: ["autodocs"]` in `preview.ts`), add an `Introduction.mdx`, and optional family overview pages (Inputs, Buttons, Charts).                                                                                                                                                                                                  | ~½–1 day                                  | Low                                                                                |
| **4. Figma links** (opt.) | Either keep the custom `design: { desktop, mobile }` shape and read it from a small manager panel, or move to `@storybook/addon-designs` (`{ type: "figma", url }`). Backfill links for the rest.                                                                                                                                                           | ~½ day + backfill                         | Changes the shape of an existing parameter. Do it as a separate change.            |

**Order:** do Phase 0 now. Do Phase 1 **after `visual-updates` merges**, because that branch has
uncommitted edits to `button.story`, `pin-input.story` and the input files. Phase 2 can then go
component by component, one PR per family.

### Risks

- **Story ids and URLs change** with every retitle (`base-components-inputs--default` →
  `components-inputs-input--playground`). Nothing in the repo links to them. External bookmarks,
  Slack, Jira and Figma dev-resource links would break. Mitigate with meta `id` on the few
  components that are linked externally, or accept the break once.
- **`design` parameters:** they're attached to story exports, so retitling keeps them. Merging
  stories into one dropdown story would **lose** per-variant node ids. Table and Navigation stories
  (the only ones with `design` today) stay separate stories under this proposal.
- **Visual-test baselines** (if Chromatic is turned on later) are keyed by story id. Retitling resets
  them, so do the retitle before establishing baselines.
- **Tailwind scanning:** new story files need a Storybook restart before their classes render (see
  `CLAUDE.md`).
- **Docs-page performance:** autodocs on 46 components with heavy stories (charts, tables) can make
  docs pages slow. Use `!autodocs` on heavy stories if needed.
- **Parallel work:** the other session's uncommitted changes touch `button.story.tsx`,
  `pin-input.story.tsx` and the input components. Migrating those files must wait for that branch.

---

Sources: Storybook docs, [Naming components and hierarchy](https://storybook.js.org/docs/writing-stories/naming-components-and-hierarchy),
[Sidebar & URLs](https://storybook.js.org/docs/configure/user-interface/sidebar-and-urls),
[Tags](https://storybook.js.org/docs/writing-stories/tags),
[Autodocs](https://storybook.js.org/docs/writing-docs/autodocs). Primer React stories
(`packages/react/src/Button/Button.stories.tsx`, `Button.features.stories.tsx`,
`TextInput/*.stories.tsx` on [primer/react](https://github.com/primer/react)). Polaris
`polaris-react/src/components/Button/Button.stories.tsx` on [Shopify/polaris](https://github.com/Shopify/polaris).
