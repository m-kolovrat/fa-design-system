"use client";

import { type FC, type PropsWithChildren, type ReactNode, type RefAttributes, createContext, isValidElement, useContext } from "react";
import {
    ToggleButton as AriaToggleButton,
    ToggleButtonGroup as AriaToggleButtonGroup,
    type ToggleButtonGroupProps,
    type ToggleButtonProps,
} from "react-aria-components";
import { cx, sortCx } from "@/utils/cx";
import { isReactComponent } from "@/utils/is-react-component";

export const styles = sortCx({
    common: {
        root: [
            "group/button-group inline-flex h-max cursor-pointer items-center bg-primary font-medium whitespace-nowrap text-secondary shadow-skeuomorphic ring-1 ring-primary outline-brand transition ring-inset",
            // Hover and focus styles
            "hover:bg-primary_hover hover:text-secondary_hover focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2",
            // Disabled styles — Figma: no fading; text-disabled text, fg-disabled_subtle icons/dots,
            // background and border unchanged (selected + disabled uses bg-disabled_subtle).
            "disabled:cursor-not-allowed disabled:bg-primary disabled:text-disabled disabled:selected:bg-disabled_subtle disabled:[&>svg]:text-fg-disabled_subtle",
            // Selected styles
            "selected:bg-primary_hover selected:text-secondary_hover",
        ].join(" "),
        icon: "pointer-events-none text-fg-quaternary transition-inherit-all group-hover/button-group:text-fg-quaternary_hover group-selected/button-group:text-fg-quaternary_hover",
    },

    sizes: {
        sm: {
            // Figma sm: Text sm/Medium (14/20), 16×6 padding, 36px min height → 36px tall (same as the sm Button).
            root: "min-h-9 gap-1.5 px-4 py-1.5 text-sm not-last:pr-[calc(calc(var(--spacing)*4)+1px)] first:rounded-l-md last:rounded-r-md data-icon-leading:pl-3.5 data-icon-only:px-3",
            icon: "size-5",
        },
        md: {
            // Figma md: Text sm/Medium (14/20), 16×10 padding, 40px min height → 40px tall (same as the md Button).
            root: "min-h-10 gap-1.5 px-4 py-2.5 text-sm not-last:pr-[calc(calc(var(--spacing)*4)+1px)] first:rounded-l-md last:rounded-r-md data-icon-leading:pl-3.5 data-icon-only:px-3",
            icon: "size-5",
        },
        lg: {
            // Figma lg: Text md/Medium (16/24), 18×10 padding, 44px min height → 44px tall (icon-only too) (same as the lg Button).
            root: "min-h-11 gap-2 px-4.5 py-2.5 text-md not-last:pr-[calc(calc(var(--spacing)*4.5)+1px)] first:rounded-l-md last:rounded-r-md data-icon-leading:pl-4 data-icon-only:px-3.5",
            icon: "size-5",
        },
    },
});

type ButtonSize = keyof typeof styles.sizes;

const ButtonGroupContext = createContext<{ size: ButtonSize }>({ size: "md" });

interface ButtonGroupItemProps extends ToggleButtonProps, RefAttributes<HTMLButtonElement> {
    iconLeading?: FC<{ className?: string }> | ReactNode;
    iconTrailing?: FC<{ className?: string }> | ReactNode;
    onClick?: () => void;
    className?: string;
}

export const ButtonGroupItem = ({
    iconLeading: IconLeading,
    iconTrailing: IconTrailing,
    children,
    className,
    ...otherProps
}: PropsWithChildren<ButtonGroupItemProps>) => {
    const context = useContext(ButtonGroupContext);

    if (!context) {
        throw new Error("ButtonGroupItem must be used within a ButtonGroup component");
    }

    const { size } = context;

    const isIcon = (IconLeading || IconTrailing) && !children;

    return (
        <AriaToggleButton
            {...otherProps}
            data-icon-only={isIcon ? true : undefined}
            data-icon-leading={IconLeading ? true : undefined}
            className={cx(styles.common.root, styles.sizes[size].root, className)}
        >
            {isReactComponent(IconLeading) && <IconLeading className={cx(styles.common.icon, styles.sizes[size].icon)} />}
            {isValidElement(IconLeading) && IconLeading}

            {children}

            {isReactComponent(IconTrailing) && <IconTrailing className={cx(styles.common.icon, styles.sizes[size].icon)} />}
            {isValidElement(IconTrailing) && IconTrailing}
        </AriaToggleButton>
    );
};

interface ButtonGroupProps extends Omit<ToggleButtonGroupProps, "orientation">, RefAttributes<HTMLDivElement> {
    size?: ButtonSize;
    className?: string;
}

export const ButtonGroup = ({ children, size = "md", className, ...otherProps }: ButtonGroupProps) => {
    return (
        <ButtonGroupContext.Provider value={{ size }}>
            <AriaToggleButtonGroup
                selectionMode="single"
                className={cx("relative z-0 inline-flex w-max -space-x-px rounded-md shadow-xs", className)}
                {...otherProps}
            >
                {children}
            </AriaToggleButtonGroup>
        </ButtonGroupContext.Provider>
    );
};
