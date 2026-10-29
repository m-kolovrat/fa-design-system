#!/usr/bin/env node
/**
 * Skill drift check — skills/fa-design-system vs. the component source.
 *
 * Agents read only the skill, so nothing in it may point at something that doesn't
 * exist. This script reads every `.md` under skills/fa-design-system and fails
 * (non-zero exit) when:
 *
 *   1. a package import path (`fa-design-system/components|hooks|utils/...`) has no
 *      file behind it (`<path>.tsx`, `.ts`, `/index.tsx`, `/index.ts`; `/*` = a folder),
 *   2. a relative markdown link, or a `docs/*.md` mention, points at a missing file,
 *   3. `## Component index` in SKILL.md misses a page in references/components/ or
 *      links one that isn't there,
 *   4. a page mentions something an app can't reach: a `.demo.tsx` file, the repo's
 *      `@/components` / `@/utils` alias, `public/images` (one allowed mention in
 *      SKILL.md's fa-local-images rule) or `docs/agents/`,
 *   5. a `## Props` table names a prop the component's types don't have. The types
 *      are read with the TypeScript compiler API from the files the page imports, so
 *      props inherited from React Aria and React count. See `propNamesOf` for what
 *      is gathered and `collectPropsRows` for how rows are read.
 *
 * Check 6 of the brief (figma-map.md paths) is check 1 applied to that file.
 *
 * A miss in check 5 is reported, never resolved here: a row that documents a type
 * rather than a prop belongs in a `## Types` section of the page.
 *
 * Run: node scripts/check-skill.mjs   (wired up as `npm run skill:check`)
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const started = performance.now();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SKILL_DIR = path.join(ROOT, "skills/fa-design-system");
const PAGES_DIR = path.join(SKILL_DIR, "references/components");
const PACKAGE = "fa-design-system";

const rel = (file) => path.relative(ROOT, file);

// ---------------------------------------------------------------------------
// Load the skill
// ---------------------------------------------------------------------------

function walk(dir) {
    const out = [];
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) out.push(...walk(full));
        else if (entry.name.endsWith(".md")) out.push(full);
    }
    return out.sort();
}

const mdFiles = walk(SKILL_DIR);
if (mdFiles.length === 0) fail(`No .md files under ${rel(SKILL_DIR)}`);
const docs = new Map(mdFiles.map((file) => [file, readFileSync(file, "utf8").split("\n")]));
const skillMd = path.join(SKILL_DIR, "SKILL.md");
if (!docs.has(skillMd)) fail(`${rel(skillMd)} is missing`);

// ---------------------------------------------------------------------------
// Reporting
// ---------------------------------------------------------------------------

const CHECKS = [
    "Import paths resolve",
    "Relative links resolve",
    "Component index is complete and exact",
    "Nothing an app can't reach",
    "Props tables match the types",
];
const issues = CHECKS.map(() => []);

/** @param {number} check 1-based */
function record(check, file, line, msg) {
    issues[check - 1].push(`${rel(file)}${line ? `:${line}` : ""}: ${msg}`);
}

// ---------------------------------------------------------------------------
// 1. Import paths resolve (also covers the paths in references/figma-map.md)
// ---------------------------------------------------------------------------

const IMPORT_PATH_RE = new RegExp(`${PACKAGE}/(components|hooks|utils)/[A-Za-z0-9_./-]+`, "g");

/** `fa-design-system/components/x/y` → absolute file path, or null when nothing is there. */
function resolveImportPath(importPath) {
    const sub = importPath.slice(PACKAGE.length + 1).replace(/\.+$/, ""); // drop a sentence's full stop
    if (sub.endsWith("/*") || sub.endsWith("/")) {
        const dir = path.join(ROOT, sub.replace(/\/\*?$/, ""));
        return existsSync(dir) && statSync(dir).isDirectory() ? dir : null;
    }
    const base = path.join(ROOT, sub);
    for (const candidate of [`${base}.tsx`, `${base}.ts`, path.join(base, "index.tsx"), path.join(base, "index.ts")]) {
        if (existsSync(candidate)) return candidate;
    }
    return null;
}

for (const [file, lines] of docs) {
    lines.forEach((text, i) => {
        for (const m of text.matchAll(IMPORT_PATH_RE)) {
            if (!resolveImportPath(m[0])) record(1, file, i + 1, `import path \`${m[0]}\` has no file behind it`);
        }
    });
}

// ---------------------------------------------------------------------------
// 2. Relative links resolve, and docs/*.md mentions exist
// ---------------------------------------------------------------------------

const LINK_RE = /\]\(([^)\s]+)\)/g;
const DOCS_MENTION_RE = /\bdocs\/[A-Za-z0-9_./-]+\.md\b/g;

