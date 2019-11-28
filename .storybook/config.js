import React from "react";
import { View } from "react-native";
import { configure, addDecorator } from "@storybook/react";
import "./addons";
import { withKnobs } from "@storybook/addon-knobs/react";
import { withInfo } from "@storybook/addon-info";
import { withSmartKnobs } from "storybook-addon-smart-knobs";
import { addReadme } from "storybook-readme";
import { addReadmeToStory } from "./readmeDecorator";
import StoryWrapper from "src/Wrappers/StoryWrapper";

addDecorator(withSmartKnobs({ ignoreProps: ["gradientStartColor", "gradientEndColor"] }));
addDecorator(withKnobs);
addDecorator(withInfo);
addDecorator(addReadme);

addDecorator(addReadmeToStory);
addDecorator((story) => <StoryWrapper>{story()}</StoryWrapper>);

const req = require.context("../src", true, /.*story.tsx/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
