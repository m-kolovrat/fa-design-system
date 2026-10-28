"use client";

import type { FC } from "react";
import {
    Ai,
    Bell,
    Bookmark,
    BulletList,
    Calendar,
    Chat,
    ChevronRight,
    Clock,
    Factory,
    GraphLine,
    GraphUp,
    Grid,
    Home,
    LifeBuoy,
    Mail,
    Notebook,
    Settings,
    Star,
    Success,
    Table,
    User,
    Users,
    Wallet,
} from "fa-icons";
import { FeaturedCardProgressBar, FeaturedCardProgressCircle } from "@/components/application/app-navigation/base-components/featured-cards.demo";
import type { NavItemDividerType, NavItemType } from "@/components/application/app-navigation/config";
import { SidebarNavigationDualTier } from "@/components/application/app-navigation/sidebar-navigation/sidebar-dual-tier";
import { SidebarNavigationSectionDividers } from "@/components/application/app-navigation/sidebar-navigation/sidebar-section-dividers";
import { SidebarNavigationSectionsSubheadings } from "@/components/application/app-navigation/sidebar-navigation/sidebar-sections-subheadings";
import { SidebarNavigationSimple } from "@/components/application/app-navigation/sidebar-navigation/sidebar-simple";
import { SidebarNavigationSlim } from "@/components/application/app-navigation/sidebar-navigation/sidebar-slim";
import { Avatar } from "@/components/base/avatar/avatar";
import { Badge, BadgeWithDot } from "@/components/base/badges/badges";

const navItemsSimple: NavItemType[] = [
    {
        label: "Home",
        href: "/",
        icon: Home,
        items: [
            { label: "Overview", href: "/overview", icon: Grid },
            { label: "Products", href: "/products", icon: Factory },
            { label: "Orders", href: "/orders", icon: Wallet },
            { label: "Customers", href: "/customers", icon: Users },
        ],
    },
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: Grid,
        items: [
            { label: "Overview", href: "/dashboard/overview", icon: Grid },
            { label: "Notifications", href: "/dashboard/notifications", icon: Bell, badge: 10 },
            { label: "Analytics", href: "/dashboard/analytics", icon: GraphUp },
            { label: "Saved reports", href: "/dashboard/saved-reports", icon: Star },
        ],
    },
    {
        label: "Projects",
        href: "/projects",
        icon: BulletList,
        items: [
            { label: "View all", href: "/projects/all", icon: BulletList },
            { label: "Personal", href: "/projects/personal", icon: User },
            { label: "Team", href: "/projects/team", icon: Users },
            { label: "Shared with me", href: "/projects/shared-with-me", icon: Users },
            { label: "Archive", href: "/projects/archive", icon: Bookmark },
        ],
    },
    {
        label: "Tasks",
        href: "/tasks",
        icon: Success,
        badge: 10,
    },
    {
        label: "Reporting",
        href: "/reporting",
        icon: GraphLine,
    },
    {
        label: "Users",
        href: "/users",
        icon: Users,
    },
];

const navItemsDualTier: (NavItemType & { icon: FC<{ className?: string }> })[] = [
    {
        label: "Home",
        href: "/",
        icon: Home,
        items: [
            { label: "Overview", href: "/overview", icon: Grid },
            { label: "Products", href: "/products", icon: Factory },
            { label: "Orders", href: "/orders", icon: Wallet },
            { label: "Customers", href: "/customers", icon: Users },
            { label: "Inbox", href: "/inbox", icon: Mail, badge: 4 },
            { label: "What's new?", href: "/whats-new", icon: Ai },
        ],
    },
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: Grid,
        items: [
            { label: "Overview", href: "/dashboard/overview", icon: Grid },
            { label: "Notifications", href: "/dashboard/notifications", icon: Bell, badge: 10 },
            { label: "Analytics", href: "/dashboard/analytics", icon: GraphUp },
            { label: "Saved reports", href: "/dashboard/saved-reports", icon: Star },
            { label: "Scheduled reports", href: "/dashboard/scheduled-reports", icon: Clock },
            { label: "User reports", href: "/dashboard/user-reports", icon: User },
            { label: "Manage notifications", href: "/dashboard/manage-notifications", icon: Settings },
        ],
    },
    {
        label: "Projects",
        href: "/projects",
        icon: BulletList,
        items: [
            { label: "View all", href: "/projects/all", icon: BulletList },
            { label: "Personal", href: "/projects/personal", icon: User },
            { label: "Team", href: "/projects/team", icon: Users },
            { label: "Shared with me", href: "/projects/shared-with-me", icon: Users },
            { label: "Archive", href: "/projects/archive", icon: Bookmark },
        ],
    },
    {
        label: "Tasks",
        href: "/tasks",
        icon: Success,
        badge: 10,
    },
    {
        label: "Reporting",
        href: "/reporting",
        icon: GraphLine,
    },
    {
        label: "Users",
        href: "/users",
        icon: Users,
    },
];

