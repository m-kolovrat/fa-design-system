"use client";

import { Fragment, useEffect, useId, useRef, useState } from "react";
import { Ai, Close, Menu, Search } from "fa-icons";
import { useInteractOutside, usePreventScroll } from "react-aria";
import { Button as AriaButton, Link as AriaLink } from "react-aria-components";
import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { cx } from "@/utils/cx";
import { NavDropdown } from "./nav-dropdown";
import { type SiteBrand, type SiteNavItem, siteBrands } from "./site-brands";
import { type SiteMenuContent, SiteMenuPanel } from "./site-menu-panel";
import { TickerBar, type TickerItem } from "./ticker-bar";

interface NavLinkProps {
    item: SiteNavItem;
    size: "sm" | "md";
    hoverClassName: string;
    /** Fill while the link's dropdown is open (the same color as hover). */
    activeClassName?: string;
}

/** A link in the header navigation row (Figma: _Nav link). */
const NavLink = ({ item, size, hoverClassName, activeClassName }: NavLinkProps) => (
    <AriaLink
        href={item.href}
        aria-current={item.current ? "page" : undefined}
        aria-haspopup={item.items?.length ? "menu" : undefined}
        className={cx(
            "flex h-8 shrink-0 items-center rounded-full text-primary_on-brand outline-focus-ring transition focus-visible:outline-2 focus-visible:outline-offset-2",
            size === "sm" ? "px-2 text-xs font-medium" : "px-2 text-sm font-semibold",
            hoverClassName,
            activeClassName,
        )}
    >
        {item.label}
    </AriaLink>
);

interface NavGroupsProps {
    groups: SiteNavItem[][];
    dividerClassName: string;
    hoverClassName: string;
    activeClassName: string;
}

/** Desktop navigation: link groups split by a vertical divider. */
const NavGroups = ({ groups, dividerClassName, hoverClassName, activeClassName }: NavGroupsProps) => (
    <>
        {groups.map((group, index) => (
            <Fragment key={index}>
                {index > 0 && <span aria-hidden="true" className={cx("h-7.5 w-px shrink-0", dividerClassName)} />}
                {group.map((item) =>
                    item.items?.length ? (
                        <NavDropdown key={item.href} item={{ ...item, items: item.items }}>
                            {(isOpen) => (
                                <NavLink item={item} size="md" hoverClassName={hoverClassName} activeClassName={isOpen ? activeClassName : undefined} />
                            )}
                        </NavDropdown>
                    ) : (
                        <NavLink key={item.href} item={item} size="md" hoverClassName={hoverClassName} />
                    ),
                )}
            </Fragment>
        ))}
    </>
);

interface HeaderSearchProps {
    size: "sm" | "md";
    search: { wrapper: string; input: string; icon: string; ai: string };
    className?: string;
}

/**
 * Header search (Figma: _Header search): the library Input with the brand override from
 * `siteBrands`, plus the AI star for Investorchat on the right. The star is decorative.
 */
const HeaderSearch = ({ size, search, className }: HeaderSearchProps) => (
    <div className={cx("group/search relative", className)}>
        <Input
            size={size}
            icon={Search}
            placeholder="Søk på ticker eller spør Investorchat"
            aria-label="Søk på ticker eller spør Investorchat"
            wrapperClassName={search.wrapper}
            inputClassName={cx("pr-9", search.input)}
            iconClassName={search.icon}
        />
        <Ai
            aria-hidden="true"
            className={cx("pointer-events-none absolute top-1/2 right-3 -translate-y-1/2", size === "sm" ? "size-4" : "size-5", search.ai)}
        />
    </div>
);

export interface SiteHeaderProps {
    /**
     * The publication. Sets the logo and the bar color.
     * @default "fa"
     */
    brand?: SiteBrand;
    /** Market ticker shown above the header. Hidden when empty. */
    tickerItems?: TickerItem[];
    /** Desktop navigation. Each inner array is a group; groups are split by a divider. */
    navigation: SiteNavItem[][];
    /** Shorter link list shown on mobile and tablet. */
    shortcuts: SiteNavItem[];
    /** The signed-in user. Without it, the header shows "Logg inn". */
    user?: { initials: string; href: string };
    /**
     * The desktop header after scrolling: small logo, navigation and menu in one row.
     * Mobile and tablet are unaffected.
     * @default false
     */
    collapsed?: boolean;
    /** @default "/" */
    homeHref?: string;
    loginHref?: string;
    subscribeHref?: string;
    /** Content of the panel the Meny button opens. Without it, the button only calls `onMenuPress`. */
    menu?: SiteMenuContent;
    /** Called when the menu button is pressed. */
    onMenuPress?: () => void;
    /** Called when the search button is pressed (mobile, where the search field is hidden). */
    onSearchPress?: () => void;
    className?: string;
}

/**
 * Site header shown on every page (Figma: Header). The layout follows the breakpoint:
 * mobile below `md`, tablet from `md`, desktop from `lg`.
 */
