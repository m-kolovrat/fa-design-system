"use client";

import { useState } from "react";
import { User } from "fa-icons";
import type { Selection } from "react-aria-components";
import { useListData } from "react-stately";
import { MultiSelect } from "@/components/base/select/multi-select";
import { Select, type SelectItemType } from "@/components/base/select/select";
import { NativeSelect } from "@/components/base/select/select-native";
import { TagSelect } from "@/components/base/select/tag-select";
import { Dot } from "@/components/foundations/dot-icon";

const items: SelectItemType[] = [
    {
        label: "Ola Hansen",
        id: "@ola",
        supportingText: "@ola",
        avatarUrl: "/images/avatars/ola-hansen.svg",
    },
    { label: "Kari Nordmann", id: "@kari", supportingText: "@kari", avatarUrl: "/images/avatars/kari-nordmann.svg" },
    {
        label: "Ingrid Berg",
        id: "@ingrid",
        supportingText: "@ingrid",

        avatarUrl: "/images/avatars/ingrid-berg.svg",
    },
    {
        label: "Magnus Johansen",
        id: "@magnus",
        supportingText: "@magnus",
        avatarUrl: "/images/avatars/magnus-johansen.svg",
    },
    { label: "Sofie Larsen", id: "@sofie", supportingText: "@sofie", avatarUrl: "/images/avatars/sofie-larsen.svg" },
    { label: "Henrik Olsen", id: "@henrik", supportingText: "@henrik", avatarUrl: "/images/avatars/henrik-olsen.svg" },
    { label: "Ida Pedersen", id: "@ida", supportingText: "@ida", avatarUrl: "/images/avatars/ida-pedersen.svg" },
    { label: "Erik Nilsen", id: "@erik", supportingText: "@erik", avatarUrl: "/images/avatars/erik-nilsen.svg" },
    {
        label: "Nora Kristiansen",
        id: "@nora",
        supportingText: "@nora",
        avatarUrl: "/images/avatars/nora-kristiansen.svg",
    },
    {
        label: "Jonas Andersen",
        id: "@jonas",
        supportingText: "@jonas",
        avatarUrl: "/images/avatars/jonas-andersen.svg",
    },
];

export const DefaultDemo = () => {
    const items = [
        { label: "Ola Hansen", id: "@ola", supportingText: "@ola" },
        { label: "Kari Nordmann", id: "@kari", supportingText: "@kari" },
        { label: "Ingrid Berg", id: "@ingrid", supportingText: "@ingrid", disabled: true },
        { label: "Magnus Johansen", id: "@magnus", supportingText: "@magnus" },
        { label: "Sofie Larsen", id: "@sofie", supportingText: "@sofie" },
        { label: "Henrik Olsen", id: "@henrik", supportingText: "@henrik" },
        { label: "Ida Pedersen", id: "@ida", supportingText: "@ida" },
        { label: "Erik Nilsen", id: "@erik", supportingText: "@erik" },
        { label: "Nora Kristiansen", id: "@nora", supportingText: "@nora" },
        { label: "Jonas Andersen", id: "@jonas", supportingText: "@jonas" },
    ];

    return (
        <Select
            isRequired
            label="Team member"
            tooltip="This is a tooltip"
            hint="This is a hint text to help user."
            placeholder="Select team member"
            items={items}
        >
            {(item) => (
                <Select.Item id={item.id} supportingText={item.supportingText} isDisabled={item.isDisabled} icon={item.icon} avatarUrl={item.avatarUrl}>
                    {item.label}
                </Select.Item>
            )}
        </Select>
    );
};

