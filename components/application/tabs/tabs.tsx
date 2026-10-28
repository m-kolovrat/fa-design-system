"use client";

import type { ComponentPropsWithRef, FC, ReactNode } from "react";
import { createContext, isValidElement, useContext } from "react";
import type {
    TabListProps as AriaTabListProps,
    TabPanelProps as AriaTabPanelProps,
    TabProps as AriaTabProps,
    TabRenderProps as AriaTabRenderProps,
    TabsProps as AriaTabsProps,
} from "react-aria-components";
import { Tab as AriaTab, TabList as AriaTabList, TabPanel as AriaTabPanel, Tabs as AriaTabs, TabsContext, useSlottedContext } from "react-aria-components";
import { Badge } from "@/components/base/badges/badges";
import { cx } from "@/utils/cx";
import { isReactComponent } from "@/utils/is-react-component";

type Orientation = "horizontal" | "vertical";

// Types for different orientations
type HorizontalTypes = "button-brand" | "button-gray" | "button-border" | "button-minimal" | "underline";
type VerticalTypes = "button-brand" | "button-gray" | "button-border" | "button-minimal" | "line";
type TabTypeColors<T> = T extends "horizontal" ? HorizontalTypes : VerticalTypes;

// Styles for different types of tab
const getTabStyles = ({ isFocusVisible, isSelected, isHovered }: AriaTabRenderProps) => ({
    "button-brand": cx(
        "outline-focus-ring *:data-icon:text-fg-quaternary",
        isFocusVisible && "outline-2 -outline-offset-2",
        (isSelected || isHovered) && "bg-brand-primary_alt text-brand-secondary *:data-icon:text-fg-brand-secondary_hover",
    ),
    "button-gray": cx(
        "outline-focus-ring *:data-icon:text-fg-quaternary",
        isHovered && "bg-primary_hover text-secondary *:data-icon:text-fg-secondary_hover",
        isFocusVisible && "outline-2 -outline-offset-2",
        isSelected && "bg-primary_hover text-secondary *:data-icon:text-fg-secondary_hover",
    ),
    "button-border": cx(
        "outline-focus-ring *:data-icon:text-fg-quaternary",
        isFocusVisible && "outline-2 -outline-offset-2",
        (isSelected || isHovered) && "bg-primary_alt text-secondary shadow-sm *:data-icon:text-fg-secondary_hover",
    ),
    "button-minimal": cx(
        "rounded-md outline-focus-ring *:data-icon:text-fg-quaternary",
        isFocusVisible && "outline-2 -outline-offset-2",
        (isSelected || isHovered) && "bg-primary_alt text-secondary shadow-xs ring-1 ring-primary ring-inset *:data-icon:text-fg-secondary_hover",
    ),
    underline: cx(
        "rounded-none border-b-2 border-transparent outline-focus-ring *:data-icon:text-fg-quaternary",
        isFocusVisible && "outline-2 -outline-offset-2",
        (isSelected || isHovered) && "border-fg-brand-secondary text-brand-secondary *:data-icon:text-fg-brand-secondary_hover",
    ),
    line: cx(
        "rounded-none border-l-2 border-transparent outline-focus-ring *:data-icon:text-fg-quaternary",
        isFocusVisible && "outline-2 -outline-offset-2",
        (isSelected || isHovered) && "border-fg-brand-secondary text-brand-secondary *:data-icon:text-fg-brand-secondary_hover",
    ),
});

const sizes = {
    sm: {
        base: "text-sm font-semibold gap-1 *:data-icon:size-4",
        "button-brand": "py-2 px-2.5",
        "button-gray": "py-2 px-2.5",
        "button-border": "py-2 px-2.5",
        "button-minimal": "py-2 px-2.5",
        underline: "px-0.5 pb-2.5 pt-0",
        line: "pl-2.5 pr-3 py-0.5",
    },
    md: {
        base: "text-md font-semibold gap-1.5 *:data-icon:size-5",
        "button-brand": "py-2.5 px-2.5",
        "button-gray": "py-2.5 px-2.5",
        "button-border": "py-2.5 px-2.5",
        "button-minimal": "py-2.5 px-2.5",
        underline: "px-0.5 pb-2.5 pt-0",
        line: "pr-3.5 pl-3 py-1",
    },
};

// Styles for different types of horizontal tabs
const getHorizontalStyles = ({ size, fullWidth }: { size?: "sm" | "md"; fullWidth?: boolean }) => ({
    "button-brand": "gap-1",
    "button-gray": "gap-1",
    "button-border": cx("gap-1 rounded-lg bg-secondary_alt p-1 ring-1 ring-secondary ring-inset", size === "md" && "rounded-xl p-1.5"),
    // Figma Button minimal: the track hugs its tabs; Full width=True stretches it.
    "button-minimal": cx("gap-0.5 rounded-md bg-secondary_alt ring-1 ring-secondary ring-inset", fullWidth ? "w-full" : "w-fit"),
    underline: cx("gap-3", fullWidth && "w-full gap-4"),
    line: "gap-2",
});

export interface TabListComponentProps<T extends object, K extends Orientation> extends Omit<AriaTabListProps<T>, "items"> {
    /** The size of the tabs. */
    size?: keyof typeof sizes;
    /**
     * The look of the tabs. Horizontal: `button-brand`, `button-gray`, `button-border`, `button-minimal`, `underline`.
     * Vertical: the same buttons, and `line` instead of `underline`.
     */
    type?: TabTypeColors<K>;
    /** The orientation of the tab list. Follows the `Tabs` orientation when left out. */
    orientation?: K;
    /** The tabs as data; render each with `{(tab) => <Tabs.Item {...tab} />}` as children. */
    items?: T[];
    /** Whether the tabs share the full width of the list. */
    fullWidth?: boolean;
}

