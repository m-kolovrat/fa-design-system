"use client";

import { useState } from "react";
import { ChevronDown, Search } from "fa-icons";
import type { Selection } from "react-aria-components";
import { Autocomplete, SearchField, useFilter } from "react-aria-components";
import { Button } from "@/components/base/buttons/button";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { InputBase } from "../input/input";

export const DropdownSearchSimple = () => {
    const [selectedUsers, setSelectedUsers] = useState<Selection>(new Set(["kari", "ola"]));
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
                        <Dropdown.Item id="kari" textValue="Kari Nordmann" selectionIndicator="checkbox">
                            Kari Nordmann
                        </Dropdown.Item>
                        <Dropdown.Item id="ola" textValue="Ola Hansen" selectionIndicator="checkbox">
                            Ola Hansen
                        </Dropdown.Item>
                        <Dropdown.Item id="ingrid" textValue="Ingrid Berg" selectionIndicator="checkbox">
                            Ingrid Berg
                        </Dropdown.Item>
                        <Dropdown.Item id="magnus" textValue="Magnus Johansen" selectionIndicator="checkbox">
                            Magnus Johansen
                        </Dropdown.Item>
                        <Dropdown.Item id="sofie" textValue="Sofie Larsen" selectionIndicator="checkbox">
                            Sofie Larsen
                        </Dropdown.Item>
                        <Dropdown.Item id="henrik" textValue="Henrik Olsen" selectionIndicator="checkbox">
                            Henrik Olsen
                        </Dropdown.Item>
                        <Dropdown.Item id="ida" textValue="Ida Pedersen" selectionIndicator="checkbox">
                            Ida Pedersen
                        </Dropdown.Item>
                        <Dropdown.Item id="erik" textValue="Erik Nilsen" selectionIndicator="checkbox">
                            Erik Nilsen
                        </Dropdown.Item>
                        <Dropdown.Item id="nora" textValue="Nora Kristiansen" selectionIndicator="checkbox">
                            Nora Kristiansen
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Autocomplete>
            </Dropdown.Popover>
        </Dropdown.Root>
    );
};
