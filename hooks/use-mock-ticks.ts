"use client";

import { useEffect, useState } from "react";

export interface UseMockTicksOptions {
    /** Milliseconds between ticks. @default 2000 */
    interval?: number;
    /** The largest move per tick, as a share of the value (`0.002` is ±0,2%). @default 0.002 */
    volatility?: number;
    /** Gives a figure its own walk, so two figures with the same start don't move in step. @default 1 */
    seed?: number;
}

/**
 * A made-up live value for prototypes and stories: a deterministic random walk from `start`, one step per
 * `interval`. Pauses while the tab is hidden. Never use it for real data.
 *
 * It exists to feed `Num`'s `live` highlight (`components/base/num/num.tsx`) where no market feed is
 * wired up. `Num` itself doesn't know this hook: it compares the text it rendered last time with the
 * new one, so a WebSocket, polling or a store subscription works the same way. The rules for which
 * figures tick, and where to call this, are in `skills/fa-design-system/references/components/num.md`.
 *
 * ```tsx
 * const price = useMockTicks(412.3);
 * const change = price - 412.3;
 * ```
 */
export const useMockTicks = (start: number, { interval = 2000, volatility = 0.002, seed = 1 }: UseMockTicksOptions = {}) => {
    const [value, setValue] = useState(start);

    useEffect(() => {
        setValue(start);
        let state = Math.abs(Math.round(seed * 7919 + start * 31)) % 233280;
        const rand = () => {
            state = (state * 9301 + 49297) % 233280;
            return state / 233280 - 0.5;
        };
        const timer = setInterval(() => {
            if (document.hidden) return;
            setValue((current) => current * (1 + rand() * 2 * volatility));
        }, interval);
        return () => clearInterval(timer);
    }, [start, interval, volatility, seed]);

    return value;
};
