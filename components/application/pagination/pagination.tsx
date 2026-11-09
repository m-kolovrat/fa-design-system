"use client";

import { ArrowLeft, ArrowRight, ChevronDoubleLeft, ChevronDoubleRight, ChevronLeft, ChevronRight } from "fa-icons";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { Button } from "@/components/base/buttons/button";
import { InputBase } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import { cx } from "@/utils/cx";
import { strings } from "@/utils/strings";
import type { PaginationLabels, PaginationRootProps } from "./pagination-base";
import { Pagination } from "./pagination-base";

export type PaginationProps = Partial<Omit<PaginationRootProps, "children">>;

const PaginationItem = ({ value, isCurrent }: { value: number; isCurrent: boolean }) => {
    return (
        <Pagination.Item
            value={value}
            isCurrent={isCurrent}
            className={({ isSelected }) =>
                cx(
                    "flex size-9 cursor-pointer items-center justify-center rounded-full p-3 text-sm font-medium text-quaternary outline-focus-ring transition hover:bg-primary_hover hover:text-secondary focus-visible:z-10 focus-visible:bg-primary_hover focus-visible:outline-2 focus-visible:outline-offset-2",
                    // Active (current page) uses the same tokens as selected tabs and keeps them on hover.
                    isSelected && "bg-brand-primary_alt text-brand-secondary hover:bg-brand-primary_alt hover:text-brand-secondary",
                )
            }
        >
            {value}
        </Pagination.Item>
    );
};

interface MobilePaginationProps {
    /** The current page. */
    page?: number;
    /** The total number of pages. */
    total?: number;
    /** The class name of the pagination component. */
    className?: string;
    /** The function to call when the page changes. */
    onPageChange?: (page: number) => void;
    /** The built-in texts. */
    labels: PaginationLabels;
}

const MobilePagination = ({ page = 1, total = 10, className, onPageChange, labels }: MobilePaginationProps) => {
    return (
        <nav aria-label={labels.navigation} className={cx("flex items-center justify-between md:hidden", className)}>
            <Button
                aria-label={labels.previousPage}
                iconLeading={ArrowLeft}
                color="secondary"
                size="sm"
                isDisabled={page <= 1}
                onClick={() => onPageChange?.(Math.min(total, Math.max(1, page - 1)))}
            />

            <span className="text-sm whitespace-pre text-fg-secondary">
                {labels.pageOf(<span className="font-medium">{page}</span>, <span className="font-medium">{total}</span>)}
            </span>

            <Button
                aria-label={labels.nextPage}
                iconLeading={ArrowRight}
                color="secondary"
                size="sm"
                isDisabled={page >= total}
                onClick={() => onPageChange?.(Math.max(1, Math.min(total, page + 1)))}
            />
        </nav>
    );
};

