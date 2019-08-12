import { storiesOf } from "@storybook/react-native";
import { withKnobs } from "@storybook/addon-knobs/react";
import { withInfo } from "@storybook/addon-info";
import { importInfo } from "../Helpers";
import InputField from "./InputField";

const stories = storiesOf("InputField", module);

stories.addDecorator(withKnobs);
stories.addDecorator(withInfo);

stories.add("InputField", InputField, importInfo("InputField"));

export default stories;
