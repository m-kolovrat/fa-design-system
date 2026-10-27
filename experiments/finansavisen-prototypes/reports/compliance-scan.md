# Compliance scan: finansavisen-prototypes (12 files)

Scope: `experiments/finansavisen-prototypes/{opus,sonnet,haiku}/*/*.tsx`, excluding `*.story.tsx` and `*.notes.md`. Read-only scan; no repo files were edited.

Definitions:

- **LOC**: total lines in the file.
- **Lib mod / Lib names**: distinct `@/components/...` modules (plus `fa-icons`) imported, and distinct PascalCase names imported from them (includes type-only imports such as `TickerItem`; helper functions such as `getInitials` are excluded).
- **Local comp**: distinct capitalized components declared in the file (`function`/`const`/`class`).
- **Lib JSX**: JSX usages of names imported from `@/components` or `fa-icons` (compound `X.Y` counted by root `X`). **RAC JSX**: react-aria-components JSX (`Aria*`). **Local JSX**: components declared in the file or passed as props. Recharts/third-party JSX is excluded from all three.
- **Raw**: JSX usages of `div section article aside ul li span p h1-h6 a button input table img select`.
- **Raw int.**: interactive raw elements (`a button input select table`).
- **Reuse** = Lib JSX / (Lib JSX + Raw).
- **Hex / Pal / Ramp / Dark / Motion / Outl / Style / Arb / RAC / Demo / Icon**: rule hits. Hex, Pal, Ramp, Dark, Motion, Outl, Style and Demo count lines that match; Arb counts each arbitrary value. Pal = bare Tailwind palette steps (`gray-900`) plus `white`/`black` utilities. Ramp = primitive ramp steps such as `brand-700`, `error-600`, and `utility-gray-100` (theme.css aliases `utility-*` to the primitive ramps, so they are counted here, not as palette). Motion = `duration-`, `ease-`, `transition-all`. RAC = unprefixed react-aria-components specifiers. Icon = non-fa-icons icon library imports (`@untitledui/file-icons` is listed as available in CLAUDE.md but is counted here if present).
- **Primary**: `<Button>` (from `@/components/base/buttons/button`) with literal `color="primary"`.