/** Under a page-level list (article archive, search results): link-gray prev / page numbers / next. */
export const PaginationPageDefault = ({ page = 1, total = 10, className, ...props }: PaginationProps) => {
    const isDesktop = useBreakpoint("md");
    const labels = { ...strings.pagination, ...props.labels };

    return (
        <Pagination.Root
            {...props}
            page={page}
            total={total}
            className={cx("flex w-full items-center justify-between gap-3 border-t border-secondary pt-4 md:pt-5", className)}
        >
            <div className="hidden flex-1 justify-start md:flex">
                <Pagination.PrevTrigger asChild>
                    <Button iconLeading={ArrowLeft} color="link-gray" size="sm">
                        {isDesktop ? labels.previous : undefined}
                    </Button>
                </Pagination.PrevTrigger>
            </div>

            <Pagination.PrevTrigger asChild className="md:hidden">
                <Button iconLeading={ArrowLeft} color="secondary" size="sm">
                    {isDesktop ? labels.previous : undefined}
                </Button>
            </Pagination.PrevTrigger>

            <Pagination.Context>
                {({ pages, currentPage, total }) => (
                    <>
                        <div className="hidden justify-center gap-0.5 md:flex">
                            {pages.map((page, index) =>
                                page.type === "page" ? (
                                    <PaginationItem key={index} {...page} />
                                ) : (
                                    <Pagination.Ellipsis key={index} className="flex size-9 shrink-0 items-center justify-center text-tertiary">
                                        &#8230;
                                    </Pagination.Ellipsis>
                                ),
                            )}
                        </div>

                        <div className="flex justify-center text-sm whitespace-pre text-fg-secondary md:hidden">
                            {labels.pageOf(<span className="font-medium">{currentPage}</span>, <span className="font-medium">{total}</span>)}
                        </div>
                    </>
                )}
            </Pagination.Context>

            <div className="hidden flex-1 justify-end md:flex">
                <Pagination.NextTrigger asChild>
                    <Button iconTrailing={ArrowRight} color="link-gray" size="sm">
                        {isDesktop ? labels.next : undefined}
                    </Button>
                </Pagination.NextTrigger>
            </div>
            <Pagination.NextTrigger asChild className="md:hidden">
                <Button iconTrailing={ArrowRight} color="secondary" size="sm">
                    {isDesktop ? labels.next : undefined}
                </Button>
            </Pagination.NextTrigger>
        </Pagination.Root>
    );
};

/** Under a page-level list, with outlined prev / next buttons. */
export const PaginationPageMinimalCenter = ({ page = 1, total = 10, className, ...props }: PaginationProps) => {
    const isDesktop = useBreakpoint("md");
    const labels = { ...strings.pagination, ...props.labels };

    return (
        <Pagination.Root
            {...props}
            page={page}
            total={total}
            className={cx("flex w-full items-center justify-between gap-3 border-t border-secondary pt-4 md:pt-5", className)}
        >
            <div className="flex flex-1 justify-start">
                <Pagination.PrevTrigger asChild>
                    <Button iconLeading={ArrowLeft} color="secondary" size="sm">
                        {isDesktop ? labels.previous : undefined}
                    </Button>
                </Pagination.PrevTrigger>
            </div>

            <Pagination.Context>
                {({ pages, currentPage, total }) => (
                    <>
                        <div className="hidden justify-center gap-0.5 md:flex">
                            {pages.map((page, index) =>
                                page.type === "page" ? (
                                    <PaginationItem key={index} {...page} />
                                ) : (
                                    <Pagination.Ellipsis key={index} className="flex size-9 shrink-0 items-center justify-center text-tertiary">
                                        &#8230;
                                    </Pagination.Ellipsis>
                                ),
                            )}
                        </div>

                        <div className="flex justify-center text-sm whitespace-pre text-fg-secondary md:hidden">
                            {labels.pageOf(<span className="font-medium">{currentPage}</span>, <span className="font-medium">{total}</span>)}
                        </div>
                    </>
                )}
            </Pagination.Context>

            <div className="flex flex-1 justify-end">
                <Pagination.NextTrigger asChild>
                    <Button iconTrailing={ArrowRight} color="secondary" size="sm">
                        {isDesktop ? labels.next : undefined}
                    </Button>
                </Pagination.NextTrigger>
            </div>
        </Pagination.Root>
    );
};

