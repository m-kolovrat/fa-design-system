# Form

The `<form>` around fields. `Form` is React Aria's form (native or ARIA validation, server errors);
`HookForm` + `FormField` connect fields to `react-hook-form`.
Logic only, nothing visual. Figma: none (code-only by design, `docs/figma-parity.md` §3).

```ts
import { Form } from "fa-design-system/components/base/form/form";
import { FormField, HookForm } from "fa-design-system/components/base/form/hook-form";
```

## Use when

- `Form`: a short form (nyhetsbrev, kontakt oss, logg inn) where React Aria's built-in
  `isRequired` / `type` / `validate` checks are enough.
- `HookForm`: a longer form with cross-field rules, a schema, or values you need while typing
  (bestilling, registrering av abonnement).

## Use something else when

- A single search field that filters on input: a bare `Input` with `type="search"`, no form.

## Rules

- **form-submit-button** MUST Submit with `<Button type="submit">`, and let Enter submit. Because
  React Aria runs validation and focuses the first invalid field on submit.
- **form-errors** MUST Show field errors through the field's `isInvalid` + `hint` (or
  `validate` / `validationErrors`), never as loose red text. Because the hint is linked to the
  field as its error message.
- **form-server-errors** SHOULD Pass server-side errors to `Form` as `validationErrors`
  (`{ email: "E-posten er allerede registrert" }`) keyed by field `name`.
- **form-names** MUST Give every field a `name`. Because `FormData`, `validationErrors` and
  react-hook-form all key on it.
- **form-hook-submit** MUST Pass `onSubmit={form.handleSubmit(onValid)}` to `HookForm`, and render
  each field inside `FormField` with `name` and `control={form.control}`. Because `HookForm` only
  provides the form context; it doesn't submit on its own.
- **form-hook-wire** MUST In `FormField`'s render function, pass `field.value`, `field.onChange`,
  `field.onBlur`, `field.name` and `field.ref` to the field, and map `fieldState.invalid` /
  `fieldState.error?.message` to `isInvalid` / `hint`.
- **form-layout** SHOULD Stack fields with `flex flex-col gap-4` (gap-5 or gap-6 between sections)
  and put the actions last, primary on the right.

## Props

`Form`: React Aria `Form` props: `onSubmit`, `action`, `validationBehavior` (`native` · `aria`),
`validationErrors`, `className`, plus `<form>` attributes.

`HookForm`: `form` (the `useForm()` return), plus the same `Form` props.

`FormField`: `name`, `control`, `children` as `({ field, fieldState }) => ReactNode` (or plain
nodes). `useFormFieldContext()` gives a field's state inside a `FormField`.

## Accessibility

- `Form` defaults to `validationBehavior="native"`: the browser blocks submit until required and
  typed fields are valid. Use `"aria"` to show errors inline only.
- Mark required fields with `isRequired` (the label gets `*`); explain optional ones in the hint.

## Example

```tsx
const form = useForm<{ email: string }>({ defaultValues: { email: "" } });

const subscribe = async ({ email }: { email: string }) => {
    const result = await subscribeToNewsletter(email);
    if (!result.ok) form.setError("email", { message: "E-posten er allerede påmeldt" });
};

<HookForm form={form} onSubmit={form.handleSubmit(subscribe)} className="flex flex-col gap-4">
    <FormField name="email" control={form.control}>
        {({ field, fieldState }) => (
            <Input
                isRequired
                type="email"
                label="E-post"
                placeholder="kari.nordmann@firma.no"
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                ref={field.ref}
                isInvalid={fieldState.invalid}
                hint={fieldState.error?.message ?? "Morgenbrevet fra Finansavisen, hver hverdag kl. 06.30."}
            />
        )}
    </FormField>
    <Button type="submit" isLoading={form.formState.isSubmitting}>
        Meld meg på
    </Button>
</HookForm>;
```

`useForm` comes from `react-hook-form`. For schema validation with `zod` you need
`@hookform/resolvers`, which isn't installed; ask before adding it.

## See also

Storybook: Base components / Form. Related: [input](input.md), [select](select.md),
[checkbox](checkbox.md), [button](button.md).
