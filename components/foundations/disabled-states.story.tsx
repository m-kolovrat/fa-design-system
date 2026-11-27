import type { ReactNode } from "react";
import { Pen, Search, Share, Star } from "fa-icons";
import { Tabs } from "@/components/application/tabs/tabs";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { Input } from "@/components/base/input/input";
import { InputNumber } from "@/components/base/input/input-number";
import { RadioButton, RadioGroup } from "@/components/base/radio-buttons/radio-buttons";
import { MultiSelect } from "@/components/base/select/multi-select";
import { Select, type SelectItemType } from "@/components/base/select/select";
import { NativeSelect } from "@/components/base/select/select-native";
import { Slider } from "@/components/base/slider/slider";
import { Tag, TagGroup, TagList } from "@/components/base/tags/tags";
import { TextArea } from "@/components/base/textarea/textarea";
import { Toggle } from "@/components/base/toggle/toggle";

/**
 * Every component's disabled state on one page, next to its enabled state. Disabled is drawn with the
 * neutral disabled tokens (CLAUDE.md "Disabled states"), never with opacity; this page is where a
 * change to those tokens, or a component that drifts from them, shows up.
 */
export default {
    title: "Foundations/Disabled states",
    tags: ["!autodocs"],
    parameters: { layout: "fullscreen" },
};

const fylker: SelectItemType[] = [
    { id: "oslo", label: "Oslo" },
    { id: "vestland", label: "Vestland" },
    { id: "trondelag", label: "Trøndelag" },
];

const tabs = [
    { id: "oversikt", label: "Oversikt" },
    { id: "nokkeltall", label: "Nøkkeltall" },
    { id: "innsidehandel", label: "Innsidehandel", badge: 2, isDisabled: true },
];

const Row = ({ name, enabled, disabled }: { name: string; enabled: ReactNode; disabled: ReactNode }) => (
    <div className="grid grid-cols-1 items-start gap-4 border-t border-secondary py-5 md:grid-cols-[10rem_1fr_1fr]">
        <p className="text-sm font-semibold text-primary">{name}</p>
        <div className="min-w-0">{enabled}</div>
        <div className="min-w-0">{disabled}</div>
    </div>
);

const menu = (
    <Dropdown.Popover className="w-56">
        <Dropdown.Menu disabledKeys={["share"]}>
            <Dropdown.Item id="watch" icon={Star}>
                Legg til i favoritter
            </Dropdown.Item>
            <Dropdown.Item id="share" icon={Share} addon="⌘D">
                Del aksjen
            </Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown.Popover>
);

