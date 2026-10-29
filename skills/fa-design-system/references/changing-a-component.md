# Changing a component

What to do when a library component doesn't do what the screen needs. Take the lightest option
that works, in this order, and say in your reply which one you used.

When a component doesn't do what the screen needs, take the lightest option that works, in this
order, and say in your reply which one you used:

1. **Props and layout classes.** Use the component's props; `className` only for layout (width,
   margins, placement, grid spans), never for color, size or radius.
2. **Wrap it** in an app component for app-specific behavior or content, keeping the library
   component inside unchanged.
3. **Ask for a variant.** A missing size, color or state goes to the design system owner: it's
   designed in Figma, added to the library and shipped in the next version. Use the closest
   existing variant until then and say so.
4. **Patch it temporarily** with `patch-package` for an urgent bug fix, and report the bug so the
   patch can be removed after the next release.
5. **Try a branch.** Point the dependency at a branch or tag of the library
   (`github:m-kolovrat/fa-design-system#fix-table`) to test a change before it's released.
6. **Eject it** only when the app really needs its own version: copy the source from
   `node_modules/fa-design-system/components/<path>.tsx` into the app, change its `@/…` imports to
   `fa-design-system/…`, and import the copy instead. The app then owns that file and stops getting
   its updates. Ejecting always needs the person's go-ahead, and it's reported as a clash.
