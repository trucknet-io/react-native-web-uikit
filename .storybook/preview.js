import React from "react";
import { addDecorator, addParameters } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs/react";
import { addReadme } from "storybook-readme";
import { addReadmeToStory } from "./readmeDecorator";
import StoryWrapper from "src/Wrappers/StoryWrapper";
import { setOptions } from "@storybook/addon-options";
import { DocsPage, DocsContainer } from "@storybook/addon-docs/blocks";

setOptions({
  hierarchySeparator: /\/|\./,
  hierarchyRootSeparator: /\|/,
});
addDecorator(withKnobs);
addDecorator(addReadme);

addDecorator(addReadmeToStory);
addDecorator((story) => {
  return <StoryWrapper>{story()}</StoryWrapper>;
});
addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
  options: {},
});