| Model          | Page              | LOC  | Lib mod | Lib names | Local comp | Lib JSX | RAC JSX | Local JSX | Raw  | Raw int. | Reuse | Hex | Pal | Ramp | Dark | Motion | Outl | Style | Arb | RAC | Demo | Icon | Primary |
| -------------- | ----------------- | ---- | ------- | --------- | ---------- | ------- | ------- | --------- | ---- | -------- | ----- | --- | --- | ---- | ---- | ------ | ---- | ----- | --- | --- | ---- | ---- | ------- |
| haiku          | 01-forside        | 600  | 11      | 18        | 20         | 22      | 0       | 25        | 83   | 1        | 0.21  | 0   | 0   | 0    | 0    | 0      | 0    | 0     | 0   | 0   | 0    | 0    | 0       |
| haiku          | 05-bjellesauer    | 559  | 16      | 22        | 2          | 47      | 0       | 0         | 25   | 0        | 0.65  | 0   | 0   | 0    | 0    | 0      | 0    | 0     | 0   | 1   | 0    | 0    | 0       |
| opus           | 01-forside        | 687  | 13      | 29        | 19         | 24      | 0       | 30        | 76   | 9        | 0.24  | 0   | 0   | 0    | 0    | 0      | 0    | 0     | 0   | 0   | 0    | 0    | 1       |
| opus           | 02-pluss-artikkel | 599  | 14      | 26        | 22         | 39      | 0       | 35        | 89   | 7        | 0.30  | 0   | 0   | 0    | 0    | 0      | 0    | 0     | 1   | 0   | 0    | 0    | 0       |
| opus           | 03-bors           | 1233 | 17      | 40        | 24         | 39      | 1       | 62        | 74   | 1        | 0.35  | 0   | 0   | 4    | 0    | 0      | 0    | 0     | 0   | 2   | 0    | 0    | 0       |
| opus           | 04-aksje-equinor  | 1244 | 20      | 41        | 25         | 116     | 0       | 42        | 93   | 1        | 0.56  | 0   | 0   | 8    | 0    | 0      | 0    | 0     | 1   | 1   | 0    | 0    | 0       |
| opus           | 05-bjellesauer    | 946  | 19      | 29        | 15         | 78      | 1       | 22        | 57   | 2        | 0.58  | 0   | 0   | 0    | 0    | 0      | 0    | 0     | 0   | 1   | 0    | 0    | 0       |
| sonnet         | 01-forside        | 413  | 10      | 19        | 7          | 20      | 0       | 13        | 70   | 7        | 0.22  | 0   | 0   | 0    | 0    | 0      | 0    | 0     | 1   | 0   | 0    | 0    | 0       |
| sonnet         | 02-pluss-artikkel | 431  | 12      | 19        | 9          | 24      | 0       | 14        | 71   | 4        | 0.25  | 0   | 0   | 0    | 0    | 0      | 0    | 0     | 0   | 0   | 2    | 0    | 0       |
| sonnet         | 03-bors           | 1114 | 17      | 32        | 18         | 39      | 0       | 52        | 74   | 3        | 0.35  | 0   | 0   | 4    | 0    | 0      | 0    | 0     | 0   | 1   | 0    | 0    | 0       |
| sonnet         | 04-aksje-equinor  | 924  | 18      | 31        | 7          | 101     | 0       | 19        | 75   | 1        | 0.57  | 0   | 0   | 8    | 0    | 0      | 0    | 0     | 0   | 0   | 0    | 0    | 0       |
| sonnet         | 05-bjellesauer    | 899  | 16      | 21        | 16         | 79      | 1       | 20        | 62   | 0        | 0.56  | 0   | 0   | 0    | 0    | 0      | 0    | 0     | 0   | 1   | 2    | 0    | 0       |
| **opus avg**   | (5 files)         | 942  | 16.6    | 33.0      | 21.0       | 59.2    | 0.4     | 38.2      | 77.8 | 4.0      | 0.40  | 0.0 | 0.0 | 2.4  | 0.0  | 0.0    | 0.0  | 0.0   | 0.4 | 0.8 | 0.0  | 0.0  | 0.2     |
| **sonnet avg** | (5 files)         | 756  | 14.6    | 24.4      | 11.4       | 52.6    | 0.2     | 23.6      | 70.4 | 3.0      | 0.39  | 0.0 | 0.0 | 2.4  | 0.0  | 0.0    | 0.0  | 0.0   | 0.2 | 0.4 | 0.8  | 0.0  | 0.0     |
| **haiku avg**  | (2 files)         | 580  | 13.5    | 20.0      | 11.0       | 34.5    | 0.0     | 12.5      | 54.0 | 0.5      | 0.43  | 0.0 | 0.0 | 0.0  | 0.0  | 0.0    | 0.0  | 0.0   | 0.0 | 0.5 | 0.0  | 0.0  | 0.0     |

## Per-file details

### haiku / 01-forside (`/home/user/fa-design-system/experiments/finansavisen-prototypes/haiku/01-forside/01-forside.tsx`)

- Lib components used: AvatarLabelGroup, Badge, BadgeWithDot, BadgeWithIcon, Button, ChevronRight, Download, Input, Lock, Play, Search, SiteFooter, SiteHeader, SiteMenuContent, SiteNavItem, Star, StarFilled, TickerItem
- External modules: @/utils/cx, react
- Raw tag breakdown: a=1, article=3, aside=1, div=27, h1=1, h2=13, h3=2, li=3, p=3, section=13, span=14, ul=2
- Other lowercase tags (not in raw list): main, ol
- Unresolved capitalized JSX names: none
- Conditional `color=` containing primary (not counted in Primary): 0

### haiku / 05-bjellesauer (`/home/user/fa-design-system/experiments/finansavisen-prototypes/haiku/05-bjellesauer/05-bjellesauer.tsx`)