/** The bottom row inside a card or `Table`: prev / page numbers / next. Ignores `className`. */
export const PaginationCardDefault = ({ page = 1, total = 10, ...props }: PaginationProps) => {
    const isDesktop = useBreakpoint("md");
    const labels = { ...strings.pagination, ...props.labels };

    return (
        <Pagination.Root
            {...props}
            page={page}
            total={total}
            className="flex w-full items-center justify-between gap-3 border-t border-secondary px-4 py-3 md:px-6 md:pt-3 md:pb-4"
        >
            <div className="flex flex-1 justify-start">
                <Pagination.PrevTrigger asChild>
                    <Button iconLeading={ArrowLeft} color="secondary" size="sm">
                        {isDesktop ? labels.previous : undefined}
                    </Button>
                </Pagination.PrevTrigger>
            </div>

            <Pagination.Context>
                {({ pages, currentPage, total }) => (
                    <>
                        <div className="hidden justify-center gap-0.5 md:flex">
                            {pages.map((page, index) =>
                                page.type === "page" ? (
                                    <PaginationItem key={index} {...page} />
                                ) : (
                                    <Pagination.Ellipsis key={index} className="flex size-9 shrink-0 items-center justify-center text-tertiary">
                                        &#8230;
                                    </Pagination.Ellipsis>
                                ),
                            )}
                        </div>

                        <div className="flex justify-center text-sm whitespace-pre text-fg-secondary md:hidden">
                            {labels.pageOf(<span className="font-medium">{currentPage}</span>, <span className="font-medium">{total}</span>)}
                        </div>
                    </>
                )}
            </Pagination.Context>

            <div className="flex flex-1 justify-end">
                <Pagination.NextTrigger asChild>
                    <Button iconTrailing={ArrowRight} color="secondary" size="sm">
                        {isDesktop ? labels.next : undefined}
                    </Button>
                </Pagination.NextTrigger>
            </div>
        </Pagination.Root>
    );
};

export interface PaginationCardMinimalProps {
    /** The current page. */
    page?: number;
    /** The total number of pages. */
    total?: number;
    /** The number of items per page. */
    pageSize?: number;
    /**
     * The alignment of the pagination.
     * @default left
     */
    align?: "left" | "center" | "right";
    /** The class name of the pagination component. */
    className?: string;
    /** The function to call when the page changes. */
    onPageChange?: (page: number) => void;
    /** The function to call when the page size changes. */
    onPageSizeChange?: (pageSize: number) => void;
    /** Overrides the built-in Norwegian texts (`strings.pagination` in `utils/strings`). */
    labels?: Partial<PaginationLabels>;
}

/** Card bottom without page numbers: "Side X av Y" and a page-size select between prev and next. */
export const PaginationCardMinimal = ({
    page = 1,
    total = 10,
    pageSize = 10,
    // Defaulted below, not here: react-docgen-typescript merges the destructuring defaults of every
    // component in a file, so three different `align` defaults would show the wrong one.
    align: alignProp,
    onPageChange,
    className,
    onPageSizeChange,
    labels: labelsProp,
}: PaginationCardMinimalProps) => {
    const align = alignProp ?? "left";
    const labels = { ...strings.pagination, ...labelsProp };
    return (
        <div className={cx("border-t border-secondary px-4 py-3 md:px-6 md:pt-3 md:pb-4", className)}>
            <MobilePagination page={page} total={total} onPageChange={onPageChange} labels={labels} />

            <nav aria-label={labels.navigation} className={cx("hidden items-center gap-3 md:flex", align === "center" && "justify-between")}>
                <div className={cx(align === "center" && "flex flex-1 justify-start")}>
                    <Button isDisabled={page === 1} color="secondary" size="sm" onClick={() => onPageChange?.(Math.max(1, page - 1))}>
                        {labels.previous}
                    </Button>
                </div>

                <div
                    className={cx(
                        "flex items-center gap-3",
                        align === "right" && "order-first mr-auto",
                        align === "left" && "order-last ml-auto flex-row-reverse",
                    )}
                >
                    <span className="text-sm font-medium whitespace-pre text-fg-secondary">{labels.pageOf(page, total)}</span>
                    <Select
                        aria-label={labels.pageSize}
                        value={pageSize}
                        onChange={(value) => onPageSizeChange?.(value as number)}
                        size="sm"
                        items={[10, 25, 50, 100].map((count) => ({ label: String(count), id: count }))}
                    >
                        {(item) => (
                            <Select.Item id={item.id} key={item.id}>
                                {item.label}
                            </Select.Item>
                        )}
                    </Select>
                </div>
                <div className={cx(align === "center" && "flex flex-1 justify-end")}>
                    <Button isDisabled={page === total} color="secondary" size="sm" onClick={() => onPageChange?.(Math.min(total, page + 1))}>
                        {labels.next}
                    </Button>
                </div>
            </nav>
        </div>
    );
};

