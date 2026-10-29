"use client";

import { ChevronRight, Download, Filter, Plus, Settings } from "fa-icons";
import { CardHeader } from "@/components/application/card-header/card-header";
import { Tabs } from "@/components/application/tabs/tabs";
import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";

/** A card: the surface from page-patterns.md, without padding so the header and body set their own. */
export const card = "overflow-hidden rounded-2xl border border-secondary bg-primary_alt";
/** The card body under a `CardHeader`: the same side padding as the header. */
export const cardBody = "px-4 py-5 md:px-6";

const winners = [
    { name: "Kongsberg Gruppen", ticker: "KOG", last: "412,60", change: "+6,12 %" },
    { name: "Nordic Semiconductor", ticker: "NOD", last: "148,90", change: "+4,87 %" },
    { name: "Hafnia", ticker: "HAFNI", last: "61,24", change: "+3,95 %" },
    { name: "Aker BP", ticker: "AKRBP", last: "256,10", change: "+2,44 %" },
];

/** An instrument: logo, full name over the ticker (the Figma table cell "Avatar" type). */
const Instrument = ({ name, ticker }: { name: string; ticker: string }) => (
    <div className="flex min-w-0 items-center gap-3">
        <Avatar initials={ticker.slice(0, 2)} alt="" size="sm" />
        <div className="min-w-0">
            <p className="truncate text-sm text-primary">{name}</p>
            <p className="text-sm text-tertiary">{ticker}</p>
        </div>
    </div>
);

const InstrumentRows = () => (
    <ul className="flex flex-col">
        {winners.map((s) => (
            <li key={s.ticker} className="flex items-center justify-between gap-4 border-b border-secondary py-3 last:border-b-0">
                <Instrument name={s.name} ticker={s.ticker} />
                <div className="flex flex-col items-end text-sm tabular-nums">
                    <span className="font-medium text-primary">{s.last}</span>
                    <span className="text-success-primary">{s.change}</span>
                </div>
            </li>
        ))}
    </ul>
);

/** One action: a link to the full list. */
export const CardWithLink = () => (
    <section aria-labelledby="card-winners" className={cx(card, "w-full max-w-md")}>
        <CardHeader
            titleId="card-winners"
            title="Vinnere"
            actions={<Button color="secondary" size="sm" iconLeading={ChevronRight} href="/bors/vinnere" aria-label="Se alle vinnere" />}
        />
        <div className={cardBody}>
            <InstrumentRows />
        </div>
    </section>
);

/** Two actions and a badge. */
export const CardWithActions = () => (
    <section aria-labelledby="card-news" className={cx(card, "w-full max-w-2xl")}>
        <CardHeader
            titleId="card-news"
            title="Siste nytt"
            badge="Live"
            actions={
                <>
                    <Button color="secondary" size="sm" iconLeading={Filter} aria-label="Filtrer" />
                    <Button color="secondary" size="sm" iconLeading={Download} aria-label="Last ned" />
                </>
            }
        />
        <div className={cx(cardBody, "text-sm text-tertiary")}>Innhold i kortet.</div>
    </section>
);

/** Three actions (tertiary, secondary, primary) and minimal tabs inside the card. */
export const CardWithTabs = () => (
    <section aria-labelledby="card-trades" className={cx(card, "w-full max-w-2xl")}>
        <CardHeader
            titleId="card-trades"
            title="Bjellesauenes handler"
            actions={
                <>
                    <Button color="tertiary" size="sm" iconLeading={Settings} aria-label="Innstillinger" />
                    <Button color="secondary" size="sm" iconLeading={Download} aria-label="Last ned" />
                    <Button color="primary" size="sm" iconLeading={Plus} aria-label="Legg til i watchlist" />
                </>
            }
        />
        <div className={cardBody}>
            <Tabs>
                <Tabs.List type="button-minimal" size="sm" aria-label="Handler">
                    <Tabs.Item id="kjop" label="Kjøp" />
                    <Tabs.Item id="salg" label="Salg" />
                </Tabs.List>
                <Tabs.Panel id="kjop" className="pt-4">
                    <InstrumentRows />
                </Tabs.Panel>
                <Tabs.Panel id="salg" className="pt-4 text-sm text-tertiary">
                    Ingen salg i dag.
                </Tabs.Panel>
            </Tabs>
        </div>
    </section>
);
