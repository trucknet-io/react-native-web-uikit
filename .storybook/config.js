import React from "react";
import { configure, addDecorator } from "@storybook/react";
import "./addons";
import { withKnobs } from "@storybook/addon-knobs/react";
import { withInfo } from "@storybook/addon-info";
import StoryWrapper from "src/Wrappers/StoryWrapper";

addDecorator(withKnobs);
addDecorator(withInfo);

addDecorator((story) => {
  return <StoryWrapper>{story}</StoryWrapper>;
});

function loadStories() {
  require("../src/stories");
}

configure(loadStories, module);