export interface PaginationButtonGroupProps extends Partial<Omit<PaginationRootProps, "children">> {
    /**
     * The alignment of the pagination.
     * @default left
     */
    align?: "left" | "center" | "right";
}

/** Card bottom as one segmented `ButtonGroup`. */
export const PaginationButtonGroup = ({ align: alignProp, page = 1, total = 10, ...props }: PaginationButtonGroupProps) => {
    const align = alignProp ?? "left"; // See PaginationCardMinimal for why this isn't a destructuring default.
    const isDesktop = useBreakpoint("md");
    const labels = { ...strings.pagination, ...props.labels };

    return (
        <div
            className={cx(
                "flex border-t border-secondary px-4 py-3 md:px-6 md:pt-3 md:pb-4",
                align === "left" && "justify-start",
                align === "center" && "justify-center",
                align === "right" && "justify-end",
            )}
        >
            <Pagination.Root {...props} page={page} total={total}>
                <Pagination.Context>
                    {({ pages }) => (
                        <ButtonGroup size="sm">
                            <Pagination.PrevTrigger asChild>
                                <ButtonGroupItem iconLeading={ArrowLeft}>{isDesktop ? labels.previous : undefined}</ButtonGroupItem>
                            </Pagination.PrevTrigger>

                            {pages.map((page, index) =>
                                page.type === "page" ? (
                                    <Pagination.Item key={index} {...page} asChild>
                                        <ButtonGroupItem isSelected={page.isCurrent} className="size-9 items-center justify-center">
                                            {page.value}
                                        </ButtonGroupItem>
                                    </Pagination.Item>
                                ) : (
                                    <Pagination.Ellipsis key={index}>
                                        <ButtonGroupItem className="pointer-events-none size-9 items-center justify-center rounded-none!">
                                            &#8230;
                                        </ButtonGroupItem>
                                    </Pagination.Ellipsis>
                                ),
                            )}

                            <Pagination.NextTrigger asChild>
                                <ButtonGroupItem iconTrailing={ArrowRight}>{isDesktop ? labels.next : undefined}</ButtonGroupItem>
                            </Pagination.NextTrigger>
                        </ButtonGroup>
                    )}
                </Pagination.Context>
            </Pagination.Root>
        </div>
    );
};

export interface PaginationCardAdvancedProps {
    /** The current page. */
    page?: number;
    /** The total number of pages. */
    total?: number;
    /** The number of items per page. */
    pageSize?: number;
    /**
     * The alignment of the pagination.
     * @default space-between
     */
    align?: "space-between" | "center";
    /** The class name of the pagination component. */
    className?: string;
    /** The function to call when the page changes. */
    onPageChange?: (page: number) => void;
    /** The function to call when the page size changes. */
    onPageSizeChange?: (pageSize: number) => void;
    /** Overrides the built-in Norwegian texts (`strings.pagination` in `utils/strings`). */
    labels?: Partial<PaginationLabels>;
}

