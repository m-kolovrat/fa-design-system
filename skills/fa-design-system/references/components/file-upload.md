# File upload

A drop zone plus a list of files with upload progress (`FileUpload`), and a bare trigger that
opens the file picker from any button (`FileTrigger`). Figma: File upload.

```ts
import { FileUpload, getReadableFileSize } from "fa-design-system/components/application/file-upload/file-upload-base";
import { FileTrigger } from "fa-design-system/components/base/file-upload-trigger/file-upload-trigger";
```

## Use when

- `FileUpload`: the person uploads one or more documents and should see progress and failures
  (årsrapport, ID-dokument til kundeservice, bilder til en annonse).
- `FileTrigger`: an existing button should open the picker ("Bytt profilbilde").

## Use something else when

- One file as a field among other inputs: `InputFile` (see [input-variants](input-variants.md)).

## Rules

- **file-upload-structure** MUST Compose `FileUpload.Root` > `FileUpload.DropZone` +
  `FileUpload.List` of `FileUpload.ListItemProgressBar` (or `ListItemProgressFill`). Use one item
  style per list.
- **file-upload-you-upload** MUST Do the upload yourself in `onDropFiles` and keep each file's
  `progress` (0–100) and `failed` in state. Because the drop zone only validates and hands over
  files; the list items only display what you pass.
- **file-upload-hint** MUST Pass a Norwegian `hint` naming the allowed types and size ("PDF eller
  JPG, maks 10 MB"). Because the default is an English sample ("SVG, PNG, JPG or GIF …").
- **file-upload-validate** MUST Set `accept` and `maxSize` (bytes), and handle
  `onDropUnacceptedFiles` and `onSizeLimitExceed` with a visible message (a `notify()` toast or
  the hint). Because rejected files are otherwise dropped silently.
- **file-upload-actions** SHOULD Pass `onDelete` on every item and `onRetry` on failed ones.
- **file-trigger-child** MUST Give `FileTrigger` exactly one pressable child, usually a `Button`.

## Props

`FileUpload.DropZone`:

| Prop                    | Values                                                                                       | Default                                 |
| :---------------------- | :------------------------------------------------------------------------------------------- | :-------------------------------------- |
| `accept`                | string (`".pdf,image/*"`)                                                                    | any type                                |
| `allowsMultiple`        | boolean; `false` keeps only the first dropped file                                           | `true`                                  |
| `maxSize`               | number, bytes                                                                                |                                         |
| `hint`                  | string; turns red when a rejected file reaches `onDropUnacceptedFiles` / `onSizeLimitExceed` | "SVG, PNG, JPG or GIF (max. 800x400px)" |
| `isDisabled`            | boolean                                                                                      |                                         |
| `onDropFiles`           | `(files: FileList) => void`                                                                  |                                         |
| `onDropUnacceptedFiles` | `(files: FileList) => void`                                                                  |                                         |
| `onSizeLimitExceed`     | `(files: FileList) => void`                                                                  |                                         |
| `className`             | string                                                                                       |                                         |

List items (`ListItemProgressBar` / `ListItemProgressFill`): `name`, `size` (bytes) and `progress`
(0–100, `100` shows as complete) are required; `failed`, `type` (file type for the icon, default
`empty`), `fileIconVariant` (default `default` on `ListItemProgressBar`, `solid` on
`ListItemProgressFill`), `onDelete`, `onRetry`, `className`. `getReadableFileSize(bytes)` formats a
size, rounded down ("2 MB").

`FileTrigger`: `acceptedFileTypes` (string[]), `allowsMultiple`, `acceptDirectory`,
`defaultCamera` (`user` · `environment`), `onSelect(files: FileList | null)`. The child's own
`onClick` still runs, before the file dialog opens.

## Figma parity

`FileTrigger` (file upload trigger) is code-only (`docs/figma-parity.md` §3). Suggested action: add
it to Figma, or accept it as code-only.

## Accessibility

- The drop zone has a real file input behind its link button, so it works without drag and drop.
- Known gap: "Click to upload" ("… and attach files" on mobile), "or drag and drop",
  "Uploading...", "Complete", "Failed", "Upload failed, please try again", "Try again" and the
  "Delete" tooltip are hard-coded English.
- Announce finished or failed uploads (a `notify()` toast); the progress bar alone is silent.

## Example

```tsx
<FileUpload.Root>
    <FileUpload.DropZone
        accept=".pdf"
        maxSize={10 * 1024 * 1024}
        hint="Kun PDF, maks 10 MB"
        onDropFiles={startUploads}
        onDropUnacceptedFiles={() => notify({ type: "error", title: "Bare PDF-filer kan lastes opp" })}
        onSizeLimitExceed={() => notify({ type: "error", title: "Filen er større enn 10 MB" })}
    />
    <FileUpload.List>
        {files.map((file) => (
            <FileUpload.ListItemProgressBar
                key={file.id}
                name={file.name}
                size={file.size}
                type="pdf"
                progress={file.progress}
                failed={file.failed}
                onDelete={() => removeFile(file.id)}
                onRetry={() => retryFile(file.id)}
            />
        ))}
    </FileUpload.List>
</FileUpload.Root>

<FileTrigger acceptedFileTypes={["image/jpeg", "image/png"]} onSelect={(files) => files && uploadAvatar(files[0])}>
    <Button color="secondary" iconLeading={Upload}>
        Bytt profilbilde
    </Button>
</FileTrigger>
```

## See also

Storybook: Application / File upload, Base components / File upload trigger. Related:
[input-variants](input-variants.md), [notification](notification.md), [progress](progress.md).
