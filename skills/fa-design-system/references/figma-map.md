# Figma → code map

How to turn a Figma component instance into a library component with the right props, when
implementing a frame from the Figma file "Fa Design System". Names are the Figma component set names
and variant properties as the Figma MCP reports them (`Buttons/Button`, `Hierarchy=Secondary`).
Import paths are package paths (`fa-design-system/components/...`). If a Figma component or option
isn't here, it isn't in code: report it, don't build it (rule fa-no-invented-variants).

Read every table the same way:

- **State** options: Default, Hover, Focused/Focus, Open/Opened, Placeholder, Filled, Hover/active
  are interaction states, not props. Disabled → `isDisabled`, Loading → `isLoading`, Invalid or
  `Destructive=True` (inputs) → `isInvalid`, unless a row says otherwise.
- **Breakpoint** (Desktop / Mobile) maps to nothing: components are responsive by themselves, unless
  a row gives a prop.
- **Text booleans**: `Label` → `label`, `Hint text` / `Supporting text` (inputs, checkbox, toggle)
  → `hint`, `Required *` → `isRequired`, `Help icon` → `tooltip="…"`. Omitting the prop is `False`.
- "same names" means the Figma options and the code values are identical strings.

## Buttons

| Figma                                  | Code                                                                                 |
| -------------------------------------- | ------------------------------------------------------------------------------------ |
| Buttons/Button                         | `Button`, `fa-design-system/components/base/buttons/button`                          |
| `Size=sm/md/lg/xl`                     | `size`, same names                                                                   |
| `Hierarchy=Primary/Secondary/Tertiary` | `color="primary"` / `"secondary"` / `"tertiary"`                                     |
| `Hierarchy=Link color/Link gray`       | `color="link-color"` / `"link-gray"` (add `href` for a link)                         |
| `Icon leading` / `Icon trailing`       | `iconLeading={Icon}` / `iconTrailing={Icon}` (the swap is the icon)                  |
| `Icon only=True`                       | `iconLeading={Icon}`, no children, `aria-label="…"`                                  |
| `Loading text=True`                    | `isLoading showTextWhileLoading`                                                     |
| Buttons/Button destructive             | `Button`, same import                                                                |
| `Hierarchy=Primary/Secondary/Tertiary` | `color="primary-destructive"` / `"secondary-destructive"` / `"tertiary-destructive"` |
| `Hierarchy=Link`                       | `color="link-destructive"`                                                           |
| other properties                       | as Buttons/Button                                                                    |

| Figma                          | Code                                                                       |
| ------------------------------ | -------------------------------------------------------------------------- |
| Buttons/Button utility         | `ButtonUtility`, `fa-design-system/components/base/buttons/button-utility` |
| `Size=xs/sm`                   | `size`, same names                                                         |
| `Hierarchy=Secondary/Tertiary` | `color="secondary"` / `"tertiary"`                                         |
| `Icon swap`                    | `icon={Icon}`; name it with `tooltip="…"`                                  |
| Buttons/Button close X         | `CloseButton`, `fa-design-system/components/base/buttons/close-button`     |
| `Size=sm/md/lg`                | `size`, same names                                                         |
| `Dark background=True`         | `theme="dark"` (default `"light"`)                                         |

| Figma                                  | Code                                                                     |
| -------------------------------------- | ------------------------------------------------------------------------ |
| Social button                          | `SocialButton`, `fa-design-system/components/base/buttons/social-button` |
| `Size=md/lg`                           | `size`, same names                                                       |
| `Social=Google/Facebook/Apple/Twitter` | `social="google"` / `"facebook"` / `"apple"` / `"twitter"`               |
| `Theme=Brand/Gray/Color`               | `theme="brand"` / `"gray"` / `"color"`                                   |
| `Supporting text=False`                | no children (icon only); add `aria-label`                                |

| Figma                  | Code                                                                      |
| ---------------------- | ------------------------------------------------------------------------- |
| Mobile app store badge | one export per store                                                      |
| `Style=Brand`          | from `fa-design-system/components/base/buttons/app-store-buttons`         |
| `Style=Outline`        | from `fa-design-system/components/base/buttons/app-store-buttons-outline` |
| `Store=Google Play`    | `GooglePlayButton`                                                        |
| `Store=App Store`      | `AppStoreButton`                                                          |
| `Store=Galaxy Store`   | `GalaxyStoreButton`                                                       |
| `Store=AppGallery`     | `AppGalleryButton`                                                        |
| `Size=md/lg`           | `size`, same names                                                        |

## Button groups