- Lib components used: ArrowDown, ArrowUp, Avatar, Badge, BadgeWithIcon, Button, ButtonGroup, ButtonGroupItem, Download, EmptyState, FeaturedIcon, Form, Input, Lock, PaginationCardMinimal, Search, Select, SiteFooter, SiteHeader, SiteNavItem, Table, TableCard
- External modules: react
- Raw tag breakdown: div=9, h1=1, h2=3, p=6, section=3, span=3
- Other lowercase tags (not in raw list): header, main
- Unresolved capitalized JSX names: none
- Conditional `color=` containing primary (not counted in Primary): 0
- **Unprefixed react-aria-components import** (1):
    - `/home/user/fa-design-system/experiments/finansavisen-prototypes/haiku/05-bjellesauer/05-bjellesauer.tsx:5` `import type { SortDescriptor as AriaSortDescriptor, Key } from "react-aria-components"`

### opus / 01-forside (`/home/user/fa-design-system/experiments/finansavisen-prototypes/opus/01-forside/01-forside.tsx`)

- Lib components used: Ai, ArrowRight, AvatarLabelGroup, Badge, BadgeWithDot, BadgeWithIcon, Button, ButtonUtility, ChevronRight, Eye, FeaturedIcon, Flame, GraphLine, Image, Input, KapitalSmallLogo, Lock, MotorLogo, Play, Plus, SiteFooter, SiteHeader, SiteMenuContent, SiteNavItem, Star, StarFilled, TickerItem, User, Users
- External modules: @/utils/cx, react
- Raw tag breakdown: a=9, article=1, aside=2, div=21, h1=1, h2=4, h3=1, li=3, p=13, section=11, span=8, ul=2
- Other lowercase tags (not in raw list): dd, dl, dt, form, header, main, ol
- Unresolved capitalized JSX names: none
- Conditional `color=` containing primary (not counted in Primary): 0

### opus / 02-pluss-artikkel (`/home/user/fa-design-system/experiments/finansavisen-prototypes/opus/02-pluss-artikkel/02-pluss-artikkel.tsx`)

- Lib components used: Ai, ArrowRight, Avatar, AvatarLabelGroup, Badge, BadgeWithDot, BadgeWithIcon, Button, ButtonGroup, ButtonGroupItem, ButtonUtility, Chat, Image, Link, Lock, Mail, Plus, Share, SiteFooter, SiteHeader, SiteNavItem, SocialButton, Star, StarFilled, TextArea, TickerItem
- External modules: @/utils/cx, react, react-aria
- Raw tag breakdown: a=7, article=1, aside=2, div=25, h1=1, h2=9, li=3, p=21, section=8, span=8, ul=4
- Other lowercase tags (not in raw list): dd, dl, dt, figcaption, figure, header, main, strong, time
- Unresolved capitalized JSX names: none
- Conditional `color=` containing primary (not counted in Primary): 0
- **Arbitrary values** (1):
    - `/home/user/fa-design-system/experiments/finansavisen-prototypes/opus/02-pluss-artikkel/02-pluss-artikkel.tsx:284` `aspect-[3/2]`

### opus / 03-bors (`/home/user/fa-design-system/experiments/finansavisen-prototypes/opus/03-bors/03-bors.tsx`)