export const SiteHeader = ({
    brand = "fa",
    tickerItems,
    navigation,
    shortcuts,
    user,
    collapsed = false,
    homeHref = "/",
    loginHref = "#",
    subscribeHref = "#",
    menu,
    onMenuPress,
    onSearchPress,
    className,
}: SiteHeaderProps) => {
    const theme = siteBrands[brand];
    const Logo = theme.logo;
    const LogoCollapsed = theme.logoCollapsed;

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const panelRef = useRef<HTMLDivElement>(null);

    // While the Meny panel is open the page behind it doesn't scroll (the panel itself still can),
    // and a click anywhere outside it closes it. The Meny button toggles on its own, so it's ignored.
    usePreventScroll({ isDisabled: !isMenuOpen });
    useInteractOutside({
        ref: panelRef,
        isDisabled: !isMenuOpen,
        onInteractOutside: (event) => {
            if ((event.target as Element | null)?.closest?.("[data-menu-toggle]")) return;
            setIsMenuOpen(false);
        },
    });
    const menuId = useId();

    useEffect(() => {
        if (!isMenuOpen) return;
        const onKeyDown = (event: globalThis.KeyboardEvent) => {
            if (event.key === "Escape") setIsMenuOpen(false);
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [isMenuOpen]);

    const toggleMenu = () => {
        if (menu) setIsMenuOpen((open) => !open);
        onMenuPress?.();
    };
    const MenuIcon = isMenuOpen ? Close : Menu;
    const menuButtonProps = {
        "aria-label": isMenuOpen ? "Lukk meny" : "Meny",
        "aria-expanded": menu ? isMenuOpen : undefined,
        "aria-controls": menu && isMenuOpen ? menuId : undefined,
        onPress: toggleMenu,
        "data-menu-toggle": true,
    };

    const iconButtonClassName = cx(
        "flex shrink-0 items-center justify-center rounded-full text-fg-white outline-focus-ring transition focus-visible:outline-2 focus-visible:outline-offset-2",
        theme.hover,
    );

    return (
        <header className={cx("relative", theme.surface, className)}>
            {tickerItems && tickerItems.length > 0 && <TickerBar items={tickerItems} />}

            <div className={cx("flex flex-col items-center gap-2 px-4 pt-4 lg:gap-4 lg:px-7.5 lg:pb-3", collapsed && "lg:hidden")}>
                <div className="flex w-full items-center justify-between gap-8">
                    <div className="flex flex-1">
                        <AriaLink
                            href={homeHref}
                            aria-label={theme.name}
                            className="rounded-xs text-fg-white outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2"
                        >
                            <Logo className={theme.logoClassName} />
                        </AriaLink>
                    </div>

                    <HeaderSearch size="sm" search={theme.search} className="hidden flex-2 md:block lg:hidden" />
                    <HeaderSearch size="md" search={theme.search} className="hidden w-126 lg:block" />

                    <div className="flex flex-1 items-center justify-end gap-3 lg:gap-2">
                        <div className="flex items-center gap-2">
                            <AriaButton aria-label="Søk" onPress={onSearchPress} className={cx(iconButtonClassName, "-m-1 p-1 md:hidden")}>
                                <Search className="size-6" />
                            </AriaButton>
                            {!user && (
                                <Button size="sm" color="primary" href={loginHref} className={cx("lg:px-3.5 lg:py-2.5", theme.loginButton)}>
                                    Logg inn
                                </Button>
                            )}
                            <Button size="sm" color="secondary" href={subscribeHref} className="lg:px-3.5 lg:py-2.5">
                                Kjøp
                            </Button>
                        </div>

                        {user && (
                            <AriaLink href={user.href} aria-label="Min side" className="group hidden rounded-full outline-none lg:flex">
                                <Avatar
                                    size="md"
                                    focusable
                                    contentClassName="bg-brand-solid"
                                    placeholder={<span className="text-md font-semibold text-white">{user.initials}</span>}
                                />
                            </AriaLink>
                        )}

                        <AriaButton {...menuButtonProps} className={cx(iconButtonClassName, "-m-1 gap-3 p-1 lg:m-0 lg:px-3 lg:py-2")}>
                            <span className="hidden text-sm font-semibold text-primary_on-brand lg:inline">Meny</span>
                            <MenuIcon className="size-6" />
                        </AriaButton>
                    </div>
                </div>

                <nav aria-label="Snarveier" className="flex w-full justify-center overflow-x-auto lg:hidden">
                    {shortcuts.map((item) => (
                        <NavLink key={item.href} item={item} size="sm" hoverClassName={theme.hover} />
                    ))}
                </nav>

                <nav aria-label="Hovedmeny" className="hidden items-center gap-1 lg:flex">
                    <NavGroups groups={navigation} dividerClassName={theme.divider} hoverClassName={theme.hover} activeClassName={theme.sunken} />
                </nav>
            </div>

            {collapsed && (
                <div className="hidden items-center justify-between gap-8 px-7.5 pt-4 pb-3 lg:flex">
                    <div className="flex w-67 shrink-0">
                        <AriaLink
                            href={homeHref}
                            aria-label={theme.name}
                            className="rounded-xs text-fg-white outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2"
                        >
                            <LogoCollapsed className={theme.logoCollapsedClassName} />
                        </AriaLink>
                    </div>

                    <nav aria-label="Hovedmeny" className="flex items-center gap-1">
                        <NavGroups groups={navigation} dividerClassName={theme.divider} hoverClassName={theme.hover} activeClassName={theme.sunken} />
                    </nav>

                    <div className="flex w-67 shrink-0 justify-end">
                        <AriaButton {...menuButtonProps} className={cx(iconButtonClassName, "px-3 py-2")}>
                            <MenuIcon className="size-6" />
                        </AriaButton>
                    </div>
                </div>
            )}

            <div aria-hidden="true" className="h-2 rounded-t-lg bg-secondary" />

            {menu && isMenuOpen && (
                <div ref={panelRef} className="absolute inset-x-0 top-full z-40">
                    <SiteMenuPanel id={menuId} content={menu} className="max-h-[80dvh] overflow-y-auto overscroll-contain" />
                </div>
            )}
        </header>
    );
};
