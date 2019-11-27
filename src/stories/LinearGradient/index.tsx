import { storiesOf } from "@storybook/react-native";
import { importInfo } from "src/stories/Helpers";
import GradientStory from "./LinearGradient";

const stories = storiesOf("Gradient", module);
stories.add("Gradient", GradientStory, importInfo("Gradient"), { info: "test" });

export default stories;
