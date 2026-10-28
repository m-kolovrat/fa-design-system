"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, ChevronDown, Copy, Download, Grid, Hammer, Pen, Restart, Star, Unlink } from "fa-icons";
import type { Selection } from "react-aria-components";
import { SubmenuTrigger } from "react-aria-components";
import { Button } from "@/components/base/buttons/button";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { cx } from "@/utils/cx";

const StatusDot = ({ status }: { status: "online" | "offline" }) => (
    <span className="mr-2 inline-flex shrink-0 items-center justify-center p-[5px]">
        <span className={cx("inline-block size-1.5 rounded-full", status === "online" ? "bg-fg-success-secondary" : "bg-utility-gray-300")} />
    </span>
);

export const DropdownButtonAdvanced = () => {
    const [viewOptions, setViewOptions] = useState<Selection>(new Set(["show-bookmarks"]));

    return (
        <Dropdown.Root>
            <Button size="sm" className="group" color="secondary" iconTrailing={(props) => <ChevronDown data-icon="trailing" {...props} className="size-4!" />}>
                Actions
            </Button>

            <Dropdown.Popover className="w-60">
                <Dropdown.Menu selectionMode="none">
                    <Dropdown.Section>
                        <Dropdown.Item icon={ArrowLeft}>Back</Dropdown.Item>
                        <Dropdown.Item icon={ArrowRight}>Forward</Dropdown.Item>
                        <Dropdown.Item addon="⌘R" icon={Restart}>
                            Reload
                        </Dropdown.Item>
                        <Dropdown.Item icon={Pen}>Edit page</Dropdown.Item>
                        <Dropdown.Item icon={Star}>Add to favorites</Dropdown.Item>
                    </Dropdown.Section>

                    <Dropdown.Separator />

                    <Dropdown.Section selectionMode="multiple" selectedKeys={viewOptions} onSelectionChange={setViewOptions}>
                        <Dropdown.Item id="show-bookmarks">Show bookmarks</Dropdown.Item>
                        <Dropdown.Item id="show-urls">Show full URLs</Dropdown.Item>
                    </Dropdown.Section>

                    <Dropdown.Separator />

                    <Dropdown.Section>
                        <Dropdown.Item id="kari" icon={() => <StatusDot status="online" />}>
                            Kari Nordmann
                        </Dropdown.Item>
                        <Dropdown.Item id="thea" icon={() => <StatusDot status="offline" />}>
                            Thea Haugen
                        </Dropdown.Item>
                    </Dropdown.Section>

                    <Dropdown.Separator />

                    <Dropdown.Section>
                        <SubmenuTrigger>
                            <Dropdown.Item icon={Grid}>More tools</Dropdown.Item>
                            <Dropdown.Popover placement="right top" offset={-6} className="w-50">
                                <Dropdown.Menu selectionMode="none">
                                    <SubmenuTrigger>
                                        <Dropdown.Item icon={Download}>Save as</Dropdown.Item>
                                        <Dropdown.Popover placement="right top" offset={-6} className="w-50">
                                            <Dropdown.Menu selectionMode="none">
                                                <Dropdown.Item>PDF</Dropdown.Item>
                                                <Dropdown.Item>HTML</Dropdown.Item>
                                                <Dropdown.Item>Markdown</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown.Popover>
                                    </SubmenuTrigger>
                                    <Dropdown.Item addon="⌘X" icon={Unlink}>
                                        Cut
                                    </Dropdown.Item>
                                    <Dropdown.Item addon="⌘C" icon={Copy}>
                                        Copy
                                    </Dropdown.Item>

                                    <Dropdown.Separator />

                                    <SubmenuTrigger>
                                        <Dropdown.Item icon={Hammer}>Developer</Dropdown.Item>
                                        <Dropdown.Popover placement="right top" offset={-6} className="w-50">
                                            <Dropdown.Menu selectionMode="none">
                                                <Dropdown.Item>View source</Dropdown.Item>
                                                <Dropdown.Item>Developer tools</Dropdown.Item>
                                                <Dropdown.Item>Inspect elements</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown.Popover>
                                    </SubmenuTrigger>
                                </Dropdown.Menu>
                            </Dropdown.Popover>
                        </SubmenuTrigger>
                    </Dropdown.Section>
                </Dropdown.Menu>
            </Dropdown.Popover>
        </Dropdown.Root>
    );
};
