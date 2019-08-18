import { storiesOf } from "@storybook/react-native";
import { withKnobs } from "@storybook/addon-knobs/react";
import { withInfo } from "@storybook/addon-info";
import { importInfo } from "../Helpers";
import MapPlaceholderStory from "./MapPlaceholderStory";
import ParagraphStory from "./ParagraphStory";
import CardsStory from "./CardsStory";

const stories = storiesOf("Placeholders", module);

stories.addDecorator(withKnobs);
stories.addDecorator(withInfo);

stories.add("Paragraph", ParagraphStory, importInfo("Placeholders"));
stories.add("Cards", CardsStory, importInfo("Placeholders"));
stories.add("Map", MapPlaceholderStory, importInfo("Placeholders"));

export default stories;
