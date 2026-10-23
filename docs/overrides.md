# Style overrides

Every place where a library component is restyled for one context instead of using its own
variants. Content overrides (text, icon swaps, hiding a layer) are normal component use and
are not listed here.

**Last verified:** 2026-10-23 (search focus and AI star).

## Rules

- **Contain it.** An override lives in one place on each side: a `_` sub-component in Figma
  that wraps the library component, and one config or wrapper in code. Never repeat it on
  instances.
- **Use tokens.** Bind Figma overrides to variables and use token classes in code. No raw hex.
- **Cover the states.** If the component has hover, focus or filled states, the override covers
  them too (in Figma as variants of the `_` sub-component, in code with state variants such as
  `hover:` or `data-focus-within:`).
- **Promote on the second use.** When a second, unrelated place needs the same restyle, it stops
  being an override: design a variant of the library component in Figma, add it as a prop in
  code, and remove the row here.
- **Record it.** Add a row below in the same change that introduces the override, and point the
  Figma component description and the code comment at this file.

`docs/figma-parity.md` is for places where Figma and code disagree. An override that exists the
same way on both sides is not a parity gap, so it goes here instead.

## Register

| Override                 | Library component        | What changes                                                                                                                                                                                                                                                                                                                                                                                      | Figma                                                                                                                                  | Code                                                                                                                                                            | Why                                                                     |
| ------------------------ | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Header search field      | Input field (sm, md)     | At rest: fill = brand dark (Fa `brand-800`, Kapital `orange-dark-800`, Motor `gray-900`), no border, placeholder and icons in the brand light color, typed text `text-primary_on-brand`. While focused it switches back to the Input's own look (white fill, dark text, `ring-brand`), like finansavisen.no. Adds a decorative AI star (`Ai`) on the right, with `pr-9` on the input to make room | `_Header search` (Brand × Size × State: Placeholder, Filled, Focused, with the AI star; Focused = default Input look), Navigation page | `siteBrands[brand].search` in `components/application/site-header/site-brands.ts` (wrapper / input / icon / ai), applied by `HeaderSearch` in `site-header.tsx` | A white field stands out too much on the brand bar; matches production  |
| Header "Logg inn" button | Button, Primary (sm, md) | Kapital: fill `orange-dark-800`, hover `orange-dark-900`. Motor: fill `gray-600`, hover `gray-700`. Fa: no change                                                                                                                                                                                                                                                                                 | `_Header login` (Brand × Size × State: Default, Hover), Navigation page                                                                | `siteBrands[brand].loginButton` in `site-brands.ts`, passed to `Button` as `className`                                                                          | The Fa blue clashes with the Kapital and Motor bars; matches production |
