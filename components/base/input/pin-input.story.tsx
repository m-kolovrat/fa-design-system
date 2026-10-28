import type { FC } from "react";
import { PinInput } from "@/components/base/input/pin-input";
import * as PinInputs from "@/components/base/input/pin-input.demo";
import pinInputDoc from "@/skills/fa-design-system/references/components/pin-input.md?raw";

export default {
    // Its own entry (it shared "Base components/Inputs" with inputs.story.tsx), so it gets its own Docs page.
    title: "Base components/Inputs/Pin input",
    component: PinInput,
    subcomponents: {
        "PinInput.Group": PinInput.Group,
        "PinInput.Slot": PinInput.Slot,
        "PinInput.Label": PinInput.Label,
        "PinInput.Description": PinInput.Description,
    },
    tags: ["autodocs"],
    // The Docs page text is pin-input.md; the props tables come from pin-input.tsx.
    parameters: { skillDoc: pinInputDoc },
    decorators: [
        (Story: FC) => (
            <div className="flex min-h-screen w-full bg-primary p-4 [.docs-story_&]:min-h-0">
                <Story />
            </div>
        ),
    ],
};

export const InputOTPSM = () => <PinInputs.InputOTPSM />;
InputOTPSM.storyName = "Input OTP SM";

export const InputOTPMD = () => <PinInputs.InputOTPMD />;
InputOTPMD.storyName = "Input OTP MD";

export const InputOTPLG = () => <PinInputs.InputOTPLG />;
InputOTPLG.storyName = "Input OTP LG";

export const VerificationCodeInputSm = () => <PinInputs.VerificationCodeInputSM />;
VerificationCodeInputSm.storyName = "Verification code input sm";

export const VerificationCodeInputMd = () => <PinInputs.VerificationCodeInputMD />;
VerificationCodeInputMd.storyName = "Verification code input md";

export const VerificationCodeInputLg = () => <PinInputs.VerificationCodeInputLG />;
VerificationCodeInputLg.storyName = "Verification code input lg";

export const VerificationCodeInputDisabled = () => <PinInputs.DisabledDemo />;
VerificationCodeInputDisabled.storyName = "Verification code input disabled";
