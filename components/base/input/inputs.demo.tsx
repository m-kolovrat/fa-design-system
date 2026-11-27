"use client";

import { useState } from "react";
import React from "react";
import { Alert, Calendar, Check, Copy, Lock, Mail, Success } from "fa-icons";
import { Button } from "@/components/base/buttons/button";
import { Input, InputBase, TextField } from "@/components/base/input/input";
import { InputFile } from "@/components/base/input/input-file";
import { InputGroup } from "@/components/base/input/input-group";
import { PaymentInput } from "@/components/base/input/input-payment";
import { InputTags } from "@/components/base/input/input-tags";
import { InputTagsOuter } from "@/components/base/input/input-tags-outer";
import { NativeSelect } from "@/components/base/select/select-native";
import { useClipboard } from "@/hooks/use-clipboard";
import { cx } from "@/utils/cx";
import { HintText } from "./hint-text";
import { InputDate } from "./input-date";
import { InputNumber } from "./input-number";
import { Label } from "./label";

export const DefaultDemo = () => {
    return <Input isRequired label="Email" hint="This is a hint text to help user." placeholder="kari.nordmann@finansavisen.no" tooltip="This is a tooltip" />;
};

export const DisabledDemo = () => {
    return (
        <Input
            isRequired
            isDisabled
            label="Email"
            hint="This is a hint text to help user."
            placeholder="kari.nordmann@finansavisen.no"
            tooltip="This is a tooltip"
        />
    );
};

export const InvalidDemo = () => {
    return (
        <Input isRequired isInvalid label="Email" hint="This is an error message." placeholder="kari.nordmann@finansavisen.no" tooltip="This is a tooltip" />
    );
};

export const LeadingIconDemo = () => {
    return (
        <Input
            isRequired
            icon={Mail}
            label="Email"
            hint="This is a hint text to help user."
            placeholder="kari.nordmann@finansavisen.no"
            tooltip="This is a tooltip"
        />
    );
};

export const LeadingDropdownDemo = () => {
    return (
        <InputGroup
            isRequired
            label="Phone number"
            hint="This is a hint text to help user."
            leadingAddon={
                <NativeSelect
                    aria-label="Country"
                    options={[
                        { value: "US", label: "US" },
                        { value: "CA", label: "CA" },
                        { value: "EU", label: "EU" },
                    ]}
                />
            }
        >
            <InputBase type="tel" placeholder="+1 (555) 000-0000" tooltip="This is a tooltip" />
        </InputGroup>
    );
};

export const TrailingDropdownDemo = () => {
    return (
        <InputGroup
            isRequired
            prefix="$"
            label="Sale amount"
            hint="This is a hint text to help user."
            trailingAddon={
                <NativeSelect
                    aria-label="Sale amount"
                    options={[
                        { value: "USD", label: "USD" },
                        { value: "CAD", label: "CAD" },
                        { value: "EUR", label: "EUR" },
                    ]}
                />
            }
        >
            <InputBase type="tel" placeholder="1,000.00" tooltip="This is a tooltip" />
        </InputGroup>
    );
};

