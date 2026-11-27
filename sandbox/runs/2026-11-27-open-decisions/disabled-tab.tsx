/**
 * The disabled tab decision from the 27 Nov 2026 audit: four ways to draw a disabled tab, each in
 * light and dark and in three tab types.
 *
 * Option A is the library today. B, C and D are simulated through `className` on the disabled tab,
 * which a real page must never do; they exist only so the choice can be seen.
 */
import type { ReactNode } from "react";
import { Tabs } from "fa-design-system/components/application/tabs/tabs";
import { ButtonGroup, ButtonGroupItem } from "fa-design-system/components/base/button-group/button-group";
import { Button } from "fa-design-system/components/base/buttons/button";
import { cx } from "fa-design-system/utils/cx";

const tabs = [
    { id: "oversikt", label: "Oversikt" },
    { id: "nokkeltall", label: "Nøkkeltall" },
    { id: "innsidehandel", label: "Innsidehandel", badge: 2, isDisabled: true },
];

const types = ["button-gray", "underline", "button-brand"] as const;

const TabRows = ({ disabledClassName }: { disabledClassName?: string }) => (
    <div className="flex flex-col gap-4">
        {types.map((type) => (
            <Tabs key={type} defaultSelectedKey="oversikt">
                <Tabs.List type={type} size="sm" aria-label={`Aksjeinformasjon (${type})`} items={tabs}>
                    {(tab) => <Tabs.Item {...tab} className={tab.isDisabled ? disabledClassName : undefined} />}
                </Tabs.List>
            </Tabs>
        ))}
    </div>
);

const Panel = ({ dark, children }: { dark?: boolean; children: ReactNode }) => (
    <div className={cx("rounded-2xl border border-secondary bg-primary_alt p-5", dark && "dark-mode")}>{children}</div>
);

const Option = ({ label, note, disabledClassName }: { label: string; note: string; disabledClassName?: string }) => (
    <section className="flex flex-col gap-3 border-t border-secondary py-6">
        <div className="flex flex-col gap-0.5">
            <h2 className="text-md font-semibold text-primary">{label}</h2>
            <p className="max-w-180 text-sm text-tertiary">{note}</p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Panel>
                <TabRows disabledClassName={disabledClassName} />
            </Panel>
            <Panel dark>
                <TabRows disabledClassName={disabledClassName} />
            </Panel>
        </div>
    </section>
);

const Reference = () => (
    <div className="flex flex-wrap items-center gap-4">
        <Button color="tertiary" size="sm">
            Aktiv
        </Button>
        <Button color="tertiary" size="sm" isDisabled>
            Deaktivert
        </Button>
        <ButtonGroup aria-label="Marked" defaultSelectedKeys={["oslo"]}>
            <ButtonGroupItem id="oslo">Oslo</ButtonGroupItem>
            <ButtonGroupItem id="stockholm">Stockholm</ButtonGroupItem>
            <ButtonGroupItem id="kobenhavn" isDisabled>
                København
            </ButtonGroupItem>
        </ButtonGroup>
    </div>
);

export const DisabledTab = () => (
    <div className="min-h-dvh bg-secondary_alt">
        <main className="mx-auto flex w-full max-w-[1100px] flex-col p-4 md:p-6">
            <div className="flex flex-col gap-1 pb-6">
                <h1 className="text-xl font-semibold text-primary">How should a disabled tab look?</h1>
                <p className="max-w-180 text-sm text-tertiary">
                    “Innsidehandel” is the disabled tab in every row. Each option is shown in light and dark, in three tab types. Option A is the library
                    today; the others are simulated on this page only.
                </p>
            </div>

            <Option
                label="A. 50% opacity (today)"
                note="The whole tab dims, badge included. Clear in every tab type, but it is the one disabled style Figma uses nowhere else."
            />
            <Option
                label="B. text-disabled"
                note="The text token Figma uses for disabled labels. It is the same grey as an inactive tab (gray-500), so the disabled tab can't be told apart. In dark it comes out darker than its neighbours."
                disabledClassName="opacity-100 text-disabled"
            />
            <Option
                label="C. fg-disabled"
                note="The token a disabled Button uses for its text and icon (gray-400). One step lighter than an inactive tab; the badge is unchanged."
                disabledClassName="opacity-100 text-fg-disabled"
            />
            <Option
                label="D. fg-disabled_subtle"
                note="The lightest disabled token (gray-300), which ButtonGroup uses for disabled icons. Clearly different from an inactive tab; the badge is unchanged."
                disabledClassName="opacity-100 text-fg-disabled_subtle"
            />

            <section className="flex flex-col gap-3 border-t border-secondary py-6">
                <div className="flex flex-col gap-0.5">
                    <h2 className="text-md font-semibold text-primary">For comparison: disabled today in Button and ButtonGroup</h2>
                    <p className="max-w-180 text-sm text-tertiary">
                        Both already use the disabled tokens. A disabled Button's text is fg-disabled (option C); a disabled ButtonGroup item gets a
                        grey fill and text-disabled.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Panel>
                        <Reference />
                    </Panel>
                    <Panel dark>
                        <Reference />
                    </Panel>
                </div>
            </section>
        </main>
    </div>
);
