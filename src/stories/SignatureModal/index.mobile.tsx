import { storiesOf } from "@storybook/react-native";
import { importInfo } from "../Helpers";
import SignatureModalStory from "./SignatureModalStory";
import { withKnobs } from "@storybook/addon-knobs";

const stories = storiesOf("SignatureModal", module);
stories.addDecorator(withKnobs);

stories.add("SignatureModal", SignatureModalStory, importInfo("SignatureModal"));

export default stories;
