"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { cx } from "@/utils/cx";
import { type FormatNumberOptions, formatNumber } from "@/utils/format-number";

/** How long the changed digits stay green or red after an update. A new update restarts it. */
const HIGHLIGHT_MS = 700;

export interface NumProps extends FormatNumberOptions {
    /** The figure. */
    value: number;
    /** Set before the digits (`"$"`). */
    prefix?: ReactNode;
    /** Set after the digits (`"%"`, `" kr"`). */
    suffix?: ReactNode;
    /**
     * The figure comes from a live market feed: when it updates, the digits that changed turn green (up) or
     * red (down) for 700 ms. Only for prices, values and volumes that move on their own while the reader
     * watches; never for a figure that changed because the reader picked a period, an instrument, a filter or
     * a page. @default false
     */
    live?: boolean;
    className?: string;
}

interface Mark {
    /** Where the changed part of the text starts. */
    from: number;
    direction: "up" | "down";
    /** Counts updates, so each one renders a fresh span. */
    id: number;
}

/**
 * Any figure on a page: a price, a value, a change, a count. Formats it the Norwegian way (`1.234,50`,
 * `+0,42%`). With `live`, an update colours the digits from the first one that changed, green or red for
 * 700 ms, as on TradingView; nothing moves. Has no style of its own: font, size, weight and colour come from
 * where it sits.
 */
export const Num = ({ value, decimals = 2, sign = false, prefix, suffix, live = false, className }: NumProps) => {
    const text = formatNumber(value, { decimals, sign });
    const [previous, setPrevious] = useState({ value, text });
    const [mark, setMark] = useState<Mark | null>(null);

    // Compare with the last text while rendering, so the colour arrives with the new digits. A value that
    // rounds to the same text doesn't count as a change.
    if (text !== previous.text) {
        setPrevious({ value, text });
        if (live) {
            let from = 0;
            while (from < text.length && text[from] === previous.text[from]) from++;
            setMark({ from, direction: value > previous.value ? "up" : "down", id: (mark?.id ?? 0) + 1 });
        }
    }

    // The colour comes off by removing the class from the span, not by rendering again: a page with hundreds of
    // ticking figures would otherwise render each one twice per update. The span is keyed by update, so the
    // next update renders a new, coloured one. A new update restarts the timer.
    const changed = useRef<HTMLSpanElement>(null);
    useEffect(() => {
        if (!mark) return;
        const timer = setTimeout(() => changed.current?.removeAttribute("class"), HIGHLIGHT_MS);
        return () => clearTimeout(timer);
    }, [mark]);

    return (
        <span className={cx("tabular-nums", className)}>
            {prefix}
            {live && mark ? (
                <>
                    {text.slice(0, mark.from)}
                    <span key={mark.id} ref={changed} className={mark.direction === "up" ? "text-success-primary" : "text-error-primary"}>
                        {text.slice(mark.from)}
                    </span>
                </>
            ) : (
                text
            )}
            {suffix}
        </span>
    );
};
