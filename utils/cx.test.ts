import { describe, expect, it } from "vitest";
import { cx, sortCx } from "./cx";

describe("cx", () => {
    it("keeps the last of two conflicting utilities", () => {
        expect(cx("px-2", "px-4")).toBe("px-4");
        expect(cx("bg-primary", "bg-secondary")).toBe("bg-secondary");
    });

    it("drops falsy parts", () => {
        expect(cx("a", false && "b", undefined, null, "c")).toBe("a c");
    });

    it("knows the display sizes from theme.css as font sizes, so they replace text-sm", () => {
        expect(cx("text-sm", "text-display-md")).toBe("text-display-md");
        expect(cx("text-display-xs", "text-lg")).toBe("text-lg");
    });

    it("keeps a text colour next to a text size", () => {
        expect(cx("text-primary", "text-display-md")).toBe("text-primary text-display-md");
    });
});

describe("sortCx", () => {
    it("returns the object it was given, unchanged", () => {
        const styles = { common: { root: "flex" }, sizes: { sm: "h-8" } };
        expect(sortCx(styles)).toBe(styles);
    });
});
