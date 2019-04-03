import { storiesOf } from "@storybook/react-native";
import { withKnobs } from "@storybook/addon-knobs/react";
import { withInfo } from "@storybook/addon-info";
import ModalStory from "./ModalsContainerWeb";
import TableComponent from "./InfoTableComponent";
import { importInfo } from "../Helpers";

const stories = storiesOf("Modals", module);

stories.addDecorator(withKnobs);
stories.addDecorator(withInfo);

stories.add("Modals", ModalStory, {
  info: { text: importInfo("RootWrapper", "Modal", "Subscriber").info.text, source: false, TableComponent },
});

export default stories;
