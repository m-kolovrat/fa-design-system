"use client";

import { type FC, type ReactNode, useState } from "react";
import { BulletList, Lock, User, Users, Wallet } from "fa-icons";
import type { Key } from "react-aria-components";
import { Tabs } from "@/components/application/tabs/tabs";
import { NativeSelect } from "@/components/base/select/select-native";

const tabs = [
    { id: "details", label: "My details" },
    { id: "profile", label: "Profile" },
    { id: "password", label: "Password" },
    { id: "team", label: "Team" },
    { id: "notifications", label: "Notifications", badge: 2 },
    { id: "integrations", label: "Integrations" },
    { id: "api", label: "API" },
];

const fullWidthTabs = [
    { id: "details", label: "My details", icon: BulletList },
    { id: "profile", label: "Profile", icon: User },
    { id: "password", label: "Password", icon: Lock },
    { id: "team", label: "Team", icon: Users, badge: 2 },
    { id: "notifications", label: "Plan", icon: Wallet },
];

export const ButtonBrandHorizontalDemo = () => {
    const [selectedTabIndex, setSelectedTabIndex] = useState<Key>("details");

    return (
        <>
            <NativeSelect
                aria-label="Tabs"
                value={selectedTabIndex as string}
                onChange={(event) => setSelectedTabIndex(event.target.value)}
                options={tabs.map((tab) => ({ label: tab.label, value: tab.id }))}
                className="w-80 md:hidden"
            />
            <Tabs selectedKey={selectedTabIndex} onSelectionChange={setSelectedTabIndex} className="w-max max-md:hidden">
                <Tabs.List type="button-brand" items={tabs}>
                    {(tab) => <Tabs.Item {...tab} />}
                </Tabs.List>
            </Tabs>
        </>
    );
};

export const ButtonBrandVerticalDemo = () => {
    const [selectedTabIndex, setSelectedTabIndex] = useState<Key>("details");

    return (
        <>
            <NativeSelect
                aria-label="Tabs"
                value={selectedTabIndex as string}
                onChange={(event) => setSelectedTabIndex(event.target.value)}
                options={tabs.map((tab) => ({ label: tab.label, value: tab.id }))}
                className="w-80 md:hidden"
            />
            <Tabs orientation="vertical" selectedKey={selectedTabIndex} onSelectionChange={setSelectedTabIndex} className="w-max max-md:hidden">
                <Tabs.List type="button-brand" items={tabs}>
                    {(tab) => <Tabs.Item {...tab} />}
                </Tabs.List>
            </Tabs>
        </>
    );
};

export const ButtonGrayHorizontalDemo = () => {
    const [selectedTabIndex, setSelectedTabIndex] = useState<Key>("details");

    return (
        <>
            <NativeSelect
                aria-label="Tabs"
                value={selectedTabIndex as string}
                onChange={(event) => setSelectedTabIndex(event.target.value)}
                options={tabs.map((tab) => ({ label: tab.label, value: tab.id }))}
                className="w-80 md:hidden"
            />
            <Tabs selectedKey={selectedTabIndex} onSelectionChange={setSelectedTabIndex} className="w-max max-md:hidden">
                <Tabs.List type="button-gray" items={tabs}>
                    {(tab) => <Tabs.Item {...tab} />}
                </Tabs.List>
            </Tabs>
        </>
    );
};

export const ButtonGrayVerticalDemo = () => {
    const [selectedTabIndex, setSelectedTabIndex] = useState<Key>("details");

    return (
        <>
            <NativeSelect
                aria-label="Tabs"
                value={selectedTabIndex as string}
                onChange={(event) => setSelectedTabIndex(event.target.value)}
                options={tabs.map((tab) => ({ label: tab.label, value: tab.id }))}
                className="w-80 md:hidden"
            />
            <Tabs orientation="vertical" selectedKey={selectedTabIndex} onSelectionChange={setSelectedTabIndex} className="w-max max-md:hidden">
                <Tabs.List type="button-gray" items={tabs}>
                    {(tab) => <Tabs.Item {...tab} />}
                </Tabs.List>
            </Tabs>
        </>
    );
};

