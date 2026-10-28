"use client";

import { useState } from "react";
import { ChevronDown, Plus, Search } from "fa-icons";
import type { Selection } from "react-aria-components";
import { Autocomplete, SearchField, SubmenuTrigger, useFilter } from "react-aria-components";
import { Button } from "@/components/base/buttons/button";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { InputBase } from "../input/input";

export const DropdownSearchAdvanced = () => {
    const [selectedUsers, setSelectedUsers] = useState<Selection>(new Set(["finansavisen", "markets"]));
    let { contains } = useFilter({ sensitivity: "base" });

    return (
        <Dropdown.Root>
            <Button size="sm" className="group" color="secondary" iconTrailing={(props) => <ChevronDown data-icon="trailing" {...props} className="size-4!" />}>
                Manage access
            </Button>

            <Dropdown.Popover className="w-60">
                <Autocomplete filter={contains}>
                    <SearchField className="flex gap-3 border-b border-secondary p-3">
                        <InputBase size="md" placeholder="Search" icon={Search} />
                    </SearchField>
                    <Dropdown.Menu selectionMode="multiple" selectedKeys={selectedUsers} onSelectionChange={setSelectedUsers}>
                        <SubmenuTrigger>
                            <Dropdown.Item id="finansavisen" textValue="Finansavisen" selectionIndicator="checkbox">
                                Finansavisen
                            </Dropdown.Item>
                            <Dropdown.Popover placement="right top" offset={-6} className="w-50">
                                <Dropdown.Menu selectionMode="multiple">
                                    <Dropdown.Item id="kari" selectionIndicator="checkbox" avatarUrl="/images/avatars/kari-nordmann.svg">
                                        Kari Nordmann
                                    </Dropdown.Item>
                                    <Dropdown.Item id="ola" selectionIndicator="checkbox" avatarUrl="/images/avatars/ola-hansen.svg">
                                        Ola Hansen
                                    </Dropdown.Item>
                                    <Dropdown.Item id="ingrid" selectionIndicator="checkbox" avatarUrl="/images/avatars/ingrid-berg.svg">
                                        Ingrid Berg
                                    </Dropdown.Item>
                                    <Dropdown.Item id="magnus" selectionIndicator="checkbox" avatarUrl="/images/avatars/magnus-johansen.svg">
                                        Magnus Johansen
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown.Popover>
                        </SubmenuTrigger>

                        <Dropdown.Item id="markets" textValue="Markedsdesken" selectionIndicator="checkbox">
                            Markedsdesken
                        </Dropdown.Item>
                        <Dropdown.Item id="kapital" textValue="Kapital" selectionIndicator="checkbox">
                            Kapital
                        </Dropdown.Item>
                        <Dropdown.Item id="motor" textValue="Motor" selectionIndicator="checkbox">
                            Motor
                        </Dropdown.Item>
                        <Dropdown.Item id="investor" textValue="Investor" selectionIndicator="checkbox">
                            Investor
                        </Dropdown.Item>
                        <Dropdown.Item id="web" textValue="Nettdesken" selectionIndicator="checkbox">
                            Nettdesken
                        </Dropdown.Item>
                    </Dropdown.Menu>
                    <div className="flex flex-col gap-3 border-t border-secondary p-3">
                        <Button size="sm" color="secondary" iconLeading={Plus}>
                            Create team
                        </Button>
                    </div>
                </Autocomplete>
            </Dropdown.Popover>
        </Dropdown.Root>
    );
};