export const DisabledDemo = () => {
    const items = [
        { label: "Ola Hansen", id: "@ola", supportingText: "@ola" },
        { label: "Kari Nordmann", id: "@kari", supportingText: "@kari" },
        { label: "Ingrid Berg", id: "@ingrid", supportingText: "@ingrid", disabled: true },
        { label: "Magnus Johansen", id: "@magnus", supportingText: "@magnus" },
        { label: "Sofie Larsen", id: "@sofie", supportingText: "@sofie" },
        { label: "Henrik Olsen", id: "@henrik", supportingText: "@henrik" },
        { label: "Ida Pedersen", id: "@ida", supportingText: "@ida" },
        { label: "Erik Nilsen", id: "@erik", supportingText: "@erik" },
        { label: "Nora Kristiansen", id: "@nora", supportingText: "@nora" },
        { label: "Jonas Andersen", id: "@jonas", supportingText: "@jonas" },
    ];

    return (
        <Select
            isRequired
            isDisabled
            label="Team member"
            tooltip="This is a tooltip"
            hint="This is a hint text to help user."
            placeholder="Select team member"
            items={items}
        >
            {(item) => (
                <Select.Item id={item.id} supportingText={item.supportingText} isDisabled={item.isDisabled} icon={item.icon} avatarUrl={item.avatarUrl}>
                    {item.label}
                </Select.Item>
            )}
        </Select>
    );
};

export const IconLeadingDemo = () => {
    const items = [
        { label: "Ola Hansen", id: "@ola", supportingText: "@ola", icon: User },
        { label: "Kari Nordmann", id: "@kari", supportingText: "@kari", icon: User },
        { label: "Ingrid Berg", id: "@ingrid", supportingText: "@ingrid", icon: User, disabled: true },
        { label: "Magnus Johansen", id: "@magnus", supportingText: "@magnus", icon: User },
        { label: "Sofie Larsen", id: "@sofie", supportingText: "@sofie", icon: User },
        { label: "Henrik Olsen", id: "@henrik", supportingText: "@henrik", icon: User },
        { label: "Ida Pedersen", id: "@ida", supportingText: "@ida", icon: User },
        { label: "Erik Nilsen", id: "@erik", supportingText: "@erik", icon: User },
        { label: "Nora Kristiansen", id: "@nora", supportingText: "@nora", icon: User },
        { label: "Jonas Andersen", id: "@jonas", supportingText: "@jonas", icon: User },
    ];

    return (
        <Select
            isRequired
            label="Team member"
            tooltip="This is a tooltip"
            hint="This is a hint text to help user."
            placeholder="Select team member"
            icon={User}
            items={items}
        >
            {(item) => (
                <Select.Item id={item.id} supportingText={item.supportingText} isDisabled={item.isDisabled} icon={item.icon} avatarUrl={item.avatarUrl}>
                    {item.label}
                </Select.Item>
            )}
        </Select>
    );
};

export const AvatarLeadingDemo = () => {
    const items = [
        {
            label: "Ola Hansen",
            id: "@ola",
            supportingText: "@ola",
            avatarUrl: "/images/avatars/ola-hansen.svg",
        },
        {
            label: "Kari Nordmann",
            id: "@kari",
            supportingText: "@kari",
            avatarUrl: "/images/avatars/kari-nordmann.svg",
        },
        {
            label: "Ingrid Berg",
            id: "@ingrid",
            supportingText: "@ingrid",

            avatarUrl: "/images/avatars/ingrid-berg.svg",
        },
        {
            label: "Magnus Johansen",
            id: "@magnus",
            supportingText: "@magnus",
            avatarUrl: "/images/avatars/magnus-johansen.svg",
        },
        {
            label: "Sofie Larsen",
            id: "@sofie",
            supportingText: "@sofie",
            avatarUrl: "/images/avatars/sofie-larsen.svg",
        },
        {
            label: "Henrik Olsen",
            id: "@henrik",
            supportingText: "@henrik",
            avatarUrl: "/images/avatars/henrik-olsen.svg",
        },
        {
            label: "Ida Pedersen",
            id: "@ida",
            supportingText: "@ida",
            avatarUrl: "/images/avatars/ida-pedersen.svg",
        },
        { label: "Erik Nilsen", id: "@erik", supportingText: "@erik", avatarUrl: "/images/avatars/erik-nilsen.svg" },
        {
            label: "Nora Kristiansen",
            id: "@nora",
            supportingText: "@nora",
            avatarUrl: "/images/avatars/nora-kristiansen.svg",
        },
        {
            label: "Jonas Andersen",
            id: "@jonas",
            supportingText: "@jonas",
            avatarUrl: "/images/avatars/jonas-andersen.svg",
        },
    ];

    return (
        <Select
            isRequired
            label="Team member"
            tooltip="This is a tooltip"
            hint="This is a hint text to help user."
            placeholder="Select team member"
            icon={User}
            items={items}
        >
            {(item) => (
                <Select.Item id={item.id} supportingText={item.supportingText} isDisabled={item.isDisabled} icon={item.icon} avatarUrl={item.avatarUrl}>
                    {item.label}
                </Select.Item>
            )}
        </Select>
    );
};

