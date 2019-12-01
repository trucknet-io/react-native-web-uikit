import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import { MapPlaceholder } from "./Map";
import { ParagraphPlaceholder } from "./Paragraph";
import { CardsPlaceholder } from "./Cards";

const stories = storiesOf("Paragraphs", module);

stories.add("Paragraph", () => <ParagraphPlaceholder />);
stories.add("Cards", () => <CardsPlaceholder />);
stories.add("Map", () => <MapPlaceholder />);

export default stories;
