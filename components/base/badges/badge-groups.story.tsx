import type { FC } from "react";
import { BadgeGroup as BadgeGroupComponent } from "@/components/base/badges/badge-groups";
import * as BadgeGroup from "@/components/base/badges/badge-groups.demo";

export default {
    title: "Base components/Badge groups",
    component: BadgeGroupComponent,
    tags: ["autodocs"],
    parameters: {
        // badge.md covers BadgeGroup; its full page is on Base components / Badges.
        docs: {
            description: { component: "A message with a small badge inside, for announcements. Usage rules: see **Base components / Badges** (`badge.md`)." },
        },
    },
    decorators: [
        (Story: FC) => (
            <div className="flex h-screen w-full bg-primary p-4 [.docs-story_&]:h-auto">
                <Story />
            </div>
        ),
    ],
};

export const PillColorLeading = () => <BadgeGroup.PillColorLeading />;
PillColorLeading.storyName = "Pill color leading";

export const PillColorTrailing = () => <BadgeGroup.PillColorTrailing />;
PillColorTrailing.storyName = "Pill color trailing";

export const BadgeModernLeading = () => <BadgeGroup.BadgeModernLeading />;
BadgeModernLeading.storyName = "Badge modern leading";

export const BadgeModernTrailing = () => <BadgeGroup.BadgeModernTrailing />;
BadgeModernTrailing.storyName = "Badge modern trailing";