const TabListContext = createContext<Omit<TabListComponentProps<TabComponentProps, Orientation>, "items">>({
    size: "sm",
    type: "button-brand",
});

/** `Tabs.List`: the row (or column) of tabs; sets their type and size. */
export const TabList = <T extends Orientation>({
    size = "sm",
    type = "button-brand",
    orientation: orientationProp,
    fullWidth,
    className,
    children,
    ...otherProps
}: TabListComponentProps<TabComponentProps, T>) => {
    const context = useSlottedContext(TabsContext);

    const orientation = orientationProp ?? context?.orientation ?? "horizontal";

    return (
        <TabListContext.Provider value={{ size, type, orientation, fullWidth }}>
            <AriaTabList
                {...otherProps}
                className={(state) =>
                    cx(
                        "group flex",

                        getHorizontalStyles({
                            size,
                            fullWidth,
                        })[type as HorizontalTypes],

                        orientation === "vertical" && "w-max flex-col",

                        // Only horizontal tabs with underline type have bottom border
                        orientation === "horizontal" &&
                            type === "underline" &&
                            "relative before:absolute before:inset-x-0 before:bottom-0 before:h-px before:bg-border-secondary",

                        typeof className === "function" ? className(state) : className,
                    )
                }
            >
                {children ?? (otherProps.items ? (item) => <Tab {...item}>{item.children}</Tab> : undefined)}
            </AriaTabList>
        </TabListContext.Provider>
    );
};

export interface TabPanelProps extends ComponentPropsWithRef<typeof AriaTabPanel> {
    /** The `id` of the `Tabs.Item` this panel belongs to. */
    id?: AriaTabPanelProps["id"];
}

/** `Tabs.Panel`: the content shown while its tab is selected. */
export const TabPanel = (props: TabPanelProps) => {
    return (
        <AriaTabPanel
            {...props}
            className={(state) =>
                cx(
                    "outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2",
                    typeof props.className === "function" ? props.className(state) : props.className,
                )
            }
        />
    );
};

export interface TabComponentProps extends AriaTabProps {
    /** The tab's id; the `Tabs.Panel` with the same `id` is its content. */
    id?: AriaTabProps["id"];
    /** Whether the tab is disabled. */
    isDisabled?: AriaTabProps["isDisabled"];
    /** Makes the tab a link (route-based tabs). */
    href?: AriaTabProps["href"];
    /** The label of the tab (or pass `children`). */
    label?: ReactNode;
    /** The children of the tab. */
    children?: ReactNode | ((props: AriaTabRenderProps) => ReactNode);
    /** Icon component or element to show before the text */
    icon?: FC<{ className?: string }> | ReactNode;
    /** A count or short text next to the label (from `md` up). */
    badge?: number | string;
}

/** `Tabs.Item`: one tab. */
export const Tab = ({ label, children, badge, icon: Icon, className, ...otherProps }: TabComponentProps) => {
    const { size = "sm", type = "button-brand", fullWidth } = useContext(TabListContext);

    const showPillColorBadge = type === "underline" || type === "line" || type === "button-brand";

    return (
        <AriaTab
            {...otherProps}
            className={(prop) =>
                cx(
                    "z-10 flex h-max cursor-pointer items-center justify-center gap-2 rounded-sm whitespace-nowrap text-quaternary transition",
                    "group-orientation-vertical:justify-start",
                    fullWidth && "w-full flex-1",
                    sizes[size].base,
                    sizes[size][type],
                    getTabStyles(prop)[type],
                    typeof className === "function" ? className(prop) : className,
                )
            }
        >
            {(state) => (
                <>
                    {/* Icon */}
                    {isValidElement(Icon) && Icon}
                    {isReactComponent(Icon) && <Icon data-icon className="transition-inherit-all" />}

                    <span className={cx("flex items-center gap-1.5", type !== "line" && "px-0.5")}>
                        {typeof children === "function" ? children(state) : children || label}

                        {/* Badge */}
                        {badge && (
                            <Badge
                                size="sm"
                                type={showPillColorBadge ? "pill-color" : "modern"}
                                color={showPillColorBadge && (state.isHovered || state.isSelected) ? "brand" : "gray"}
                                className={cx("hidden transition-inherit-all md:flex", size === "sm" && "-my-px")}
                            >
                                {badge}
                            </Badge>
                        )}
                    </span>
                </>
            )}
        </AriaTab>
    );
};

export interface TabsProps extends ComponentPropsWithRef<typeof AriaTabs> {
    /** The orientation of the tabs. */
    orientation?: AriaTabsProps["orientation"];
    /** The selected tab's id (controlled). */
    selectedKey?: AriaTabsProps["selectedKey"];
    /** The tab selected at first (uncontrolled). Defaults to the first tab. */
    defaultSelectedKey?: AriaTabsProps["defaultSelectedKey"];
    /** Called with the newly selected tab's id. */
    onSelectionChange?: AriaTabsProps["onSelectionChange"];
    /**
     * `manual`: arrow keys move focus and Enter or Space selects. `automatic`: arrow keys select.
     * @default manual
     */
    keyboardActivation?: AriaTabsProps["keyboardActivation"];
    /** The ids of tabs that can't be selected. */
    disabledKeys?: AriaTabsProps["disabledKeys"];
}

/** Switches between views of the same content: `Tabs.List` with `Tabs.Item`s, and a `Tabs.Panel` per tab. */
export const Tabs = ({ className, ...props }: TabsProps) => {
    return (
        <AriaTabs
            keyboardActivation="manual"
            {...props}
            className={(state) => cx("flex w-full flex-col", typeof className === "function" ? className(state) : className)}
        />
    );
};

Tabs.Panel = TabPanel;
Tabs.List = TabList;
Tabs.Item = Tab;
