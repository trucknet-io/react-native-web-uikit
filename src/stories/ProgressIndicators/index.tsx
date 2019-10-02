import { storiesOf } from "@storybook/react-native";
import { withKnobs } from "@storybook/addon-knobs/react";
import { withInfo } from "@storybook/addon-info";
import { importInfo, setReadme } from "src/stories/Helpers";
import MapPlaceholderStory from "./MapPlaceholderStory";
import ParagraphStory from "./ParagraphStory";
import CardsStory from "./CardsStory";
import ProgressBarStory from "./ProgressBarStory";
import ProgressBarReadme from "src/Components/ProgressBar/README.md";

const stories = storiesOf("Progress Indicators", module);

stories.addDecorator(withKnobs);
stories.addDecorator(withInfo);

stories.add("Paragraph", ParagraphStory, importInfo("ParagraphPlaceholder"));
stories.add("Cards", CardsStory, importInfo("CardsPlaceholder"));
stories.add("Map", MapPlaceholderStory, importInfo(" MapPlaceholder"));

stories.add("ProgressBar", ProgressBarStory, {
  ...importInfo("ProgressBar"),
  ...setReadme(ProgressBarReadme),
});

export default stories;
