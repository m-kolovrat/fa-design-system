"use client";

import { type FC, type SVGProps, useState } from "react";
import { ArrowUpRight, ChevronRight, Search } from "fa-icons";
import { Button as AriaButton, Link as AriaLink } from "react-aria-components";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { cx } from "@/utils/cx";
import type { SiteNavItem } from "./site-brands";

export interface SiteMenuContent {
    /**
     * Sidebar entries that swap the main area for their own links (e.g. Kategorier, Lister).
     * `layout`: a four-column grid (default) or a single vertical list.
     */
    groups?: { label: string; items: SiteNavItem[]; layout?: "grid" | "list" }[];
    /** Plain sidebar links (e.g. Feature, Meninger). */
    links?: SiteNavItem[];
    /** Sister publications, shown as logos in the sidebar. */
    publications?: { label: string; href: string; logo: FC<SVGProps<SVGSVGElement>>; logoClassName?: string }[];
    /** Other Hegnar sites, shown as logos with an outgoing arrow. */
    partners?: { label: string; href: string; logo: FC<SVGProps<SVGSVGElement>>; logoClassName?: string }[];
    /** Link columns in the main area. */
    columns: { title: string; href?: string; items: SiteNavItem[] }[];
    /** Bold links after the columns (e.g. Tips oss, Kontakt oss). */
    highlights?: SiteNavItem[];
    /** Today's print edition. */
    eAvis?: { date: string; weekday: string; href: string; coverSrc?: string };
    /** Where the article search submits. @default "/sok" */
    searchAction?: string;
}

const sidebarItem =
    "flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-sm font-semibold text-tertiary outline-focus-ring transition hover:bg-primary_hover hover:text-secondary focus-visible:outline-2";

const mainLink = "rounded-xs text-sm text-tertiary outline-focus-ring transition hover:text-secondary hover:underline focus-visible:outline-2";

/**
 * The panel the header's Meny button opens (Figma: Menu panel). Full width under the header:
 * a sidebar of groups, links and publications, and a main area of link columns.
 *
 * Hovering a group (Kategorier, Lister) shows its links in the main area; they stay while the
 * pointer moves over to them. Hovering another sidebar entry or leaving the panel goes back to
 * the default columns. Keyboard and touch users press the group to toggle it instead.
 */
