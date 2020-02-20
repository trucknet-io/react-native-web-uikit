import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import { MapPlaceholder, PureMapPlaceholder } from "./Map";
import { ParagraphPlaceholder, PureParagraphPlaceholder } from "./Paragraph";
import { CardsPlaceholder, PureCardsPlaceholder } from "./Cards";

const paragraphPlaceholderStories = storiesOf("Load Indicators|Paragraph Placeholder", module).addParameters({
  component: PureParagraphPlaceholder,
});
const cardsPlaceholderStories = storiesOf("Load Indicators|Cards Placeholders", module).addParameters({
  component: PureCardsPlaceholder,
});
const mapPlaceholderStories = storiesOf("Load Indicators|Map Placeholders", module).addParameters({
  component: PureMapPlaceholder,
});

paragraphPlaceholderStories.add("Paragraph", () => <ParagraphPlaceholder />);
cardsPlaceholderStories.add("Cards", () => <CardsPlaceholder />);
mapPlaceholderStories.add("Map", () => <MapPlaceholder />);

export { paragraphPlaceholderStories, cardsPlaceholderStories, mapPlaceholderStories };
