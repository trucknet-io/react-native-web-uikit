import { storiesOf } from "@storybook/react-native";
import { importInfo } from "src/stories/Helpers";
import SignatureModalStory from "./SignatureModalStory";

const stories = storiesOf("SignatureModal", module);
stories.add("SignatureModal", SignatureModalStory, importInfo("SignatureModal"));

export default stories;
