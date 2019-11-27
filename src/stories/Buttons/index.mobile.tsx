import { storiesOf } from "@storybook/react-native";
import GradientButtonStory from "./GradientButton";
import TransparentButtonStory from "./TransparentButton";
import { importInfo } from "src/stories/Helpers";
import { withKnobs } from "@storybook/addon-knobs/react";

const stories = storiesOf("Buttons", module);
stories.addDecorator(withKnobs);

stories.add("GradientButton", GradientButtonStory, importInfo("GradientButton"));
stories.add("TransparentButton", TransparentButtonStory, importInfo("TransparentButton"));

export default stories;
