import { Controls, DocsPage, Markdown, Primary, Stories, Title, useOf } from "@storybook/addon-docs/blocks";
import { skillDoc } from "../components/internal/skill-doc";

/**
 * The Docs page of every story file whose meta sets `parameters.skillDoc` (a skill page imported
 * with `?raw`). The skill page is the written source; props come from TypeScript (docgen):
 *
 * Title → intro (purpose, Figma line, import) → primary story + props table → the rest of the
 * skill page without its `## Props` section (the table replaces it) → the other stories.
 *
 * Story files without `skillDoc` get Storybook's default autodocs page. Stories tagged
 * `!autodocs` (experiments, prototypes) stay off both. See CONTRIBUTING.md.
 */
export const SkillDocsPage = () => {
    const { preparedMeta } = useOf("meta", ["meta"]);
    const markdown: unknown = preparedMeta.parameters?.skillDoc;

    if (typeof markdown !== "string") return <DocsPage />;

    return (
        <>
            <Title />
            <Markdown>{skillDoc(markdown, { sections: [], intro: true })}</Markdown>
            <Primary />
            <Controls />
            <Markdown>{skillDoc(markdown, { intro: false, omit: ["Props"] })}</Markdown>
            <Stories includePrimary={false} />
        </>
    );
};