export const LeadingTextDemo = () => {
    return (
        <InputGroup isRequired label="Website" hint="This is a hint text to help user." leadingAddon={<InputGroup.Prefix>https://</InputGroup.Prefix>}>
            <InputBase placeholder="www.finansavisen.no" tooltip="This is a tooltip" />
        </InputGroup>
    );
};

export const PaymentInputDemo = () => {
    return (
        <PaymentInput isRequired label="Card number" placeholder="0000 0000 0000 0000" hint="This is a hint text to help user." tooltip="This is a tooltip" />
    );
};

export const TrailingButtonDemo = () => {
    const { copy, copied } = useClipboard();
    const [value, setValue] = useState("");

    return (
        <InputGroup
            isRequired
            label="Website"
            hint="This is a hint text to help user."
            onChange={setValue}
            trailingAddon={
                <Button color="secondary" iconLeading={copied ? Check : Copy} onClick={() => copy(value || "www.finansavisen.no")}>
                    Copy
                </Button>
            }
        >
            <InputBase placeholder="www.finansavisen.no" tooltip="This is a tooltip" />
        </InputGroup>
    );
};

export const PasswordInputDemo = () => {
    const [password, setPassword] = useState("");

    return (
        <TextField isRequired minLength={8} name="password" autoComplete="new-password" onChange={setPassword}>
            <Label>Password</Label>
            <InputBase icon={Lock} type="password" placeholder="••••••••••••" />
            <HintText className="flex items-center gap-1">
                <Success className={cx("size-4 text-fg-quaternary transition in-invalid:hidden", password.length >= 8 && "text-fg-success-primary")} />
                <Alert className="hidden size-4 text-fg-error-secondary in-invalid:inline-block" />
                Must be at least 8 characters.
            </HintText>
        </TextField>
    );
};

export const DateInputDemo = () => {
    return (
        <InputDate
            isRequired
            label="Date"
            hint="This is a hint text to help user."
            placeholder="Select a date"
            tooltip="This is a tooltip"
            granularity="minute"
            icon={Calendar}
        />
    );
};

export const NumberInputHorizontalDemo = () => {
    return <InputNumber isRequired orientation="horizontal" label="Number" hint="This is a hint text to help user." placeholder="100" />;
};

export const NumberInputVerticalDemo = () => {
    return <InputNumber isRequired label="Number" hint="This is a hint text to help user." placeholder="100" />;
};

export const TagInputDemo = () => {
    return (
        <InputTags
            isRequired
            label="Tags"
            hint="This is a hint text to help user."
            tooltip="This is a tooltip."
            placeholder="Type and press Enter"
            defaultValue={["Design", "Engineering"]}
        />
    );
};

export const TagInputOuterDemo = () => {
    return (
        <InputTagsOuter
            isRequired
            label="Tags"
            hint="This is a hint text to help user."
            tooltip="This is a tooltip."
            placeholder="Add tag"
            defaultValue={["Design", "Marketing"]}
        />
    );
};

export const Default = () => {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
                <Input
                    isRequired
                    label="Email"
                    hint="This is a hint text to help user."
                    placeholder="kari.nordmann@finansavisen.no"
                    tooltip="This is a tooltip"
                />
                <Input
                    isRequired
                    isDisabled
                    label="Email"
                    hint="This is a hint text to help user."
                    placeholder="kari.nordmann@finansavisen.no"
                    tooltip="This is a tooltip"
                />
                <Input
                    isRequired
                    isInvalid
                    label="Email"
                    hint="This is an error message."
                    placeholder="kari.nordmann@finansavisen.no"
                    tooltip="This is a tooltip"
                />
            </div>
        </div>
    );
};

export const LeadingIcon = () => {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
                <Input
                    isRequired
                    icon={Mail}
                    label="Email"
                    hint="This is a hint text to help user."
                    placeholder="kari.nordmann@finansavisen.no"
                    tooltip="This is a tooltip"
                />
                <Input
                    isRequired
                    isDisabled
                    icon={Mail}
                    label="Email"
                    hint="This is a hint text to help user."
                    placeholder="kari.nordmann@finansavisen.no"
                    tooltip="This is a tooltip"
                />
                <Input
                    isRequired
                    isInvalid
                    icon={Mail}
                    label="Email"
                    hint="This is an error message."
                    placeholder="kari.nordmann@finansavisen.no"
                    tooltip="This is a tooltip"
                />
            </div>
        </div>
    );
};