| Figma                                       | Code                                                                                            |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Button group                                | `ButtonGroup` + `ButtonGroupItem`, `fa-design-system/components/base/button-group/button-group` |
| `Size=sm/md/lg`                             | `size` on `ButtonGroup`, same names                                                             |
| `Icon=Leading`                              | `iconLeading={Icon}` on each item                                                               |
| `Icon=Only`                                 | `iconLeading={Icon}`, no children, `aria-label`                                                 |
| \_Button group base `Current=True`          | item selected: its `id` in `selectedKeys`                                                       |
| \_Button group base `Icon=Dot` / `Trailing` | `iconLeading={<Dot … />}` / `iconTrailing={Icon}`                                               |
| \_Button group base `State=Disabled`        | `isDisabled` on the item                                                                        |

## Card header

| Figma                           | Code                                                                            |
| ------------------------------- | ------------------------------------------------------------------------------- |
| Card header (draft on "Test")   | `CardHeader`, `fa-design-system/components/application/card-header/card-header` |
| `Title` / `Badge`               | `title` / `badge`                                                               |
| `Action 1` … `Action 3`         | the buttons passed in `actions` (sm icon-only `Button`s; `Hierarchy` → `color`) |
| `Divider`                       | `divider`                                                                       |
| `Breakpoint=Mobile` / `Desktop` | nothing: 16px sides below `md`, 24px from `md`                                  |

## Period selector

Figma draft on the "Test" page.

| Figma                            | Code                                                                                        |
| -------------------------------- | ------------------------------------------------------------------------------------------- |
| Period selector                  | `PeriodSelector`, `fa-design-system/components/application/period-selector/period-selector` |
| `Layout=Fit` / `Scroll`          | `layout="fit"` / `"scroll"`                                                                 |
| `Change=True`                    | `change` on each entry of `periods`                                                         |
| `1D` … `10Y` booleans            | which ids are in `periods`                                                                  |
| \_Period item `State=Current`    | `selectedPeriod` / `defaultSelectedPeriod`                                                  |
| \_Period item `Label` / `Change` | the entry's `id` / `change` (percent, formatted by the component)                           |

## Badges

| Figma                                                | Code                                                                                 |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Badge                                                | `fa-design-system/components/base/badges/badges`; the `Icon` option picks the export |
| `Icon=False`                                         | `Badge`                                                                              |
| `Icon=Dot`                                           | `BadgeWithDot`                                                                       |
| `Icon=Icon leading/trailing`                         | `BadgeWithIcon iconLeading={Icon}` / `iconTrailing={Icon}`                           |
| `Icon=Only`                                          | `BadgeIcon icon={Icon}`                                                              |
| `Icon=X close`                                       | `BadgeWithButton onButtonClick={…} buttonLabel="…"`                                  |
| `Icon=Country`                                       | `BadgeWithFlag flag="norway-nok"` (Figma flag name)                                  |
| `Icon=Avatar`                                        | `BadgeWithImage imgSrc="…"`                                                          |
| `Type=Pill color/Badge color/Badge modern`           | `type="pill-color"` / `"color"` / `"modern"`                                         |
| `Size=sm/md/lg`                                      | `size`, same names                                                                   |
| `Color=Gray/Brand/Error/Warning/Success/Purple/Pink` | `color`, same names lowercased                                                       |
| `Color=Blue light` / `Orange`                        | `color="blue-light"` / `"orange-dark"`                                               |
| `Color=Blue/Indigo/Blue gray`                        | none, see Mismatches                                                                 |

With `type="modern"`, `BadgeWithDot` and `BadgeWithIcon` take every color (it tints the dot or
icon); the other badge exports take only `color="gray"`.

| Figma                                    | Code                                                                 |
| ---------------------------------------- | -------------------------------------------------------------------- |
| Badge group                              | `BadgeGroup`, `fa-design-system/components/base/badges/badge-groups` |
| `Badge=Leading/Trailing`                 | `align="leading"` / `"trailing"`                                     |
| `Size=md/lg`                             | `size`, same names                                                   |
| `Type=Pill color/Badge modern`           | `theme="light"` / `"modern"`                                         |
| `Color=Gray/Brand/Error/Warning/Success` | `color`, same names lowercased                                       |
| `Icon=False`                             | `iconTrailing={null}` (default is `ArrowRight`)                      |

## Avatars

