"use client";

import type { ReactNode, RefAttributes } from "react";
import { useCallback, useId, useRef, useState } from "react";
import { ChevronDown, Search } from "fa-icons";
import { useFilter } from "react-aria";
import type { Selection } from "react-aria-components";
import {
    Autocomplete as AriaAutocomplete,
    Button as AriaButton,
    Dialog as AriaDialog,
    DialogTrigger as AriaDialogTrigger,
    Input as AriaInput,
    ListBox as AriaListBox,
    Popover as AriaPopover,
    SearchField as AriaSearchField,
} from "react-aria-components";
import { Button } from "@/components/base/buttons/button";
import { HintText } from "@/components/base/input/hint-text";
import { Label } from "@/components/base/input/label";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { cx } from "@/utils/cx";
import { type Strings, strings } from "@/utils/strings";
import { SelectItem } from "./select-item";
import { type CommonProps, SelectContext, type SelectItemType, sizes } from "./select-shared";

type MultiSelectLabels = Partial<Strings["multiSelect"]>;

const searchSizes = {
    sm: { wrapper: "py-1", root: "px-3 py-2 gap-2 *:data-icon:size-4", text: "text-sm" },
    md: { wrapper: "py-0.5", root: "px-3 py-2 gap-2 *:data-icon:size-5", text: "text-md" },
    lg: { wrapper: "py-0.5", root: "px-3.5 py-2.5 gap-2 *:data-icon:size-5", text: "text-md" },
};

const footerButtonSize = {
    sm: "sm" as const,
    md: "sm" as const,
    lg: "sm" as const,
};

const popoverMaxHeights = {
    sm: "max-h-68",
    md: "max-h-76",
    lg: "max-h-92",
};

interface MultiSelectFooterProps {
    /**
     * The size of the footer buttons.
     * @default "sm"
     */
    size?: "sm" | "md" | "lg";
    /** Handler that is called when the reset button is clicked. */
    onReset?: () => void;
    /** Handler that is called when the select all button is clicked. */
    onSelectAll?: () => void;
    /** Overrides the button texts (`strings.multiSelect.reset` / `.selectAll`). */
    labels?: MultiSelectLabels;
    /** Additional class name. */
    className?: string;
}

const MultiSelectFooter = ({ size = "sm", onReset, onSelectAll, labels: labelsProp, className }: MultiSelectFooterProps) => {
    const btnSize = footerButtonSize[size];
    const labels = { ...strings.multiSelect, ...labelsProp };

    return (
        <div className={cx("flex items-center justify-between border-t border-secondary p-3", className)}>
            <Button size={btnSize} color="secondary" onClick={onReset}>
                {labels.reset}
            </Button>
            <Button size={btnSize} color="secondary" onClick={onSelectAll}>
                {labels.selectAll}
            </Button>
        </div>
    );
};

interface MultiSelectEmptyStateProps {
    /**
     * The title to display.
     * @default "Ingen treff" (`strings.multiSelect.noResults`)
     */
    title?: string;
    /**
     * The description to display.
     * @default "Prøv et annet søkeord." (`strings.multiSelect.noResultsDescription`)
     */
    description?: string;
    /** Handler that is called when the clear search button is clicked. */
    onClearSearch?: () => void;
    /** The clear search button's text. */
    clearSearchLabel?: string;
    /** Additional class name. */
    className?: string;
}

const MultiSelectEmptyState = ({
    title = strings.multiSelect.noResults,
    description = strings.multiSelect.noResultsDescription,
    onClearSearch,
    clearSearchLabel = strings.multiSelect.clearSearch,
    className,
}: MultiSelectEmptyStateProps) => (
    <div className={cx("flex flex-col items-center gap-3 px-4 py-4", className)}>
        <div className="flex flex-col items-center gap-3">
            <FeaturedIcon icon={Search} size="sm" color="gray" theme="modern" />
            <div className="flex flex-col items-center gap-0.5 text-center text-sm">
                <p className="font-semibold text-primary">{title}</p>
                <p className="text-tertiary">{description}</p>
            </div>
        </div>
        {onClearSearch && (
            <Button size="sm" color="link-color" onClick={onClearSearch}>
                {clearSearchLabel}
            </Button>
        )}
    </div>
);

