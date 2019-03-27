import { storiesOf } from "@storybook/react-native";
import { withKnobs } from "@storybook/addon-knobs/react";
import { withInfo } from "@storybook/addon-info";
import { importInfo } from "../Helpers";
import ModalStory from "./ModalsContainerWeb";

const stories = storiesOf("Modals", module);

stories.addDecorator(withKnobs);
stories.addDecorator(withInfo);

stories.add("Modals", ModalStory, importInfo("RootWrapper", "Modal", "Subscriber"), { info: "test" });

export default stories;