| Figma                               | Code                                                                                                            |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Avatar                              | `Avatar`, `fa-design-system/components/base/avatar/avatar`                                                      |
| `Size=xs/sm/md/lg/xl/2xl`           | `size`, same names                                                                                              |
| `Text=True`                         | `initials="KN"`                                                                                                 |
| `Placeholder=True`                  | no `src` and no `initials` (shows the user icon)                                                                |
| `Status icon=Online indicator`      | `status="online"`                                                                                               |
| `Status icon=Verified`              | `verified`                                                                                                      |
| `Status icon=Company`               | `badge={<AvatarCompanyIcon size={…} src="…" />}` from `fa-design-system/components/base/avatar/base-components` |
| Avatar label group                  | `AvatarLabelGroup`, `fa-design-system/components/base/avatar/avatar-label-group`; `title`, `subtitle`           |
| `Size=sm/md/lg/xl`                  | `size` (required), same names                                                                                   |
| `Status icon=…`                     | as Avatar                                                                                                       |
| Avatar profile photo                | `AvatarProfilePhoto`, `fa-design-system/components/base/avatar/avatar-profile-photo`                            |
| `Size=sm/md/lg`                     | `size` (required), same names                                                                                   |
| `Text` / `Placeholder` / `Verified` | as Avatar (`initials`, no `src`, `verified`)                                                                    |
| Verified tick                       | `VerifiedTick`, `fa-design-system/components/base/avatar/base-components`                                       |
| `Size=xs…4xl`                       | `size`, same names                                                                                              |
| \_Avatar add button                 | `AvatarAddButton`, same import; `Size=xs/sm/md` same names                                                      |

## Breadcrumbs

| Figma                             | Code                                                                                                  |
| --------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Breadcrumbs                       | `Breadcrumbs` + `Breadcrumbs.Item`, `fa-design-system/components/application/breadcrumbs/breadcrumbs` |
| `Divider=Chevron/Slash`           | `divider="chevron"` / `"slash"`                                                                       |
| `Type=Text/Text with line/Button` | `type="text"` / `"text-line"` / `"button"`                                                            |

## Checkboxes, radios, toggles

| Figma                | Code                                                                                              |
| -------------------- | ------------------------------------------------------------------------------------------------- |
| Checkbox             | `Checkbox`, `fa-design-system/components/base/checkbox/checkbox`                                  |
| `Type=Radio`         | `RadioButton` inside `RadioGroup`, `fa-design-system/components/base/radio-buttons/radio-buttons` |
| `Checked=True`       | `isSelected` (or `defaultSelected`); radios: the group's `value`                                  |
| `Indeterminate=True` | `isIndeterminate`                                                                                 |
| `Size=sm/md`         | `size`, same names (radios: on `RadioGroup`)                                                      |
| `Text=True`          | `label`                                                                                           |

| Figma                        | Code                                                                           |
| ---------------------------- | ------------------------------------------------------------------------------ |
| Radio group                  | `RadioCardGroup`, `fa-design-system/components/base/radio-buttons/radio-cards` |
| Radio group item             | `RadioCard` (`title`, `description`)                                           |
| `Size=sm/md`                 | `size` on `RadioCardGroup`, same names                                         |
| `Type=Icon simple`           | `type="icon" icon={Icon}`                                                      |
| `Type=Icon card`             | `type="card" icon={Icon} price="…" period="…"`                                 |
| `Type=Avatar`                | `type="avatar" avatarSrc="…"`                                                  |
| `Type=Payment icon`          | `type="payment" paymentIcon={VisaIcon}`                                        |
| `Type=Radio button/Checkbox` | `type="radio"` / `"checkbox"`                                                  |
| `Selected=True`              | the card's `value` is the group's `value`                                      |
| `Badge=True`                 | `badge={…}` (shown on `type="card"`)                                           |

| Figma          | Code                                                       |
| -------------- | ---------------------------------------------------------- |
| Toggle         | `Toggle`, `fa-design-system/components/base/toggle/toggle` |
| `Type=Slim`    | `slim`                                                     |
| `Pressed=True` | `isSelected` (or `defaultSelected`)                        |
| `Size=sm/md`   | `size`, same names                                         |
| `Text=True`    | `label`                                                    |

## Inputs

| Figma                    | Code                                                                                                                             |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| Input field              | `Input`, `fa-design-system/components/base/input/input`                                                                          |
| `Size=sm/md/lg`          | `size`, same names                                                                                                               |
| `Icon leading=True`      | `icon={Icon}`                                                                                                                    |
| `Type=Leading dropdown`  | `InputGroup leadingAddon={<NativeSelect … />}` with `<InputBase />` inside, `fa-design-system/components/base/input/input-group` |
| `Type=Trailing dropdown` | `InputGroup trailingAddon={<NativeSelect … />}`                                                                                  |
| `Type=Leading text`      | `InputGroup leadingAddon={<InputGroup.Prefix>https://</InputGroup.Prefix>}`                                                      |
| `Type=Trailing button`   | `InputGroup trailingAddon={<Button color="secondary" … />}`                                                                      |
| `Type=Payment input`     | `PaymentInput`, `fa-design-system/components/base/input/input-payment`                                                           |
| `Type=Tags`              | `InputTags`, `fa-design-system/components/base/input/input-tags`                                                                 |
| `State=Filled`           | `value` / `defaultValue`                                                                                                         |

