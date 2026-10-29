/**
 * Fa Design System: ESLint preset.
 *
 * Enforces the global rules of the `fa-design-system` skill (skills/fa-design-system/SKILL.md,
 * "## Rules") in any app that builds UI with the library, and in this repo's sandbox pages.
 *
 * Only ESLint core rules are used (`no-restricted-imports`, `no-restricted-syntax`), so an app
 * needs no extra plugin. The preset sets no parser and no plugins: spread it into a flat config
 * after the app's own parser setup (TypeScript + JSX must already be parsed for the JSX selectors
 * to match).
 *
 *   import { faDesignSystem } from "fa-design-system/eslint";
 *   export default [...yourParserSetup, ...faDesignSystem];
 *
 * Every message starts with the skill rule id (`fa-semantic-tokens: ...`), so the rule and its
 * reasoning are findable in SKILL.md.
 *
 * Shared limits: the `no-restricted-syntax` selectors read string literals and template-literal
 * text only. A `className` built from a variable, a ternary with computed strings or a `cx()`
 * call whose arguments are not literals isn't inspected. The preset is a guard rail, not a proof.
 */

// ---------------------------------------------------------------------------------------------
// Selector building blocks
// ---------------------------------------------------------------------------------------------

/**
 * Where a className literal can sit. Each entry ends at the node that carries the string value:
 *   className="..."                      -> JSXAttribute > Literal
 *   className={"..."}                    -> JSXAttribute > JSXExpressionContainer > Literal
 *   className={`...`}                    -> JSXAttribute > JSXExpressionContainer > TemplateLiteral > TemplateElement
 *   className={cx("...", cond && "...")} -> JSXAttribute > JSXExpressionContainer > CallExpression(cx|clsx|cn|twMerge) Literal
 *   className={cx(`...`)}                -> ... CallExpression TemplateElement
 *
 * esquery attribute regexes test `String(value)`; a TemplateElement's `value` is an object, so
 * the quasi text is matched through `value.raw`.
 */
const CLASS_ATTR = 'JSXAttribute[name.name="className"]';
const CLASS_FNS = "CallExpression[callee.name=/^(cx|clsx|cn|twMerge|twJoin)$/]";

/** Builds the list of selectors that match a className string whose text matches `re`. */
const classNameMatching = (re) => [
    `${CLASS_ATTR} > Literal[value=${re}]`,
    `${CLASS_ATTR} > JSXExpressionContainer > Literal[value=${re}]`,
    `${CLASS_ATTR} > JSXExpressionContainer > TemplateLiteral > TemplateElement[value.raw=${re}]`,
    `${CLASS_ATTR} > JSXExpressionContainer > ${CLASS_FNS} Literal[value=${re}]`,
    `${CLASS_ATTR} > JSXExpressionContainer > ${CLASS_FNS} TemplateElement[value.raw=${re}]`,
];

/** One `no-restricted-syntax` entry per selector, all carrying the same message. */
const restrict = (selectors, message) => selectors.map((selector) => ({ selector, message }));

// ---------------------------------------------------------------------------------------------
// Regexes (esquery syntax: `/.../flags`, no unescaped `/` inside, `\b` written as `\\b` in JS)
// ---------------------------------------------------------------------------------------------

/** Tailwind palette families (and the system's primitive ramps) followed by a ramp step. */
const PALETTE_FAMILIES =
    "gray|blue|blue-light|red|green|orange|orange-dark|yellow|purple|pink|teal|brand|error|warning|success|slate|zinc|neutral|stone|amber|lime|emerald|cyan|sky|indigo|violet|fuchsia|rose";
const PALETTE_STEPS = "25|50|[1-9]00|950";

/**
 * fa-semantic-tokens. Matches, anywhere in a class string:
 *   - a hex color inside an arbitrary value: `bg-[#035CB5]`, `text-[#fff]`
 *   - a `dark:` variant: `dark:text-gray-300`, `md:dark:bg-primary`
 *   - a palette or primitive ramp step: `text-gray-600`, `bg-brand-700`, `border-blue-light-200`
 *     (not `utility-gray-200`: the `utility-*` ramps are the chart series colors)
 *   - `bg-white`, `bg-black`, `text-black` (`text-white` stays allowed, as the skill says)
 */
const RAW_COLOR_RE = `/\\[#[0-9a-fA-F]{3,8}\\]|(^|[^A-Za-z0-9_-])dark:|(?<!utility-)\\b(${PALETTE_FAMILIES})-(${PALETTE_STEPS})\\b|\\b(bg-white|bg-black|text-black)\\b/`;

