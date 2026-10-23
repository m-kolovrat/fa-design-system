#!/usr/bin/env node
// Sets up an app that uses the Fa Design System for coding agents. Run from the app's root after
// installing the package:
//
//     npx fa-design-system setup
//
// 1. Links the fa-design-system skill into .claude/skills/, so Claude Code loads it for UI work.
//    The link points into node_modules, so the skill always matches the installed version.
// 2. Adds a short block to AGENTS.md (created if missing) for agents that read AGENTS.md.
// Running it again is safe: both steps skip what's already there.
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
const marker = "<!-- fa-design-system -->";
const block = `${marker}
## UI: Fa Design System

- Build UI only from Fa Design System components (\`fa-design-system/components/...\`); never hand-write a component that exists.
- Colors, spacing, radius and type: semantic token classes only (\`text-primary\`, \`bg-brand-solid\`). No hex, no \`gray-500\`.
- Icons only from \`fa-icons\`. Never invent a size, variant or token; report what's missing.
- Before any UI work, read \`.claude/skills/fa-design-system/SKILL.md\` (or \`node_modules/fa-design-system/skills/fa-design-system/SKILL.md\`).
- When redesigning a page, report new patterns and clashes with the rules, as the skill describes.
<!-- /fa-design-system -->
`;
const agents = existsSync(agentsPath) ? readFileSync(agentsPath, "utf8") : "";
if (agents.includes(marker)) {
    console.log("• AGENTS.md already has the Fa Design System block, left as is");
} else {
    writeFileSync(agentsPath, agents ? `${agents.trimEnd()}\n\n${block}` : `# AGENTS.md\n\n${block}`);
    console.log(`✓ ${agents ? "Added the Fa Design System block to" : "Created"} AGENTS.md`);
}

const claudePath = join(app, "CLAUDE.md");
if (existsSync(claudePath) && !readFileSync(claudePath, "utf8").includes("AGENTS.md")) {
    console.log("• CLAUDE.md doesn't mention AGENTS.md; add the line `@AGENTS.md` to it so Claude Code reads the block too");
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
