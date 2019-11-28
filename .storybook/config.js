import * as React from "react";
import { configure, addDecorator } from "@storybook/react";
import "./addons";
import { withKnobs } from "@storybook/addon-knobs/react";
import { withInfo } from "@storybook/addon-info";
import StoryWrapper from "src/Wrappers/StoryWrapper";
import { withSmartKnobs } from "storybook-addon-smart-knobs";
import { addReadme } from "storybook-readme";

addDecorator(withSmartKnobs());
addDecorator(withKnobs);
addDecorator(withInfo);
addDecorator(addReadme);
addDecorator((story) => {
  return <StoryWrapper>{story}</StoryWrapper>;
});

const req = require.context("../src", true, /.*story.tsx/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