| Figma                             | Code                                                                        |
| --------------------------------- | --------------------------------------------------------------------------- |
| Input date                        | `InputDate`, `fa-design-system/components/base/input/input-date`            |
| Input file                        | `InputFile`, `fa-design-system/components/base/input/input-file`            |
| Input tags outer                  | `InputTagsOuter`, `fa-design-system/components/base/input/input-tags-outer` |
| Input number                      | `InputNumber`, `fa-design-system/components/base/input/input-number`        |
| `Size=sm/md/lg` (all four)        | `size`, same names                                                          |
| `Orientation=Horizontal/Vertical` | `orientation="horizontal"` / `"vertical"` (default)                         |
| `State=Loading` (Input file)      | `isLoading`                                                                 |

| Figma                         | Code                                                             |
| ----------------------------- | ---------------------------------------------------------------- |
| Verification code input field | `PinInput`, `fa-design-system/components/base/input/pin-input`   |
| `Size=xxxs/xxs/xs/sm/md/lg`   | `size` on `PinInput`, same names                                 |
| `Digits=4/6`                  | `<PinInput.Group maxLength={4}>` with that many `PinInput.Slot`s |
| `Label` / `Hint text`         | `PinInput.Label` / `PinInput.Description`                        |
| disabled / invalid            | `disabled` / `invalid` on `PinInput` (not `isDisabled`)          |

| Figma                | Code                                                             |
| -------------------- | ---------------------------------------------------------------- |
| Textarea input field | `TextArea`, `fa-design-system/components/base/textarea/textarea` |
| `Type=Default`       | `TextArea`                                                       |
| `Type=Tags`          | none, see Mismatches                                             |
| `Resize handle`      | none (always resizable), see Mismatches                          |

## Select and dropdown

| Figma                  | Code                                                                       |
| ---------------------- | -------------------------------------------------------------------------- |
| Select                 | `Select` + `Select.Item`, `fa-design-system/components/base/select/select` |
| `Size=sm/md/lg`        | `size`, same names                                                         |
| `Type=Default`         | `Select`                                                                   |
| `Type=Icon leading`    | `icon={Icon}` on `Select`, and on each item                                |
| `Type=Avatar leading`  | items with `avatarUrl`                                                     |
| `Type=Dot leading`     | `icon={<Dot … />}` on `Select` and items (`foundations/dot-icon`)          |
| `Type=Search`          | `Select.ComboBox`                                                          |
| `Type=Tags`            | `TagSelect`, `fa-design-system/components/base/select/tag-select`          |
| `Supporting text=True` | `supportingText` on the items                                              |
| `Shortcut=True`        | `shortcut` on `Select.ComboBox` only (default `true`)                      |
| `State=Placeholder`    | `placeholder`, no selection                                                |
| \_Select menu item     | `Select.Item`; `Selected` is selection state, `Type` as above              |

| Figma                | Code                                                                                                   |
| -------------------- | ------------------------------------------------------------------------------------------------------ |
| Dropdown             | `Dropdown.Root` + `.Popover` + `.Menu` + `.Item`, `fa-design-system/components/base/dropdown/dropdown` |
| `Type=Button`        | a `Button` as the first child of `Dropdown.Root`                                                       |
| `Type=Icon`          | `Dropdown.DotsButton`                                                                                  |
| `Type=Avatar`        | an `Avatar` inside a React Aria `Button` (no export; see dropdown.md)                                  |
| \_Dropdown list item | `Dropdown.Item`                                                                                        |
| `Icon=True`          | `icon={Icon}`                                                                                          |
| `Checkbox=True`      | `selectionMode="multiple"` on the menu, `selectionIndicator="checkbox"`                                |
| `Shortcut=True`      | `addon="⌘K"`                                                                                           |
| `Divider=True`       | `Dropdown.Separator` after the item                                                                    |
| `State=Disabled`     | `isDisabled`                                                                                           |

## Date pickers and file upload

| Figma                      | Code                                                                                 |
| -------------------------- | ------------------------------------------------------------------------------------ |
| Date picker dropdown       | `fa-design-system/components/application/date-picker/date-picker`                    |
| `Type=Single date`         | `DatePicker`                                                                         |
| `Type=Dual dates`          | `DateRangePicker`, `.../date-picker/date-range-picker`                               |
| `State=Placeholder/Active` | no value / `value` set                                                               |
| \_Date picker menu         | built into both; pre-set ranges and actions are always shown (`onApply`, `onCancel`) |
| Date picker modal          | none, see Not in code                                                                |