interface MultiSelectProps extends RefAttributes<HTMLDivElement>, CommonProps {
    /** The items to display in the listbox. */
    items?: SelectItemType[];
    /** The children to render for each item. */
    children: ReactNode | ((item: SelectItemType) => ReactNode);
    /** The currently selected keys (controlled). */
    selectedKeys?: Selection;
    /** The initial selected keys (uncontrolled). */
    defaultSelectedKeys?: Selection;
    /** Handler that is called when the selection changes. */
    onSelectionChange?: (keys: Selection) => void;
    /** Whether the select is disabled. */
    isDisabled?: boolean;
    /** Whether the select is required. */
    isRequired?: boolean;
    /** Whether the select is in an invalid state. */
    isInvalid?: boolean;
    /** Additional class name for the popover. */
    popoverClassName?: string;
    /** Additional class name for the root element. */
    className?: string;
    /** Called after the reset button clears the selection (it calls `onSelectionChange` with an empty set first). */
    onReset?: () => void;
    /** Called after the select all button selects every item (it calls `onSelectionChange` first). */
    onSelectAll?: () => void;
    /**
     * Whether to show the footer with reset and select all buttons.
     * @default true
     */
    showFooter?: boolean;
    /**
     * Whether to show the search input in the popover.
     * @default true
     */
    showSearch?: boolean;
    /** The title to display when no items match the search. */
    emptyStateTitle?: string;
    /** The description to display when no items match the search. */
    emptyStateDescription?: string;
    /** Custom formatter for the selected count text in the trigger. */
    selectedCountFormatter?: (count: number) => ReactNode;
    /** Supporting text displayed next to the selected count in the trigger. */
    supportingText?: ReactNode;
    /** Overrides the built-in Norwegian texts (`strings.multiSelect` in `utils/strings`): footer, search, count, empty state. */
    labels?: MultiSelectLabels;
}

