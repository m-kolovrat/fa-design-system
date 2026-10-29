#!/usr/bin/env node
// Layout probe: opens every story (or sandbox page) at phone and desktop width and fails when the
// page is wider than the viewport, i.e. something overflows and the page scrolls sideways. This is
// how the logged-out SiteHeader shipped 7 px too wide at 375 px for a week.
//
//     npm run storybook                      # or npm run sandbox
//     npm run layout:check                   # against http://localhost:6006
//     STORYBOOK_URL=http://localhost:6008 npm run layout:check
//     npm run layout:check -- --only site-header --widths 375,1440
//
// Needs Playwright, which the library doesn't depend on: `npm i -D playwright && npx playwright
// install chromium` once on the machine that runs it. Not part of `npm test` for that reason.
import { parseArgs } from "node:util";

const { values } = parseArgs({
    options: {
        url: { type: "string", default: process.env.STORYBOOK_URL ?? "http://localhost:6006" },
        widths: { type: "string", default: "375,1440" },
        only: { type: "string" },
        tolerance: { type: "string", default: "0" },
    },
});

let chromium;
try {
    ({ chromium } = await import("playwright"));
} catch {
    console.error("Playwright isn't installed. Run `npm i -D playwright && npx playwright install chromium`, then try again.");
    process.exit(2);
}

const base = values.url.replace(/\/$/, "");
const widths = values.widths.split(",").map(Number);
const tolerance = Number(values.tolerance);

const index = await fetch(`${base}/index.json`).then((r) => r.json());
const stories = Object.values(index.entries)
    .filter((e) => e.type === "story")
    .filter((e) => !values.only || e.id.includes(values.only));
if (stories.length === 0) {
    console.error(`No stories at ${base}${values.only ? ` matching "${values.only}"` : ""}.`);
    process.exit(2);
}

const browser = await chromium.launch();
const failures = [];
for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    for (const story of stories) {
        await page.goto(`${base}/iframe.html?id=${story.id}&viewMode=story`, { waitUntil: "networkidle" });
        const result = await page.evaluate(() => {
            const doc = document.documentElement;
            const over = [...document.querySelectorAll("body *")]
                .map((el) => ({ el, rect: el.getBoundingClientRect() }))
                .filter(({ rect }) => rect.width > 0 && rect.right > doc.clientWidth + 0.5)
                .sort((a, b) => b.rect.right - a.rect.right)[0];
            return {
                scrollWidth: doc.scrollWidth,
                clientWidth: doc.clientWidth,
                widest: over
                    ? `${over.el.tagName.toLowerCase()}${over.el.id ? `#${over.el.id}` : ""}.${[...over.el.classList].slice(0, 3).join(".")} right=${Math.round(over.rect.right)}`
                    : null,
            };
        });
        if (result.scrollWidth > result.clientWidth + tolerance) {
            failures.push(`${story.id} @ ${width}px: page is ${result.scrollWidth}px wide${result.widest ? ` (${result.widest})` : ""}`);
        }
    }
    await page.close();
}
await browser.close();

if (failures.length) {
    console.error(`✖ ${failures.length} overflow${failures.length === 1 ? "" : "s"} in ${stories.length} stories × ${widths.join("/")}px:`);
    for (const f of failures) console.error(`  ${f}`);
    process.exit(1);
}
console.log(`✓ ${stories.length} stories fit at ${widths.join(", ")}px`);