| Figma                        | Code                                                                                                              |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| File upload                  | `FileUpload.Root` + `.DropZone` + `.List`, `fa-design-system/components/application/file-upload/file-upload-base` |
| `Files queued=True`          | `FileUpload.List` with items                                                                                      |
| `Type=Progress bar`          | items are `FileUpload.ListItemProgressBar`                                                                        |
| `Type=Progress fill`         | items are `FileUpload.ListItemProgressFill`                                                                       |
| \_File upload item base      | the list item (`name`, `size`, `progress`, `type`)                                                                |
| `State=In progress/Complete` | `progress` below 100 / `progress={100}`                                                                           |
| `State=Error`                | `failed` (+ `onRetry`)                                                                                            |
| `Icon type=File type`        | `type="pdf"` etc.                                                                                                 |

## Alerts and notifications

| Figma                                    | Code                                                                     |
| ---------------------------------------- | ------------------------------------------------------------------------ |
| Alert                                    | `Alert`, `fa-design-system/components/application/alerts/alert`; `title` |
| `Color=Gray/Error/Warning/Success/Brand` | `color`, same names lowercased                                           |
| `Size=Floating/Full-width`               | `variant="floating"` / `"full-width"`                                    |
| `Supporting text=True`                   | `description`                                                            |
| `Actions=True`                           | `actions={…}` (buttons)                                                  |
| `X close button=True`                    | `onClose`                                                                |

| Figma                             | Code                                                                                                  |
| --------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Notification                      | `notify({…})` or `Notification`, `fa-design-system/components/application/notifications/notification` |
| `Type=Primary icon/Gray icon`     | `type="brand"` / `"gray"`                                                                             |
| `Type=Error/Warning/Success icon` | `type="error"` / `"warning"` / `"success"`                                                            |
| `Type=No icon`                    | `type="none"`                                                                                         |
| `Type=Avatar`                     | `type="avatar" avatarSrc="…"`                                                                         |
| `Type=Image`                      | `type="image" imageSrc="…"`                                                                           |
| `Type=Progress indicator`         | `type="progress" progress={40}`                                                                       |
| `Supporting text` / `Actions`     | `description` / `actions`                                                                             |
| `X close button=True`             | `onClose` (`notify()` always adds it)                                                                 |

## Modals

| Figma                           | Code                                                                                                                                              |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Modal                           | `Modal`, `fa-design-system/components/application/modals/modal`                                                                                   |
| `Breakpoint=Desktop`            | nothing (same component from `sm` up)                                                                                                             |
| `Breakpoint=Mobile sheet`       | `mobile="sheet"` (default)                                                                                                                        |
| `Breakpoint=Mobile full screen` | `mobile="fullscreen"`                                                                                                                             |
| `Header` / `Body` / `Footer`    | `ModalHeader` / `ModalBody` / `ModalFooter`                                                                                                       |
| \_Modal header                  | `ModalHeader`: `Title` → `title`, `Supporting text` → `description`, `Badge` → `badge`, `Close button` → `showCloseButton`, `Divider` → `divider` |
| \_Modal footer                  | `ModalFooter`: `Actions` → children, `Divider` → `divider`                                                                                        |

| Figma                              | Code                                                                                                                            |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Prompt modal                       | `PromptModal` + `PromptModalHeader` + `PromptModalActions`, `fa-design-system/components/application/prompt-modal/prompt-modal` |
| `Type=Stacked left aligned`        | `PromptModalHeader align="left"`                                                                                                |
| `Type=Horizontal`                  | `PromptModalHeader align="horizontal"`                                                                                          |
| `Type=Warning …`                   | as above with `icon={<FeaturedIcon color="warning" … />}`                                                                       |
| `Type=Destructive …`               | `icon={<FeaturedIcon color="error" … />}`, `color="primary-destructive"` button                                                 |
| other example `Type`s              | compose from the parts; the body is free                                                                                        |
| \_Prompt modal header `Type`       | `align="left"` / `"center"` / `"horizontal"` (Left / Center / Horizontal left aligned)                                          |
| `Featured icon` / `X close button` | `icon={<FeaturedIcon size="lg" … />}` / `showCloseButton`                                                                       |
| `Padding bottom` / `Divider`       | `paddingBottom` / `divider`                                                                                                     |
| \_Prompt modal actions `Type`      | `layout="vertical"` / `"horizontal"` / `"horizontal-right"` (Vertical fill / Horizontal fill / Horizontal right aligned)        |
| `Checkbox` / `Tertiary button`     | `leading={…}` (a `Checkbox`, a `link-gray` `Button`)                                                                            |
| `Destructive=True` / `Divider`     | `color="primary-destructive"` on the primary button / `divider`                                                                 |

## Navigation (Finansavisen, Kapital, Motor)

