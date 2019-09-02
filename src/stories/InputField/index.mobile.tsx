import { storiesOf } from "@storybook/react-native";
import { importInfo } from "src/stories/Helpers";
import InputField from "./InputField";
import { withKnobs } from "@storybook/addon-knobs/react";

const stories = storiesOf("InputField", module);
stories.addDecorator(withKnobs);

stories.add("InputField", InputField, importInfo("InputField"));

export default stories;
