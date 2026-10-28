import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import fileUploadDoc from "@/skills/fa-design-system/references/components/file-upload.md?raw";
import { cx } from "@/utils/cx";
import { Draggable } from "./draggable";
import { FileListItemProgressBar, FileListItemProgressFill, FileUploadDropZone } from "./file-upload-base";
import * as FileUploads from "./file-upload.demo";

const meta = {
    title: "Application/File upload",
    component: FileUploadDropZone,
    subcomponents: { FileListItemProgressBar, FileListItemProgressFill },
    tags: ["autodocs"],
    parameters: {
        // The Docs page text is the skill page (see .storybook/docs-page.tsx); the props tables
        // come from the types and JSDoc in file-upload-base.tsx.
        skillDoc: fileUploadDoc,
    },
    decorators: [
        (Story, { viewMode }) => (
            <div data-drag-constraint className={cx("flex w-full flex-col items-center gap-12 bg-primary p-8", viewMode !== "docs" && "min-h-screen")}>
                <Story />
            </div>
        ),
    ],
    args: { hint: "PDF, PNG or JPG (max. 10 MB)", accept: ".pdf,image/*", allowsMultiple: true, isDisabled: false },
    argTypes: {
        // Controls only: types, defaults and descriptions come from docgen.
        onDropFiles: { control: false },
        onDropUnacceptedFiles: { control: false },
        onSizeLimitExceed: { control: false },
    },
} satisfies Meta<typeof FileUploadDropZone>;

export default meta;

type Story = StoryObj<typeof meta>;

/** `FileUpload.DropZone` alone — edit props live in the Controls panel. */
export const Playground: Story = {
    render: (args) => (
        <div className="w-full max-w-xl">
            <FileUploadDropZone {...args} />
        </div>
    ),
};

export const FileUploadProgressBar = () => (
    <>
        <div className="mb-12 flex">
            <Draggable name="chatgpt-clone.ts" type="application/typescript" size={1024 * 1024 * 0.5} />
            <Draggable name="Side project.mp4" type="video/mp4" size={1024 * 1024 * 2.2} />
            <Draggable name="Invoice #876.pdf" type="application/pdf" size={1024 * 1024 * 1.2} />
        </div>
        <div className="flex w-full max-w-xl flex-col gap-12">
            <FileUploads.FileUploadProgressBar />
        </div>
    </>
);
FileUploadProgressBar.storyName = "File upload progress bar";

export const FileUploadProgressBarDisabled = () => (
    <>
        <div className="mb-12 flex">
            <Draggable name="chatgpt-clone.ts" type="application/typescript" size={1024 * 1024 * 0.5} />
            <Draggable name="Side project.mp4" type="video/mp4" size={1024 * 1024 * 2.2} />
            <Draggable name="Invoice #876.pdf" type="application/pdf" size={1024 * 1024 * 1.2} />
        </div>
        <div className="flex w-full max-w-xl flex-col gap-12">
            <FileUploads.FileUploadProgressBar isDisabled />
        </div>
    </>
);
FileUploadProgressBarDisabled.storyName = "File upload progress bar disabled";

export const FileUploadProgressFill = () => (
    <>
        <div className="mb-12 flex">
            <Draggable name="chatgpt-clone.ts" type="application/typescript" size={1024 * 1024 * 0.5} />
            <Draggable name="Side project.mp4" type="video/mp4" size={1024 * 1024 * 2.2} />
            <Draggable name="Invoice #876.pdf" type="application/pdf" size={1024 * 1024 * 1.2} />
        </div>
        <div className="flex w-full max-w-xl flex-col gap-12">
            <FileUploads.FileUploadProgressFill />
        </div>
    </>
);
FileUploadProgressFill.storyName = "File upload progress fill";

export const FileUploadProgressFillDisabled = () => (
    <>
        <div className="mb-12 flex">
            <Draggable name="chatgpt-clone.ts" type="application/typescript" size={1024 * 1024 * 0.5} />
            <Draggable name="Side project.mp4" type="video/mp4" size={1024 * 1024 * 2.2} />
            <Draggable name="Invoice #876.pdf" type="application/pdf" size={1024 * 1024 * 1.2} />
        </div>
        <div className="flex w-full max-w-xl flex-col gap-12">
            <FileUploads.FileUploadProgressFill isDisabled />
        </div>
    </>
);
FileUploadProgressFillDisabled.storyName = "File upload progress fill disabled";
