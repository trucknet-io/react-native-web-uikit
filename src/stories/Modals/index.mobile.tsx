import { storiesOf } from "@storybook/react-native";
import ModalStory from "./ModalsContainerMobile";
import { withKnobs } from "@storybook/addon-knobs/react";

const stories = storiesOf("Modals", module);
stories.addDecorator(withKnobs);

stories.add("Modals", ModalStory);

export default stories;
