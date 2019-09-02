import { storiesOf } from "@storybook/react-native";
import { withKnobs } from "@storybook/addon-knobs/react";
import { withInfo } from "@storybook/addon-info";
import { importInfo } from "src/stories/Helpers";
import GradientStory from "./LinearGradient";

const stories = storiesOf("Gradient", module);

stories.addDecorator(withKnobs);
stories.addDecorator(withInfo);

stories.add("Gradient", GradientStory, importInfo("Gradient"), { info: "test" });

export default stories;
