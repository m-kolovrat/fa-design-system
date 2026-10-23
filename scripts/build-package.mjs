// Builds the installable package into dist/ (npm run build; also runs on install from a git tag
// through `prepare`). tsc emits one file per source file so every component keeps its
// "use client" directive; tsc-alias rewrites the `@/` imports into relative paths with `.js`.
import { execFileSync } from "node:child_process";
import { rmSync, writeFileSync } from "node:fs";

const run = (bin, args) => execFileSync(process.execPath, [bin, ...args], { stdio: "inherit" });

rmSync("dist", { recursive: true, force: true });
run("node_modules/typescript/bin/tsc", ["-p", "tsconfig.build.json"]);
run("node_modules/tsc-alias/dist/bin/index.js", ["-p", "tsconfig.build.json"]);

// The output is ES modules; mark dist/ as such without changing the repo's own module type.
writeFileSync("dist/package.json", `${JSON.stringify({ type: "module" }, null, 4)}\n`);

console.log("✓ Built dist/");