export const SiteMenuPanel = ({ content, id, className }: { content: SiteMenuContent; id?: string; className?: string }) => {
    const [activeGroup, setActiveGroup] = useState<string | null>(null);
    const group = content.groups?.find((g) => g.label === activeGroup);
    const showDefault = () => setActiveGroup(null);

    return (
        <div
            id={id}
            onPointerLeave={(event) => event.pointerType === "mouse" && showDefault()}
            className={cx("flex flex-col bg-primary shadow-lg lg:flex-row", className)}
        >
            <aside className="flex shrink-0 flex-col gap-1 bg-secondary p-4 lg:w-60">
                {content.groups?.map((g) => (
                    <AriaButton
                        key={g.label}
                        aria-expanded={activeGroup === g.label}
                        onHoverStart={() => setActiveGroup(g.label)}
                        onPress={(event) => event.pointerType !== "mouse" && setActiveGroup(activeGroup === g.label ? null : g.label)}
                        className={cx(sidebarItem, activeGroup === g.label && "bg-primary_hover text-secondary")}
                    >
                        {g.label}
                        <ChevronRight className="size-4 text-fg-quaternary" />
                    </AriaButton>
                ))}
                {content.links?.map((link) => (
                    <AriaLink key={link.href} href={link.href} onHoverStart={showDefault} className={sidebarItem}>
                        {link.label}
                    </AriaLink>
                ))}

                {content.publications && content.publications.length > 0 && (
                    <div className="mt-2 flex flex-col gap-1 border-t border-secondary pt-3">
                        {content.publications.map(({ label, href, logo: Logo, logoClassName }) => (
                            <AriaLink key={href} href={href} aria-label={label} onHoverStart={showDefault} className={sidebarItem}>
                                <Logo className={cx("h-4 w-auto", logoClassName)} />
                            </AriaLink>
                        ))}
                    </div>
                )}

                {content.partners && content.partners.length > 0 && (
                    <div className="mt-2 flex flex-col gap-1 border-t border-secondary pt-3">
                        {content.partners.map(({ label, href, logo: Logo, logoClassName }) => (
                            <AriaLink
                                key={href}
                                href={href}
                                aria-label={label}
                                target="_blank"
                                rel="noreferrer"
                                onHoverStart={showDefault}
                                className={sidebarItem}
                            >
                                <Logo className={cx("h-5 w-auto text-fg-secondary", logoClassName)} />
                                <ArrowUpRight className="size-4 text-fg-quaternary" />
                            </AriaLink>
                        ))}
                    </div>
                )}
            </aside>

            <div className="flex min-w-0 flex-1 flex-col gap-6 p-4 lg:p-6">
                {/* All views share one grid cell, so the panel keeps the height of the tallest view
                    instead of jumping when a group is shown. Inactive views are hidden and inert. */}
                <div className="grid">
                    {content.groups?.map((g) => (
                        <nav key={g.label} aria-label={g.label} inert={g !== group} className={cx("col-start-1 row-start-1", g !== group && "invisible")}>
                            <ul className={cx(g.layout === "list" ? "flex flex-col gap-3" : "grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-3 lg:grid-cols-4")}>
                                {g.items.map((item) => (
                                    <li key={item.href}>
                                        <AriaLink href={item.href} className={mainLink}>
                                            {item.label}
                                        </AriaLink>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    ))}

                    <div inert={!!group} className={cx("col-start-1 row-start-1 flex flex-col gap-8 lg:flex-row", group && "invisible")}>
                        <div className="grid flex-1 grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
                            {content.columns.map((column) => (
                                <nav key={column.title} aria-label={column.title} className="flex flex-col gap-3">
                                    {column.href ? (
                                        <AriaLink
                                            href={column.href}
                                            className="rounded-xs text-sm font-semibold text-primary outline-focus-ring hover:underline focus-visible:outline-2"
                                        >
                                            {column.title}
                                        </AriaLink>
                                    ) : (
                                        <p className="text-sm font-semibold text-primary">{column.title}</p>
                                    )}
                                    <ul className="flex flex-col gap-3">
                                        {column.items.map((item) => (
                                            <li key={item.href}>
                                                <AriaLink href={item.href} className={mainLink}>
                                                    {item.label}
                                                </AriaLink>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            ))}
                            {content.highlights && content.highlights.length > 0 && (
                                <ul className="flex flex-col gap-3">
                                    {content.highlights.map((item) => (
                                        <li key={item.href}>
                                            <AriaLink
                                                href={item.href}
                                                className="rounded-xs text-sm font-semibold text-primary outline-focus-ring hover:underline focus-visible:outline-2"
                                            >
                                                {item.label}
                                            </AriaLink>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {content.eAvis && (
                            <div className="flex w-full flex-col items-center gap-3 rounded-xl bg-secondary p-4 lg:w-55">
                                {content.eAvis.coverSrc ? (
                                    <img src={content.eAvis.coverSrc} alt={`Forsiden ${content.eAvis.date}`} className="h-36 w-auto rounded-xs shadow-md" />
                                ) : (
                                    <div aria-hidden="true" className="h-36 w-28 rounded-xs bg-tertiary" />
                                )}
                                <p className="text-center text-sm">
                                    <span className="block font-semibold text-primary">{content.eAvis.weekday}</span>
                                    <span className="text-tertiary">{content.eAvis.date}</span>
                                </p>
                                <Button size="sm" color="primary" href={content.eAvis.href} className="w-full">
                                    Les eAvisen
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                <form role="search" action={content.searchAction ?? "/sok"} className="mt-auto flex items-center gap-2 border-t border-secondary pt-4">
                    <Input name="q" size="md" icon={Search} placeholder="Søk etter artikler" aria-label="Søk etter artikler" className="flex-1" />
                    <Button type="submit" size="md" color="primary">
                        Søk
                    </Button>
                </form>
            </div>
        </div>
    );
};
