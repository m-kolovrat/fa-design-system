# Textarea

Several lines of free text: a reader comment, a tip to the newsroom, a message to customer
service. React Aria `TextField` with a `TextArea`. Figma: Textarea.

```ts
import { TextArea } from "@/components/base/textarea/textarea";
```

## Use when

- The answer can run over one line (beskrivelse, kommentar, melding).

## Use something else when

- A short single value (name, e-post, ticker): `Input`.
- Rich formatting (bold, links): there is no text editor component yet (coverage gap); ask first.

## Rules

- **textarea-export-name** MUST Import `TextArea` (capital A). `TextAreaBase` is the bare field for
  composing inside your own React Aria `TextField`.
- **textarea-label** MUST Pass `label`, or `aria-label` when there's no visible label. Because
  unlike `Input`, `TextArea` has no placeholder fallback and is otherwise unnamed.
- **textarea-rows** SHOULD Set `rows` to the expected length of the answer (3 for a short note, 6+
  for a letter). Because the box size tells the person how much to write; it can still be
  resized.
- **textarea-limit** SHOULD When there's a length limit, set `maxLength` and show the count in
  `hint` ("124 av 500 tegn").
- **textarea-errors** MUST Show errors with `isInvalid` + `hint`. Because the ring and hint color
  follow `isInvalid`.
- **textarea-size** SHOULD Use the default `md`; use `sm` only next to `sm` inputs in a dense form.

## Props

| Prop                                    | Values                                          | Default |
| :-------------------------------------- | :---------------------------------------------- | :------ |
| `size`                                  | `sm` · `md`                                     | `md`    |
| `label`                                 | string                                          |         |
| `hint`                                  | ReactNode                                       |         |
| `tooltip`                               | string: help icon after the label               |         |
| `placeholder`                           | string                                          |         |
| `rows`, `cols`                          | number                                          |         |
| `isRequired`, `hideRequiredIndicator`   | boolean                                         |         |
| `isInvalid`, `isDisabled`, `isReadOnly` | boolean                                         |         |
| `textAreaClassName`                     | class for the textarea itself (e.g. `min-h-40`) |         |
| `textAreaRef`                           | ref to the `<textarea>`                         |         |

Plus React Aria `TextField` props: `value`, `defaultValue`, `onChange(value: string)`, `name`,
`maxLength`, `validate`. `className` sets the outer wrapper.

## Figma parity

Figma has one Textarea size; code has `sm` and `md` (`docs/figma-parity.md` §4). Suggested action:
add a size to Figma, or drop one in code. Until that's decided, prefer `md`.

## Accessibility

- The hint is linked as the description, or as the error message when invalid.
- Don't disable resizing; people who zoom need to make it bigger.

## Example

```tsx
const [message, setMessage] = useState("");

<TextArea
    isRequired
    label="Tips til redaksjonen"
    placeholder="Hva har skjedd, og hvem er involvert?"
    rows={6}
    maxLength={2000}
    value={message}
    onChange={setMessage}
    hint={`${message.length} av 2000 tegn. Vi behandler tips konfidensielt.`}
/>;
```

## See also

Storybook: Base components / Inputs / Textarea. Related: [input](input.md), [form](form.md).