| Figma                                       | Code                                                                                                       |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Header, Fa / Kapital / Motor Header         | `SiteHeader`, `fa-design-system/components/application/site-header/site-header`                            |
| `Brand=Fa/Kapital/Motor`                    | `brand="fa"` / `"kapital"` / `"motor"`                                                                     |
| `Type=Desktop/Tablet/Mobile`                | nothing (responsive: mobile below `md`, tablet `md`, desktop `lg`)                                         |
| `Type=Collapsed`                            | `collapsed`                                                                                                |
| `Bors Bar=True`                             | `tickerItems={[…]}`                                                                                        |
| `Log In=True` / `Avatar=True`               | no `user` / `user={{ initials, href }}`                                                                    |
| Footer, Fa / Kapital / Motor Footer         | `SiteFooter`, `fa-design-system/components/application/site-footer/site-footer`; `brand`, `Type` as Header |
| Ticker bar, Bors Bar                        | `TickerBar`, `.../site-header/ticker-bar`; use it through `tickerItems`                                    |
| Menu panel                                  | `SiteMenuPanel`; pass `menu={…}` to `SiteHeader`. `View` is state                                          |
| \_Header search, \_Header login, \_Nav link | built into `SiteHeader`                                                                                    |

## Application navigation

| Figma                        | Code                                                                               |
| ---------------------------- | ---------------------------------------------------------------------------------- |
| Sidebar navigation           | `fa-design-system/components/application/app-navigation/sidebar-navigation/<file>` |
| `Style=Simple`               | `SidebarNavigationSimple` (`sidebar-simple`)                                       |
| `Style=Dual-tier`            | `SidebarNavigationDualTier` (`sidebar-dual-tier`)                                  |
| `Style=Slim`                 | `SidebarNavigationSlim` (`sidebar-slim`)                                           |
| `Style=Sections dividers`    | `SidebarNavigationSectionDividers` (`sidebar-section-dividers`)                    |
| `Style=Sections subheadings` | `SidebarNavigationSectionsSubheadings` (`sidebar-sections-subheadings`)            |
| `Open=True`                  | the mobile menu opened (state)                                                     |
| Header navigation            | `HeaderNavigationBase`, `.../app-navigation/header-navigation`                     |
| `Style=Simple/Dual-tier`     | without / with `subItems={[…]}`                                                    |
| \_Nav item base              | an entry in `items`: `label`, `href`, `icon`, `badge`; `Current` → `activeUrl`     |
| \_Nav account card           | built into the sidebars (`NavAccountCard`)                                         |
| \_Nav featured card          | `featureCard={…}` slot; no exported cards, see Not in code                         |

## Pagination and carousel

| Figma                                              | Code                                                                                                                                       |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Pagination                                         | `fa-design-system/components/application/pagination/pagination`; the `Type` picks the export                                               |
| `Type=Page default`                                | `PaginationPageDefault`                                                                                                                    |
| `Type=Page minimal center aligned`                 | `PaginationPageMinimalCenter`                                                                                                              |
| `Type=Card default`                                | `PaginationCardDefault`                                                                                                                    |
| `Type=Card minimal left/right/center aligned`      | `PaginationCardMinimal align="left"` / `"right"` / `"center"`                                                                              |
| `Type=Card button group left/right/center aligned` | `PaginationButtonGroup align="left"` / `"right"` / `"center"`                                                                              |
| `Type=Card advanced`                               | `PaginationCardAdvanced align="space-between"`                                                                                             |
| `Type=Card advanced center aligned`                | `PaginationCardAdvanced align="center"`                                                                                                    |
| `Page size=True`                                   | `pageSize` + `onPageSizeChange` (Card minimal, Card advanced)                                                                              |
| `Shape=Circle`                                     | nothing (circle only)                                                                                                                      |
| Pagination dot group                               | `.../pagination/pagination-dot` / `.../pagination/pagination-line`                                                                         |
| `Style=Dot/Line`                                   | `PaginationDot` / `PaginationLine`                                                                                                         |
| `Size=md/lg`                                       | `size`, same names                                                                                                                         |
| `Framed=True`                                      | `framed`                                                                                                                                   |
| Carousel image, \_Carousel arrow                   | `Carousel.Root` + `.Content` + `.Item` + `.PrevTrigger` / `.NextTrigger`, `fa-design-system/components/application/carousel/carousel-base` |

## Progress and slider

