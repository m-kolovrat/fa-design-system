"use client";

import { useState } from "react";
import { CardHeader } from "fa-design-system/components/application/card-header/card-header";
import { type Period, type PeriodOption, PeriodSelector } from "fa-design-system/components/application/period-selector/period-selector";
import { Avatar } from "fa-design-system/components/base/avatar/avatar";
import { Button } from "fa-design-system/components/base/buttons/button";
import { cx } from "fa-design-system/utils/cx";
import { ChevronRight } from "fa-icons";

const card = "overflow-hidden rounded-2xl border border-secondary bg-primary_alt";
const cardBody = "px-4 py-5 md:px-6";

const periods: PeriodOption[] = [
    { id: "1D", change: 0.42 },
    { id: "1M", change: 3.25 },
    { id: "YTD", change: 12.4 },
    { id: "1Y", change: 18.9 },
    { id: "5Y", change: 88.6 },
];

const winners = [
    { name: "Kongsberg Gruppen", ticker: "KOG", last: "412,60", change: 6.12 },
    { name: "Nordic Semiconductor", ticker: "NOD", last: "148,90", change: 4.87 },
    { name: "Hafnia", ticker: "HAFNI", last: "61,24", change: 3.95 },
];

const nb = (v: number) =>
    new Intl.NumberFormat("nb-NO", { style: "percent", minimumFractionDigits: 2, maximumFractionDigits: 2, signDisplay: "exceptZero" }).format(v / 100);

/** A sandbox example: two cards on a 1376 px page, built only with package imports. */
export const ExamplePage = () => {
    const [period, setPeriod] = useState<Period>("1Y");

    return (
        <div className="min-h-dvh bg-secondary_alt">
            <main className="mx-auto w-full max-w-[1376px] px-4 py-6 md:px-8">
                <h1 className="mb-6 text-display-xs font-semibold text-primary">Børs</h1>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-6">
                    <section aria-labelledby="index" className={cx(card, "lg:col-span-4")}>
                        <CardHeader titleId="index" title="Hovedindeksen (OSEBX)" />
                        <div className={cardBody}>
                            <div className="flex h-48 items-center justify-center rounded-xl bg-tertiary text-sm text-tertiary">Graf ({period})</div>
                            <PeriodSelector className="mt-4" periods={periods} selectedPeriod={period} onPeriodChange={setPeriod} />
                        </div>
                    </section>
                    <section aria-labelledby="winners" className={cx(card, "lg:col-span-2")}>
                        <CardHeader
                            titleId="winners"
                            title="Vinnere"
                            actions={<Button color="secondary" size="sm" iconLeading={ChevronRight} href="#" aria-label="Se alle vinnere" />}
                        />
                        <ul className={cx(cardBody, "flex flex-col")}>
                            {winners.map((s) => (
                                <li key={s.ticker} className="flex items-center justify-between gap-4 border-b border-secondary py-3 last:border-b-0">
                                    <div className="flex min-w-0 items-center gap-3">
                                        <Avatar initials={s.ticker.slice(0, 2)} alt="" size="sm" />
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-medium text-primary">{s.name}</p>
                                            <p className="text-sm text-tertiary">{s.ticker}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end text-sm tabular-nums">
                                        <span className="font-medium text-primary">{s.last}</span>
                                        <span className="text-success-primary">{nb(s.change)}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            </main>
        </div>
    );
};
