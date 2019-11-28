import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import { MapPlaceholder } from "./Map";
import { ParagraphPlaceholder } from "./Paragraph";
import { CardsPlaceholder } from "./Cards";
import { ProgressBar } from "./ProgressBar";
import ProgressBarReadme from "./ProgressBar/README.md";
import { setReadme } from "src/stories/Helpers";

const stories = storiesOf("Progress Indicators", module);

stories.add("Paragraph", () => <ParagraphPlaceholder />);
stories.add("Cards", () => <CardsPlaceholder />);
stories.add("Map", () => <MapPlaceholder />);
stories.add("ProgressBar", () => <ProgressBar />, setReadme(ProgressBarReadme));

export default stories;