export const All = () => (
    <div className="bg-primary p-6">
        <div className="mx-auto flex max-w-4xl flex-col">
            <div className="grid grid-cols-1 gap-4 pb-3 md:grid-cols-[10rem_1fr_1fr]">
                <span />
                <p className="text-xs font-semibold text-quaternary">Enabled</p>
                <p className="text-xs font-semibold text-quaternary">Disabled</p>
            </div>

            <Row
                name="Button"
                enabled={
                    <div className="flex flex-wrap items-center gap-3">
                        <Button size="sm">Kjøp</Button>
                        <Button size="sm" color="secondary">
                            Selg
                        </Button>
                        <Button size="sm" color="tertiary">
                            Avbryt
                        </Button>
                        <ButtonUtility icon={Pen} tooltip="Rediger" />
                    </div>
                }
                disabled={
                    <div className="flex flex-wrap items-center gap-3">
                        <Button size="sm" isDisabled>
                            Kjøp
                        </Button>
                        <Button size="sm" color="secondary" isDisabled>
                            Selg
                        </Button>
                        <Button size="sm" color="tertiary" isDisabled>
                            Avbryt
                        </Button>
                        <ButtonUtility icon={Pen} tooltip="Rediger" isDisabled />
                    </div>
                }
            />
            <Row
                name="Button group"
                enabled={
                    <ButtonGroup aria-label="Marked" defaultSelectedKeys={["oslo"]}>
                        <ButtonGroupItem id="oslo">Oslo</ButtonGroupItem>
                        <ButtonGroupItem id="stockholm">Stockholm</ButtonGroupItem>
                    </ButtonGroup>
                }
                disabled={
                    <ButtonGroup aria-label="Marked" defaultSelectedKeys={["oslo"]} isDisabled>
                        <ButtonGroupItem id="oslo">Oslo</ButtonGroupItem>
                        <ButtonGroupItem id="stockholm">Stockholm</ButtonGroupItem>
                    </ButtonGroup>
                }
            />
            <Row
                name="Tabs"
                enabled={
                    <Tabs defaultSelectedKey="oversikt">
                        <Tabs.List type="button-gray" aria-label="Aksjeinformasjon" items={tabs.slice(0, 2)}>
                            {(tab) => <Tabs.Item {...tab} />}
                        </Tabs.List>
                    </Tabs>
                }
                disabled={
                    <Tabs defaultSelectedKey="oversikt">
                        <Tabs.List type="button-gray" aria-label="Aksjeinformasjon" items={tabs}>
                            {(tab) => <Tabs.Item {...tab} />}
                        </Tabs.List>
                    </Tabs>
                }
            />
            <Row
                name="Input"
                enabled={<Input label="Selskap" icon={Search} defaultValue="Equinor" hint="Søk på navn eller ticker." />}
                disabled={<Input label="Selskap" icon={Search} defaultValue="Equinor" hint="Søk på navn eller ticker." isDisabled />}
            />
            <Row
                name="Input number"
                enabled={<InputNumber label="Antall aksjer" defaultValue={100} />}
                disabled={<InputNumber label="Antall aksjer" defaultValue={100} isDisabled />}
            />
            <Row
                name="Textarea"
                enabled={<TextArea label="Kommentar" defaultValue="Kjøpt etter kvartalsrapporten." rows={2} />}
                disabled={<TextArea label="Kommentar" defaultValue="Kjøpt etter kvartalsrapporten." rows={2} isDisabled />}
            />
            <Row
                name="Select"
                enabled={
                    <Select label="Fylke" items={fylker} defaultValue="oslo">
                        {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                    </Select>
                }
                disabled={
                    <Select label="Fylke" items={fylker} defaultValue="oslo" isDisabled>
                        {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                    </Select>
                }
            />
            <Row
                name="Combo box"
                enabled={
                    <Select.ComboBox label="Fylke" items={fylker} defaultSelectedKey="oslo" shortcut={false}>
                        {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                    </Select.ComboBox>
                }
                disabled={
                    <Select.ComboBox label="Fylke" items={fylker} defaultSelectedKey="oslo" shortcut={false} isDisabled>
                        {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                    </Select.ComboBox>
                }
            />
            <Row
                name="Multi select"
                enabled={
                    <MultiSelect label="Fylker" items={fylker} defaultSelectedKeys={new Set(["oslo", "vestland"])}>
                        {(item) => <MultiSelect.Item id={item.id}>{item.label}</MultiSelect.Item>}
                    </MultiSelect>
                }
                disabled={
                    <MultiSelect label="Fylker" items={fylker} defaultSelectedKeys={new Set(["oslo", "vestland"])} isDisabled>
                        {(item) => <MultiSelect.Item id={item.id}>{item.label}</MultiSelect.Item>}
                    </MultiSelect>
                }
            />
            <Row
                name="Native select"
                enabled={<NativeSelect label="Fylke" options={fylker.map((f) => ({ label: f.label ?? "", value: String(f.id) }))} />}
                disabled={<NativeSelect label="Fylke" options={fylker.map((f) => ({ label: f.label ?? "", value: String(f.id) }))} disabled />}
            />
            <Row
                name="Checkbox"
                enabled={
                    <div className="flex flex-col gap-3">
                        <Checkbox label="Varsle meg på e-post" />
                        <Checkbox label="Varsle meg i appen" defaultSelected />
                    </div>
                }
                disabled={
                    <div className="flex flex-col gap-3">
                        <Checkbox label="Varsle meg på e-post" isDisabled />
                        <Checkbox label="Varsle meg i appen" defaultSelected isDisabled />
                    </div>
                }
            />
            <Row
                name="Radio"
                enabled={
                    <RadioGroup aria-label="Leveringsmåte" defaultValue="digital">
                        <RadioButton value="digital" label="Kun digitalt" />
                        <RadioButton value="paper" label="Papiravis" />
                    </RadioGroup>
                }
                disabled={
                    <RadioGroup aria-label="Leveringsmåte" defaultValue="digital" isDisabled>
                        <RadioButton value="digital" label="Kun digitalt" />
                        <RadioButton value="paper" label="Papiravis" />
                    </RadioGroup>
                }
            />
            <Row
                name="Toggle"
                enabled={
                    <div className="flex flex-col gap-3">
                        <Toggle label="Kursvarsler" />
                        <Toggle label="Sanntidskurser" defaultSelected />
                        <Toggle label="Slank" slim defaultSelected />
                    </div>
                }
                disabled={
                    <div className="flex flex-col gap-3">
                        <Toggle label="Kursvarsler" isDisabled />
                        <Toggle label="Sanntidskurser" defaultSelected isDisabled />
                        <Toggle label="Slank" slim defaultSelected isDisabled />
                    </div>
                }
            />
            <Row
                name="Tag"
                enabled={
                    <TagGroup label="Sektorer" size="md">
                        <TagList className="flex flex-wrap gap-2">
                            <Tag id="energi">Energi</Tag>
                            <Tag id="finans" count={4}>
                                Finans
                            </Tag>
                        </TagList>
                    </TagGroup>
                }
                disabled={
                    <TagGroup label="Sektorer" size="md">
                        <TagList className="flex flex-wrap gap-2">
                            <Tag id="energi" isDisabled>
                                Energi
                            </Tag>
                            <Tag id="finans" count={4} isDisabled>
                                Finans
                            </Tag>
                        </TagList>
                    </TagGroup>
                }
            />
            <Row
                name="Slider"
                enabled={<Slider aria-label="Andel aksjer" defaultValue={60} labelPosition="bottom" className="max-w-xs pb-8" />}
                disabled={<Slider aria-label="Andel aksjer" defaultValue={60} labelPosition="bottom" className="max-w-xs pb-8" isDisabled />}
            />
            <Row
                name="Dropdown item"
                enabled={<p className="text-sm text-tertiary">Open the menu on the right: “Del aksjen” is disabled.</p>}
                disabled={
                    <Dropdown.Root defaultOpen>
                        <Button color="secondary" size="sm">
                            Handlinger
                        </Button>
                        {menu}
                    </Dropdown.Root>
                }
            />
        </div>
    </div>
);
All.storyName = "All components";