- Lib components used: ArrowDown, ArrowUp, Avatar, AvatarLabelGroup, Badge, BadgeWithDot, Button, ButtonGroup, ButtonGroupItem, ButtonUtility, Calendar, ChartTooltipContent, ChevronRight, DocumentCash, Download, EmptyState, FeaturedIcon, Flag, FlagName, Flame, GraphDown, GraphLine, GraphUp, Grid, Medal, News, Play, Plus, Search, Select, SelectItemType, SiteFooter, SiteHeader, SiteNavItem, Star, Table, TickerItem, Toggle, Tv, Wallet
- External modules: @/hooks/use-breakpoint, @/utils/cx, react, recharts
- Raw tag breakdown: a=1, div=26, h1=1, h2=2, h3=1, li=5, p=9, section=2, span=24, ul=3
- Other lowercase tags (not in raw list): dd, dl, dt, header, main, ol
- Unresolved capitalized JSX names: none
- Conditional `color=` containing primary (not counted in Primary): 0
- **Primitive ramp classes** (4):
    - `/home/user/fa-design-system/experiments/finansavisen-prototypes/opus/03-bors/03-bors.tsx:566` `const lineColor = change < 0 ? "text-utility-error-600" : "text-utility-success-600";`
    - `/home/user/fa-design-system/experiments/finansavisen-prototypes/opus/03-bors/03-bors.tsx:626` `<CartesianGrid vertical={false} stroke="currentColor" className="text-utility-gray-100" />`
    - `/home/user/fa-design-system/experiments/finansavisen-prototypes/opus/03-bors/03-bors.tsx:640` `cursor={{ className: "stroke-utility-brand-600 stroke-2" }}`
    - `/home/user/fa-design-system/experiments/finansavisen-prototypes/opus/03-bors/03-bors.tsx:651` `activeDot={{ className: "fill-bg-primary stroke-utility-brand-600 stroke-2" }}`
- **Unprefixed react-aria-components import** (2):
    - `/home/user/fa-design-system/experiments/finansavisen-prototypes/opus/03-bors/03-bors.tsx:27` `import type { Key } from "react-aria-components"`
    - `/home/user/fa-design-system/experiments/finansavisen-prototypes/opus/03-bors/03-bors.tsx:28` `import { Link as AriaLink, type SortDescriptor } from "react-aria-components"`

### opus / 04-aksje-equinor (`/home/user/fa-design-system/experiments/finansavisen-prototypes/opus/04-aksje-equinor/04-aksje-equinor.tsx`)

- Lib components used: ArrowRight, Avatar, Badge, BadgeWithDot, BulletList, Button, ButtonGroup, ButtonGroupItem, ButtonUtility, Calendar, CalendarAdd, ChartLegendContent, ChartTooltipContent, Check, ChevronDown, DocumentCash, Download, Dropdown, EmptyState, FeaturedIcon, GraphLine, Help, Lock, Microphone, NativeSelect, News, Pause, Play, Plus, ProgressBar, SiteFooter, SiteHeader, SiteNavItem, Star, StarFilled, Table, Tabs, TickerItem, Tooltip, TooltipTrigger, Users
- External modules: @/hooks/use-breakpoint, @/utils/cx, react, recharts
- Raw tag breakdown: a=1, div=30, h1=1, h2=1, h3=2, li=6, p=8, section=1, span=37, ul=6
- Other lowercase tags (not in raw list): dd, dl, dt, header, main
- Unresolved capitalized JSX names: none
- Conditional `color=` containing primary (not counted in Primary): 0
- **Primitive ramp classes** (8):
    - `/home/user/fa-design-system/experiments/finansavisen-prototypes/opus/04-aksje-equinor/04-aksje-equinor.tsx:583` `const colorClass = meta.change < 0 ? "text-utility-error-600" : "text-utility-success-600";`
    - `/home/user/fa-design-system/experiments/finansavisen-prototypes/opus/04-aksje-equinor/04-aksje-equinor.tsx:584` `const dotClass = meta.change < 0 ? "fill-bg-primary stroke-utility-error-600 stroke-2" : "fill-bg-primary s...`
    - `/home/user/fa-design-system/experiments/finansavisen-prototypes/opus/04-aksje-equinor/04-aksje-equinor.tsx:611` `<CartesianGrid vertical={false} stroke="currentColor" className="text-utility-gray-100" />`
    - `/home/user/fa-design-system/experiments/finansavisen-prototypes/opus/04-aksje-equinor/04-aksje-equinor.tsx:634` `cursor={{ className: "stroke-utility-gray-300 stroke-1" }}`
    - `/home/user/fa-design-system/experiments/finansavisen-prototypes/opus/04-aksje-equinor/04-aksje-equinor.tsx:1053` `<CartesianGrid vertical={false} stroke="currentColor" className="text-utility-gray-100" />`
    - `/home/user/fa-design-system/experiments/finansavisen-prototypes/opus/04-aksje-equinor/04-aksje-equinor.tsx:1057` `<ChartTooltip content={<ChartTooltipContent />} formatter={(v) => fmt(Number(v))} cursor={{ className: "fil...`
    - `/home/user/fa-design-system/experiments/finansavisen-prototypes/opus/04-aksje-equinor/04-aksje-equinor.tsx:1062` `className="text-utility-brand-600"`
    - `/home/user/fa-design-system/experiments/finansavisen-prototypes/opus/04-aksje-equinor/04-aksje-equinor.tsx:1070` `className="text-utility-brand-300"`
