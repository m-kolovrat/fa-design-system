# Input size comparison

> **Decided 2026-11-27: fields are `sm` only (36 px).** `Input`, its variants and the selects no
> longer have a `size` prop, so this page now renders the same 36 px form in all three rows. It is
> kept as the record of the comparison; the screenshots sent on 2026-11-27 show what md and lg
> looked like.

**Prompt:** the design owner is deciding whether to drop some of the field sizes (`sm` / `md` / `lg` =
36 / 40 / 44 px) and asked for a mock page with a form and some paragraphs at each size, to compare
and decide afterwards.

- **What it shows:** the same "Tips redaksjonen" form three times, at `sm`, `md` and `lg`, each row
  labelled with its size and px height. Next to each form, a card with a headline, a dateline and
  three body paragraphs in `prose`, so field height can be judged against body text and the button.
- **Components:** `Input` (label + hint; leading icon `Mail`), `Select`, `InputGroup` with an
  `InputGroup.Prefix` (`https://`) and `InputBase`, `TextArea`, `Checkbox`, `Button` (submit, size
  matched to the field: sm 36 · md 40 · lg 44 px). All imported by package path.
- **Sizes set on purpose:** every field has an explicit `size`, which rule **fa-field-size** allows
  because the comparison asks for it. A normal page leaves `size` unset.
- **TextArea has no `lg`:** it has only `sm` and `md`, so the `lg` form shows it at `md` and says so
  in its hint.
- **Checkbox has no `size` prop** (the size-variant cleanup on `chore/size-variant-cleanup` makes it
  one size), so it is the same box in all three forms.
- **Layout:** the 980 px column (`max-w-[1028px] p-4 md:p-6`), one two-column row per size (a form
  card and an article card, one column below `md`). No `SiteHeader` / `SiteFooter`: this is a
  comparison sheet, not a site page.
- **Placeholders:** the article figures (Equinor result, share price, index move) and the analyst
  quote are invented.
- **Patterns:** no new patterns or clashes. The body text is `prose` (16/24); the live article body is
  18/30, which matters when judging a field next to body text.