for (const [file, lines] of docs) {
    lines.forEach((text, i) => {
        for (const m of text.matchAll(LINK_RE)) {
            const target = m[1];
            if (/^(https?:|mailto:|#)/.test(target)) continue;
            const clean = target.split("#")[0];
            if (!clean) continue;
            const resolved = path.resolve(path.dirname(file), clean);
            if (!existsSync(resolved)) record(2, file, i + 1, `link \`${target}\` points at a missing file`);
        }
        for (const m of text.matchAll(DOCS_MENTION_RE)) {
            if (!existsSync(path.join(ROOT, m[0]))) record(2, file, i + 1, `\`${m[0]}\` doesn't exist in the library repo`);
        }
    });
}

// ---------------------------------------------------------------------------
// 3. Component index is complete and exact
// ---------------------------------------------------------------------------

const pages = readdirSync(PAGES_DIR)
    .filter((name) => name.endsWith(".md"))
    .sort();

{
    const lines = docs.get(skillMd);
    const start = lines.findIndex((l) => /^## Component index\b/.test(l));
    if (start === -1) {
        record(3, skillMd, 0, "no `## Component index` heading");
    } else {
        let end = lines.findIndex((l, i) => i > start && /^## /.test(l));
        if (end === -1) end = lines.length;
        const linked = new Map(); // page name → first line
        for (let i = start; i < end; i++) {
            for (const m of lines[i].matchAll(/\]\(references\/components\/([^)#]+)\)/g)) {
                if (!linked.has(m[1])) linked.set(m[1], i + 1);
            }
        }
        for (const page of pages) {
            if (!linked.has(page)) record(3, skillMd, start + 1, `references/components/${page} is not linked from the component index`);
        }
        for (const [page, line] of linked) {
            if (!pages.includes(page)) record(3, skillMd, line, `index links references/components/${page}, which doesn't exist`);
        }
    }
}

// ---------------------------------------------------------------------------
// 4. Nothing an app can't reach
// ---------------------------------------------------------------------------

const UNREACHABLE = [
    { re: /\.demo(\.tsx)?\b/g, why: "points at a demo file; demos aren't part of the package" },
    { re: /@\/components/g, why: "uses the repo's `@/` alias; apps import `fa-design-system/components/...`" },
    { re: /@\/utils/g, why: "uses the repo's `@/` alias; apps import `fa-design-system/utils/...`" },
    { re: /public\/images/g, why: "points at Storybook-only assets", allowOnceIn: skillMd },
    { re: /docs\/agents\//g, why: "points at docs/agents/, which doesn't ship" },
];

for (const [file, lines] of docs) {
    for (const { re, why, allowOnceIn } of UNREACHABLE) {
        let allowance = allowOnceIn === file ? 1 : 0;
        lines.forEach((text, i) => {
            for (const m of text.matchAll(re)) {
                if (allowance > 0) {
                    allowance--;
                    continue;
                }
                record(4, file, i + 1, `\`${m[0]}\` ${why}`);
            }
        });
    }
}

// ---------------------------------------------------------------------------
// 5. Props tables match the types
// ---------------------------------------------------------------------------

/**
 * Packages whose exports the skill documents as if they were its own (the icon package
 * the system ships its icons, flags and logos from). Their type entry joins the files
 * of a page that imports from them.
 */
const EXTRA_PACKAGES = ["fa-icons"];

function packageTypesEntry(name) {
    const dir = path.join(ROOT, "node_modules", name);
    if (!existsSync(path.join(dir, "package.json"))) return null;
    const pkg = JSON.parse(readFileSync(path.join(dir, "package.json"), "utf8"));
    const entry = pkg.types ?? pkg.typings ?? pkg.exports?.["."]?.types;
    if (!entry) return null;
    const resolved = path.join(dir, entry);
    return existsSync(resolved) ? resolved : null;
}

/**
 * The files a page documents: every package import path on the page that resolves
 * (the import fence at the top, plus the fences of sections such as "Social buttons"),
 * and the type entry of each EXTRA_PACKAGES package the page imports from.
 */
function componentFilesOf(file) {
    const files = new Set();
    for (const text of docs.get(file)) {
        for (const m of text.matchAll(IMPORT_PATH_RE)) {
            const resolved = resolveImportPath(m[0]);
            if (resolved && /\.tsx?$/.test(resolved)) files.add(resolved);
        }
        for (const m of text.matchAll(/from "([^"]+)"/g)) {
            if (!EXTRA_PACKAGES.includes(m[1])) continue;
            const entry = packageTypesEntry(m[1]);
            if (entry) files.add(entry);
        }
    }
    return [...files];
}

/** Split a markdown table row into cells, ignoring `|` inside backticks and escaped `\|`. */
function splitRow(line) {
    const cells = [];
    let cell = "";
    let inCode = false;
    const text = line.trim().replace(/^\|/, "").replace(/\|$/, "");
    for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (ch === "\\" && text[i + 1] === "|") {
            cell += "|";
            i++;
        } else if (ch === "`") {
            inCode = !inCode;
            cell += ch;
        } else if (ch === "|" && !inCode) {
            cells.push(cell.trim());
            cell = "";
        } else cell += ch;
    }
    cells.push(cell.trim());
    return cells;
}

const IDENT_RE = /^(?:[A-Za-z_$][\w$]*|(?:aria|data)-[a-z-]+)$/;

/** `Table.Head` → `Head`, `name?` → `name`, `name: FlagName` → `name`; null when it isn't a prop name. */
function propName(token) {
    const name = token.split(":")[0].trim().replace(/\?$/, "").split(".").pop();
    return IDENT_RE.test(name) ? name : null;
}

/**
 * The prop names documented in every `## Props` section of a page, with their lines.
 *
 *   - A table whose first header cell is `Prop`: the backticked name(s) in column 1.
 *   - A table whose first header cell is anything else (`Component`, `Part`, `Export`):
 *     column 1 is a component, and the props are the backticked identifiers that head a
 *     list item in column 2 (at the cell start or after `,` `;` `:`, followed by `,` `;`
 *     `:` `(`, another backtick or the end). "`size` `sm` · `md`" and "`size`: `sm` · `md`"
 *     name `size`; "`div` attributes" and "React Aria `Table` props" name nothing.
 *
 * Sections written as prose (no table) aren't checked.
 */
function collectPropsRows(file) {
    const lines = docs.get(file);
    const rows = [];
    let inProps = false;
    let mode = null; // "prop" | "component"
    lines.forEach((text, i) => {
        if (/^## /.test(text)) {
            inProps = /^## Props\b/.test(text);
            mode = null;
            return;
        }
        if (!inProps || !text.startsWith("|")) {
            mode = null;
            return;
        }
        const next = lines[i + 1] ?? "";
        if (/^\|\s*:?-{2,}/.test(next)) {
            const head = splitRow(text)[0].replace(/`/g, "").trim().toLowerCase();
            mode = head.startsWith("prop") ? "prop" : "component";
            return;
        }
        if (/^\|\s*:?-{2,}/.test(text) || !mode) return;
        const cells = splitRow(text);
        if (mode === "prop") {
            for (const m of cells[0].matchAll(/`([^`]+)`/g)) {
                const name = propName(m[1]);
                if (name) rows.push({ line: i + 1, name });
            }
        } else if (cells[1]) {
            // "`size`: `xxxs` · `xxs`" lists values after a prop's own colon, so a colon
            // straight after a backtick doesn't start a new list item.
            const re = /(^|[,;]|[^`]:)\s*`([^`]+)`(?=\s*(?:$|[,;:(]|`))/g;
            for (const m of cells[1].matchAll(re)) {
                const name = propName(m[2]);
                if (name) rows.push({ line: i + 1, name });
            }
        }
    });
    return rows;
}

const pageFiles = new Map(pages.map((page) => [path.join(PAGES_DIR, page), null]));
for (const file of pageFiles.keys()) pageFiles.set(file, componentFilesOf(file));

const allComponentFiles = [...new Set([...pageFiles.values()].flat())];
const configPath = path.join(ROOT, "tsconfig.json");
const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
if (configFile.error) fail(ts.flattenDiagnosticMessageText(configFile.error.messageText, "\n"));
const parsed = ts.parseJsonConfigFileContent(configFile.config, ts.sys, ROOT);
const program = ts.createProgram({
    rootNames: allComponentFiles,
    options: { ...parsed.options, incremental: false, noEmit: true },
});
const checker = program.getTypeChecker();
const componentFileSet = new Set(allComponentFiles.map((f) => f.replace(/\\/g, "/")));

const isLocal = (symbol) => symbol?.declarations?.some((d) => componentFileSet.has(d.getSourceFile().fileName));

/**
 * Property names of a type. A union contributes every constituent's properties (a
 * `ButtonProps | LinkProps` component takes both sets). With `depth` > 0, properties
 * whose type is an object literal, or a type declared in the component files (or an
 * array of either), contribute their own properties too, so a data shape such as
 * `items: NavItemType[]` is covered one level down.
 */
function collectProps(type, depth, out, seen) {
    if (!type || seen.has(type)) return;
    seen.add(type);
    if (type.isUnion()) {
        for (const t of type.types) collectProps(t, depth, out, seen);
        return;
    }
    for (const prop of checker.getPropertiesOfType(type)) {
        out.add(prop.getName());
        if (depth === 0) continue;
        for (const nested of nestedTypes(checker.getTypeOfSymbol(prop))) collectProps(nested, depth - 1, out, seen);
    }
}

function nestedTypes(type) {
    const out = [];
    for (let t of type.isUnion() ? type.types : [type]) {
        if (checker.isArrayType(t)) t = checker.getTypeArguments(t)[0];
        if (!t || !(t.flags & ts.TypeFlags.Object)) continue;
        const anonymous = (t.objectFlags & ts.ObjectFlags.Anonymous) !== 0;
        if (anonymous || isLocal(t.aliasSymbol) || isLocal(t.getSymbol())) out.push(t);
    }
    return out;
}

/** First parameter of a function-like node, when it has an explicit or inferable type. */
function firstParamType(node) {
    if (!node || !ts.isFunctionLike(node) || node.parameters.length === 0) return null;
    return checker.getTypeAtLocation(node.parameters[0]);
}

const propNamesCache = new Map();

/**
 * Every property name declared or inherited by the interfaces and type aliases of a
 * file, plus the props of every function component it declares or exports (the first
 * parameter of its call signature, which also follows re-exports such as a package's
 * `index.d.ts`), plus object shapes nested one level in those.
 */
function propNamesOf(file) {
    if (propNamesCache.has(file)) return propNamesCache.get(file);
    const names = new Set();
    const seen = new Set();
    const sf = program.getSourceFile(file);
    if (!sf) fail(`TypeScript could not load ${rel(file)}`);
    const moduleSymbol = checker.getSymbolAtLocation(sf);
    for (const exported of moduleSymbol ? checker.getExportsOfModule(moduleSymbol) : []) {
        const symbol = exported.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(exported) : exported;
        if (symbol.flags & (ts.SymbolFlags.Interface | ts.SymbolFlags.TypeAlias)) {
            collectProps(checker.getDeclaredTypeOfSymbol(symbol), 1, names, seen);
        }
        if (symbol.flags & ts.SymbolFlags.Value) {
            for (const signature of checker.getTypeOfSymbol(symbol).getCallSignatures()) {
                if (signature.parameters[0]) collectProps(checker.getTypeOfSymbol(signature.parameters[0]), 1, names, seen);
            }
        }
    }
    for (const stmt of sf.statements) {
        if (ts.isInterfaceDeclaration(stmt) || ts.isTypeAliasDeclaration(stmt)) {
            collectProps(checker.getTypeAtLocation(stmt.name), 1, names, seen);
        } else if (ts.isFunctionDeclaration(stmt)) {
            collectProps(firstParamType(stmt), 1, names, seen);
        } else if (ts.isVariableStatement(stmt)) {
            for (const decl of stmt.declarationList.declarations) {
                let init = decl.initializer;
                while (init && (ts.isAsExpression(init) || ts.isParenthesizedExpression(init))) init = init.expression;
                if (init && ts.isCallExpression(init) && init.arguments.length > 0) init = init.arguments[0]; // forwardRef(fn), memo(fn)
                collectProps(firstParamType(init), 1, names, seen);
            }
        }
    }
    propNamesCache.set(file, names);
    return names;
}

let propsChecked = 0;
for (const [file, files] of pageFiles) {
    const rows = collectPropsRows(file);
    if (rows.length === 0) continue;
    if (files.length === 0) {
        record(5, file, 0, `no resolvable \`${PACKAGE}/...\` import on the page; ${rows.length} props row(s) unchecked`);
        continue;
    }
    const names = new Set();
    for (const f of files) for (const n of propNamesOf(f)) names.add(n);
    const fileList = files.map(rel).join(", ");
    for (const { line, name } of rows) {
        propsChecked++;
        if (!names.has(name)) record(5, file, line, `prop \`${name}\` not found in ${fileList}`);
    }
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------

const elapsed = ((performance.now() - started) / 1000).toFixed(1);
const total = issues.reduce((n, list) => n + list.length, 0);

if (total > 0) {
    console.error(
        `\n✗ Skill check failed — ${total} issue(s) between ${rel(SKILL_DIR)} and the component source (${propsChecked} props rows checked, ${elapsed}s):`,
    );
    issues.forEach((list, i) => {
        if (list.length === 0) return;
        console.error(`\n  ${i + 1}. ${CHECKS[i]} — ${list.length} issue(s)`);
        for (const issue of list) console.error(`     ${issue}`);
    });
    console.error(`\nFix the skill page (not this script): correct the name or path, or move a type row into a \`## Types\` section.\n`);
    process.exit(1);
}

console.log(
    `✓ ${rel(SKILL_DIR)} matches the component source (${pages.length} pages, ${allComponentFiles.length} component files, ${propsChecked} props rows, ${elapsed}s)`,
);

function fail(msg) {
    console.error(`\n✗ ${msg}\n`);
    process.exit(1);
}