export const LeadingDropdown = () => {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
                <InputGroup
                    isRequired
                    label="Phone number"
                    hint="This is a hint text to help user."
                    leadingAddon={
                        <NativeSelect
                            aria-label="Country"
                            options={[
                                { value: "US", label: "US" },
                                { value: "CA", label: "CA" },
                                { value: "EU", label: "EU" },
                            ]}
                        />
                    }
                >
                    <InputBase type="tel" placeholder="+1 (555) 000-0000" tooltip="This is a tooltip" />
                </InputGroup>
                <InputGroup
                    isRequired
                    isDisabled
                    label="Phone number"
                    hint="This is a hint text to help user."
                    leadingAddon={
                        <NativeSelect
                            aria-label="Country"
                            options={[
                                { value: "US", label: "US" },
                                { value: "CA", label: "CA" },
                                { value: "EU", label: "EU" },
                            ]}
                        />
                    }
                >
                    <InputBase type="tel" placeholder="+1 (555) 000-0000" tooltip="This is a tooltip" />
                </InputGroup>
                <InputGroup
                    isRequired
                    isInvalid
                    label="Phone number"
                    hint="This is a hint text to help user."
                    leadingAddon={
                        <NativeSelect
                            aria-label="Country"
                            options={[
                                { value: "US", label: "US" },
                                { value: "CA", label: "CA" },
                                { value: "EU", label: "EU" },
                            ]}
                        />
                    }
                >
                    <InputBase type="tel" placeholder="+1 (555) 000-0000" tooltip="This is a tooltip" />
                </InputGroup>
            </div>
        </div>
    );
};

export const TrailingDropdown = () => {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
                <InputGroup
                    isRequired
                    prefix="$"
                    label="Phone number"
                    hint="This is a hint text to help user."
                    trailingAddon={
                        <NativeSelect
                            aria-label="Country"
                            options={[
                                { value: "USD", label: "USD" },
                                { value: "CAD", label: "CAD" },
                                { value: "EUR", label: "EUR" },
                            ]}
                        />
                    }
                >
                    <InputBase type="tel" placeholder="1,000.00" tooltip="This is a tooltip" />
                </InputGroup>
                <InputGroup
                    isRequired
                    isDisabled
                    prefix="$"
                    label="Phone number"
                    hint="This is a hint text to help user."
                    trailingAddon={
                        <NativeSelect
                            aria-label="Country"
                            options={[
                                { value: "USD", label: "USD" },
                                { value: "CAD", label: "CAD" },
                                { value: "EUR", label: "EUR" },
                            ]}
                        />
                    }
                >
                    <InputBase type="tel" placeholder="1,000.00" tooltip="This is a tooltip" />
                </InputGroup>
                <InputGroup
                    isRequired
                    isInvalid
                    prefix="$"
                    label="Phone number"
                    hint="This is a hint text to help user."
                    trailingAddon={
                        <NativeSelect
                            aria-label="Country"
                            options={[
                                { value: "USD", label: "USD" },
                                { value: "CAD", label: "CAD" },
                                { value: "EUR", label: "EUR" },
                            ]}
                        />
                    }
                >
                    <InputBase type="tel" placeholder="1,000.00" tooltip="This is a tooltip" />
                </InputGroup>
            </div>
        </div>
    );
};

