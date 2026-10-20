"use client";

import { useState } from "react";
import { Help, Link, Logout, Moon, News, Settings, User } from "fa-icons";
import type { Selection } from "react-aria-components";
import { Button as AriaButton, SubmenuTrigger } from "react-aria-components";
import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { cx } from "@/utils/cx";
import { AvatarLabelGroup } from "../avatar/avatar-label-group";

export const DropdownAvatar = () => {
    const [selectedTheme, setSelectedTheme] = useState<Selection>(new Set(["light-mode"]));

    return (
        <Dropdown.Root>
            <AriaButton
                className={({ isPressed, isFocusVisible }) =>
                    cx(
                        "group relative inline-flex cursor-pointer rounded-full outline-offset-2 outline-focus-ring",
                        (isPressed || isFocusVisible) && "outline-2",
                    )
                }
            >
                <Avatar alt="Olivia Rhye" src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80" size="sm" />
            </AriaButton>

            <Dropdown.Popover className="w-60">
                <div className="flex gap-3 border-b border-secondary p-3">
                    <AvatarLabelGroup
                        size="md"
                        src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80"
                        status="online"
                        title="Olivia Rhye"
                        subtitle="olivia@untitledui.com"
                    />
                </div>
                <Dropdown.Menu>
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

                    <Dropdown.Separator />

                    <Dropdown.Item icon={News} addon="⌘S">
                        Changelog
                    </Dropdown.Item>

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

                    <Dropdown.Item icon={Link}>API</Dropdown.Item>
                </Dropdown.Menu>
                <div className="flex flex-col gap-3 border-t border-secondary p-3">
                    <Button size="sm" color="secondary" iconLeading={Logout} className="text-center">
                        Sign out
                    </Button>
                </div>
            </Dropdown.Popover>
        </Dropdown.Root>
    );
};