const MultiSelectRoot = ({
    items,
    children,
    size = "sm",
    selectedKeys,
    defaultSelectedKeys,
    onSelectionChange,
    isDisabled,
    isRequired,
    isInvalid,
    placeholder: placeholderProp,
    label,
    hint,
    tooltip,
    hideRequiredIndicator,
    popoverClassName,
    className,
    onReset,
    onSelectAll,
    showFooter = true,
    showSearch = true,
    emptyStateTitle,
    emptyStateDescription,
    selectedCountFormatter,
    supportingText,
    labels: labelsProp,
}: MultiSelectProps) => {
    const labels = { ...strings.multiSelect, ...labelsProp };
    const placeholder = placeholderProp ?? labels.placeholder;
    const { contains } = useFilter({ sensitivity: "base" });
    const [searchValue, setSearchValue] = useState("");

    const triggerRef = useRef<HTMLButtonElement>(null);
    const [popoverWidth, setPopoverWidth] = useState("");

    const onResize = useCallback(() => {
        if (!triggerRef.current) return;
        const rect = triggerRef.current.getBoundingClientRect();
        setPopoverWidth(rect.width + "px");
    }, []);

    const id = useId();
    const labelId = `multi-select-label-${id}`;
    const valueId = `multi-select-value-${id}`;
    const hintId = `multi-select-hint-${id}`;

    // Uncontrolled use keeps its own selection, so the trigger count and the footer work either way.
    const [uncontrolledKeys, setUncontrolledKeys] = useState<Selection>(defaultSelectedKeys ?? new Set());
    const isControlled = selectedKeys !== undefined;
    const currentKeys = isControlled ? selectedKeys : uncontrolledKeys;

    const setSelection = useCallback(
        (keys: Selection) => {
            if (!isControlled) setUncontrolledKeys(keys);
            onSelectionChange?.(keys);
        },
        [isControlled, onSelectionChange],
    );

    const handleReset = useCallback(() => {
        setSelection(new Set());
        onReset?.();
    }, [setSelection, onReset]);

    const handleSelectAll = useCallback(() => {
        setSelection(items ? new Set(items.filter((item) => !item.isDisabled).map((item) => item.id)) : "all");
        onSelectAll?.();
    }, [setSelection, items, onSelectAll]);

    const selectedCount = currentKeys === "all" ? (items?.length ?? 0) : currentKeys.size;
    const hasSelection = selectedCount > 0;

    const handleClearSearch = useCallback(() => {
        setSearchValue("");
    }, []);

    return (
        <SelectContext.Provider value={{ size }}>
            <div className={cx("flex flex-col gap-1.5", className)}>
                {label && (
                    <Label id={labelId} isRequired={hideRequiredIndicator ? false : isRequired} isInvalid={isInvalid} tooltip={tooltip}>
                        {label}
                    </Label>
                )}

                <AriaDialogTrigger>
                    <AriaButton
                        ref={triggerRef}
                        isDisabled={isDisabled}
                        onClick={onResize}
                        aria-labelledby={label ? `${labelId} ${valueId}` : undefined}
                        aria-describedby={hint ? hintId : undefined}
                        aria-invalid={isInvalid || undefined}
                        aria-required={isRequired || undefined}
                        className={(state) =>
                            cx(
                                "relative flex w-full cursor-pointer items-center rounded-md bg-primary shadow-xs ring-1 ring-primary outline-hidden transition ring-inset",
                                (state.isFocusVisible || state.isPressed) && "ring-2 ring-brand",
                                isInvalid && "ring-error_subtle",
                                isInvalid && (state.isFocusVisible || state.isPressed) && "ring-2 ring-error",
                                state.isDisabled && "cursor-not-allowed opacity-50",
                            )
                        }
                    >
                        <span
                            id={valueId}
                            className={cx(
                                "flex w-full items-center truncate text-left",
                                sizes[size].root,
                                "*:data-icon:shrink-0 *:data-icon:text-fg-quaternary",
                            )}
                        >
                            {hasSelection ? (
                                <span className={cx("flex items-center", sizes[size].textContainer)}>
                                    <span className={cx("font-medium text-primary", sizes[size].text)}>
                                        {selectedCountFormatter ? selectedCountFormatter(selectedCount) : labels.selectedCount(selectedCount)}
                                    </span>
                                    {supportingText && <span className={cx("text-tertiary", sizes[size].text)}>{supportingText}</span>}
                                </span>
                            ) : (
                                <span className={cx("text-placeholder", sizes[size].text)}>{placeholder}</span>
                            )}

                            <ChevronDown aria-hidden="true" className={cx("ml-auto shrink-0 text-fg-quaternary", size === "lg" ? "size-5" : "size-4")} />
                        </span>
                    </AriaButton>

                    <AriaPopover
                        placement="bottom"
                        offset={4}
                        containerPadding={0}
                        style={{ width: popoverWidth || undefined }}
                        className={(state) =>
                            cx(
                                "w-(--trigger-width) origin-(--trigger-anchor-point) overflow-hidden rounded-md bg-primary shadow-lg ring-1 ring-secondary_alt outline-hidden will-change-transform",
                                state.isEntering &&
                                    "duration-moderate ease-out animate-in fade-in placement-top:slide-in-from-bottom-0.5 placement-bottom:slide-in-from-top-0.5",
                                state.isExiting &&
                                    "duration-fast ease-out animate-out fade-out placement-top:slide-out-to-bottom-0.5 placement-bottom:slide-out-to-top-0.5",
                                popoverClassName,
                            )
                        }
                    >
                        <AriaDialog className="outline-hidden">
                            <AriaAutocomplete filter={contains} inputValue={searchValue} onInputChange={setSearchValue}>
                                {showSearch && (
                                    <div className={cx("border-b border-secondary", searchSizes[size].wrapper)}>
                                        <AriaSearchField aria-label={labels.search} value={searchValue} onChange={setSearchValue} autoFocus>
                                            <div className={cx("flex items-center", searchSizes[size].root)}>
                                                <Search data-icon aria-hidden="true" className="shrink-0 text-fg-quaternary" />
                                                <AriaInput
                                                    placeholder={labels.search}
                                                    className={cx(
                                                        "w-full appearance-none bg-transparent text-primary caret-alpha-black/90 outline-hidden placeholder:text-placeholder",
                                                        searchSizes[size].text,
                                                    )}
                                                />
                                            </div>
                                        </AriaSearchField>
                                    </div>
                                )}

                                <AriaListBox
                                    aria-label={label || labels.options}
                                    items={items}
                                    selectionMode="multiple"
                                    selectedKeys={currentKeys}
                                    onSelectionChange={setSelection}
                                    renderEmptyState={() => (
                                        <MultiSelectEmptyState
                                            title={emptyStateTitle ?? labels.noResults}
                                            description={emptyStateDescription ?? labels.noResultsDescription}
                                            clearSearchLabel={labels.clearSearch}
                                            onClearSearch={searchValue ? handleClearSearch : undefined}
                                        />
                                    )}
                                    className={cx("overflow-y-auto py-1 outline-hidden", popoverMaxHeights[size])}
                                >
                                    {children}
                                </AriaListBox>
                            </AriaAutocomplete>

                            {showFooter && <MultiSelectFooter size={size} onReset={handleReset} onSelectAll={handleSelectAll} labels={labels} />}
                        </AriaDialog>
                    </AriaPopover>
                </AriaDialogTrigger>

                {hint && (
                    <HintText id={hintId} isInvalid={isInvalid} className={cx(size === "sm" && "text-xs")}>
                        {hint}
                    </HintText>
                )}
            </div>
        </SelectContext.Provider>
    );
};

const MultiSelect = MultiSelectRoot as typeof MultiSelectRoot & {
    Item: typeof SelectItem;
    Footer: typeof MultiSelectFooter;
    EmptyState: typeof MultiSelectEmptyState;
};

MultiSelect.Item = SelectItem;
MultiSelect.Footer = MultiSelectFooter;
MultiSelect.EmptyState = MultiSelectEmptyState;

export { MultiSelect };
