import { storiesOf } from "@storybook/react-native";
import { withKnobs } from "@storybook/addon-knobs/react";
import { withInfo } from "@storybook/addon-info";
import { importInfo } from "src/stories/Helpers";
import SignatureModalStory from "./SignatureModalStory";

const stories = storiesOf("SignatureModal", module);

stories.addDecorator(withKnobs);
stories.addDecorator(withInfo);

stories.add("SignatureModal", SignatureModalStory, importInfo("SignatureModal"));

export default stories;
