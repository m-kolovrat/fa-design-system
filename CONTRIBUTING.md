# Contributing to the Fa Design System

Thank you for your interest in contributing! This guide will help you get started.

## 🚀 Quick start

1. **Fork the repository** on GitHub
2. **Clone your fork** locally
3. **Install dependencies**: `npm install --legacy-peer-deps`
4. **Start development**: `npm run storybook`
5. **Make your changes**
6. **Test thoroughly**
7. **Submit a pull request**

## 🎯 Contribution types

### 🐛 Bug fixes

- Fix component functionality issues
- Resolve accessibility problems
- Correct styling inconsistencies
- Address TypeScript errors

### ✨ Component enhancements

- Improve existing component APIs
- Add missing component variants
- Enhance accessibility features
- Optimize performance

### 🆕 New components

- Add components that fit our design system
- Must be generally useful (not app-specific)
- Should follow our established patterns
- Include comprehensive documentation

### 📚 Documentation

- Improve README and guides
- Add better Storybook stories
- Create usage examples
- Fix typos and clarity issues

## 📋 Component guidelines

### Design principles

- **Accessibility First** - WCAG 2.1 AA compliance
- **Mobile-First** - Responsive by default
- **Composable** - Components work well together
- **Consistent** - Follow established patterns
- **Minimal** - No unnecessary complexity

### Technical requirements

#### TypeScript

```tsx
// ✅ Good - Fully typed with exported interfaces
interface ButtonProps {
    variant?: "primary" | "secondary";
    size?: "sm" | "md" | "lg";
    children: React.ReactNode;
}

export const Button = ({ variant = "primary", ...props }: ButtonProps) => {
    // Component implementation
};

export type { ButtonProps };
```

#### Accessibility

```tsx
// ✅ Good - Semantic HTML with ARIA
<button
  type="button"
  aria-label="Close dialog"
  aria-expanded={isOpen}
  className="..."
>
  {children}
</button>

// ❌ Bad - Generic div without accessibility
<div onClick={handleClick} className="...">
  {children}
</div>
```

#### Responsive design

```tsx
// ✅ Good - Mobile-first responsive classes
<div className="flex flex-col gap-2 md:flex-row md:gap-4">
  {children}
</div>

// ❌ Bad - Desktop-first approach
<div className="flex-row gap-4 max-md:flex-col max-md:gap-2">
  {children}
</div>
```

#### Styling

```tsx
import { cx } from "@/utils/cx";

// ✅ Good - Use cx utility for conditional classes
<button className={cx(
  "base-classes",
  variant === "primary" && "primary-classes",
  size === "lg" && "large-classes",
  disabled && "disabled-classes"
)}>

// ❌ Bad - String concatenation
<button className={`base-classes ${variant === "primary" ? "primary-classes" : ""}`}>
```

### Component structure

```
components/category/component-name/
├── component-name.tsx        # Main component
├── component-name.story.tsx  # Storybook stories
├── component-name.demo.tsx   # Usage demos
└── base-components/          # Sub-components (if needed)
    ├── sub-component.tsx
    └── index.tsx
```

### File naming

- **Components**: `kebab-case.tsx` (e.g., `date-picker.tsx`)
- **Stories**: `component-name.story.tsx`
- **Demos**: `component-name.demo.tsx`
- **Types**: Export from main component file

## 📖 Component docs in Storybook

A component's Docs page in Storybook shows its skill page
(`skills/fa-design-system/references/components/<name>.md`), the single written source that agents
read and the package ships. Don't write the same text again in a story file, MDX or `argTypes`.

The shared page (`.storybook/docs-page.tsx`) renders: title → the skill page's intro (purpose, Figma
line, import) → the first story with the props table → the rest of the skill page without its
`## Props` section → the other stories. Story files without a skill page get Storybook's default
Docs page.

**Attach a skill page** in the story file's meta (the meta needs `tags: ["autodocs"]`):

```tsx
import badgeDoc from "@/skills/fa-design-system/references/components/badge.md?raw";

const meta = {
    component: Badge,
    tags: ["autodocs"],
    parameters: { skillDoc: badgeDoc },
} satisfies Meta<typeof Badge>;
```

Leave `docs.description.component` unset on that meta, or the text shows twice.

**Multi-component pages** (one `.md` covers several components, e.g. `button.md` for `Button`,
`ButtonUtility` and `CloseButton`): the main component's story file gets `skillDoc`. The others get
only a part of the page, or a pointer, through `docs.description.component` on the default page:

