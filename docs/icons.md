# Adding or updating icons, flags and logos

Figma is the source, the [`fa-icons`](https://github.com/m-kolovrat/fa-icons) repo builds the
package, and this repo only installs it. Never add an SVG or icon component here, and don't pull in
another icon library: an icon `fa-icons` doesn't have is designed in Figma first. File type icons
come from `@untitledui/file-icons`.

1. **Figma** (file "Fa Design System"): each asset is a component in its section. Icons V2
   (node `17218-803`), Flag (`17201-14733`), Logos (`17204-1131`). The component name is the
   kebab-case code name (`arrow-left`). Icons and flags are 20×20 frames. Icons keep their
   strokes; don't outline them.
2. **Export** each changed component as SVG ("Include id attribute" off). Without manual export,
   use the Figma MCP: `use_figma` with `node.exportAsync({ format: "SVG_STRING", svgIdAttribute: false })`
   per component. A call returns at most 48 KB, so batch about 40 icons or 15 flags per call.
3. **`fa-icons`** (sibling checkout, `~/Projects/fa-icons`): put the files in `svg/icons`,
   `svg/flags` or `svg/logos`, then run `npm run check`, `npm test` and `npm run preview`
   (http://localhost:4310, every component with size, color and dark controls). A new
   brand-colored logo goes in `keepColors`, a name that clashes with an export in
   `componentNames` (`scripts/config.mjs`). Release: `npm version minor` (major when an asset is
   renamed or removed), then `git push --follow-tags`.
4. **This repo**: change the tag in `package.json` (`"fa-icons": "github:m-kolovrat/fa-icons#vX.Y.Z"`),
   run `npm install --legacy-peer-deps`, check the stories that use the asset, and `npm test`.
   Removed or renamed assets are breaking changes: update every import in the same PR.

Logos and flags are imported from `"fa-icons"` (`<FaLargeLogo />`, `<Flag name="argentina-ars" />`,
flags named exactly as in Figma, 20×20). Single-color logos use `currentColor`, so the page sets the
color with a `text-*` class; only logos with fixed brand colors keep their fills. Storybook shows
them under Foundations → Flags / Logos.
