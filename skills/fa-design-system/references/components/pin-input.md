# Pin input

A one-time or verification code typed into separate digit boxes (the code sent by SMS or e-post
at login, or when changing an e-post address). Built on `input-otp`. Figma: Verification code input
field (digit boxes: \_Mega input field base).

```ts
import { PinInput } from "fa-design-system/components/base/input/pin-input";
import { REGEXP_ONLY_DIGITS } from "input-otp";
```

## Use when

- The person enters a short code of fixed length (4–6 digits) sent to them.

## Use something else when

- A password or a code of unknown length: `Input type="password"` or `Input`.
- An account or card number: `Input` / `PaymentInput`.

## Rules

- **pin-structure** MUST Compose `PinInput` > `PinInput.Label` + `PinInput.Group` (with one
  `PinInput.Slot` per digit) + optional `PinInput.Description`. Because the label and description
  are linked to the hidden input through the root's ids.
- **pin-slots-match** MUST Render exactly `maxLength` slots with `index` 0 … n−1. Because a missing
  slot hides a typed digit, and `maxLength` defaults to 4.
- **pin-label** MUST Always render `PinInput.Label`. Because it replaces the group's built-in
  English name ("Enter your pin").
- **pin-digits** SHOULD Pass `pattern={REGEXP_ONLY_DIGITS}` for numeric codes and
  `autoComplete="one-time-code"` so phones offer the SMS code.
- **pin-states** MUST Set states on the root with `disabled` and `invalid` (not `isDisabled` /
  `isInvalid`), and pass `isInvalid` to `PinInput.Description` for the error text. Because the
  root drives the digit boxes, and the description doesn't turn red on its own.
- **pin-six-digits** SHOULD Split a 6-digit code 3 + 3 with `PinInput.Separator`.
- **pin-size** SHOULD Use `xxxs` / `xxs` / `xs` inside forms next to other inputs, and `sm` / `md` /
  `lg` on a dedicated verification screen.
- **pin-on-complete** SHOULD Verify in `onComplete` on the group rather than requiring a separate
  button press, but keep a submit button for people who paste or use assistive tech.

## Props

| Part                   | Props                                                                                                              | Default       |
| :--------------------- | :----------------------------------------------------------------------------------------------------------------- | :------------ |
| `PinInput` (root)      | `size`: `xxxs` (36px) · `xxs` (40px) · `xs` (44px) · `sm` (64px) · `md` (80px) · `lg` (96px)                       | `md`          |
|                        | `disabled`, `invalid`: boolean                                                                                     |               |
| `PinInput.Group`       | `maxLength`, `pattern`, `value`, `onChange(value: string)`, `onComplete`, `autoFocus`, `autoComplete`, `inputMode` | `maxLength` 4 |
| `PinInput.Slot`        | `index` (required)                                                                                                 |               |
| `PinInput.Label`       | `Label` props (`isRequired`, `tooltip`)                                                                            |               |
| `PinInput.Description` | `HintText` props (`isInvalid`)                                                                                     |               |
| `PinInput.Separator`   | none                                                                                                               |               |

Sizes are the digit box height. Disabled boxes use Figma's disabled tokens (`bg-disabled_subtle`,
`fg-disabled_subtle`, `border-disabled`), not `opacity-50`.

## Accessibility

- It's one real input under the boxes, so screen readers, paste and autofill work as usual.
- Each box has an English `aria-label` ("Enter digit 1 of 6"); the label you render is still the
  field's name.

## Example

```tsx
const [code, setCode] = useState("");

<PinInput size="sm" invalid={codeError}>
    <PinInput.Label>Engangskode</PinInput.Label>
    <PinInput.Group maxLength={6} pattern={REGEXP_ONLY_DIGITS} autoComplete="one-time-code" value={code} onChange={setCode} onComplete={verifyCode}>
        <PinInput.Slot index={0} />
        <PinInput.Slot index={1} />
        <PinInput.Slot index={2} />
        <PinInput.Separator />
        <PinInput.Slot index={3} />
        <PinInput.Slot index={4} />
        <PinInput.Slot index={5} />
    </PinInput.Group>
    <PinInput.Description isInvalid={codeError}>
        {codeError ? "Koden er feil eller utløpt. Be om en ny kode." : "Vi har sendt en kode på SMS til 912 34 567."}
    </PinInput.Description>
</PinInput>;
```

## See also

Storybook: Base components / Inputs (Verification code input, Input OTP). Related:
[input](input.md), [form](form.md).