/** fa-instant-hover: timing utilities on a hover or color change. */
const TIMED_TRANSITION_RE = "/\\bduration-\\d+\\b|\\bease-(in|out|in-out|linear)\\b|\\btransition-all\\b/";

/** fa-no-invented-variants: class fragments that restyle a component instead of laying it out. */
const RESTYLE_RE =
    "/\\b(bg-|rounded|ring-|shadow-|font-(medium|semibold|bold)|text-(xs|sm|md|lg|xl|primary|secondary|tertiary|quaternary|brand|error|success|warning|disabled|placeholder|fg-)|border-(primary|secondary|tertiary|brand|error|disabled)|size-\\d|p[xytblr]?-\\d)/";

/** The library components whose className is layout-only (plain names and `Compound.Part`). */
const LIBRARY_COMPONENT_RE =
    "/^(Button|ButtonUtility|CloseButton|SocialButton|Badge|BadgeWithDot|BadgeWithIcon|BadgeWithFlag|BadgeWithButton|Avatar|AvatarLabelGroup|Input|InputBase|TextArea|Toggle|Checkbox|RadioButton|RadioCard|Tag|Tooltip|CardHeader|PeriodSelector|FeaturedIcon|Alert|EmptyState|ProgressBar|Slider|Dropdown|Select|MultiSelect|TagSelect|NativeSelect|DatePicker|DateRangePicker|Modal|PromptModal|SlideoutMenu|Tabs|Table|TableCard|Pagination[A-Za-z]*|ButtonGroup|ButtonGroupItem)$/";
const LIBRARY_COMPOUND_RE =
    "/^(Table|TableCard|Tabs|Select|Dropdown|Modal|PromptModal|SlideoutMenu|FileUpload|Carousel|PinInput|InputGroup|MultiSelect|ButtonGroup)$/";
const LIBRARY_ELEMENT = `JSXOpeningElement:matches([name.name=${LIBRARY_COMPONENT_RE}], [name.object.name=${LIBRARY_COMPOUND_RE}])`;

// ---------------------------------------------------------------------------------------------
// Rules
// ---------------------------------------------------------------------------------------------

/**
 * fa-icons-only (rule 11): icons come from `fa-icons`, file-type icons from `@untitledui/file-icons`.
 * Limit: catches the common icon packages by import path only; an inline `<svg>` isn't flagged.
 *
 * Demo imports (no skill rule id; from the component pages' "Import" sections): `*.demo.tsx`
 * files are stripped from the package (`package.json` "files"), so importing one breaks at
 * install. Apps use the component and `siteContent` instead.
 */
const restrictedImports = [
    "error",
    {
        patterns: [
            {
                group: ["lucide-react", "@heroicons/*", "react-icons", "react-icons/*", "@tabler/icons-react", "@phosphor-icons/*", "@untitledui/icons"],
                message: "fa-icons-only: icons come from fa-icons (file-type icons from @untitledui/file-icons).",
            },
            {
                group: ["**/*.demo", "**/*.demo.tsx", "fa-design-system/**/*.demo*"],
                message: "demo files aren't shipped; use the component and `siteContent`.",
            },
        ],
    },
];

