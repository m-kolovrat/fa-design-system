import type { ComponentPropsWithRef } from "react";
import type { Meta } from "@storybook/react-vite";
import carouselDoc from "@/skills/fa-design-system/references/components/carousel.md?raw";
import { cx } from "@/utils/cx";
import { Carousel, type CarouselContentProps, type CarouselProps, type TriggerProps } from "./carousel-base";
import * as Carousels from "./carousel.demo";

/*
 * The parts of `Carousel` (an object of components), for their props tables on the Docs page
 * (docgen only reads exported components). Not stories.
 */
/**
 * `Carousel.Root`: holds the Embla carousel state; everything else goes inside it. Takes `div` props.
 * @visibleName Carousel.Root
 */
export const CarouselRootDoc = (props: ComponentPropsWithRef<"div"> & CarouselProps) => <Carousel.Root {...props} />;
/** `Carousel.Content`: the scrolling track (set the gap here, e.g. `gap-2`). */
export const CarouselContentDoc = (props: CarouselContentProps) => <Carousel.Content {...props} />;
/** `Carousel.Item`: one slide; `basis-full` by default, `basis-1/2 md:basis-1/3` for several per view. Takes `div` props. */
export const CarouselItemDoc = (props: ComponentPropsWithRef<"div">) => <Carousel.Item {...props} />;
/** `Carousel.PrevTrigger` and `Carousel.NextTrigger`: scroll one slide back or forward; disabled at the ends. */
export const CarouselTriggerDoc = (props: Omit<TriggerProps, "direction">) => <Carousel.PrevTrigger {...props} />;

const meta = {
    title: "Application/Carousels",
    component: CarouselRootDoc,
    subcomponents: {
        "Carousel.Content": CarouselContentDoc,
        "Carousel.Item": CarouselItemDoc,
        "Carousel.PrevTrigger / NextTrigger": CarouselTriggerDoc,
    },
    excludeStories: /Doc$/,
    tags: ["autodocs"],
    parameters: {
        // The Docs page text is the skill page (see .storybook/docs-page.tsx); the props tables
        // come from the types and JSDoc in carousel-base.tsx.
        skillDoc: carouselDoc,
        // The stories are fixed demos; the table documents the parts, it doesn't drive them.
        controls: { disable: true },
    },
    decorators: [
        (Story, { viewMode }) => (
            <div className={cx("flex items-center justify-center bg-primary p-8", viewMode !== "docs" && "min-h-screen")}>
                <div>
                    <Story />
                </div>
            </div>
        ),
    ],
} satisfies Meta<typeof CarouselRootDoc>;

export default meta;

export const CarouselMd = () => <Carousels.CarouselMd />;
CarouselMd.storyName = "Carousel md";

export const CarouselLg = () => <Carousels.CarouselLg />;
CarouselLg.storyName = "Carousel lg";
