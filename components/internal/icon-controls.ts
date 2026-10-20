import type { FC } from "react";
import * as FaIcons from "fa-icons";

type IconComponent = FC<{ className?: string }>;

/**
 * Every UI icon exported by `fa-icons`, keyed by its export name. Leaves out the
 * country flags (`Flag`, `*Flag`) and logos (`*Logo`), which the package exports
 * too but aren't icons. `FlagIcon` is the flag *icon* and stays in.
 */
const icons = Object.fromEntries(
    Object.entries(FaIcons).filter(
        ([name, value]) =>
            /^[A-Z]/.test(name) &&
            (typeof value === "function" || typeof value === "object") &&
            (name === "FlagIcon" || !(name.endsWith("Flag") || name.endsWith("Logo"))),
    ),
) as Record<string, IconComponent>;

const iconNames = Object.keys(icons).sort();

/**
 * Storybook argType for an icon prop: a select listing every Fa icon, plus "None"
 * (maps to `undefined`). Set the story's default arg to an icon name, e.g.
 * `args: { iconLeading: "Plus" }`.
 *
 * Pass `{ none: false }` for props where leaving the icon out falls back to a
 * default icon instead of removing it.
 */
export const iconArgType = ({ none = true }: { none?: boolean } = {}) => ({
    control: "select" as const,
    options: none ? ["None", ...iconNames] : iconNames,
    mapping: none ? { None: undefined, ...icons } : icons,
});

/**
 * A default arg for an `iconArgType()` control: the icon's option name, which
 * Storybook maps to the component before it reaches the story. Typed as the
 * component so it fits the story's props.
 */
export const iconArg = (name: string) => name as unknown as IconComponent;
