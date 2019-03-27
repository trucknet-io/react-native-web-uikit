import { storiesOf } from "@storybook/react-native";
import { importInfo } from "../Helpers";
import ModalStory from "./ModalsContainerMobile";
import { withKnobs } from "@storybook/addon-knobs/react";

const stories = storiesOf("Modals", module);
stories.addDecorator(withKnobs);

stories.add("Modals", ModalStory, importInfo("RootWrapper", "Modal", "Subscriber"), { info: "test" });

export default stories;
