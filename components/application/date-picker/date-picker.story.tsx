"use client";

import type { Meta, StoryObj } from "@storybook/react-vite";
import datePickerDoc from "@/skills/fa-design-system/references/components/date-picker.md?raw";
import { cx } from "@/utils/cx";
import { Calendar } from "./calendar";
import { DatePicker } from "./date-picker";
import * as Demos from "./date-picker.demo";
import { DateRangePicker } from "./date-range-picker";
import { RangeCalendar } from "./range-calendar";

const meta = {
    title: "Application/Date pickers",
    component: DatePicker,
    subcomponents: { DateRangePicker, Calendar, RangeCalendar },
    tags: ["autodocs"],
    parameters: {
        // The Docs page text is the skill page (see .storybook/docs-page.tsx); the props tables
        // come from the types and JSDoc in date-picker.tsx, date-range-picker.tsx, calendar.tsx
        // and range-calendar.tsx.
        skillDoc: datePickerDoc,
    },
    decorators: [
        (Story, { viewMode }) => (
            <div className={cx("flex items-start justify-center bg-tertiary p-8", viewMode !== "docs" && "min-h-screen")}>
                <div className="flex w-75 justify-end">
                    <Story />
                </div>
            </div>
        ),
    ],
    args: { size: "sm", isDisabled: false },
    argTypes: {
        // Controls only: types, defaults and descriptions come from docgen.
        value: { control: false },
        defaultValue: { control: false },
        minValue: { control: false },
        maxValue: { control: false },
        onChange: { control: false },
        onApply: { control: false },
        onCancel: { control: false },
        isDateUnavailable: { control: false },
    },
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Single interactive date picker — edit props live in the Controls panel; press it to open the calendar. */
export const Playground: Story = {};

export const CalendarDemo = () => <Demos.CalendarDemo />;
CalendarDemo.storyName = "Calendar";

export const CalendarCardDemo = () => <Demos.CalendarCardDemo />;
CalendarCardDemo.storyName = "Calendar card";

export const DateTimePickerDemo = () => <Demos.DateTimePickerDemo />;
DateTimePickerDemo.storyName = "Date time picker";

export const DatePickerDemo = () => <Demos.DatePickerDemo />;
DatePickerDemo.storyName = "Date picker";

export const DatePickerControlledDemo = () => <Demos.DatePickerControlledDemo />;
DatePickerControlledDemo.storyName = "Date picker controlled";

export const RangeCalendarDemo = () => <Demos.RangeCalendarDemo />;
RangeCalendarDemo.storyName = "Range calendar";

export const RangeCalendarCardDemo = () => <Demos.RangeCalendarCardDemo />;
RangeCalendarCardDemo.storyName = "Range calendar card";

export const DateRangePickerDemo = () => <Demos.DateRangePickerDemo />;
DateRangePickerDemo.storyName = "Date range picker";

export const DateRangePickerControlledDemo = () => <Demos.DateRangePickerControlledDemo />;
DateRangePickerControlledDemo.storyName = "Date range picker controlled";

export const DarkModeDemo = () => <Demos.DarkModeDemo />;
DarkModeDemo.storyName = "Dark mode demo";
// A light/dark comparison showcase, not a usage example: stays on the canvas, off the Docs page.
DarkModeDemo.tags = ["!autodocs"];
