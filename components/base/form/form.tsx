"use client";

import type { ComponentPropsWithRef } from "react";
import { Form as AriaForm } from "react-aria-components";

type AriaFormProps = ComponentPropsWithRef<typeof AriaForm>;

/** `Form` takes React Aria `Form` props and `<form>` attributes; these are the ones most used. */
export interface FormProps extends AriaFormProps {
    /** Called on submit; call `e.preventDefault()` to handle it in JavaScript */
    onSubmit?: AriaFormProps["onSubmit"];
    /** The URL to submit to, for a plain HTML form post */
    action?: AriaFormProps["action"];
    /**
     * `native` blocks submitting while a field is invalid and shows the browser's messages through
     * the fields; `aria` shows errors without blocking
     * @default native
     */
    validationBehavior?: AriaFormProps["validationBehavior"];
    /** Server-side errors by field `name`, shown on the matching fields */
    validationErrors?: AriaFormProps["validationErrors"];
    /** Layout classes (a `flex flex-col gap-4` stack) */
    className?: AriaFormProps["className"];
}

/** A form whose fields validate together and show their errors through `isInvalid` and `hint`. */
export const Form = (props: FormProps) => {
    return <AriaForm {...props} />;
};

Form.displayName = "Form";
