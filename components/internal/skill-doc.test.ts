import { describe, expect, it } from "vitest";
import { skillDoc, skillDocSections } from "./skill-doc";

const GITHUB = "https://github.com/m-kolovrat/fa-design-system/blob/main/skills/fa-design-system/references/";

const page = `# Badge

A label. See [select](select.md) and [page patterns](../page-patterns.md), or https://example.com/x.md.

\`\`\`ts
import { Badge } from "fa-design-system/components/base/badges/badges";
\`\`\`

## Use when

- A status next to a title. Inline code with a link shape stays: \`[a](b.md)\`.

## Props

| Prop | Values |
| :--- | :----- |
| size | sm, md |

## Example

\`\`\`md
## Not a section
[not rewritten](nope.md)
\`\`\`

## See also

Related: [tags](tags.md).
`;

describe("skillDocSections", () => {
    it("drops the title, keeps the intro, and splits at ## headings outside code fences", () => {
        const { intro, sections } = skillDocSections(page);
        expect(intro.startsWith("A label.")).toBe(true);
        expect(intro).toContain("import { Badge }");
        expect(sections.map((s) => s.heading)).toEqual(["Use when", "Props", "Example", "See also"]);
        expect(sections[2].markdown).toContain("## Not a section");
    });
});

describe("skillDoc", () => {
    it("renders the whole page without its title by default", () => {
        const out = skillDoc(page);
        expect(out.startsWith("# Badge")).toBe(false);
        expect(out).toContain("A label.");
        expect(out).toContain("## Use when");
        expect(out).toContain("## See also");
    });

    it("points relative links at the skill folder on GitHub, leaving absolute ones alone", () => {
        const out = skillDoc(page);
        expect(out).toContain(`[select](${GITHUB}components/select.md)`);
        expect(out).toContain(`[page patterns](${GITHUB}page-patterns.md)`);
        expect(out).toContain("https://example.com/x.md");
    });

    it("leaves link-shaped text inside inline code and fenced code as written", () => {
        const out = skillDoc(page);
        expect(out).toContain("`[a](b.md)`");
        expect(out).toContain("[not rewritten](nope.md)");
    });

    it("keeps only the named sections, without the intro unless asked", () => {
        const some = skillDoc(page, { sections: ["Use when", "Example"] });
        expect(some.startsWith("## Use when")).toBe(true);
        expect(some).toContain("## Example");
        expect(some).not.toContain("## Props");
        expect(some).not.toContain("A label.");

        expect(skillDoc(page, { sections: ["Use when"], intro: true })).toContain("A label.");
    });

    it("leaves out omitted sections", () => {
        const out = skillDoc(page, { omit: ["Props"] });
        expect(out).not.toContain("## Props");
        expect(out).toContain("## Use when");
    });

    it("can drop the heading lines so a section serves as an intro", () => {
        const out = skillDoc(page, { sections: ["Use when"], headings: false });
        expect(out.startsWith("- A status")).toBe(true);
        expect(out).not.toContain("## Use when");
    });

    it("resolves links from another folder with dir", () => {
        const out = skillDoc("# T\n\nSee [x](x.md).", { dir: "patterns" });
        expect(out).toContain(`[x](${GITHUB}patterns/x.md)`);
    });
});
