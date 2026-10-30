export interface FormatNumberOptions {
    /** Digits after the comma: 2 for prices and percentages, 0 for counts, up to 4 for rates. @default 2 */
    decimals?: number;
    /** Show + on positive values and - on negative ones (for changes). Zero never gets a sign. @default false */
    sign?: boolean;
}

/**
 * The `Intl` locale and options that produce the Norwegian figure format: a dot between thousands, a comma
 * before decimals, a hyphen for minus. `de-DE` rather than `nb-NO`, which puts a space between thousands and
 * uses a real minus sign. Percent is a `%` suffix, never `style: "percent"` (that adds a space before `%`).
 */
export const numberFormat = ({ decimals = 2, sign = false }: FormatNumberOptions = {}) => ({
    locale: "de-DE",
    format: {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
        signDisplay: sign ? "exceptZero" : "negative",
    } satisfies Intl.NumberFormatOptions,
});

// One formatter per option set, reused: creating an Intl.NumberFormat costs far more than formatting with one
// (500 figures ticking every second: about 13 ms per tick with a new formatter each time, 1 ms with these).
const formatters = new Map<string, Intl.NumberFormat>();

/**
 * A figure in the Norwegian format: `1.234,50`, `60.278`, `+0,42`, `-1,10`.
 * Add `%` or a currency after it yourself (`${formatNumber(0.42, { sign: true })}%` → `+0,42%`).
 */
export const formatNumber = (value: number, { decimals = 2, sign = false }: FormatNumberOptions = {}) => {
    const key = `${decimals}:${sign}`;
    let formatter = formatters.get(key);
    if (!formatter) {
        const { locale, format } = numberFormat({ decimals, sign });
        formatter = new Intl.NumberFormat(locale, format);
        formatters.set(key, formatter);
    }
    return formatter.format(value);
};
