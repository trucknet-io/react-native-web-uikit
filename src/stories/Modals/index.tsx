import { storiesOf } from "@storybook/react-native";
import { withKnobs } from "@storybook/addon-knobs/react";
import { withInfo } from "@storybook/addon-info";
import ModalStory from "./ModalsContainerWeb";
import TableComponent from "./InfoTableComponent";
import { importInfo } from "src/stories/Helpers";
import SimpleModalStory from "./SimpleModalStory";

const stories = storiesOf("Modals", module);

stories.addDecorator(withKnobs);
stories.addDecorator(withInfo);

stories.add("Modal", ModalStory, {
  info: { text: importInfo("RootWrapper", "Modal", "Subscriber").info.text, source: false, TableComponent },
});

stories.add("SimpleModal", SimpleModalStory);

export default stories;
