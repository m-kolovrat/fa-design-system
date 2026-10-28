#!/usr/bin/env node
// Sets up an app that uses the Fa Design System for coding agents. Run from the app's root after
// installing the package:
//
//     npx fa-design-system setup
//
// 1. Links the fa-design-system skill into .claude/skills/, so Claude Code loads it for UI work.
//    The link points into node_modules, so the skill always matches the installed version.
// 2. Writes a block to AGENTS.md (created if missing): the core rules and an index of the
//    components with their import paths, built from the skill. Agents read AGENTS.md on every task,
//    so the index reaches them even when the skill doesn't load. Run setup again after updating the
//    package: it replaces the block with the current index.
// 3. Makes sure CLAUDE.md imports AGENTS.md (`@AGENTS.md`), since Claude Code reads only CLAUDE.md.
import { cpSync, existsSync, lstatSync, mkdirSync, readFileSync, symlinkSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const [command] = process.argv.slice(2);
if (command !== "setup") {
    console.log("Usage: npx fa-design-system setup");
    process.exit(command ? 1 : 0);
}

const app = process.cwd();
const skillSource = join(dirname(fileURLToPath(import.meta.url)), "..", "skills", "fa-design-system");
const skillTarget = join(app, ".claude", "skills", "fa-design-system");

// 1. Skill
if (existsSync(skillTarget) || isLink(skillTarget)) {
    console.log("• .claude/skills/fa-design-system already exists, left as is");
} else {
    mkdirSync(dirname(skillTarget), { recursive: true });
    try {
        symlinkSync(relative(dirname(skillTarget), skillSource), skillTarget, "dir");
        console.log("✓ Linked .claude/skills/fa-design-system → the installed package");
    } catch {
        // Symlinks can be unavailable (Windows without developer mode); a copy works but won't follow updates.
        cpSync(skillSource, skillTarget, { recursive: true });
        console.log("✓ Copied the skill to .claude/skills/fa-design-system (run setup again after updating the package)");
    }
}

// 2. AGENTS.md
const agentsPath = join(app, "AGENTS.md");
const start = "<!-- fa-design-system -->";
const end = "<!-- /fa-design-system -->";
const block = `${start}
## UI: Fa Design System

- Build UI only from Fa Design System components; never hand-write one that exists. Before any UI
  work, read \`.claude/skills/fa-design-system/SKILL.md\` (or
  \`node_modules/fa-design-system/skills/fa-design-system/SKILL.md\`) and the page of each
  component you use.
- Plan first: list the page's sections and the component below that covers each. Anything with no
  match is "not in the system": say so before building it.
- Colors, spacing, radius and type: semantic token classes only (\`text-primary\`, \`bg-brand-solid\`).
  No hex, no \`gray-500\`, no \`dark:\`. Icons only from \`fa-icons\`. Never invent a size, variant
  or token; report what's missing.
- Content in Norwegian, with Oslo Børs companies and NOK formatting.

### Components

${componentIndex()}
${end}
`;
const agents = existsSync(agentsPath) ? readFileSync(agentsPath, "utf8") : "";
const existing = agents.indexOf(start);
if (existing !== -1) {
    const close = agents.indexOf(end, existing);
    const before = agents.slice(0, existing);
    const after = close === -1 ? "" : agents.slice(close + end.length).replace(/^\n/, "");
    const next = `${before}${block}${after}`;
    if (next === agents) {
        console.log("• AGENTS.md already has the current Fa Design System block");
    } else {
        writeFileSync(agentsPath, next);
        console.log("✓ Updated the Fa Design System block in AGENTS.md");
    }
} else {
    writeFileSync(agentsPath, agents ? `${agents.trimEnd()}\n\n${block}` : `# AGENTS.md\n\n${block}`);
    console.log(`✓ ${agents ? "Added the Fa Design System block to" : "Created"} AGENTS.md`);
}

// 3. CLAUDE.md
const claudePath = join(app, "CLAUDE.md");
const claude = existsSync(claudePath) ? readFileSync(claudePath, "utf8") : "";
if (/^@AGENTS\.md\s*$/m.test(claude)) {
    console.log("• CLAUDE.md already imports AGENTS.md");
} else {
    writeFileSync(claudePath, claude ? `${claude.trimEnd()}\n\n@AGENTS.md\n` : "@AGENTS.md\n");
    console.log(`✓ ${claude ? "Added @AGENTS.md to" : "Created"} CLAUDE.md, so Claude Code reads the block`);
}

console.log(`
Last step, in the app's main stylesheet:

    @import "tailwindcss";
    @import "fa-design-system/styles/index.css";
`);

function isLink(path) {
    try {
        return lstatSync(path).isSymbolicLink();
    } catch {
        return false;
    }
}

// The skill's component index as a compact list: name, what it's for, import path.
function componentIndex() {
    const skill = readFileSync(join(skillSource, "SKILL.md"), "utf8");
    const section = skill.split("## Component index")[1]?.split(/\n## /)[0] ?? "";
    return section
        .split(/\n(?=- \[|### )/)
        .filter((entry) => entry.startsWith("- ["))
        .map((entry) => {
            const text = entry.replace(/\s+/g, " ").trim();
            const name = text.match(/^- \[([^\]]+)\]/)[1];
            const what = text
                .replace(/^- \[[^\]]+\]\([^)]+\)\.?:? ?/, "")
                .replace(/ ?`fa-design-system[^`]*`\.?$/, "")
                .trim();
            const path = text.match(/`(fa-design-system\/[^`]+)`/)?.[1];
            return `- ${name}${what ? `: ${what}` : ""}${path ? ` \`${path}\`` : ""}`;
        })
        .join("\n");
}