/** Data tables: page input, rows per page, first / last. */
export const PaginationCardAdvanced = ({
    page = 1,
    total = 10,
    pageSize = 10,
    align: alignProp,
    onPageChange,
    className,
    onPageSizeChange,
    labels: labelsProp,
}: PaginationCardAdvancedProps) => {
    const align = alignProp ?? "space-between"; // See PaginationCardMinimal for why this isn't a destructuring default.
    const labels = { ...strings.pagination, ...labelsProp };

    return (
        <div className={cx("border-t border-secondary px-4 py-3 md:px-6 md:pt-3 md:pb-4", className)}>
            <Pagination.Root
                page={page}
                total={total}
                onPageChange={onPageChange}
                labels={labelsProp}
                className={cx("flex items-center gap-3", align === "center" && "justify-between")}
            >
                <div className="hidden items-center gap-2 text-sm font-medium whitespace-nowrap text-fg-secondary md:flex">
                    {labels.pageOf(
                        <InputBase
                            aria-label={labels.pageInput}
                            value={page.toString()}
                            onChange={(event) => {
                                const value = event.target.value.trim();
                                const next = Number(value);
                                // Ignore an empty field or anything that isn't a number; clamp the rest to 1..total.
                                if (value === "" || !Number.isFinite(next)) return;
                                onPageChange?.(Math.min(total, Math.max(1, Math.trunc(next))));
                            }}
                            size="sm"
                            wrapperClassName="min-w-9"
                            inputClassName="text-center min-w-9 field-sizing-content"
                        />,
                        total,
                    )}
                </div>

                <hr className={cx("mx-1 h-4 w-px border-l border-primary max-md:hidden", align === "center" && "hidden")} />

                <div className={cx("hidden items-center gap-2 md:flex", align === "center" && "order-last")}>
                    <span className="text-sm font-medium whitespace-nowrap text-secondary">{labels.rowsPerPage}</span>
                    <Select
                        aria-label={labels.pageSize}
                        value={pageSize}
                        onChange={(value) => onPageSizeChange?.(value as number)}
                        size="sm"
                        items={[
                            { label: "10", id: 10 },
                            { label: "25", id: 25 },
                            { label: "50", id: 50 },
                            { label: "100", id: 100 },
                        ]}
                    >
                        {(item) => (
                            <Select.Item selectionIndicator="none" id={item.id}>
                                {item.label}
                            </Select.Item>
                        )}
                    </Select>
                </div>

                <div className={cx("flex flex-1 items-center gap-4 md:ml-auto md:justify-end", align === "center" && "md:justify-center")}>
                    <div className="flex gap-2">
                        <Button
                            aria-label={labels.firstPage}
                            iconLeading={ChevronDoubleLeft}
                            color="secondary"
                            size="sm"
                            isDisabled={page === 1}
                            onClick={() => onPageChange?.(1)}
                        />
                        <Pagination.PrevTrigger asChild>
                            <Button iconLeading={ChevronLeft} color="secondary" size="sm" />
                        </Pagination.PrevTrigger>
                    </div>

                    <Pagination.Context>
                        {({ pages, currentPage, total }) => (
                            <>
                                <div className="hidden justify-center gap-0.5 md:flex">
                                    {pages.map((page, index) =>
                                        page.type === "page" ? (
                                            <PaginationItem key={index} {...page} />
                                        ) : (
                                            <Pagination.Ellipsis key={index} className="flex size-9 shrink-0 items-center justify-center text-tertiary">
                                                &#8230;
                                            </Pagination.Ellipsis>
                                        ),
                                    )}
                                </div>

                                <div className="flex flex-1 justify-center text-sm whitespace-pre text-fg-secondary md:hidden">
                                    {labels.pageOf(<span className="font-medium">{currentPage}</span>, <span className="font-medium">{total}</span>)}
                                </div>
                            </>
                        )}
                    </Pagination.Context>

                    <div className="flex gap-2">
                        <Pagination.NextTrigger asChild>
                            <Button iconTrailing={ChevronRight} color="secondary" size="sm" />
                        </Pagination.NextTrigger>
                        <Button
                            aria-label={labels.lastPage}
                            iconTrailing={ChevronDoubleRight}
                            color="secondary"
                            size="sm"
                            isDisabled={page === total}
                            onClick={() => onPageChange?.(total)}
                        />
                    </div>
                </div>
            </Pagination.Root>
        </div>
    );
};
