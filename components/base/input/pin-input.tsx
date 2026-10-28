"use client";

import type { ComponentPropsWithRef } from "react";
import { createContext, useContext, useId } from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { HintText } from "@/components/base/input/hint-text";
import { Label as LabelBase } from "@/components/base/input/label";
import { cx } from "@/utils/cx";

type PinInputSize = "xxxs" | "xxs" | "xs" | "sm" | "md" | "lg";

type PinInputContextType = {
    size: PinInputSize;
    disabled: boolean;
    id: string;
    invalid: boolean;
};

const PinInputContext = createContext<PinInputContextType>({
    size: "sm",
    id: "",
    disabled: false,
    invalid: false,
});

export const usePinInputContext = () => {
    const context = useContext(PinInputContext);

    if (!context) {
        throw new Error("The 'usePinInputContext' hook must be used within a '<PinInput />'");
    }

    return context;
};

export interface PinInputProps extends ComponentPropsWithRef<"div"> {
    /** The digit box height: `xxxs` 36px, `xxs` 40, `xs` 44, `sm` 64, `md` 80, `lg` 96 */
    size?: PinInputSize;
    /** Disables every box (Figma's disabled tokens, not `opacity-50`) */
    disabled?: boolean;
    /** Shows the boxes in the error style */
    invalid?: boolean;
}

/** A code of a few digits in separate boxes (verification code, PIN), built from `PinInput.Group` and `PinInput.Slot`. */
const PinInput = ({ className, size = "md", disabled = false, invalid = false, ...props }: PinInputProps) => {
    const id = useId();

    return (
        <PinInputContext.Provider value={{ size, disabled, id, invalid }}>
            <div role="group" className={cx("flex h-max flex-col gap-1.5", className)} {...props} />
        </PinInputContext.Provider>
    );
};
PinInput.displayName = "PinInput";

const styles = {
    xxxs: { group: "gap-1.5 h-9", slot: "size-9 px-3 py-2 text-sm rounded-md font-medium text-placeholder/50", caret: "text-sm font-medium" },
    xxs: { group: "gap-2 h-10", slot: "size-10 px-3 py-2 text-md rounded-md font-medium text-placeholder/50", caret: "text-md font-medium" },
    xs: { group: "gap-2 h-11", slot: "size-11 px-3.5 py-2.5 text-md rounded-md font-medium text-placeholder/50", caret: "text-md font-medium" },
    sm: { group: "gap-2 h-16.5", slot: "size-16 px-2 py-0.5 text-display-lg font-medium", caret: "text-display-lg font-medium" },
    md: { group: "gap-3 h-20.5", slot: "size-20 px-2 py-2.5 text-display-lg font-medium", caret: "text-display-lg font-medium" },
    lg: { group: "gap-3 h-24.5", slot: "size-24 px-2 py-3 text-display-xl font-medium", caret: "text-display-xl font-medium" },
};

/** `Omit` that keeps input-otp's `render` / `children` union intact. */
type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;

type OTPInputProps = ComponentPropsWithRef<typeof OTPInput>;

export type PinInputGroupProps = DistributiveOmit<OTPInputProps, "maxLength"> & {
    /**
     * The number of digits
     * @default 4
     */
    maxLength?: number;
    /** Allowed characters as a regex string, e.g. `REGEXP_ONLY_DIGITS` from `input-otp` */
    pattern?: OTPInputProps["pattern"];
    /** The code (controlled) */
    value?: OTPInputProps["value"];
    /** Called with the code as a string */
    onChange?: OTPInputProps["onChange"];
    /** Called when every box is filled */
    onComplete?: OTPInputProps["onComplete"];
    /** Focuses the first box on mount */
    autoFocus?: OTPInputProps["autoFocus"];
    /** `one-time-code` lets the browser fill a code from an SMS */
    autoComplete?: OTPInputProps["autoComplete"];
    /** The on-screen keyboard (`numeric`) */
    inputMode?: OTPInputProps["inputMode"];
    /** The hidden input's `size` attribute */
    width?: number;
    /** Classes on the hidden input */
    inputClassName?: string;
};

/** Holds the slots and the hidden input; takes the value, length and pattern. */
const Group = ({ inputClassName, containerClassName, width, maxLength = 4, ...props }: PinInputGroupProps) => {
    const { id, size, disabled } = usePinInputContext();

    return (
        <OTPInput
            {...props}
            size={width}
            maxLength={maxLength}
            disabled={disabled}
            id={"pin-input-" + id}
            aria-label="Enter your pin"
            aria-labelledby={"pin-input-label-" + id}
            aria-describedby={"pin-input-description-" + id}
            containerClassName={cx("flex flex-row", styles[size].group, containerClassName)}
            className={cx("disabled:cursor-not-allowed", inputClassName)}
        />
    );
};
Group.displayName = "Group";

/** One digit box. */
const Slot = ({
    index,
    className,
    ...props
}: ComponentPropsWithRef<"div"> & {
    /** The box's position, from 0 (required) */
    index: number;
}) => {
    const { size, disabled, invalid } = usePinInputContext();
    const { slots, isFocused } = useContext(OTPInputContext);

    const slot = slots[index];

    return (
        <div
            {...props}
            aria-invalid={invalid}
            aria-label={"Enter digit " + (index + 1) + " of " + slots.length}
            className={cx(
                "relative flex items-center justify-center rounded-xl bg-primary text-center text-placeholder_subtle ring-1 ring-primary transition-[box-shadow,background-color] ring-inset",
                styles[size].slot,
                isFocused && slot?.isActive && "text-brand-secondary ring-2 ring-brand outline-2 outline-offset-2 outline-focus-ring",
                slot?.char && "text-brand-secondary ring-2 ring-brand",
                disabled && "bg-disabled_subtle text-fg-disabled_subtle ring-1 ring-disabled",
                invalid && "text-error-primary ring-error_subtle",
                className,
            )}
        >
            {slot?.char ? slot.char : slot?.hasFakeCaret ? <FakeCaret size={size} /> : 0}
        </div>
    );
};
Slot.displayName = "Slot";

const FakeCaret = ({ size = "md" }: { size?: PinInputSize }) => {
    return <div className={cx("pointer-events-none h-[1em] w-0.5 animate-caret-blink bg-fg-brand-primary", styles[size].caret)} />;
};

/** A dash between groups of slots. */
const Separator = (props: ComponentPropsWithRef<"div">) => {
    return (
        <div role="separator" {...props} className={cx("text-center text-display-xl font-medium text-utility-gray-300", props.className)}>
            -
        </div>
    );
};
Separator.displayName = "Separator";

/** The field label (`Label` props), linked to the input. */
const Label = (props: ComponentPropsWithRef<typeof LabelBase>) => {
    const { id } = usePinInputContext();

    return <LabelBase {...props} htmlFor={"pin-input-" + id} id={"pin-input-label-" + id} />;
};
Label.displayName = "Label";

/** The hint below the boxes (`HintText` props), linked as the description. */
const Description = (props: ComponentPropsWithRef<typeof HintText>) => {
    const { id, size } = usePinInputContext();

    return <HintText {...props} id={"pin-input-description-" + id} role="description" className={cx(size === "xxxs" && "text-xs", props.className)} />;
};
Description.displayName = "Description";

// Parts as statics assigned to the declaration itself (not to a cast copy), so the props table
// generator (react-docgen-typescript) documents each part as `PinInput.Group`, `PinInput.Slot`, …
PinInput.Slot = Slot;
PinInput.Label = Label;
PinInput.Group = Group;
PinInput.Separator = Separator;
PinInput.Description = Description;

export { PinInput };
