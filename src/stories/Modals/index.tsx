import { storiesOf } from "@storybook/react-native";
import ModalStory from "./ModalsContainerWeb";
import TableComponent from "./InfoTableComponent";
import { importInfo } from "src/stories/Helpers";

const stories = storiesOf("Modals", module);
stories.add("Modals", ModalStory, {
  info: { text: importInfo("RootWrapper", "Modal", "Subscriber").info.text, source: false, TableComponent },
});

export default stories;