export const DotLeadingDemo = () => {
    const items: SelectItemType[] = [
        {
            label: "Ola Hansen",
            id: "@ola",
            supportingText: "@ola",
            icon: <Dot className="size-2.5 text-fg-success-secondary" />,
        },
        {
            label: "Kari Nordmann",
            id: "@kari",
            supportingText: "@kari",
            icon: <Dot className="size-2.5 text-fg-success-secondary" />,
        },
        {
            label: "Ingrid Berg",
            id: "@ingrid",
            supportingText: "@ingrid",
            icon: <Dot className="size-2.5 text-fg-success-secondary" />,
        },
        {
            label: "Magnus Johansen",
            id: "@magnus",
            supportingText: "@magnus",
            icon: <Dot className="size-2.5 text-fg-success-secondary" />,
        },
        {
            label: "Sofie Larsen",
            id: "@sofie",
            supportingText: "@sofie",
            icon: <Dot className="size-2.5 text-fg-success-secondary" />,
        },
        {
            label: "Henrik Olsen",
            id: "@henrik",
            supportingText: "@henrik",
            icon: <Dot className="size-2.5 text-fg-success-secondary" />,
        },
        {
            label: "Ida Pedersen",
            id: "@ida",
            supportingText: "@ida",
            icon: <Dot className="size-2.5 text-fg-success-secondary" />,
        },
        {
            label: "Erik Nilsen",
            id: "@erik",
            supportingText: "@erik",
            icon: <Dot className="size-2.5 text-fg-success-secondary" />,
        },
        {
            label: "Nora Kristiansen",
            id: "@nora",
            supportingText: "@nora",
            icon: <Dot className="size-2.5 text-fg-success-secondary" />,
        },
        {
            label: "Jonas Andersen",
            id: "@jonas",
            supportingText: "@jonas",
            icon: <Dot className="size-2.5 text-fg-success-secondary" />,
        },
    ];

    return (
        <Select
            isRequired
            label="Team member"
            tooltip="This is a tooltip"
            hint="This is a hint text to help user."
            placeholder="Select team member"
            icon={<Dot className="size-2.5 text-fg-success-secondary" />}
            items={items}
        >
            {(item) => (
                <Select.Item id={item.id} supportingText={item.supportingText} isDisabled={item.isDisabled} icon={item.icon} avatarUrl={item.avatarUrl}>
                    {item.label}
                </Select.Item>
            )}
        </Select>
    );
};

export const SearchDemo = () => {
    const items = [
        { label: "Ola Hansen", id: "@ola", supportingText: "@ola" },
        { label: "Kari Nordmann", id: "@kari", supportingText: "@kari" },
        { label: "Ingrid Berg", id: "@ingrid", supportingText: "@ingrid", disabled: true },
        { label: "Magnus Johansen", id: "@magnus", supportingText: "@magnus" },
        { label: "Sofie Larsen", id: "@sofie", supportingText: "@sofie" },
        { label: "Henrik Olsen", id: "@henrik", supportingText: "@henrik" },
        { label: "Ida Pedersen", id: "@ida", supportingText: "@ida" },
        { label: "Erik Nilsen", id: "@erik", supportingText: "@erik" },
        { label: "Nora Kristiansen", id: "@nora", supportingText: "@nora" },
        { label: "Jonas Andersen", id: "@jonas", supportingText: "@jonas" },
    ];

    return (
        <Select.ComboBox isRequired label="Search" tooltip="This is a tooltip" hint="This is a hint text to help user." placeholder="Search" items={items}>
            {(item) => (
                <Select.Item id={item.id} supportingText={item.supportingText} isDisabled={item.isDisabled} icon={item.icon} avatarUrl={item.avatarUrl}>
                    {item.label}
                </Select.Item>
            )}
        </Select.ComboBox>
    );
};