export const LeadingText = () => {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
                <InputGroup isRequired label="Website" hint="This is a hint text to help user." leadingAddon={<InputGroup.Prefix>https://</InputGroup.Prefix>}>
                    <InputBase placeholder="www.finansavisen.no" tooltip="This is a tooltip" />
                </InputGroup>
                <InputGroup
                    isRequired
                    isDisabled
                    label="Website"
                    hint="This is a hint text to help user."
                    leadingAddon={<InputGroup.Prefix>https://</InputGroup.Prefix>}
                >
                    <InputBase placeholder="www.finansavisen.no" tooltip="This is a tooltip" />
                </InputGroup>
                <InputGroup
                    isRequired
                    isInvalid
                    label="Website"
                    hint="This is a hint text to help user."
                    leadingAddon={<InputGroup.Prefix>https://</InputGroup.Prefix>}
                >
                    <InputBase placeholder="www.finansavisen.no" tooltip="This is a tooltip" />
                </InputGroup>
            </div>
        </div>
    );
};

export const PaymentInputs = () => {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
                <PaymentInput
                    isRequired
                    label="Card number"
                    placeholder="0000 0000 0000 0000"
                    hint="This is a hint text to help user."
                    tooltip="This is a tooltip"
                />
                <PaymentInput
                    isRequired
                    isDisabled
                    label="Card number"
                    placeholder="0000 0000 0000 0000"
                    hint="This is a hint text to help user."
                    tooltip="This is a tooltip"
                />
                <PaymentInput
                    isInvalid
                    isRequired
                    label="Card number"
                    placeholder="0000 0000 0000 0000"
                    hint="This is an error message."
                    tooltip="This is a tooltip"
                />
            </div>
        </div>
    );
};

export const TrailingButton = () => {
    const { copy, copied } = useClipboard();
    const [inputValue1, setInputValue1] = useState("");
    const [inputValue2, setInputValue2] = useState("");
    const [inputValue3, setInputValue3] = useState("");

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
                <InputGroup
                    isRequired
                    label="Website"
                    hint="This is a hint text to help user."
                    onChange={setInputValue1}
                    trailingAddon={
                        <Button
                            color="secondary"
                            iconLeading={copied === "input-1" ? Check : Copy}
                            onClick={() => copy(inputValue1 || "www.finansavisen.no", "input-1")}
                        >
                            Copy
                        </Button>
                    }
                >
                    <InputBase placeholder="www.finansavisen.no" tooltip="This is a tooltip" />
                </InputGroup>

                <InputGroup
                    isRequired
                    isDisabled
                    label="Website"
                    hint="This is a hint text to help user."
                    onChange={setInputValue2}
                    trailingAddon={
                        <Button
                            isDisabled
                            color="secondary"
                            iconLeading={copied === "input-2" ? Check : Copy}
                            onClick={() => copy(inputValue2 || "www.finansavisen.no", "input-2")}
                        >
                            Copy
                        </Button>
                    }
                >
                    <InputBase placeholder="www.finansavisen.no" tooltip="This is a tooltip" />
                </InputGroup>
                <InputGroup
                    isRequired
                    isInvalid
                    label="Website"
                    hint="This is an error message."
                    onChange={setInputValue3}
                    trailingAddon={
                        <Button
                            color="secondary"
                            iconLeading={copied === "input-3" ? Check : Copy}
                            onClick={() => copy(inputValue3 || "www.finansavisen.no", "input-3")}
                        >
                            Copy
                        </Button>
                    }
                >
                    <InputBase placeholder="www.finansavisen.no" tooltip="This is a tooltip" />
                </InputGroup>
            </div>
        </div>
    );
};

export const PasswordInputs = () => {
    const [password, setPassword] = useState("");

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
                <TextField isRequired minLength={8} name="password" autoComplete="new-password" onChange={setPassword}>
                    <Label>Password</Label>
                    <InputBase icon={Lock} type="password" placeholder="••••••••••••" />
                    <HintText className="flex items-center gap-1">
                        <Success className={cx("size-4 text-fg-quaternary transition in-invalid:hidden", password.length >= 8 && "text-fg-success-primary")} />
                        <Alert className="hidden size-4 text-fg-error-secondary in-invalid:inline-block" />
                        Must be at least 8 characters.
                    </HintText>
                </TextField>
                <TextField isRequired isDisabled minLength={8} name="password" autoComplete="new-password" onChange={setPassword}>
                    <Label>Password</Label>
                    <InputBase icon={Lock} type="password" placeholder="••••••••••••" />
                    <HintText className="flex items-center gap-1">
                        <Success className={cx("size-4 text-fg-quaternary transition in-invalid:hidden", password.length >= 8 && "text-fg-success-primary")} />
                        <Alert className="hidden size-4 text-fg-error-secondary in-invalid:inline-block" />
                        Must be at least 8 characters.
                    </HintText>
                </TextField>
                <TextField isRequired isInvalid minLength={8} name="password" autoComplete="new-password" onChange={setPassword}>
                    <Label>Password</Label>
                    <InputBase icon={Lock} type="password" placeholder="••••••••••••" />
                    <HintText className="flex items-center gap-1">
                        <Success className={cx("size-4 text-fg-quaternary transition in-invalid:hidden", password.length >= 8 && "text-fg-success-primary")} />
                        <Alert className="hidden size-4 text-fg-error-secondary in-invalid:inline-block" />
                        Must be at least 8 characters.
                    </HintText>
                </TextField>
            </div>
        </div>
    );
};