const navItemsWithDividers: (NavItemType | NavItemDividerType)[] = [
    {
        label: "Home",
        href: "/",
        icon: Home,
    },
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: Grid,
    },
    {
        label: "Projects",
        href: "/projects",
        icon: BulletList,
    },
    { divider: true },
    {
        label: "Folders",
        icon: Notebook,
        href: "/folders",
        items: [
            { label: "View all", badge: 18, href: "/folders/view-all" },
            { label: "Recent", badge: 8, href: "/folders/recent" },
            { label: "Favorites", badge: 6, href: "/folders/favorites" },
            { label: "Shared", badge: 4, href: "/folders/shared" },
        ],
    },
    { divider: true },
    {
        label: "Reporting",
        href: "/reporting",
        icon: GraphLine,
    },
    {
        label: "Settings",
        href: "/settings",
        icon: Settings,
    },
    {
        label: "Support",
        href: "/support",
        icon: Chat,
        badge: (
            <BadgeWithDot color="success" type="modern" size="sm">
                Online
            </BadgeWithDot>
        ),
    },
    {
        label: "Open in browser",
        href: "https://www.finansavisen.no/",
        icon: Table,
    },
];

const navItemsWithSectionsSubheadings: Array<{ label: string; items: NavItemType[] }> = [
    {
        label: "General",
        items: [
            {
                label: "Dashboard",
                href: "/",
                icon: Grid,
            },
            {
                label: "Projects",
                href: "/projects",
                icon: BulletList,
            },
            {
                label: "Documents",
                href: "/documents",
                icon: Notebook,
            },
            {
                label: "Calendar",
                href: "/calendar",
                icon: Calendar,
            },
        ],
    },
    {
        label: "Finansavisen",
        items: [
            {
                label: "Reporting",
                href: "#",
                icon: GraphLine,
            },
            {
                label: "Tasks",
                href: "#",
                icon: Success,
                badge: (
                    <Badge size="sm" type="modern">
                        8
                    </Badge>
                ),
            },
            {
                label: "Users",
                href: "#",
                icon: Users,
            },
        ],
    },
    {
        label: "Your teams",
        items: [
            {
                label: "Markedsdesken",
                href: "#",
                icon: () => <Avatar initials="MD" size="xs" className="mr-2 size-5" />,
                badge: (
                    <div className="flex items-center gap-3">
                        <Badge size="sm" type="modern">
                            ⌘1
                        </Badge>
                        <ChevronRight size={16} className="text-fg-quaternary" />
                    </div>
                ),
            },
            {
                label: "Kapital",
                href: "#",
                icon: () => <Avatar initials="KA" size="xs" className="mr-2 size-5" />,
                badge: (
                    <div className="flex items-center gap-3">
                        <Badge size="sm" type="modern">
                            ⌘2
                        </Badge>
                        <ChevronRight size={16} className="text-fg-quaternary" />
                    </div>
                ),
            },
            {
                label: "Motor",
                href: "#",
                icon: () => <Avatar initials="MO" size="xs" className="mr-2 size-5" />,
                badge: (
                    <div className="flex items-center gap-3">
                        <Badge size="sm" type="modern">
                            ⌘3
                        </Badge>
                        <ChevronRight size={16} className="text-fg-quaternary" />
                    </div>
                ),
            },
            {
                label: "Investor",
                href: "#",
                icon: () => <Avatar initials="IN" size="xs" className="mr-2 size-5" />,
                badge: (
                    <div className="flex items-center gap-3">
                        <Badge size="sm" type="modern">
                            ⌘4
                        </Badge>
                        <ChevronRight size={16} className="text-fg-quaternary" />
                    </div>
                ),
            },
        ],
    },
];

export const SidebarNavigationSimpleDemo = () => (
    <SidebarNavigationSimple
        items={navItemsSimple}
        footerItems={[
            {
                label: "Settings",
                href: "/settings",
                icon: Settings,
            },
            {
                label: "Support",
                href: "/support",
                icon: Chat,
                badge: (
                    <BadgeWithDot color="success" type="modern" size="sm">
                        Online
                    </BadgeWithDot>
                ),
            },
            {
                label: "Open in browser",
                href: "https://www.finansavisen.no/",
                icon: Table,
            },
        ]}
        featureCard={
            <FeaturedCardProgressBar
                title="Used space"
                description="Your team has used 80% of your available space. Need more?"
                confirmLabel="Upgrade plan"
                progress={80}
                className="hidden md:flex"
                onDismiss={() => {}}
                onConfirm={() => {}}
            />
        }
    />
);

export const SidebarNavigationDualTierDemo = () => (
    <SidebarNavigationDualTier
        items={navItemsDualTier}
        footerItems={[
            {
                label: "Support",
                href: "/support",
                icon: LifeBuoy,
            },
            {
                label: "Settings",
                href: "/settings",
                icon: Settings,
            },
        ]}
        featureCard={
            <FeaturedCardProgressCircle
                title="Used space"
                description="Your team has used 80% of your available space. Need more?"
                confirmLabel="Upgrade plan"
                progress={80}
                className="hidden lg:flex"
                onDismiss={() => {}}
                onConfirm={() => {}}
            />
        }
    />
);

export const SidebarNavigationSlimDemo = () => (
    <SidebarNavigationSlim
        items={navItemsDualTier}
        footerItems={[
            {
                label: "Support",
                href: "/support",
                icon: LifeBuoy,
            },
            {
                label: "Settings",
                href: "/settings",
                icon: Settings,
            },
        ]}
    />
);

export const SidebarSectionDividersDemo = () => <SidebarNavigationSectionDividers activeUrl="/" items={navItemsWithDividers} />;

export const SidebarNavigationSectionsSubheadingsDemo = () => <SidebarNavigationSectionsSubheadings activeUrl="/" items={navItemsWithSectionsSubheadings} />;
