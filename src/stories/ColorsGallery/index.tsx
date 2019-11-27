import { storiesOf } from "@storybook/react-native";
import { importInfo } from "src/stories/Helpers";
import ColorsGalleryStory from "./ColorsGalleryStory";

const stories = storiesOf("ColorsGallery", module);
stories.add("ColorsGallery", ColorsGalleryStory, importInfo("colorTheme"));

export default stories;