export const TagsDemo = () => {
    const selectedItems = useListData<SelectItemType>({
        initialItems: [],
    });

    const items: (SelectItemType & { disabled?: boolean })[] = [
        {
            label: "Ola Hansen",
            id: "@ola",
            supportingText: "@ola",
            avatarUrl: "/images/avatars/ola-hansen.svg",
        },
        { label: "Kari Nordmann", id: "@kari", supportingText: "@kari", avatarUrl: "/images/avatars/kari-nordmann.svg" },
        {
            label: "Ingrid Berg",
            id: "@ingrid",
            supportingText: "@ingrid",
            disabled: true,
            avatarUrl: "/images/avatars/ingrid-berg.svg",
        },
        { label: "Magnus Johansen", id: "@magnus", supportingText: "@magnus", avatarUrl: "/images/avatars/magnus-johansen.svg" },
        { label: "Sofie Larsen", id: "@sofie", supportingText: "@sofie", avatarUrl: "/images/avatars/sofie-larsen.svg" },
        { label: "Henrik Olsen", id: "@henrik", supportingText: "@henrik", avatarUrl: "/images/avatars/henrik-olsen.svg" },
        {
            label: "Ida Pedersen",
            id: "@ida",
            supportingText: "@ida",
            avatarUrl: "/images/avatars/ida-pedersen.svg",
        },
        { label: "Erik Nilsen", id: "@erik", supportingText: "@erik", avatarUrl: "/images/avatars/erik-nilsen.svg" },
        { label: "Nora Kristiansen", id: "@nora", supportingText: "@nora", avatarUrl: "/images/avatars/nora-kristiansen.svg" },
        { label: "Jonas Andersen", id: "@jonas", supportingText: "@jonas", avatarUrl: "/images/avatars/jonas-andersen.svg" },
    ];

    return (
        <TagSelect
            isRequired
            selectedItems={selectedItems}
            label="Search"
            tooltip="This is a tooltip"
            hint="This is a hint text to help user."
            placeholder="Search"
            items={items}
        >
            {(item) => (
                <TagSelect.Item id={item.id} supportingText={item.supportingText} isDisabled={item.isDisabled} icon={item.icon} avatarUrl={item.avatarUrl}>
                    {item.label}
                </TagSelect.Item>
            )}
        </TagSelect>
    );
};

export const Native = () => (
    <NativeSelect
        label="Team members"
        options={[
            { label: "Kari Nordmann", value: "@kari" },
            { label: "Ola Hansen", value: "@ola" },
            { label: "Ingrid Berg", value: "@ingrid", disabled: true },
            { label: "Magnus Johansen", value: "@magnus" },
            { label: "Sofie Larsen", value: "@sofie" },
            { label: "Henrik Olsen", value: "@henrik" },
            { label: "Ida Pedersen", value: "@ida" },
            { label: "Erik Nilsen", value: "@erik" },
            { label: "Nora Kristiansen", value: "@nora" },
            { label: "Jonas Andersen", value: "@jonas" },
        ]}
        hint="This is a hint text to help user."
    />
);

export const Default = () => {
    return (
        <div className="flex flex-col gap-16">
            <div className="flex flex-col gap-4">
                <Select
                    isRequired
                    label="Team member"
                    tooltip="This is a tooltip"
                    hint="This is a hint text to help user."
                    placeholder="Select team member"
                    items={items.map(({ avatarUrl: _, ...item }) => item)}
                >
                    {(item) => (
                        <Select.Item id={item.id} supportingText={item.supportingText} isDisabled={item.isDisabled} icon={item.icon} avatarUrl={item.avatarUrl}>
                            {item.label}
                        </Select.Item>
                    )}
                </Select>
                <Select
                    isDisabled
                    isRequired
                    label="Team member"
                    tooltip="This is a tooltip"
                    hint="This is a hint text to help user."
                    placeholder="Select team member"
                    items={items.map(({ avatarUrl: _, ...item }) => item)}
                >
                    {(item) => (
                        <Select.Item id={item.id} supportingText={item.supportingText} isDisabled={item.isDisabled} icon={item.icon} avatarUrl={item.avatarUrl}>
                            {item.label}
                        </Select.Item>
                    )}
                </Select>
            </div>
        </div>
    );
};