- **Arbitrary values** (1):
    - `/home/user/fa-design-system/experiments/finansavisen-prototypes/opus/04-aksje-equinor/04-aksje-equinor.tsx:797` `grid-cols-[4.5rem_1fr]`
- **Unprefixed react-aria-components import** (1):
    - `/home/user/fa-design-system/experiments/finansavisen-prototypes/opus/04-aksje-equinor/04-aksje-equinor.tsx:26` `import type { Key } from "react-aria-components"`

### opus / 05-bjellesauer (`/home/user/fa-design-system/experiments/finansavisen-prototypes/opus/05-bjellesauer/05-bjellesauer.tsx`)

- Lib components used: ArrowDown, ArrowUp, Avatar, Badge, Button, ButtonGroup, ButtonGroupItem, Clock, DateRangePicker, Download, EmptyState, FeaturedIcon, Input, Lock, Mail, NativeSelect, PaginationCardDefault, Restart, Search, Select, SelectItemType, SiteFooter, SiteHeader, SiteNavItem, Table, TableCard, Tabs, TickerItem, Users
- External modules: @/utils/cx, @internationalized/date, react
- Raw tag breakdown: a=2, div=20, h1=1, h2=4, h3=1, li=4, p=9, section=3, span=12, ul=1
- Other lowercase tags (not in raw list): form, header, main, ol
- Unresolved capitalized JSX names: none
- Conditional `color=` containing primary (not counted in Primary): 0
- **Unprefixed react-aria-components import** (1):
    - `/home/user/fa-design-system/experiments/finansavisen-prototypes/opus/05-bjellesauer/05-bjellesauer.tsx:7` `import type { DateValue, Key, SortDescriptor } from "react-aria-components"`

### sonnet / 01-forside (`/home/user/fa-design-system/experiments/finansavisen-prototypes/sonnet/01-forside/01-forside.tsx`)

- Lib components used: ArrowRight, Avatar, Badge, BadgeWithDot, BadgeWithIcon, Bookmark, Button, ButtonUtility, Chat, FeaturedIcon, Image, Lock, Play, Plus, SiteFooter, SiteHeader, SiteNavItem, Star, TickerItem
- External modules: @/utils/cx, react
- Raw tag breakdown: a=7, article=1, aside=2, div=23, h1=2, h2=5, h3=5, li=1, p=9, section=11, span=4
- Other lowercase tags (not in raw list): dd, dl, dt, header, main, ol, time
- Unresolved capitalized JSX names: none
- Conditional `color=` containing primary (not counted in Primary): 0
- **Arbitrary values** (1):
    - `/home/user/fa-design-system/experiments/finansavisen-prototypes/sonnet/01-forside/01-forside.tsx:201` `max-w-[1280px]`

### sonnet / 02-pluss-artikkel (`/home/user/fa-design-system/experiments/finansavisen-prototypes/sonnet/02-pluss-artikkel/02-pluss-artikkel.tsx`)

