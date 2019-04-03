import { storiesOf } from "@storybook/react-native";
import { withKnobs } from "@storybook/addon-knobs/react";
import { withInfo } from "@storybook/addon-info";
import { importInfo } from "../Helpers";
import PhoneInputStory from "./PhoneInput";
import PhoneInputWithTypeStory from "./PhoneInputWithType";

const stories = storiesOf("Inputs", module);

stories.addDecorator(withKnobs);
stories.addDecorator(withInfo);

stories.add("PhoneInput", PhoneInputStory, importInfo("InputPhone"));
stories.add("PhoneInputWithType", PhoneInputWithTypeStory, importInfo("InputPhone"));

export default stories;
