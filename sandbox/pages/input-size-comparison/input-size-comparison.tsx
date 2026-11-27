"use client";

import { Button } from "fa-design-system/components/base/buttons/button";
import { Checkbox } from "fa-design-system/components/base/checkbox/checkbox";
import { Input, InputBase } from "fa-design-system/components/base/input/input";
import { InputGroup } from "fa-design-system/components/base/input/input-group";
import { Select, type SelectItemType } from "fa-design-system/components/base/select/select";
import { TextArea } from "fa-design-system/components/base/textarea/textarea";
import { Mail } from "fa-icons";

type FieldSize = "sm" | "md" | "lg";

const sizes: { size: FieldSize; height: number }[] = [
    { size: "sm", height: 36 },
    { size: "md", height: 40 },
    { size: "lg", height: 44 },
];

const card = "rounded-2xl border border-secondary bg-primary_alt p-4 md:p-5";

const temaer: SelectItemType[] = [
    { id: "bors", label: "Børs og marked" },
    { id: "naeringsliv", label: "Næringsliv" },
    { id: "eiendom", label: "Eiendom" },
    { id: "energi", label: "Olje og energi" },
    { id: "politikk", label: "Politikk og økonomi" },
];

/** The same short form at one field size. Sizes are set on purpose: this page compares them (fa-field-size). */
const TipsForm = ({ size }: { size: FieldSize }) => {
    // TextArea has only sm and md; the lg form shows it at md.

    return (
        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
            <Input isRequired autoComplete="name" label="Navn" placeholder="Kari Nordmann" hint="Vi viser aldri navnet ditt uten å spørre." />
            <Input type="email" autoComplete="email" icon={Mail} label="E-post" placeholder="kari.nordmann@firma.no" />
            <Select label="Tema" placeholder="Velg tema" items={temaer}>
                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
            </Select>
            <InputGroup label="Lenke til kilde" leadingAddon={<InputGroup.Prefix>https://</InputGroup.Prefix>}>
                <InputBase type="url" placeholder="www.newsweb.no" />
            </InputGroup>
            <TextArea label="Tipset" placeholder="Hva har skjedd, og hvem er involvert?" rows={4} />
            <Checkbox name="anonym" label="Jeg vil være anonym" hint="Vi beskytter kildene våre etter Vær Varsom-plakaten." />
            <div>
                <Button size={size} type="submit">
                    Send tips
                </Button>
            </div>
        </form>
    );
};

const ArticleCopy = ({ size }: { size: FieldSize }) => (
    <article aria-labelledby={`article-${size}`} className="flex flex-col gap-3">
        <h3 id={`article-${size}`} className="text-xl font-bold text-primary">
            Equinor løftet Oslo Børs etter sterke tall fra sokkelen
        </h3>
        <p className="text-sm text-tertiary">27. november 2026 · 4 min lesetid</p>
        <div className="prose">
            <p>
                Hovedindeksen steg 1,2 prosent torsdag, drevet av Equinor, som la frem et driftsresultat på 7,9 milliarder dollar for tredje kvartal.
                Analytikerne hadde ventet 7,4 milliarder, og aksjen endte opp 3,4 prosent til 268,40 kroner.
            </p>
            <p>
                – Gassprisene i Europa holder seg høyere enn vi la til grunn i sommer, og det slår rett inn i kontantstrømmen, sier analysesjef Kristin Haugen i
                Pareto Securities.
            </p>
            <p>Også Aker BP og Vår Energi fikk drahjelp av oljeprisen, mens sjømatselskapene trakk ned etter nye tall for lakseeksporten fra Sjømatrådet.</p>
        </div>
    </article>
);

/** Input sizes side by side: the same form and body copy at sm, md and lg, for the design owner to compare. */
export const InputSizeComparisonPage = () => (
    <div className="min-h-dvh bg-secondary_alt">
        <main className="mx-auto w-full max-w-[1028px] p-4 md:p-6">
            <header className="mb-6 flex flex-col gap-2">
                <h1 className="text-display-xs font-semibold text-primary">Feltstørrelser: sm, md og lg</h1>
                <p className="text-md text-tertiary">
                    Det samme skjemaet i hver størrelse, ved siden av brødtekst, for å vurdere hvilke feltstørrelser vi beholder. Knappen følger feltets
                    størrelse.
                </p>
            </header>
            <div className="flex flex-col gap-10">
                {sizes.map(({ size, height }) => (
                    <section key={size} aria-labelledby={`size-${size}`} className="flex flex-col gap-3">
                        <h2 id={`size-${size}`} className="text-lg font-semibold text-primary">
                            <code>{size}</code> · {height} px
                        </h2>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className={card}>
                                <TipsForm size={size} />
                            </div>
                            <div className={card}>
                                <ArticleCopy size={size} />
                            </div>
                        </div>
                    </section>
                ))}
            </div>
        </main>
    </div>
);
