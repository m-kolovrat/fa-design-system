import { describe, expect, it } from "vitest";
import { formatNumber, numberFormat } from "./format-number";

describe("formatNumber", () => {
    it("writes the Norwegian figure: dot between thousands, comma before decimals", () => {
        expect(formatNumber(1234.5)).toBe("1.234,50");
        expect(formatNumber(1234567.891)).toBe("1.234.567,89");
        expect(formatNumber(0)).toBe("0,00");
    });

    it("uses a hyphen for minus, never a real minus sign or a space", () => {
        expect(formatNumber(-1234.5)).toBe("-1.234,50");
        expect(formatNumber(-1.1)).toMatch(/^-1,10$/);
    });

    it("takes decimals: 0 for counts, 2 by default, up to 4 for rates", () => {
        expect(formatNumber(60278, { decimals: 0 })).toBe("60.278");
        expect(formatNumber(60278.6, { decimals: 0 })).toBe("60.279");
        expect(formatNumber(1.23456, { decimals: 4 })).toBe("1,2346");
        expect(formatNumber(5, { decimals: 2 })).toBe("5,00");
    });

    it("adds + on positive values with sign, and never on zero", () => {
        expect(formatNumber(0.42, { sign: true })).toBe("+0,42");
        expect(formatNumber(-1.1, { sign: true })).toBe("-1,10");
        expect(formatNumber(0, { sign: true })).toBe("0,00");
        expect(formatNumber(0.42)).toBe("0,42");
    });

    it("leaves the unit to the caller", () => {
        expect(`${formatNumber(0.42, { sign: true })}%`).toBe("+0,42%");
    });

    it("gives the same output for the same options on repeated calls (one cached formatter)", () => {
        const a = formatNumber(99.5, { decimals: 1, sign: true });
        const b = formatNumber(99.5, { decimals: 1, sign: true });
        expect(a).toBe(b);
        expect(a).toBe("+99,5");
    });
});

describe("numberFormat", () => {
    it("exposes the locale and Intl options the component and a chart tick can share", () => {
        expect(numberFormat()).toEqual({
            locale: "de-DE",
            format: { minimumFractionDigits: 2, maximumFractionDigits: 2, signDisplay: "negative" },
        });
        expect(numberFormat({ decimals: 0, sign: true }).format.signDisplay).toBe("exceptZero");
    });
});