```tsx
import { skillDoc } from "@/components/internal/skill-doc";

parameters: {
    // A part of the page (sections by their `## ` heading)…
    docs: { description: { component: skillDoc(buttonDoc, { sections: ["Use when", "Example"] }) } },
    // …or a one-line pointer.
    docs: { description: { component: "Usage rules: see Base components / Buttons / Button." } },
},
```

`skillDoc(md, { sections, omit, intro, headings })` keeps or leaves out `## ` sections (headings
inside code fences don't count) and points relative `.md` links at GitHub; `headings: false` drops
the kept sections' `## ` lines, so a section can serve as a page's intro (Social buttons, App store
buttons). `skillDocSections(md)` returns the intro and the sections.

**Experimental stories** (prototypes, comparisons) stay off the Docs page with
`MyStory.tags = ["!autodocs"];`. They stay on the canvas and in the sidebar.

**Props come from TypeScript.** The props table is generated by `react-docgen-typescript` from the
component's props interface and its JSDoc (`/** The size variant */`, defaults from destructuring
defaults). Props inherited from `node_modules` (HTML attributes, React Aria) are left out. Document a
prop with JSDoc in the component file, not with `argTypes` in the story; use `argTypes` only for
controls (`control`, `options`, `mapping`, e.g. `iconArgType()`). If a prop's type shows wrong, fix
the component's types (an exported, named props interface) rather than copying it into `argTypes`.

## 🔍 Code review process

### Before submitting

1. **Run tests**

    ```bash
    npm test           # type-check + lint + prettier + token parity
    npm run build      # the installable package in ./dist
    ```

2. **Test in Storybook**

    ```bash
    npm run storybook
    # Navigate to your component and test all variants
    ```

3. **Accessibility Check**
    - Test with keyboard navigation
    - Verify screen reader compatibility
    - Check color contrast ratios
    - Ensure focus management

### PR requirements

#### Title Format

```
feat: add new component name
fix: resolve accessibility issue in component
docs: improve component documentation
style: update component styling
```

#### Description template

```markdown
## Changes

- Brief description of what changed
- Why this change was needed

## Testing

- [ ] Tested in Storybook
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Mobile responsive
- [ ] TypeScript compiles
- [ ] No lint errors

## Screenshots

[Include before/after screenshots for UI changes]

## Related issues

Closes #123
```

### Review criteria

- **Functionality** - Component works as expected
- **Accessibility** - Meets WCAG 2.1 AA standards
- **Performance** - No unnecessary re-renders or heavy computations
- **API Design** - Consistent with existing components
- **Documentation** - Clear stories and examples
- **Code Quality** - TypeScript, ESLint, and Prettier compliant

## 🎨 Design guidelines

### Color usage

```tsx
// ✅ Use semantic color tokens
className = "text-fg-primary bg-bg-secondary border-border-primary";

// ❌ Avoid hardcoded colors
className = "text-gray-900 bg-white border-gray-200";
```

### Spacing

```tsx
// ✅ Use consistent spacing scale
className = "p-4 gap-3 mt-6";

// ❌ Avoid arbitrary values
className = "p-[17px] gap-[13px] mt-[25px]";
```

### Typography

```tsx
// ✅ Use design system typography
className = "text-lg font-semibold leading-7";

// ❌ Avoid custom font sizes
className = "text-[19px] font-[650] leading-[1.4]";
```

## 🧪 Testing

### Manual testing checklist

- [ ] Component renders without errors
- [ ] All props work as expected
- [ ] Responsive across screen sizes
- [ ] Keyboard navigation functional
- [ ] Screen reader announces correctly
- [ ] Focus management works properly
- [ ] No console errors or warnings

### Accessibility testing

- Use **VoiceOver** (Mac) or **NVDA** (Windows)
- Test with **keyboard only** navigation
- Check **focus indicators** are visible
- Verify **color contrast** meets standards
- Ensure **semantic markup** is used

## 🚨 Common issues

### Import paths

```tsx
// ✅ Correct - Use path aliases
import { Button } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";

// ❌ Wrong - Relative imports
import { Button } from "../../../base/buttons/button";
import { cx } from "../../../utils/cx";
```

### Component props

```tsx
// ✅ Good - Extend HTML attributes
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary";
}

// ❌ Bad - Missing HTML attributes
interface ButtonProps {
    variant?: "primary" | "secondary";
    onClick?: () => void; // Missing other button attributes
}
```

### Default props

```tsx
// ✅ Good - Default parameters
export const Button = ({
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) => {

// ❌ Bad - Default props (deprecated in TypeScript)
Button.defaultProps = {
  variant: "primary",
  size: "md"
};
```

## 💬 Getting help

- **GitHub Issues** - For bug reports and feature requests
- **GitHub Discussions** - For questions and community help
- **Discord** - Real-time chat with maintainers and community

## 📚 Resources

- [Component API Patterns](https://react-spectrum.adobe.com/react-aria/patterns.html)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

Thank you for contributing to the Fa Design System! 🎉