export const UnderlineDemo = () => {
    const [selectedTabIndex, setSelectedTabIndex] = useState<Key>("details");

    return (
        <>
            <NativeSelect
                aria-label="Tabs"
                value={selectedTabIndex as string}
                onChange={(event) => setSelectedTabIndex(event.target.value)}
                options={tabs.map((tab) => ({ label: tab.label, value: tab.id }))}
                className="w-80 md:hidden"
            />
            <Tabs selectedKey={selectedTabIndex} onSelectionChange={setSelectedTabIndex} className="w-max max-md:hidden">
                <Tabs.List type="underline" items={tabs}>
                    {(tab) => <Tabs.Item {...tab} />}
                </Tabs.List>
            </Tabs>
        </>
    );
};

export const LineDemo = () => {
    const [selectedTabIndex, setSelectedTabIndex] = useState<Key>("details");

    return (
        <>
            <NativeSelect
                aria-label="Tabs"
                value={selectedTabIndex as string}
                onChange={(event) => setSelectedTabIndex(event.target.value)}
                options={tabs.map((tab) => ({ label: tab.label, value: tab.id }))}
                className="w-80 md:hidden"
            />
            <Tabs orientation="vertical" selectedKey={selectedTabIndex} onSelectionChange={setSelectedTabIndex} className="w-max max-md:hidden">
                <Tabs.List type="line" items={tabs}>
                    {(tab) => <Tabs.Item {...tab} />}
                </Tabs.List>
            </Tabs>
        </>
    );
};

export const ButtonBorderHorizontalDemo = () => {
    const [selectedTabIndex, setSelectedTabIndex] = useState<Key>("details");

    return (
        <>
            <NativeSelect
                aria-label="Tabs"
                value={selectedTabIndex as string}
                onChange={(event) => setSelectedTabIndex(event.target.value)}
                options={tabs.map((tab) => ({ label: tab.label, value: tab.id }))}
                className="w-80 md:hidden"
            />
            <Tabs selectedKey={selectedTabIndex} onSelectionChange={setSelectedTabIndex} className="w-max max-md:hidden">
                <Tabs.List type="button-border" items={tabs}>
                    {(tab) => <Tabs.Item {...tab} />}
                </Tabs.List>
            </Tabs>
        </>
    );
};

export const ButtonBorderVerticalDemo = () => {
    const [selectedTabIndex, setSelectedTabIndex] = useState<Key>("details");

    return (
        <>
            <NativeSelect
                aria-label="Tabs"
                value={selectedTabIndex as string}
                onChange={(event) => setSelectedTabIndex(event.target.value)}
                options={tabs.map((tab) => ({ label: tab.label, value: tab.id }))}
                className="w-80 md:hidden"
            />
            <Tabs orientation="vertical" selectedKey={selectedTabIndex} onSelectionChange={setSelectedTabIndex} className="w-max max-md:hidden">
                <Tabs.List type="button-border" items={tabs}>
                    {(tab) => <Tabs.Item {...tab} />}
                </Tabs.List>
            </Tabs>
        </>
    );
};

export const ButtonMinimalHorizontalDemo = () => {
    const [selectedTabIndex, setSelectedTabIndex] = useState<Key>("details");

    return (
        <>
            <NativeSelect
                aria-label="Tabs"
                value={selectedTabIndex as string}
                onChange={(event) => setSelectedTabIndex(event.target.value)}
                options={tabs.map((tab) => ({ label: tab.label, value: tab.id }))}
                className="w-80 md:hidden"
            />
            <Tabs selectedKey={selectedTabIndex} onSelectionChange={setSelectedTabIndex} className="w-max max-md:hidden">
                <Tabs.List type="button-minimal" items={tabs}>
                    {(tab) => <Tabs.Item {...tab} />}
                </Tabs.List>
            </Tabs>
        </>
    );
};

