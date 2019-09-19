import { storiesOf } from "@storybook/react-native";
import { withKnobs } from "@storybook/addon-knobs/react";
import { importInfo } from "src/stories/Helpers";
import MapPlaceholderStory from "./MapPlaceholderStory";
import ParagraphStory from "./ParagraphStory";
import CardsStory from "./CardsStory";
import ProgressBarStory from "./ProgressBarStory";

const stories = storiesOf("Progress Indicators", module);

stories.addDecorator(withKnobs);

stories.add("Paragraph", ParagraphStory, importInfo("Placeholders"));
stories.add("Cards", CardsStory, importInfo("Placeholders"));
stories.add("Map", MapPlaceholderStory, importInfo("Placeholders"));
stories.add("ProgressBar", ProgressBarStory, importInfo("ProgressBar"));

export default stories;
