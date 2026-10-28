"use client";

import { useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartTooltipContent } from "@/components/application/charts/charts-base";
import { type Period, type PeriodOption, PeriodSelector } from "@/components/application/period-selector/period-selector";

/** Equinor (EQNR) with each period's change, as on an instrument page. */
export const equinorPeriods: PeriodOption[] = [
    { id: "1D", change: 0.42 },
    { id: "5D", change: -1.1 },
    { id: "1M", change: 3.25 },
    { id: "3M", change: 6.8 },
    { id: "6M", change: -2.15 },
    { id: "YTD", change: 12.4 },
    { id: "1Y", change: 18.9 },
    { id: "3Y", change: 41.2 },
    { id: "5Y", change: 88.6 },
    { id: "10Y", change: 0 },
];

const POINTS: Record<Period, number> = { "1D": 24, "5D": 30, "1M": 22, "3M": 26, "6M": 26, YTD: 30, "1Y": 52, "3Y": 36, "5Y": 60, "10Y": 40 };

/** A gentle walk from the price at the start of the period to today's 268,40 kr. */
const priceSeries = (period: Period) => {
    const option = equinorPeriods.find((p) => p.id === period);
    const end = 268.4;
    const start = end / (1 + (option?.change ?? 0) / 100);
    const count = POINTS[period];

    return Array.from({ length: count }, (_, i) => {
        const t = i / (count - 1);
        const wave = Math.sin(i * 1.7) * end * 0.006;
        return { step: i, price: Math.round((start + (end - start) * t + (i === 0 || i === count - 1 ? 0 : wave)) * 100) / 100 };
    });
};

const formatPrice = (value: number) => `${value.toLocaleString("nb-NO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} kr`;

/** A chart card with the period selector directly under the chart (rule charts-period-below). */
export const PeriodSelectorUnderChart = ({ layout = "fit" }: { layout?: "fit" | "scroll" }) => {
    const [period, setPeriod] = useState<Period>("1Y");
    const change = equinorPeriods.find((p) => p.id === period)?.change ?? 0;
    const data = priceSeries(period);

    return (
        <section className="w-full rounded-2xl border border-secondary bg-primary_alt p-4 md:p-5">
            <h2 className="text-lg font-semibold text-primary">Equinor (EQNR)</h2>
            <p className="text-sm text-tertiary">
                Kursutvikling {period}: {change.toLocaleString("nb-NO", { signDisplay: "exceptZero", minimumFractionDigits: 2 })} %
            </p>

            <div className="mt-4 h-56">
                <ResponsiveContainer initialDimension={{ width: 1, height: 1 }} className="h-full">
                    <AreaChart data={data} className="text-tertiary [&_.recharts-text]:text-xs" margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                        <defs>
                            <linearGradient id="period-selector-gradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="currentColor" className="text-utility-brand-600" stopOpacity="0.3" />
                                <stop offset="95%" stopColor="currentColor" className="text-utility-brand-600" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} stroke="currentColor" className="text-utility-gray-100" />
                        <XAxis dataKey="step" hide />
                        <YAxis
                            fill="currentColor"
                            axisLine={false}
                            tickLine={false}
                            width={48}
                            domain={["auto", "auto"]}
                            tickFormatter={(value) => Number(value).toLocaleString("nb-NO")}
                        />
                        <Tooltip
                            content={<ChartTooltipContent />}
                            formatter={(value) => formatPrice(Number(value))}
                            labelFormatter={() => "Kurs"}
                            cursor={{ className: "stroke-utility-brand-600 stroke-2" }}
                        />
                        <Area
                            isAnimationActive={false}
                            className="text-utility-brand-600"
                            dataKey="price"
                            name="EQNR"
                            type="monotone"
                            stroke="currentColor"
                            strokeWidth={2}
                            fill="url(#period-selector-gradient)"
                            activeDot={{ className: "fill-bg-primary stroke-utility-brand-600 stroke-2" }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <PeriodSelector className="mt-4" periods={equinorPeriods} layout={layout} selectedPeriod={period} onPeriodChange={setPeriod} />
        </section>
    );
};
