"use client";

import { useState } from "react";
import { ChevronDown, Help, Logout, Moon, Plus, Settings, User } from "fa-icons";
import type { Selection } from "react-aria-components";
import { SubmenuTrigger } from "react-aria-components";
import { Button } from "@/components/base/buttons/button";
import { Dropdown } from "@/components/base/dropdown/dropdown";

export const DropdownAccountButton = () => {
    const [selectedAccount, setSelectedAccount] = useState<Selection>(new Set(["kari"]));
    const [selectedTheme, setSelectedTheme] = useState<Selection>(new Set(["light-mode"]));

    return (
        <Dropdown.Root>
            <Button size="sm" className="group" color="secondary" iconTrailing={(props) => <ChevronDown data-icon="trailing" {...props} className="size-4!" />}>
                Account
            </Button>

            <Dropdown.Popover className="w-60 rounded-b-xl bg-secondary_alt">
                <Dropdown.Menu className="rounded-b-xl bg-primary ring-1 ring-secondary">
                    <Dropdown.Item icon={User} addon="⌘K->P">
                        View profile
                    </Dropdown.Item>
                    <Dropdown.Item icon={Settings} addon="⌘S">
                        Settings
                    </Dropdown.Item>
                    <Dropdown.Section selectionMode="single" selectedKeys={selectedTheme} onSelectionChange={setSelectedTheme}>
                        <Dropdown.Item id="dark-mode" icon={Moon} selectionIndicator="toggle">
                            Dark mode
                        </Dropdown.Item>
                    </Dropdown.Section>
                    <SubmenuTrigger>
                        <Dropdown.Item icon={Help}>Support</Dropdown.Item>

                        <Dropdown.Popover placement="right top" offset={-6}>
                            <Dropdown.Menu>
                                <Dropdown.Item>Help center</Dropdown.Item>
                                <Dropdown.Item>Contact support</Dropdown.Item>
                                <Dropdown.Item>Send feedback</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown.Popover>
                    </SubmenuTrigger>

                    <Dropdown.Separator />

                    <Dropdown.Section selectionMode="single" selectedKeys={selectedAccount} onSelectionChange={setSelectedAccount}>
                        <Dropdown.SectionHeader className="px-4 pt-1.5 pb-0.5 text-xs font-semibold text-brand-secondary">
                            Switch Account
                        </Dropdown.SectionHeader>

                        <Dropdown.Item id="kari" avatarUrl="/images/avatars/kari-nordmann.svg" selectionIndicator="radio">
                            Kari Nordmann
                        </Dropdown.Item>
                        <Dropdown.Item id="thea" avatarUrl="/images/avatars/thea-haugen.svg" selectionIndicator="radio">
                            Thea Haugen
                        </Dropdown.Item>
                    </Dropdown.Section>
                    <Dropdown.Item icon={Plus}>Add account</Dropdown.Item>
                </Dropdown.Menu>
                <div className="flex flex-col gap-3 p-3">
                    <Button size="sm" color="secondary" iconLeading={Logout} className="text-center">
                        Sign out
                    </Button>
                </div>
            </Dropdown.Popover>
        </Dropdown.Root>
    );
};
