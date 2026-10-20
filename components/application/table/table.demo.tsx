"use client";

import { useMemo, useState } from "react";
import { FileIcon } from "@untitledui/file-icons";
import { ArrowLeft, Check, Close, Pen, Trash, Upload } from "fa-icons";
import type { SortDescriptor } from "react-aria-components";
import { PaginationCardMinimal, PaginationPageMinimalCenter } from "@/components/application/pagination/pagination";
import customers from "@/components/application/table/customers.json";
import invoices from "@/components/application/table/invoices.json";
import { Table, TableCard } from "@/components/application/table/table";
import teamMembers from "@/components/application/table/team-members.json";
import uploadedFiles from "@/components/application/table/uploaded-files.json";
import { Avatar } from "@/components/base/avatar/avatar";
import type { BadgeTypes } from "@/components/base/badges/badge-types";
import { Badge, type BadgeColor, BadgeWithDot, BadgeWithIcon } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { DropdownIconSimple } from "@/components/base/dropdown/dropdown-icon-simple";
import { ProgressBar } from "@/components/base/progress-indicators/progress-indicators";

export const Table01DividerLine = () => {
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "status",
        direction: "ascending",
    });

    const sortedItems = useMemo(() => {
        return teamMembers.items.sort((a, b) => {
            const first = a[sortDescriptor.column as keyof typeof a];
            const second = b[sortDescriptor.column as keyof typeof b];

            // Compare numbers or booleans
            if ((typeof first === "number" && typeof second === "number") || (typeof first === "boolean" && typeof second === "boolean")) {
                return sortDescriptor.direction === "descending" ? second - first : first - second;
            }

            // Compare strings
            if (typeof first === "string" && typeof second === "string") {
                let cmp = first.localeCompare(second);
                if (sortDescriptor.direction === "descending") {
                    cmp *= -1;
                }
                return cmp;
            }

            return 0;
        });
    }, [sortDescriptor]);

    return (
        <TableCard.Root>
            <TableCard.Header
                title="Team members"
                badge="100 users"
                contentTrailing={
                    <div className="absolute top-5 right-4 md:right-6">
                        <DropdownIconSimple />
                    </div>
                }
            />
            <Table aria-label="Team members" selectionMode="multiple" sortDescriptor={sortDescriptor} onSortChange={setSortDescriptor}>
                <Table.Header>
                    <Table.Head id="name" label="Name" isRowHeader allowsSorting className="w-full max-w-1/4" />
                    <Table.Head id="status" label="Status" allowsSorting />
                    <Table.Head id="role" label="Role" allowsSorting tooltip="This is a tooltip" />
                    <Table.Head id="email" label="Email address" allowsSorting className="md:hidden xl:table-cell" />
                    <Table.Head id="teams" label="Teams" />
                    <Table.Head id="actions" />
                </Table.Header>

                <Table.Body items={sortedItems}>
                    {(item) => (
                        <Table.Row id={item.username}>
                            <Table.Cell>
                                <div className="flex items-center gap-3">
                                    <Avatar src={item.avatarUrl} alt={item.name} size="md" />
                                    <div className="whitespace-nowrap">
                                        <p className="text-sm font-medium text-primary">{item.name}</p>
                                        <p className="text-sm text-tertiary">{item.username}</p>
                                    </div>
                                </div>
                            </Table.Cell>
                            <Table.Cell>
                                <BadgeWithDot size="sm" color={item.status === "active" ? "success" : "gray"} type="modern">
                                    {item.status === "active" ? "Active" : "Inactive"}
                                </BadgeWithDot>
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap">{item.role}</Table.Cell>
                            <Table.Cell className="whitespace-nowrap md:hidden xl:table-cell">{item.email}</Table.Cell>
                            <Table.Cell>
                                <div className="flex gap-1">
                                    {item.teams.slice(0, 3).map((team) => (
                                        <Badge key={team.name} color={team.color as BadgeColor<BadgeTypes>} size="sm">
                                            {team.name}
                                        </Badge>
                                    ))}

                                    {item.teams.length > 3 && (
                                        <Badge color="gray" size="sm">
                                            +{item.teams.length - 3}
                                        </Badge>
                                    )}
                                </div>
                            </Table.Cell>
                            <Table.Cell className="px-4">
                                <div className="flex justify-end gap-0.5">
                                    <ButtonUtility size="xs" color="tertiary" tooltip="Delete" icon={Trash} />
                                    <ButtonUtility size="xs" color="tertiary" tooltip="Edit" icon={Pen} />
                                </div>
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>

            <PaginationPageMinimalCenter page={1} total={10} className="px-4 py-3 md:px-6 md:pt-3 md:pb-4" />
        </TableCard.Root>
    );
};

export const Table01AlternatingFills = () => {
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "status",
        direction: "ascending",
    });

    const sortedItems = useMemo(() => {
        return teamMembers.items.sort((a, b) => {
            const first = a[sortDescriptor.column as keyof typeof a];
            const second = b[sortDescriptor.column as keyof typeof b];

            // Compare numbers or booleans
            if ((typeof first === "number" && typeof second === "number") || (typeof first === "boolean" && typeof second === "boolean")) {
                return sortDescriptor.direction === "descending" ? second - first : first - second;
            }

            // Compare strings
            if (typeof first === "string" && typeof second === "string") {
                let cmp = first.localeCompare(second);
                if (sortDescriptor.direction === "descending") {
                    cmp *= -1;
                }
                return cmp;
            }

            return 0;
        });
    }, [sortDescriptor]);

    return (
        <TableCard.Root>
            <TableCard.Header
                title="Team members"
                badge="100 users"
                contentTrailing={
                    <div className="absolute top-5 right-4 md:right-6">
                        <DropdownIconSimple />
                    </div>
                }
            />
            <Table aria-label="Team members" selectionMode="multiple" sortDescriptor={sortDescriptor} onSortChange={setSortDescriptor}>
                <Table.Header className="bg-primary">
                    <Table.Head id="name" label="Name" isRowHeader allowsSorting className="w-full max-w-1/4" />
                    <Table.Head id="status" label="Status" allowsSorting />
                    <Table.Head id="role" label="Role" allowsSorting tooltip="This is a tooltip" />
                    <Table.Head id="email" label="Email address" allowsSorting className="md:hidden xl:table-cell" />
                    <Table.Head id="teams" label="Teams" />
                    <Table.Head id="actions" />
                </Table.Header>
                <Table.Body items={sortedItems}>
                    {(item) => (
                        <Table.Row id={item.username} className="odd:bg-secondary">
                            <Table.Cell>
                                <div className="flex items-center gap-3">
                                    <Avatar src={item.avatarUrl} alt={item.name} size="md" />
                                    <div className="whitespace-nowrap">
                                        <p className="text-sm font-medium text-primary">{item.name}</p>
                                        <p className="text-sm text-tertiary">{item.username}</p>
                                    </div>
                                </div>
                            </Table.Cell>
                            <Table.Cell>
                                <BadgeWithDot size="sm" color={item.status === "active" ? "success" : "gray"} type="modern">
                                    {item.status === "active" ? "Active" : "Inactive"}
                                </BadgeWithDot>
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap">{item.role}</Table.Cell>
                            <Table.Cell className="whitespace-nowrap md:hidden xl:table-cell">{item.email}</Table.Cell>
                            <Table.Cell>
                                <div className="flex gap-1">
                                    {item.teams.slice(0, 3).map((team) => (
                                        <Badge key={team.name} color={team.color as BadgeColor<BadgeTypes>} size="sm">
                                            {team.name}
                                        </Badge>
                                    ))}

                                    {item.teams.length > 3 && (
                                        <Badge color="gray" size="sm">
                                            +{item.teams.length - 3}
                                        </Badge>
                                    )}
                                </div>
                            </Table.Cell>
                            <Table.Cell className="px-4">
                                <div className="flex justify-end gap-0.5">
                                    <ButtonUtility size="xs" color="tertiary" tooltip="Delete" icon={Trash} />
                                    <ButtonUtility size="xs" color="tertiary" tooltip="Edit" icon={Pen} />
                                </div>
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>

            <PaginationPageMinimalCenter page={1} total={10} className="px-4 py-3 md:px-6 md:pt-3 md:pb-4" />
        </TableCard.Root>
    );
};

export const Table01DividerLineSm = () => {
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "status",
        direction: "ascending",
    });

    const sortedItems = useMemo(() => {
        return teamMembers.items.sort((a, b) => {
            const first = a[sortDescriptor.column as keyof typeof a];
            const second = b[sortDescriptor.column as keyof typeof b];

            // Compare numbers or booleans
            if ((typeof first === "number" && typeof second === "number") || (typeof first === "boolean" && typeof second === "boolean")) {
                return sortDescriptor.direction === "descending" ? second - first : first - second;
            }

            // Compare strings
            if (typeof first === "string" && typeof second === "string") {
                let cmp = first.localeCompare(second);
                if (sortDescriptor.direction === "descending") {
                    cmp *= -1;
                }
                return cmp;
            }

            return 0;
        });
    }, [sortDescriptor]);

    return (
        <TableCard.Root size="sm">
            <TableCard.Header
                title="Team members"
                badge="100 users"
                contentTrailing={
                    <div className="absolute top-5 right-4 md:right-6">
                        <DropdownIconSimple />
                    </div>
                }
            />
            <Table aria-label="Team members" selectionMode="multiple" sortDescriptor={sortDescriptor} onSortChange={setSortDescriptor}>
                <Table.Header>
                    <Table.Head id="name" label="Name" isRowHeader allowsSorting className="w-full max-w-1/4" />
                    <Table.Head id="status" label="Status" allowsSorting />
                    <Table.Head id="role" label="Role" allowsSorting tooltip="This is a tooltip" />
                    <Table.Head id="email" label="Email address" allowsSorting className="md:hidden xl:table-cell" />
                    <Table.Head id="teams" label="Teams" />
                    <Table.Head id="actions" />
                </Table.Header>

                <Table.Body items={sortedItems}>
                    {(item) => (
                        <Table.Row id={item.username}>
                            <Table.Cell>
                                <div className="flex items-center gap-2">
                                    <Avatar src={item.avatarUrl} alt={item.name} size="sm" />
                                    <p className="text-sm font-medium whitespace-nowrap text-primary">{item.name}</p>
                                </div>
                            </Table.Cell>
                            <Table.Cell>
                                <BadgeWithDot size="sm" color={item.status === "active" ? "success" : "gray"} type="modern">
                                    {item.status === "active" ? "Active" : "Inactive"}
                                </BadgeWithDot>
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap">{item.role}</Table.Cell>
                            <Table.Cell className="whitespace-nowrap md:hidden xl:table-cell">{item.email}</Table.Cell>
                            <Table.Cell>
                                <div className="flex gap-1">
                                    {item.teams.slice(0, 3).map((team) => (
                                        <Badge key={team.name} color={team.color as BadgeColor<BadgeTypes>} size="sm">
                                            {team.name}
                                        </Badge>
                                    ))}

                                    {item.teams.length > 3 && (
                                        <Badge color="gray" size="sm">
                                            +{item.teams.length - 3}
                                        </Badge>
                                    )}
                                </div>
                            </Table.Cell>
                            <Table.Cell className="px-3">
                                <div className="flex justify-end gap-0.5">
                                    <ButtonUtility size="xs" color="tertiary" tooltip="Delete" icon={Trash} />
                                    <ButtonUtility size="xs" color="tertiary" tooltip="Edit" icon={Pen} />
                                </div>
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>

            <PaginationCardMinimal align="right" page={1} total={10} className="px-4 py-3 md:px-5 md:pt-3 md:pb-4" />
        </TableCard.Root>
    );
};

export const Table02DividerLine = () => {
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "status",
        direction: "ascending",
    });

    const sortedItems = useMemo(() => {
        return customers.items.sort((a, b) => {
            const first = a[sortDescriptor.column as keyof typeof a];
            const second = b[sortDescriptor.column as keyof typeof b];

            // Compare numbers or booleans
            if ((typeof first === "number" && typeof second === "number") || (typeof first === "boolean" && typeof second === "boolean")) {
                return sortDescriptor.direction === "descending" ? second - first : first - second;
            }

            // Compare strings
            if (typeof first === "string" && typeof second === "string") {
                let cmp = first.localeCompare(second);
                if (sortDescriptor.direction === "descending") {
                    cmp *= -1;
                }
                return cmp;
            }

            return 0;
        });
    }, [sortDescriptor]);

    return (
        <TableCard.Root>
            <TableCard.Header
                title="Customers"
                description="These companies have purchased in the last 12 months."
                contentTrailing={
                    <div className="absolute top-5 right-4 md:right-6">
                        <DropdownIconSimple />
                    </div>
                }
            />

            <Table aria-label="Team members" selectionMode="none" sortDescriptor={sortDescriptor} onSortChange={setSortDescriptor}>
                <Table.Header>
                    <Table.Head id="name" label="Company" isRowHeader allowsSorting />
                    <Table.Head id="status" label="Status" allowsSorting />
                    <Table.Head id="aboutTitle" label="About" allowsSorting />
                    <Table.Head id="users" label="Users" className="md:hidden xl:table-cell" />
                    <Table.Head id="licenseUse" label="License use" allowsSorting className="min-w-55" />
                    <Table.Head id="actions" />
                </Table.Header>
                <Table.Body items={sortedItems}>
                    {(item) => (
                        <Table.Row id={item.name}>
                            <Table.Cell>
                                <div className="flex items-center gap-3">
                                    <Avatar src={item.logoUrl} alt={item.name} size="md" />
                                    <div className="whitespace-nowrap">
                                        <p className="text-sm font-medium text-primary">{item.name}</p>
                                        <p className="text-sm text-tertiary">{item.website}</p>
                                    </div>
                                </div>
                            </Table.Cell>
                            <Table.Cell>
                                <BadgeWithDot size="sm" color={item.status === "Customer" ? "success" : "gray"}>
                                    {item.status}
                                </BadgeWithDot>
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap">
                                <p className="text-sm font-medium text-primary">{item.aboutTitle}</p>
                                <p className="text-sm text-tertiary">{item.aboutDescription}</p>
                            </Table.Cell>
                            <Table.Cell className="pr-0 md:hidden xl:table-cell">
                                <div className="flex -space-x-1">
                                    <Avatar
                                        className="ring-[1.5px] ring-bg-primary"
                                        size="xs"
                                        src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80"
                                        alt="Olivia Rhye"
                                    />
                                    <Avatar
                                        className="ring-[1.5px] ring-bg-primary"
                                        size="xs"
                                        src="https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80"
                                        alt="Phoenix Baker"
                                    />
                                    <Avatar
                                        className="ring-[1.5px] ring-bg-primary"
                                        size="xs"
                                        src="https://www.untitledui.com/images/avatars/lana-steiner?fm=webp&q=80"
                                        alt="Lana Steiner"
                                    />
                                    <Avatar
                                        className="ring-[1.5px] ring-bg-primary"
                                        size="xs"
                                        src="https://www.untitledui.com/images/avatars/demi-wilkinson?fm=webp&q=80"
                                        alt="Demi Wilkinson"
                                    />
                                    <Avatar
                                        className="ring-[1.5px] ring-bg-primary"
                                        size="xs"
                                        src="https://www.untitledui.com/images/avatars/candice-wu?fm=webp&q=80"
                                        alt="Candice Wu"
                                    />
                                    <Avatar
                                        size="xs"
                                        className="ring-[1.5px] ring-bg-primary"
                                        placeholder={<span className="text-xs font-semibold text-quaternary">+5</span>}
                                    />
                                </div>
                            </Table.Cell>
                            <Table.Cell>
                                <ProgressBar labelPosition="right" value={item.licenseUse} />
                            </Table.Cell>
                            <Table.Cell className="px-4">
                                <div className="flex items-center justify-end">
                                    <DropdownIconSimple />
                                </div>
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </TableCard.Root>
    );
};

export const Table02AlternatingFills = () => {
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "status",
        direction: "ascending",
    });

    const sortedItems = useMemo(() => {
        return customers.items.sort((a, b) => {
            const first = a[sortDescriptor.column as keyof typeof a];
            const second = b[sortDescriptor.column as keyof typeof b];

            // Compare numbers or booleans
            if ((typeof first === "number" && typeof second === "number") || (typeof first === "boolean" && typeof second === "boolean")) {
                return sortDescriptor.direction === "descending" ? second - first : first - second;
            }

            // Compare strings
            if (typeof first === "string" && typeof second === "string") {
                let cmp = first.localeCompare(second);
                if (sortDescriptor.direction === "descending") {
                    cmp *= -1;
                }
                return cmp;
            }

            return 0;
        });
    }, [sortDescriptor]);

    return (
        <TableCard.Root>
            <TableCard.Header
                title="Customers"
                description="These companies have purchased in the last 12 months."
                contentTrailing={
                    <div className="absolute top-5 right-4 md:right-6">
                        <DropdownIconSimple />
                    </div>
                }
            />
            <Table aria-label="Team members" selectionMode="none" sortDescriptor={sortDescriptor} onSortChange={setSortDescriptor}>
                <Table.Header className="bg-primary">
                    <Table.Head id="name" label="Company" isRowHeader allowsSorting />
                    <Table.Head id="status" label="Status" allowsSorting />
                    <Table.Head id="aboutTitle" label="About" allowsSorting />
                    <Table.Head id="users" label="Users" className="md:hidden xl:table-cell" />
                    <Table.Head id="licenseUse" label="License use" allowsSorting className="min-w-55" />
                    <Table.Head id="actions" />
                </Table.Header>
                <Table.Body items={sortedItems}>
                    {(item) => (
                        <Table.Row id={item.name} className="odd:bg-secondary">
                            <Table.Cell>
                                <div className="flex items-center gap-3">
                                    <Avatar src={item.logoUrl} alt={item.name} size="md" />
                                    <div className="whitespace-nowrap">
                                        <p className="text-sm font-medium text-primary">{item.name}</p>
                                        <p className="text-sm text-tertiary">{item.website}</p>
                                    </div>
                                </div>
                            </Table.Cell>
                            <Table.Cell>
                                <BadgeWithDot size="sm" color={item.status === "Customer" ? "success" : "gray"} type="modern">
                                    {item.status}
                                </BadgeWithDot>
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap">
                                <p className="text-sm font-medium text-primary">{item.aboutTitle}</p>
                                <p className="text-sm text-tertiary">{item.aboutDescription}</p>
                            </Table.Cell>
                            <Table.Cell className="pr-0 md:hidden xl:table-cell">
                                <div className="flex -space-x-1">
                                    <Avatar
                                        className="ring-[1.5px] ring-bg-primary"
                                        size="xs"
                                        src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80&w=100"
                                        alt="Olivia Rhye"
                                    />
                                    <Avatar
                                        className="ring-[1.5px] ring-bg-primary"
                                        size="xs"
                                        src="https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80&w=100"
                                        alt="Phoenix Baker"
                                    />
                                    <Avatar
                                        className="ring-[1.5px] ring-bg-primary"
                                        size="xs"
                                        src="https://www.untitledui.com/images/avatars/lana-steiner?fm=webp&q=80&w=100"
                                        alt="Lana Steiner"
                                    />
                                    <Avatar
                                        className="ring-[1.5px] ring-bg-primary"
                                        size="xs"
                                        src="https://www.untitledui.com/images/avatars/demi-wilkinson?fm=webp&q=80&w=100"
                                        alt="Demi Wilkinson"
                                    />
                                    <Avatar
                                        className="ring-[1.5px] ring-bg-primary"
                                        size="xs"
                                        src="https://www.untitledui.com/images/avatars/candice-wu?fm=webp&q=80&w=100"
                                        alt="Candice Wu"
                                    />
                                    <Avatar
                                        size="xs"
                                        className="ring-[1.5px] ring-bg-primary"
                                        placeholder={<span className="text-xs font-semibold text-quaternary">+5</span>}
                                    />
                                </div>
                            </Table.Cell>
                            <Table.Cell>
                                <ProgressBar labelPosition="right" value={item.licenseUse} />
                            </Table.Cell>
                            <Table.Cell className="px-4">
                                <div className="flex items-center justify-end">
                                    <DropdownIconSimple />
                                </div>
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </TableCard.Root>
    );
};

export const Table03DividerLine = () => {
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "invoice",
        direction: "ascending",
    });

    const sortedItems = useMemo(() => {
        return invoices.items.sort((a, b) => {
            const first = a[sortDescriptor.column as keyof typeof a];
            const second = b[sortDescriptor.column as keyof typeof b];

            // Compare numbers or booleans
            if ((typeof first === "number" && typeof second === "number") || (typeof first === "boolean" && typeof second === "boolean")) {
                return sortDescriptor.direction === "descending" ? second - first : first - second;
            }

            // Compare strings
            if (typeof first === "string" && typeof second === "string") {
                let cmp = first.localeCompare(second);
                if (sortDescriptor.direction === "descending") {
                    cmp *= -1;
                }
                return cmp;
            }

            return 0;
        });
    }, [sortDescriptor]);

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("");
    };

    return (
        <TableCard.Root>
            <Table aria-label="Team members" selectionMode="multiple" sortDescriptor={sortDescriptor} onSortChange={setSortDescriptor}>
                <Table.Header>
                    <Table.Head id="id" label="Invoice" isRowHeader allowsSorting />
                    <Table.Head id="date" label="Date" allowsSorting />
                    <Table.Head id="status" label="Status" allowsSorting />
                    <Table.Head id="customer" label="Customer" />
                    <Table.Head id="purchase" label="Purchase" className="md:hidden xl:table-cell" />
                    <Table.Head id="actions" />
                </Table.Header>
                <Table.Body items={sortedItems}>
                    {(item) => (
                        <Table.Row id={item.id}>
                            <Table.Cell className="font-medium text-primary">#{item.id}</Table.Cell>
                            <Table.Cell className="whitespace-nowrap">
                                {new Date(item.date).toLocaleString(undefined, { year: "numeric", month: "short", day: "numeric" })}
                            </Table.Cell>
                            <Table.Cell>
                                {item.status === "paid" ? (
                                    <BadgeWithIcon size="sm" color="success" iconLeading={Check} className="capitalize">
                                        {item.status}
                                    </BadgeWithIcon>
                                ) : item.status === "refunded" ? (
                                    <BadgeWithIcon size="sm" color="gray" iconLeading={ArrowLeft} className="capitalize">
                                        {item.status}
                                    </BadgeWithIcon>
                                ) : (
                                    <BadgeWithIcon size="sm" color="error" iconLeading={Close} className="capitalize">
                                        {item.status}
                                    </BadgeWithIcon>
                                )}
                            </Table.Cell>
                            <Table.Cell>
                                <div className="flex items-center gap-3">
                                    <Avatar initials={getInitials(item.customer.name)} src={item.customer.avatarUrl} alt={item.customer.name} size="md" />
                                    <div className="whitespace-nowrap">
                                        <p className="text-sm font-medium text-primary">{item.customer.name}</p>
                                        <p className="text-sm text-tertiary">{item.customer.email}</p>
                                    </div>
                                </div>
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap md:hidden xl:table-cell">{item.purchase}</Table.Cell>
                            <Table.Cell>
                                <div className="flex items-center justify-end gap-3">
                                    <Button size="sm" color="link-gray">
                                        Delete
                                    </Button>
                                    <Button size="sm" color="link-color">
                                        Edit
                                    </Button>
                                </div>
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
            <PaginationPageMinimalCenter page={1} total={10} className="px-4 py-3 md:px-6 md:pt-3 md:pb-4" />
        </TableCard.Root>
    );
};

export const Table03AlternatingFills = () => {
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "invoice",
        direction: "ascending",
    });

    const sortedItems = useMemo(() => {
        return invoices.items.sort((a, b) => {
            const first = a[sortDescriptor.column as keyof typeof a];
            const second = b[sortDescriptor.column as keyof typeof b];

            // Compare numbers or booleans
            if ((typeof first === "number" && typeof second === "number") || (typeof first === "boolean" && typeof second === "boolean")) {
                return sortDescriptor.direction === "descending" ? second - first : first - second;
            }

            // Compare strings
            if (typeof first === "string" && typeof second === "string") {
                let cmp = first.localeCompare(second);
                if (sortDescriptor.direction === "descending") {
                    cmp *= -1;
                }
                return cmp;
            }

            return 0;
        });
    }, [sortDescriptor]);

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("");
    };

    return (
        <TableCard.Root>
            <Table aria-label="Team members" selectionMode="multiple" sortDescriptor={sortDescriptor} onSortChange={setSortDescriptor}>
                <Table.Header className="bg-primary">
                    <Table.Head id="id" label="Invoice" isRowHeader allowsSorting />
                    <Table.Head id="date" label="Date" allowsSorting />
                    <Table.Head id="status" label="Status" allowsSorting />
                    <Table.Head id="customer" label="Customer" />
                    <Table.Head id="purchase" label="Purchase" className="md:hidden xl:table-cell" />
                    <Table.Head id="actions" />
                </Table.Header>
                <Table.Body items={sortedItems}>
                    {(item) => (
                        <Table.Row id={item.id} className="odd:bg-secondary">
                            <Table.Cell className="font-medium text-primary">#{item.id}</Table.Cell>
                            <Table.Cell className="whitespace-nowrap">{item.date}</Table.Cell>
                            <Table.Cell>
                                {item.status === "paid" ? (
                                    <BadgeWithIcon size="sm" color="success" iconLeading={Check} className="capitalize">
                                        {item.status}
                                    </BadgeWithIcon>
                                ) : item.status === "refunded" ? (
                                    <BadgeWithIcon size="sm" color="gray" iconLeading={ArrowLeft} className="capitalize">
                                        {item.status}
                                    </BadgeWithIcon>
                                ) : (
                                    <BadgeWithIcon size="sm" color="error" iconLeading={Close} className="capitalize">
                                        {item.status}
                                    </BadgeWithIcon>
                                )}
                            </Table.Cell>
                            <Table.Cell>
                                <div className="flex items-center gap-3">
                                    <Avatar initials={getInitials(item.customer.name)} src={item.customer.avatarUrl} alt={item.customer.name} size="md" />
                                    <div className="whitespace-nowrap">
                                        <p className="text-sm font-medium text-primary">{item.customer.name}</p>
                                        <p className="text-sm text-tertiary">{item.customer.email}</p>
                                    </div>
                                </div>
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap md:hidden xl:table-cell">{item.purchase}</Table.Cell>
                            <Table.Cell>
                                <div className="flex items-center justify-end gap-3">
                                    <Button size="sm" color="link-gray">
                                        Delete
                                    </Button>
                                    <Button size="sm" color="link-color">
                                        Edit
                                    </Button>
                                </div>
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
            <PaginationPageMinimalCenter page={1} total={10} className="px-4 py-3 md:px-6 md:pt-3 md:pb-4" />
        </TableCard.Root>
    );
};

export const Table04DividerLine = () => {
    return (
        <TableCard.Root>
            <TableCard.Header
                title="Files uploaded"
                className="pb-5"
                contentTrailing={
                    <div className="flex items-center gap-3">
                        <Button size="sm" color="secondary">
                            Download all
                        </Button>
                        <Button size="sm" iconLeading={Upload}>
                            Upload
                        </Button>
                    </div>
                }
            />
            <Table aria-label="Team members" selectionMode="multiple">
                <Table.Header>
                    <Table.Head id="name" label="File name" isRowHeader />
                    <Table.Head id="size" label="File size" />
                    <Table.Head id="uploadedAt" label="Date uploaded" />
                    <Table.Head id="updatedAt" label="Last updated" className="md:hidden xl:table-cell" />
                    <Table.Head id="uploadedBy" label="Uploaded by" />
                    <Table.Head id="actions" />
                </Table.Header>
                <Table.Body items={uploadedFiles.items}>
                    {(item) => (
                        <Table.Row id={item.name}>
                            <Table.Cell>
                                <div className="flex items-center gap-3">
                                    <FileIcon type={item.name.split(".")[1]} theme="light" className="size-10 dark:hidden" />
                                    <FileIcon type={item.name.split(".")[1]} theme="dark" className="size-10 not-dark:hidden" />

                                    <div className="whitespace-nowrap">
                                        <p className="text-sm font-medium text-primary">{item.name}</p>
                                        <p className="text-sm text-tertiary">{item.size}</p>
                                    </div>
                                </div>
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap">{item.size}</Table.Cell>
                            <Table.Cell className="whitespace-nowrap">{item.uploadedAt}</Table.Cell>
                            <Table.Cell className="whitespace-nowrap md:hidden xl:table-cell">{item.updatedAt}</Table.Cell>
                            <Table.Cell className="whitespace-nowrap">{item.uploadedBy}</Table.Cell>
                            <Table.Cell className="px-4">
                                <div className="flex items-center justify-end">
                                    <DropdownIconSimple />
                                </div>
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </TableCard.Root>
    );
};

export const Table04AlternatingFills = () => {
    return (
        <TableCard.Root>
            <TableCard.Header
                title="Files uploaded"
                contentTrailing={
                    <div className="flex items-center gap-3">
                        <Button size="sm" color="secondary">
                            Download all
                        </Button>
                        <Button size="sm" iconLeading={Upload}>
                            Upload
                        </Button>
                    </div>
                }
            />
            <Table aria-label="Team members" selectionMode="multiple">
                <Table.Header className="bg-primary">
                    <Table.Head id="name" label="File name" isRowHeader />
                    <Table.Head id="size" label="File size" />
                    <Table.Head id="uploadedAt" label="Date uploaded" />
                    <Table.Head id="updatedAt" label="Last updated" className="md:hidden xl:table-cell" />
                    <Table.Head id="uploadedBy" label="Uploaded by" />
                    <Table.Head id="actions" />
                </Table.Header>
                <Table.Body items={uploadedFiles.items}>
                    {(item) => (
                        <Table.Row id={item.name} className="odd:bg-secondary">
                            <Table.Cell>
                                <div className="flex items-center gap-3">
                                    <FileIcon type={item.name.split(".")[1]} theme="light" className="size-10 dark:hidden" />
                                    <FileIcon type={item.name.split(".")[1]} theme="dark" className="size-10 not-dark:hidden" />

                                    <div className="whitespace-nowrap">
                                        <p className="text-sm font-medium text-primary">{item.name}</p>
                                        <p className="text-sm text-tertiary">{item.size}</p>
                                    </div>
                                </div>
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap">{item.size}</Table.Cell>
                            <Table.Cell className="whitespace-nowrap">{item.uploadedAt}</Table.Cell>
                            <Table.Cell className="whitespace-nowrap md:hidden xl:table-cell">{item.updatedAt}</Table.Cell>
                            <Table.Cell className="whitespace-nowrap">{item.uploadedBy}</Table.Cell>
                            <Table.Cell className="px-4">
                                <div className="flex items-center justify-end">
                                    <DropdownIconSimple />
                                </div>
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </TableCard.Root>
    );
};