| Figma                             | Code                                                                                               |
| --------------------------------- | -------------------------------------------------------------------------------------------------- |
| Progress bar                      | `ProgressBar`, `fa-design-system/components/base/progress-indicators/progress-indicators`; `value` |
| `Label=False`                     | no `labelPosition`                                                                                 |
| `Label=Right/Bottom`              | `labelPosition="right"` / `"bottom"`                                                               |
| `Label=Top/Bottom floating`       | `labelPosition="top-floating"` / `"bottom-floating"`                                               |
| Progress circle                   | `fa-design-system/components/base/progress-indicators/progress-circles`                            |
| `Shape=Circle/Half circle`        | `ProgressBarCircle` / `ProgressBarHalfCircle`                                                      |
| `Size=xxs/xs/sm/md/lg`            | `size` (required), same names                                                                      |
| `Label=True`                      | `label="…"`                                                                                        |
| Slider                            | `Slider`, `fa-design-system/components/base/slider/slider`                                         |
| `Label=False/Bottom/Top floating` | `labelPosition="default"` / `"bottom"` / `"top-floating"`                                          |
| `Left control` / `Right control`  | `defaultValue={[25, 75]}` (two thumbs) or `value`                                                  |

## States

| Figma                                 | Code                                                                                                                   |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Empty state / Error state             | `EmptyState` / `ErrorState`, `fa-design-system/components/application/empty-state/empty-state`; `title`, `description` |
| `Featured icon=False`                 | `showIcon={false}`                                                                                                     |
| `Primary button` / `Secondary button` | `primaryAction={<Button … />}` / `secondaryAction={…}`                                                                 |
| `Actions=False`                       | neither action                                                                                                         |

## Tables

| Figma                                  | Code                                                                                                                                             |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Table                                  | `Table` (+ `TableCard.Root`), `fa-design-system/components/application/table/table`                                                              |
| `Example=…`                            | content only; table.md has the patterns                                                                                                          |
| `Dividers=Divider line`                | default                                                                                                                                          |
| `Dividers=Alternating fills`           | no prop, see Mismatches                                                                                                                          |
| Table header cell                      | `Table.Head` (`label`, `tooltip`)                                                                                                                |
| `Size=sm/md`                           | `size` on `Table` (or `Table.Header` / `Table.Row` / `Table.Cell`)                                                                               |
| `Checkbox=True`                        | `selectionMode="multiple" selectionBehavior="toggle"` on `Table`                                                                                 |
| Table cell                             | `Table.Cell`: `Lead text` / `Supporting text` / the avatar or icon → `leadText` / `supportingText` / `leading`; other types composed inside      |
| Table cell lead action `Type=Checkbox` | as header `Checkbox=True`                                                                                                                        |
| Card header                            | `CardHeader` for content cards (`title`, `badge`, `actions`, `divider`); in a table card, `TableCard.Header` (`contentTrailing`), see Mismatches |

## Tabs, tags, tooltips

| Figma                                                        | Code                                                                                                   |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| Horizontal tabs                                              | `Tabs` + `Tabs.List` + `Tabs.Item` + `Tabs.Panel`, `fa-design-system/components/application/tabs/tabs` |
| Vertical tabs                                                | same, `orientation="vertical"` on `Tabs`                                                               |
| `Type=Button brand/Button gray/Button border/Button minimal` | `type="button-brand"` / `"button-gray"` / `"button-border"` / `"button-minimal"` on `Tabs.List`        |
| `Type=Underline` (horizontal)                                | `type="underline"`                                                                                     |
| `Type=Button primary` (vertical)                             | `type="button-brand"`                                                                                  |
| `Type=Line` (vertical)                                       | `type="line"`                                                                                          |
| `Size=sm/md`                                                 | `size` on `Tabs.List`, same names                                                                      |
| `Full width=True`                                            | `fullWidth`                                                                                            |
| \_Tab button base                                            | `Tabs.Item`; `Current` is the selected key, `Badge` → `badge`                                          |

| Figma                      | Code                                                                              |
| -------------------------- | --------------------------------------------------------------------------------- |
| Tag                        | `Tag` inside `TagGroup` + `TagList`, `fa-design-system/components/base/tags/tags` |
| `Size=sm/md/lg`            | `size` on `TagGroup`, same names                                                  |
| `Icon=Avatar` / `Icon=Dot` | `avatarSrc="…"` / `dot`                                                           |
| `Icon=Country`             | none, see Mismatches                                                              |
| `Action=X close`           | `onClose`                                                                         |
| `Action=Count`             | `count={4}`                                                                       |
| `Checkbox=True`            | `selectionMode="multiple"` (or `"single"`) on `TagGroup`                          |

| Figma                  | Code                                                                                                                                                                                                   |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Tooltip                | `Tooltip`, `fa-design-system/components/base/tooltip/tooltip`; `Text` → `title`                                                                                                                        |
| `Supporting text=True` | `description`                                                                                                                                                                                          |
| `Arrow=None`           | no `arrow` (default)                                                                                                                                                                                   |
| `Arrow=…`              | `arrow`; the arrow points at the trigger, so set `placement`: Bottom center → `"top"`, Bottom left / right → `"top left"` / `"top right"`, Top center → `"bottom"`, Left → `"right"`, Right → `"left"` |
| Help icon              | `tooltip="…"` on `Input`, `Select`, `TextArea` or `Label`; no standalone component                                                                                                                     |