const restrictedSyntax = [
    "error",

    /**
     * fa-aria-prefix (rule 19): everything from `react-aria-components` is imported as `X as AriaX`,
     * types included. Limit: a namespace import (`import * as RAC`) isn't checked.
     */
    {
        selector: 'ImportDeclaration[source.value="react-aria-components"] ImportSpecifier[local.name!=/^Aria/]',
        message: "fa-aria-prefix: import it as `X as AriaX` (types included), so library components and the primitives they wrap stay apart.",
    },

    /**
     * fa-semantic-tokens (rule 7): semantic color classes only. No hex, no palette or primitive ramp
     * step, no `bg-white` / `bg-black` / `text-black`, no `dark:` variant.
     * Limits: literal class strings only; `style={{ color }}` isn't flagged (the skill forbids it,
     * but an inline style is also how a chart passes a measured width, so it's left to review).
     */
    ...restrict(
        classNameMatching(RAW_COLOR_RE),
        "fa-semantic-tokens: use semantic color classes (text-primary, bg-secondary, border-secondary, text-fg-quaternary); never a hex value, a palette or primitive ramp step (gray-500, brand-700), bg-white / bg-black / text-black, or a `dark:` variant. Semantic tokens switch for dark mode on their own.",
    ),

    /**
     * fa-instant-hover (rule 10): hovers are instant; bare `transition` only. The `duration-*` /
     * `ease-*` scale is for movement and overlays, which the library components already carry.
     * Limit: can't tell a hover from a sliding element, so a legitimate movement timing on
     * app-level markup needs an `eslint-disable-next-line` with a reason.
     */
    ...restrict(
        classNameMatching(TIMED_TRANSITION_RE),
        "fa-instant-hover: hovers and color changes are instant; use bare `transition`, never duration-*, ease-* or transition-all.",
    ),

    /**
     * fa-components-first (rule 1): a library component before markup. `onClick` on a non-interactive
     * element is a rebuilt button; a raw form control is a rebuilt Input/Select/TextArea.
     * Limits: the element list is the common cases; `<a onClick>` and `<form>` are allowed, and
     * `<input type="hidden">` is still flagged (disable the line with a reason).
     */
    {
        selector: 'JSXOpeningElement[name.name=/^(div|span|p|li|section|article)$/] > JSXAttribute[name.name="onClick"]',
        message: "fa-components-first: never onClick on a div/span; use Button (it handles keyboard, focus and states).",
    },
    {
        selector: "JSXOpeningElement[name.name=/^(button|input|select|textarea)$/]",
        message: "fa-components-first: use the library Button/Input/Select/TextArea instead of a raw element.",
    },

    /**
     * fa-real-content (rule 15): Finansavisen content, never Lorem ipsum, "John Doe" or
     * "Company Inc."; and real hrefs, never `#`.
     * Limit: only the canonical placeholder strings are recognized; `$1,234.56` and English
     * headlines are left to review.
     */
    {
        selector: "Literal[value=/Lorem ipsum|John Doe|Jane Doe|Company Inc/]",
        message: "fa-real-content: write Finansavisen content (Norwegian labels, Oslo Børs companies, NOK), never Lorem ipsum, John Doe or Company Inc.",
    },
    {
        selector: "JSXText[value=/Lorem ipsum|John Doe/]",
        message: "fa-real-content: write Finansavisen content (Norwegian labels, Oslo Børs companies, NOK), never Lorem ipsum or John Doe.",
    },
    {
        selector: 'JSXAttribute[name.name="href"] > Literal[value="#"]',
        message: "fa-real-content: real hrefs; `#` is a placeholder. Use the page's path (`/bors/aksjer/EQNR`).",
    },

    /**
     * fa-no-invented-variants (rule 2), heuristic: a `className` on a library component may only
     * place it (width, margins, grid placement). A fill, radius, ring, shadow, weight, text size or
     * color, border color, `size-*` or padding there is a faked variant.
     * Limits: the component list is the library's styled components, matched by JSX name, so a
     * renamed import or a wrapper with the same name is a false result either way; `p-*` on a
     * component that documents a padding prop may be a false positive (disable the line with a
     * reason, or move the class to a wrapper); computed classes aren't inspected.
     */
    ...restrict(
        [
            `${LIBRARY_ELEMENT} > ${CLASS_ATTR} > Literal[value=${RESTYLE_RE}]`,
            `${LIBRARY_ELEMENT} > ${CLASS_ATTR} > JSXExpressionContainer > Literal[value=${RESTYLE_RE}]`,
            `${LIBRARY_ELEMENT} > ${CLASS_ATTR} > JSXExpressionContainer > TemplateLiteral > TemplateElement[value.raw=${RESTYLE_RE}]`,
            `${LIBRARY_ELEMENT} > ${CLASS_ATTR} > JSXExpressionContainer > ${CLASS_FNS} Literal[value=${RESTYLE_RE}]`,
            `${LIBRARY_ELEMENT} > ${CLASS_ATTR} > JSXExpressionContainer > ${CLASS_FNS} TemplateElement[value.raw=${RESTYLE_RE}]`,
        ],
        "fa-no-invented-variants: className on a library component is layout only (width, margins, grid placement); use props for color, size and state, and report a missing variant instead of faking it.",
    ),
];

// ---------------------------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------------------------

/** The preset: flat-config objects to spread into an app's config after its parser setup. */
export const faDesignSystem = [
    {
        name: "fa-design-system/rules",
        files: ["**/*.{js,jsx,ts,tsx}"],
        rules: {
            "no-restricted-imports": restrictedImports,
            "no-restricted-syntax": restrictedSyntax,
        },
    },
];

export default faDesignSystem;
