import { storiesOf } from "@storybook/react-native";
import { importInfo } from "../Helpers";
import GradientStory from "./LinearGradient";
import { withKnobs } from "@storybook/addon-knobs/react";

const stories = storiesOf("Gradient", module);
stories.addDecorator(withKnobs);

stories.add("Gradient", GradientStory, importInfo("Gradient"), { info: "test" });

export default stories;