export const DateInputs = () => {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
                <InputDate
                    isRequired
                    label="Date"
                    hint="This is a hint text to help user."
                    placeholder="Select a date"
                    tooltip="This is a tooltip"
                    granularity="minute"
                    icon={Calendar}
                />
                <InputDate
                    isRequired
                    isDisabled
                    label="Date"
                    hint="This is a hint text to help user."
                    placeholder="Select a date"
                    tooltip="This is a tooltip"
                    granularity="minute"
                    icon={Calendar}
                />
                <InputDate
                    isRequired
                    isInvalid
                    label="Date"
                    hint="This is an error message."
                    placeholder="Select a date"
                    tooltip="This is a tooltip"
                    granularity="minute"
                    icon={Calendar}
                />
            </div>
        </div>
    );
};

export const NumberInputsHorizontal = () => {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
                <InputNumber isRequired orientation="horizontal" label="Number" hint="This is a hint text to help user." placeholder="100" />
                <InputNumber isRequired orientation="horizontal" isDisabled label="Number" hint="This is a hint text to help user." placeholder="100" />
                <InputNumber isRequired orientation="horizontal" isInvalid label="Number" hint="This is an error message." placeholder="100" />
            </div>
        </div>
    );
};

export const NumberInputsVertical = () => {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
                <InputNumber isRequired label="Number" hint="This is a hint text to help user." placeholder="100" />
                <InputNumber isRequired isDisabled label="Number" hint="This is a hint text to help user." placeholder="100" />
                <InputNumber isRequired isInvalid label="Number" hint="This is an error message." placeholder="100" />
            </div>
        </div>
    );
};

export const TagInputs = () => {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
                <InputTags
                    isRequired
                    label="Tags"
                    hint="This is a hint text to help user."
                    tooltip="This is a tooltip."
                    placeholder="Type and press Enter"
                    defaultValue={["Design", "Engineering"]}
                />
                <InputTags
                    isRequired
                    isDisabled
                    label="Tags"
                    hint="This is a hint text to help user."
                    tooltip="This is a tooltip."
                    placeholder="Type and press Enter"
                    defaultValue={["Design", "Engineering"]}
                />
                <InputTags
                    isRequired
                    isInvalid
                    label="Tags"
                    tooltip="This is a tooltip."
                    hint="This is an error message."
                    placeholder="Type and press Enter"
                    defaultValue={["Design", "Engineering"]}
                />
            </div>
        </div>
    );
};

export const FileUploadInputDemo = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (files: FileList | null) => {
        if (!files || files.length === 0) return;
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 3000);
    };

    return <InputFile isRequired label="Upload file" hint="SVG, PNG, JPG or GIF (max. 800x400px)." onChange={handleChange} isLoading={isLoading} />;
};

export const FileUploadInputs = () => {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
                <FileUploadInputDemo />
                <InputFile isRequired isDisabled label="Upload file" hint="This is a hint text to help user." />
                <InputFile isRequired isInvalid label="Upload file" hint="This is an error message." />
            </div>
        </div>
    );
};

export const TagInputsOuter = () => {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
                <InputTagsOuter
                    isRequired
                    label="Tags"
                    hint="This is a hint text to help user."
                    tooltip="This is a tooltip."
                    placeholder="Add tag"
                    defaultValue={["Design", "Marketing"]}
                />
                <InputTagsOuter
                    isRequired
                    isDisabled
                    label="Tags"
                    hint="This is a hint text to help user."
                    tooltip="This is a tooltip."
                    placeholder="Add tag"
                    defaultValue={["Design", "Marketing"]}
                />
                <InputTagsOuter isRequired isInvalid label="Tags" tooltip="This is a tooltip." placeholder="Add tag" defaultValue={["Design", "Marketing"]} />
            </div>
        </div>
    );
};
