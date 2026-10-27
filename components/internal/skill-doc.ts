/**
 * Turns a skill page (`skills/fa-design-system/references/**.md`, imported with `?raw`) into
 * the text of a component's Storybook Docs page, so the skill page stays the single written
 * source for both agents and Storybook.
 *
 * - Drops the leading `# Title` line (the Docs page already shows the component's title).
 * - Can keep only some `## ` sections, or leave some out (`sections`, `omit`, `intro`).
 * - Rewrites relative links (`select.md`, `../layout.md`) to the file on GitHub, since the
 *   Storybook build has no copy of the skill folder to link to.
 * - Leaves fenced code blocks and inline code untouched.
 *
 * The shared Docs page (`.storybook/docs-page.tsx`) uses it for every story file that sets
 * `parameters.skillDoc`; a secondary component on a multi-component page can show a part of it
 * through `docs.description.component`. See "Component docs in Storybook" in CONTRIBUTING.md.
 */

const REFERENCES_URL = "https://github.com/m-kolovrat/fa-design-system/blob/main/skills/fa-design-system/references/";

/** A link target that is a relative path, not a URL, an anchor or a site-absolute path. */
const isRelative = (href: string) => !/^([a-z][a-z0-9+.-]*:|#|\/)/i.test(href);

const rewriteLinks = (text: string, base: string) =>
    // Split on inline code spans so a link-shaped example inside backticks stays as written.
    text
        .split(/(`[^`\n]*`)/)
        .map((part, index) =>
            index % 2 === 1
                ? part
                : part.replace(/(\]\()([^)\s]+)((?:\s+"[^"]*")?\))/g, (match, open: string, href: string, close: string) =>
                      isRelative(href) ? `${open}${new URL(href, base).href}${close}` : match,
                  ),
        )
        .join("");

/** Calls `fn` on each line with whether that line is inside (or opens/closes) a fenced code block. */
const eachLine = (markdown: string, fn: (line: string, inFence: boolean) => void) => {
    let fence = "";
    for (const line of markdown.split("\n")) {
        const marker = /^\s*(```|~~~)/.exec(line)?.[1];
        if (marker && (!fence || marker === fence)) {
            fence = fence ? "" : marker;
            fn(line, true);
            continue;
        }
        fn(line, Boolean(fence));
    }
};

export interface SkillDocSection {
    /** The heading text without `## `, e.g. `"Use when"`. */
    heading: string;
    /** The section's markdown, starting with its `## ` line. */
    markdown: string;
}

/**
 * Splits a skill page at its `## ` headings (outside code fences). `intro` is everything before
 * the first one, without the `# Title` line: the purpose, the Figma line and the import block.
 */
export const skillDocSections = (markdown: string): { intro: string; sections: SkillDocSection[] } => {
    const intro: string[] = [];
    const sections: { heading: string; lines: string[] }[] = [];

    eachLine(markdown.replace(/^﻿?\s*# [^\n]*\n+/, ""), (line, inFence) => {
        const heading = !inFence && /^## (.+)$/.exec(line)?.[1];
        if (heading) sections.push({ heading: heading.trim(), lines: [line] });
        else (sections.at(-1)?.lines ?? intro).push(line);
    });

    return {
        intro: intro.join("\n").trim(),
        sections: sections.map(({ heading, lines }) => ({ heading, markdown: lines.join("\n").trim() })),
    };
};

export interface SkillDocOptions {
    /** The page's folder relative to `references/` (`"components"` for component pages). */
    dir?: string;
    /** Keep only these `## ` sections (by heading, in the page's order). Leaves out the intro unless `intro: true`. */
    sections?: string[];
    /** Leave out these `## ` sections. */
    omit?: string[];
    /** Include the text before the first `## `. Defaults to `true`, or `false` when `sections` is set. */
    intro?: boolean;
}

/**
 * @param markdown The page's raw markdown.
 * @param options Which parts to keep; with none, the whole page without its title.
 */
export const skillDoc = (markdown: string, { dir = "components", sections, omit = [], intro = !sections }: SkillDocOptions = {}) => {
    const base = new URL(dir.replace(/\/?$/, "/"), REFERENCES_URL).href;
    const parts = skillDocSections(markdown);

    const text = [
        intro ? parts.intro : "",
        ...parts.sections.filter(({ heading }) => (!sections || sections.includes(heading)) && !omit.includes(heading)).map((s) => s.markdown),
    ]
        .filter(Boolean)
        .join("\n\n");

    // Rewrite links in prose only, never inside fenced code.
    const out: string[] = [];
    eachLine(text, (line, inFence) => out.push(inFence ? line : rewriteLinks(line, base)));
    return out.join("\n");
};
