import { execFileSync } from "node:child_process";
import { describe, expect, it } from "vitest";

/**
 * Smoke test for the guard scripts `npm test` runs: each one still runs to completion on the repo
 * as committed. A guard that throws on a missing file or a changed layout would otherwise fail
 * silently as "the check passed".
 */
const run = (script: string) => execFileSync(process.execPath, [script], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });

describe("guard scripts", () => {
    it("check-skill.mjs passes on the committed skill", () => {
        expect(() => run("scripts/check-skill.mjs")).not.toThrow();
    });

    it("check-token-parity.mjs passes on the committed tokens", () => {
        expect(() => run("scripts/check-token-parity.mjs")).not.toThrow();
    });
});
