import { storiesOf } from "@storybook/react-native";
import GradientButtonStory from "./GradientButton";
import TransparentButtonStory from "./TransparentButton";

import { withKnobs } from "@storybook/addon-knobs/react";
import { withInfo } from "@storybook/addon-info";
import { importInfo } from "src/stories/Helpers";

const stories = storiesOf("Buttons", module);

stories.addDecorator(withKnobs);
stories.addDecorator(withInfo);

stories.add("GradientButton", GradientButtonStory, importInfo("GradientButton"));
stories.add("TransparentButton", TransparentButtonStory, importInfo("TransparentButton"));

export default stories;
