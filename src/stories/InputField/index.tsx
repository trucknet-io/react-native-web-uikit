import { storiesOf } from "@storybook/react-native";
import { importInfo } from "src/stories/Helpers";
import InputField from "./InputField";

const stories = storiesOf("InputField", module);
stories.add("InputField", InputField, importInfo("InputField"));

export default stories;
