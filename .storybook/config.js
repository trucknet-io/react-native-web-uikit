import React from "react";
import { configure, addDecorator } from "@storybook/react";
import "./addons";
import { withKnobs } from "@storybook/addon-knobs/react";
import { withInfo } from "@storybook/addon-info";
import ThemeProviderWrapper from "src/Wrappers/ThemeProviderWrapper";
import StoryWrapper from "src/Wrappers/StoryWrapper";

addDecorator(withKnobs);
addDecorator(withInfo);

addDecorator((story) => {
  return (
    <ThemeProviderWrapper>
      <StoryWrapper>{story}</StoryWrapper>
    </ThemeProviderWrapper>
  );
});

function loadStories() {
  require("../src/stories");
}

configure(loadStories, module);