export const IconLeading = () => (
    <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-4">
            <Select
                isRequired
                label="Team member"
                tooltip="This is a tooltip"
                hint="This is a hint text to help user."
                placeholder="Select team member"
                icon={User}
                items={items.map(({ avatarUrl: _, ...item }) => ({ ...item, icon: User }))}
            >
                {(item) => (
                    <Select.Item id={item.id} supportingText={item.supportingText} isDisabled={item.isDisabled} icon={item.icon} avatarUrl={item.avatarUrl}>
                        {item.label}
                    </Select.Item>
                )}
            </Select>
            <Select
                isRequired
                label="Team member"
                tooltip="This is a tooltip"
                hint="This is a hint text to help user."
                placeholder="Select team member"
                icon={User}
                isDisabled
                items={items.map(({ avatarUrl: _, ...item }) => ({ ...item, icon: User }))}
            >
                {(item) => (
                    <Select.Item id={item.id} supportingText={item.supportingText} isDisabled={item.isDisabled} icon={item.icon} avatarUrl={item.avatarUrl}>
                        {item.label}
                    </Select.Item>
                )}
            </Select>
        </div>
    </div>
);

export const AvatarLeading = () => (
    <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-4">
            <Select
                isRequired
                label="Team member"
                tooltip="This is a tooltip"
                hint="This is a hint text to help user."
                placeholder="Select team member"
                icon={User}
                items={items}
            >
                {(item) => (
                    <Select.Item id={item.id} supportingText={item.supportingText} isDisabled={item.isDisabled} icon={item.icon} avatarUrl={item.avatarUrl}>
                        {item.label}
                    </Select.Item>
                )}
            </Select>
            <Select
                isRequired
                label="Team member"
                tooltip="This is a tooltip"
                hint="This is a hint text to help user."
                placeholder="Select team member"
                icon={User}
                isDisabled
                items={items}
            >
                {(item) => (
                    <Select.Item id={item.id} supportingText={item.supportingText} isDisabled={item.isDisabled} icon={item.icon} avatarUrl={item.avatarUrl}>
                        {item.label}
                    </Select.Item>
                )}
            </Select>
        </div>
    </div>
);

export const DotLeading = () => (
    <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-4">
            <Select
                isRequired
                label="Team member"
                tooltip="This is a tooltip"
                hint="This is a hint text to help user."
                placeholder="Select team member"
                icon={<Dot className="size-2 text-fg-success-secondary" />}
                items={items.map(({ avatarUrl: _, ...item }) => ({
                    ...item,
                    icon: <Dot className="size-2 text-fg-success-secondary" />,
                }))}
            >
                {(item) => (
                    <Select.Item id={item.id} supportingText={item.supportingText} isDisabled={item.isDisabled} icon={item.icon} avatarUrl={item.avatarUrl}>
                        {item.label}
                    </Select.Item>
                )}
            </Select>
            <Select
                isDisabled
                isRequired
                label="Team member"
                tooltip="This is a tooltip"
                hint="This is a hint text to help user."
                placeholder="Select team member"
                icon={<Dot className="size-2 text-fg-success-secondary" />}
                items={items.map(({ avatarUrl: _, ...item }) => ({
                    ...item,
                    icon: <Dot className="size-2 text-fg-success-secondary" />,
                }))}
            >
                {(item) => (
                    <Select.Item id={item.id} supportingText={item.supportingText} isDisabled={item.isDisabled} icon={item.icon} avatarUrl={item.avatarUrl}>
                        {item.label}
                    </Select.Item>
                )}
            </Select>
        </div>
    </div>
);

export const Search = () => (
    <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-4">
            <Select.ComboBox
                isRequired
                label="Search"
                tooltip="This is a tooltip"
                hint="This is a hint text to help user."
                placeholder="Search"
                items={items.map(({ avatarUrl: _, ...item }) => item)}
            >
                {(item) => (
                    <Select.Item id={item.id} supportingText={item.supportingText} isDisabled={item.isDisabled} icon={item.icon} avatarUrl={item.avatarUrl}>
                        {item.label}
                    </Select.Item>
                )}
            </Select.ComboBox>
            <Select.ComboBox
                isRequired
                label="Search"
                tooltip="This is a tooltip"
                hint="This is a hint text to help user."
                placeholder="Search"
                isDisabled
                items={items.map(({ avatarUrl: _, ...item }) => item)}
            >
                {(item) => (
                    <Select.Item id={item.id} supportingText={item.supportingText} isDisabled={item.isDisabled} icon={item.icon} avatarUrl={item.avatarUrl}>
                        {item.label}
                    </Select.Item>
                )}
            </Select.ComboBox>
        </div>
    </div>
);