## Charts

No chart components: each chart is a Recharts composition with the helpers from
`fa-design-system/components/application/charts/charts-base`. [charts.md](components/charts.md)
names the pattern for each Figma chart.

| Figma              | Code                                                            |
| ------------------ | --------------------------------------------------------------- |
| Line and bar chart | Recharts `AreaChart` / `LineChart` / `BarChart` (`Chart style`) |
| Activity gauge     | Recharts `RadialBarChart`                                       |
| Pie chart          | Recharts `PieChart`; `Size=xxs…lg` is 120–280px                 |
| Radar chart        | Recharts `RadarChart`                                           |
| Chart marker       | `ChartTooltipContent` + `ChartActiveDot`                        |
| `Legend=…`         | Recharts `Legend` with `content={<ChartLegendContent />}`       |

## Built in, not used on their own

\_Avatar add button (also exported, see Avatars), \_Button group base, \_Select menu item,
\_Dropdown list item, \_Tab button base, \_Nav item base, \_Nav account card, \_File upload item
base, \_Date picker menu, \_Modal header, \_Modal footer, \_Prompt modal header, \_Prompt modal
actions, \_Carousel arrow, \_Header search, \_Header login, \_Nav link: each is mapped in its
parent's table above.

## Not in code

Report these; use the stand-in only where one is given (SKILL.md → Coverage gaps).

- **Avatar group**: `Avatar`s in a `flex -space-x-2` row, `<Avatar initials="+4" />` for the
  overflow. Parity §2.
- **Social button groups**: no stand-in; a row of `SocialButton`s is the closest.
- **Date picker modal**: no stand-in; `DatePicker` / `DateRangePicker` open a popover at every width.
- **Nav featured cards** (13 types): two exist only as Storybook demos, none exported. Parity §2.
- **Mac App Store** badge. Parity §2.
- **Missing From Code pages**: Activity feeds, Calendars (month / week / day views), Code
  snippets, Command menus, Messaging, Progress steps, Text editors, Video players. No stand-in; ask
  before building. Parity §2.

## Mismatches

Figma options with no code value, and code values Figma lacks. Don't map them yourself.

- Badge `Color=Blue/Indigo/Blue gray`: not in `BadgeColors`
  (`components/base/badges/badge-types.ts:5`). Parity §4.
- Textarea `Type=Tags` and `Resize handle`: no prop; the handle always shows
  (`components/base/textarea/textarea.tsx:38`). Code has `size="sm" | "md"`, Figma one size
  (`textarea.tsx:18`). Parity §4 (size only).
- Tag `Icon=Country` (`Flag swap`): `Tag` has no flag (`components/base/tags/tags.tsx:37`).
- Select `Shortcut`: only `Select.ComboBox` has `shortcut`
  (`components/base/select/combobox.tsx:17`); plain `Select` has none.
- \_Dropdown list item `Supporting text`: `Dropdown.Item` has no such prop
  (`components/base/dropdown/dropdown.tsx:29`).
- Pagination `Page size=False`: Card minimal and Card advanced always show the page-size select
  (`components/application/pagination/pagination.tsx:282`, `:414`). `Shape=Square`: circle only,
  parity §4 and §6.
- Pagination dot group: `isBrand` on `PaginationDot` has no Figma option
  (`components/application/pagination/pagination-dot.tsx:11`).
- Table `Dividers=Alternating fills`: no prop; the demos restyle rows with `className`
  (`components/application/table/table.demo.tsx:172`).
- Table cell lead action `Type=Radio/Toggle`: only checkbox selection
  (`components/application/table/table.tsx:151`).
- Card header `Avatar`, `Dropdown icon`: neither `CardHeader` nor `TableCard.Header` has them; `Divider=False` exists only on `CardHeader`
  (`components/application/table/table.tsx:62`).
- Header `Buy=False`: "Kjøp" always renders
  (`components/application/site-header/site-header.tsx:226`).
- Date picker modal: no code (`DatePicker` is a popover,
  `components/application/date-picker/date-picker.tsx:40`).
- \_File upload item base `Icon type=Simple`: no matching option; `fileIconVariant` is the file
  icon's own variant (`components/application/file-upload/file-upload-base.tsx:251`).
- Mobile app store badge: no Mac App Store; `GooglePlayWhiteButton` is code-only
  (`components/base/buttons/app-store-buttons.tsx:156`). Parity §2.
- Avatar online indicator: code has 3xl / 4xl
  (`components/base/avatar/base-components/avatar-online-indicator.tsx:12`). Parity §4.
