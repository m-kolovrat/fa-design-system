/**
 * Turns a skill page (`skills/fa-design-system/references/**.md`, imported with `?raw`) into
 * the text of a component's Storybook Docs page, so the skill page stays the single written
 * source for both agents and Storybook.
 *
 * - Drops the leading `# Title` line (the Docs page already shows the component's title).
 * - Rewrites relative links (`select.md`, `../layout.md`) to the file on GitHub, since the
 *   Storybook build has no copy of the skill folder to link to.
 * - Leaves fenced code blocks and inline code untouched.
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

/**
 * @param markdown The page's raw markdown.
 * @param dir The page's folder relative to `references/` (`"components"` for component pages).
 */
export const skillDoc = (markdown: string, dir = "components") => {
    const base = new URL(dir.replace(/\/?$/, "/"), REFERENCES_URL).href;

    // Split on fenced code blocks (``` or ~~~ at the start of a line) so only prose is rewritten.
    const parts = markdown.replace(/^﻿?\s*# [^\n]*\n+/, "").split(/^(```|~~~)/m);

    let inFence = false;
    let fence = "";
    let out = "";
    for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (part === "```" || part === "~~~") {
            if (!inFence) {
                inFence = true;
                fence = part;
            } else if (part === fence) {
                inFence = false;
            }
            out += part;
            continue;
        }
        out += inFence ? part : rewriteLinks(part, base);
    }
    return out;
};