export const Tags = () => {
    const selectedItems = useListData<SelectItemType>({
        initialItems: [],
    });

    return (
        <div className="flex flex-col gap-16">
            <div className="flex flex-col gap-4">
                <TagSelect
                    shortcut
                    selectedItems={selectedItems}
                    isRequired
                    label="Search"
                    tooltip="This is a tooltip"
                    hint="This is a hint text to help user."
                    placeholder="Search"
                    items={items}
                >
                    {(item) => (
                        <TagSelect.Item
                            id={item.id}
                            supportingText={item.supportingText}
                            isDisabled={item.isDisabled}
                            icon={item.icon}
                            avatarUrl={item.avatarUrl}
                        >
                            {item.label}
                        </TagSelect.Item>
                    )}
                </TagSelect>

                <TagSelect
                    shortcut
                    selectedItems={selectedItems}
                    isRequired
                    label="Search"
                    tooltip="This is a tooltip"
                    hint="This is a hint text to help user."
                    placeholder="Search"
                    items={items}
                    isDisabled
                >
                    {(item) => (
                        <TagSelect.Item
                            id={item.id}
                            supportingText={item.supportingText}
                            isDisabled={item.isDisabled}
                            icon={item.icon}
                            avatarUrl={item.avatarUrl}
                        >
                            {item.label}
                        </TagSelect.Item>
                    )}
                </TagSelect>
            </div>
        </div>
    );
};

const teamItems: SelectItemType[] = [
    { id: "engineering", label: "Engineering", supportingText: "12 users" },
    { id: "design", label: "Design", supportingText: "10 users" },
    { id: "product", label: "Product", supportingText: "6 users" },
    { id: "marketing", label: "Marketing", supportingText: "8 users" },
    { id: "sales", label: "Sales", supportingText: "12 users" },
    { id: "customer-success", label: "Customer Success", supportingText: "4 users" },
    { id: "operations", label: "Operations", supportingText: "2 users" },
    { id: "finance", label: "Finance", supportingText: "2 users" },
];

const getSelectedUserCount = (selectedKeys: Selection) => {
    if (selectedKeys === "all") return teamItems.reduce((sum, t) => sum + parseInt(t.supportingText?.split(" ")[0] || "0"), 0);
    const selected = teamItems.filter((t) => (selectedKeys as Set<string | number>).has(t.id));
    return selected.reduce((sum, t) => sum + parseInt(t.supportingText?.split(" ")[0] || "0"), 0);
};

export const MultiSelectDemo = () => {
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set(["design", "product"]));

    return (
        <MultiSelect
            isRequired
            label="Teams"
            tooltip="This is a tooltip"
            hint="This is a hint text to help user."
            placeholder="Select teams"
            items={teamItems}
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
            supportingText={`${getSelectedUserCount(selectedKeys)} users`}
            onReset={() => setSelectedKeys(new Set())}
            onSelectAll={() => setSelectedKeys(new Set(teamItems.map((t) => t.id)))}
        >
            {(item) => (
                <MultiSelect.Item id={item.id} supportingText={item.supportingText} selectionIndicator="checkbox" selectionIndicatorAlign="left">
                    {item.label}
                </MultiSelect.Item>
            )}
        </MultiSelect>
    );
};

export const MultiSelectDisabledDemo = () => (
    <MultiSelect label="Teams" tooltip="This is a tooltip" hint="This is a hint text to help user." placeholder="Select teams" items={teamItems} isDisabled>
        {(item) => (
            <MultiSelect.Item id={item.id} supportingText={item.supportingText} selectionIndicator="checkbox" selectionIndicatorAlign="left">
                {item.label}
            </MultiSelect.Item>
        )}
    </MultiSelect>
);
