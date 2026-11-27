import { Clashes } from "./clashes";
import { DisabledTab } from "./disabled-tab";
import { OpenDecisions } from "./open-decisions";

export default {
    title: "Runs/2026-11-27/open-decisions",
    parameters: { layout: "fullscreen" },
};

export const Decisions = () => <OpenDecisions />;

export const DisabledTabOptions = () => <DisabledTab />;
DisabledTabOptions.storyName = "Disabled tab options";

export const BriefAndRuleClashes = () => <Clashes />;
BriefAndRuleClashes.storyName = "Brief and rule clashes";