- Lib components used: Avatar, AvatarLabelGroup, Badge, BadgeWithIcon, Button, ButtonGroup, ButtonGroupItem, ButtonUtility, Chat, Info, Link, Lock, Mail, Share, SiteFooter, SiteHeader, SocialButton, Star, StarFilled
- External modules: @/utils/cx, react, react-aria
- Raw tag breakdown: a=4, article=1, aside=2, div=19, h1=1, h2=5, li=2, p=17, section=5, span=13, ul=2
- Other lowercase tags (not in raw list): blockquote, dd, dl, dt, figcaption, figure, header, main
- Unresolved capitalized JSX names: none
- Conditional `color=` containing primary (not counted in Primary): 0
- **.demo import** (2):
    - `/home/user/fa-design-system/experiments/finansavisen-prototypes/sonnet/02-pluss-artikkel/02-pluss-artikkel.tsx:7` `import { footerLinks } from "@/components/application/site-footer/site-footer.demo"`
    - `/home/user/fa-design-system/experiments/finansavisen-prototypes/sonnet/02-pluss-artikkel/02-pluss-artikkel.tsx:9` `import { menu, navigation, shortcuts, tickerItems } from "@/components/application/site-header/site-header....`

### sonnet / 03-bors (`/home/user/fa-design-system/experiments/finansavisen-prototypes/sonnet/03-bors/03-bors.tsx`)

- Lib components used: ArrowDown, ArrowUp, Avatar, AvatarLabelGroup, Badge, BadgeWithDot, Button, ButtonGroup, ButtonGroupItem, ButtonUtility, Calendar, ChartTooltipContent, ChevronDown, ChevronRight, Download, Dropdown, EmptyState, FeaturedIcon, Flame, GraphDown, GraphUp, Input, Play, Search, SiteFooter, SiteHeader, SiteNavItem, Star, Table, TickerItem, Tv, Wallet
- External modules: @/hooks/use-breakpoint, @/utils/cx, react, react-aria, recharts
- Raw tag breakdown: a=3, div=27, h1=1, h2=2, h3=4, li=6, p=11, section=2, span=12, ul=6
- Other lowercase tags (not in raw list): dd, dl, dt, form, header, main
- Unresolved capitalized JSX names: none
- Conditional `color=` containing primary (not counted in Primary): 0
- **Primitive ramp classes** (4):
    - `/home/user/fa-design-system/experiments/finansavisen-prototypes/sonnet/03-bors/03-bors.tsx:622` `<CartesianGrid vertical={false} stroke="currentColor" className="text-utility-gray-100" />`
    - `/home/user/fa-design-system/experiments/finansavisen-prototypes/sonnet/03-bors/03-bors.tsx:654` `cursor={{ className: up ? "stroke-utility-success-600 stroke-2" : "stroke-utility-error-600 stroke-2" }}`
    - `/home/user/fa-design-system/experiments/finansavisen-prototypes/sonnet/03-bors/03-bors.tsx:661` `className={up ? "text-utility-success-600" : "text-utility-error-600"}`
    - `/home/user/fa-design-system/experiments/finansavisen-prototypes/sonnet/03-bors/03-bors.tsx:665` `activeDot={{ className: cx("fill-bg-primary stroke-2", up ? "stroke-utility-success-600" : "stroke-utility-...`
- **Unprefixed react-aria-components import** (1):
    - `/home/user/fa-design-system/experiments/finansavisen-prototypes/sonnet/03-bors/03-bors.tsx:6` `import type { SortDescriptor } from "react-aria-components"`

### sonnet / 04-aksje-equinor (`/home/user/fa-design-system/experiments/finansavisen-prototypes/sonnet/04-aksje-equinor/04-aksje-equinor.tsx`)