export const ButtonMinimalVerticalDemo = () => {
    const [selectedTabIndex, setSelectedTabIndex] = useState<Key>("details");

    return (
        <>
            <NativeSelect
                aria-label="Tabs"
                value={selectedTabIndex as string}
                onChange={(event) => setSelectedTabIndex(event.target.value)}
                options={tabs.map((tab) => ({ label: tab.label, value: tab.id }))}
                className="w-80 md:hidden"
            />
            <Tabs orientation="vertical" selectedKey={selectedTabIndex} onSelectionChange={setSelectedTabIndex} className="w-max max-md:hidden">
                <Tabs.List type="button-minimal" items={tabs}>
                    {(tab) => <Tabs.Item {...tab} />}
                </Tabs.List>
            </Tabs>
        </>
    );
};

const GenericTabs = ({
    type,
    fullWidth,
    items = tabs,
    orientation,
}: {
    orientation?: "horizontal" | "vertical";
    type: "underline" | "line" | "button-brand" | "button-gray" | "button-border" | "button-minimal";
    fullWidth?: boolean;
    items?: { id: string; label: string; badge?: number; icon?: FC | ReactNode }[];
}) => {
    const [selectedTabIndex, setSelectedTabIndex] = useState<Key>("details");

    return (
        <>
            <div className="md:hidden">
                <NativeSelect
                    aria-label="Tabs"
                    value={selectedTabIndex as string}
                    onChange={(event) => setSelectedTabIndex(event.target.value)}
                    options={items.map((tab) => ({ label: tab.label, value: tab.id }))}
                />
            </div>
            <Tabs orientation={orientation} selectedKey={selectedTabIndex} onSelectionChange={setSelectedTabIndex} className="max-md:hidden">
                <Tabs.List fullWidth={fullWidth} type={type} items={items}>
                    {(tab) => <Tabs.Item {...tab} />}
                </Tabs.List>
            </Tabs>
        </>
    );
};

export const ButtonBrandHorizontal = () => (
    <div className="flex flex-col gap-16">
        <GenericTabs type="button-brand" />
    </div>
);

export const ButtonBrandHorizontalFullWidth = () => (
    <div className="flex w-full flex-col gap-16">
        <GenericTabs type="button-brand" items={fullWidthTabs} fullWidth />
    </div>
);

export const ButtonBrandVertical = () => (
    <div className="flex gap-16">
        <GenericTabs type="button-brand" orientation="vertical" />
    </div>
);

export const ButtonGrayHorizontal = () => (
    <div className="flex flex-col gap-16">
        <GenericTabs type="button-gray" />
    </div>
);
export const ButtonGrayHorizontalFullWidth = () => (
    <div className="flex w-full flex-col gap-16">
        <GenericTabs type="button-gray" items={fullWidthTabs} fullWidth />
    </div>
);

export const ButtonGrayVertical = () => (
    <div className="flex gap-16">
        <GenericTabs type="button-gray" orientation="vertical" />
    </div>
);

export const UnderlineHorizontal = () => (
    <div className="flex flex-col gap-16">
        <GenericTabs type="underline" />
    </div>
);

export const UnderlineHorizontalFullWidth = () => (
    <div className="flex w-full flex-col gap-16">
        <GenericTabs type="underline" items={fullWidthTabs} fullWidth />
    </div>
);

export const UnderlineVertical = () => (
    <div className="flex gap-16">
        <GenericTabs type="line" orientation="vertical" />
    </div>
);

export const ButtonBorderHorizontal = () => (
    <div className="flex flex-col gap-16">
        <GenericTabs type="button-border" />
    </div>
);

export const ButtonBorderHorizontalFullWidth = () => (
    <div className="flex w-full flex-col gap-16">
        <GenericTabs type="button-border" items={fullWidthTabs} fullWidth />
    </div>
);

export const ButtonBorderVertical = () => (
    <div className="flex gap-16">
        <GenericTabs type="button-border" orientation="vertical" />
    </div>
);

export const ButtonMinimalHorizontal = () => (
    <div className="flex flex-col gap-16">
        <GenericTabs type="button-minimal" />
    </div>
);

export const ButtonMinimalHorizontalFullWidth = () => (
    <div className="flex w-full flex-col gap-16">
        <GenericTabs type="button-minimal" items={fullWidthTabs} fullWidth />
    </div>
);

export const ButtonMinimalVertical = () => (
    <div className="flex gap-16">
        <GenericTabs type="button-minimal" orientation="vertical" />
    </div>
);