- Lib components used: Alert, ArrowDown, ArrowUp, Avatar, AvatarLabelGroup, Badge, BadgeWithDot, Button, ButtonGroup, ButtonGroupItem, ButtonUtility, CalendarAdd, ChartLegendContent, ChartTooltipContent, ChevronDown, Clock, Download, Dropdown, Lock, NativeSelect, Play, Plus, ProgressBar, SiteFooter, SiteHeader, SiteNavItem, Star, StarFilled, Table, Tabs, TickerItem
- External modules: @/hooks/use-breakpoint, @/utils/cx, react, react-aria, recharts
- Raw tag breakdown: a=1, div=28, h1=1, h2=1, li=5, p=15, section=1, span=18, ul=5
- Other lowercase tags (not in raw list): dd, dl, dt, header, main
- Unresolved capitalized JSX names: none
- Conditional `color=` containing primary (not counted in Primary): 0
- **Primitive ramp classes** (8):
    - `/home/user/fa-design-system/experiments/finansavisen-prototypes/sonnet/04-aksje-equinor/04-aksje-equinor.tsx:347` `const lineColor = activePeriod.change < 0 ? "text-utility-error-600" : "text-utility-success-600";`
    - `/home/user/fa-design-system/experiments/finansavisen-prototypes/sonnet/04-aksje-equinor/04-aksje-equinor.tsx:456` `<CartesianGrid vertical={false} stroke="currentColor" className="text-utility-gray-100" />`
    - `/home/user/fa-design-system/experiments/finansavisen-prototypes/sonnet/04-aksje-equinor/04-aksje-equinor.tsx:479` `cursor={{ className: "stroke-utility-gray-300 stroke-2" }}`
    - `/home/user/fa-design-system/experiments/finansavisen-prototypes/sonnet/04-aksje-equinor/04-aksje-equinor.tsx:490` `activeDot={{ className: "fill-bg-primary stroke-utility-gray-500 stroke-2" }}`
    - `/home/user/fa-design-system/experiments/finansavisen-prototypes/sonnet/04-aksje-equinor/04-aksje-equinor.tsx:640` `<CartesianGrid vertical={false} stroke="currentColor" className="text-utility-gray-100" />`
    - `/home/user/fa-design-system/experiments/finansavisen-prototypes/sonnet/04-aksje-equinor/04-aksje-equinor.tsx:653` `cursor={{ className: "fill-utility-gray-200/20" }}`
    - `/home/user/fa-design-system/experiments/finansavisen-prototypes/sonnet/04-aksje-equinor/04-aksje-equinor.tsx:659` `className="text-utility-brand-600"`
    - `/home/user/fa-design-system/experiments/finansavisen-prototypes/sonnet/04-aksje-equinor/04-aksje-equinor.tsx:668` `className="text-utility-brand-300"`

### sonnet / 05-bjellesauer (`/home/user/fa-design-system/experiments/finansavisen-prototypes/sonnet/05-bjellesauer/05-bjellesauer.tsx`)

- Lib components used: ArrowDown, ArrowUp, Avatar, Badge, BadgeWithIcon, Button, ButtonGroup, ButtonGroupItem, DateRangePicker, Download, EmptyState, Input, Lock, Mail, PaginationCardDefault, Select, SiteFooter, SiteHeader, Table, TableCard, Tabs
- External modules: @/utils/cx, @internationalized/date, react
- Raw tag breakdown: div=28, h1=1, h2=5, li=2, p=9, section=5, span=9, ul=3
- Other lowercase tags (not in raw list): dd, dl, dt, form, header, main
- Unresolved capitalized JSX names: none
- Conditional `color=` containing primary (not counted in Primary): 0
- **Unprefixed react-aria-components import** (1):
    - `/home/user/fa-design-system/experiments/finansavisen-prototypes/sonnet/05-bjellesauer/05-bjellesauer.tsx:6` `import type { Key, SortDescriptor } from "react-aria-components"`
- **.demo import** (2):
    - `/home/user/fa-design-system/experiments/finansavisen-prototypes/sonnet/05-bjellesauer/05-bjellesauer.tsx:12` `import { footerLinks } from "@/components/application/site-footer/site-footer.demo"`
    - `/home/user/fa-design-system/experiments/finansavisen-prototypes/sonnet/05-bjellesauer/05-bjellesauer.tsx:14` `import { menu, navigation, shortcuts, tickerItems } from "@/components/application/site-header/site-header....`
