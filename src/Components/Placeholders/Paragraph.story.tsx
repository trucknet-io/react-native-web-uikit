import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import { MapPlaceholder, MapPlaceholderComponent } from "./Map";
import { ParagraphPlaceholder, ParagraphPlaceholderComponent } from "./Paragraph";
import { CardsPlaceholder, CardsPlaceholderComponent } from "./Cards";

const paragraphPlaceholderStories = storiesOf("Load Indicators|Placeholders", module).addParameters({
  component: ParagraphPlaceholderComponent,
});
const cardsPlaceholderStories = storiesOf("Load Indicators|Placeholders", module).addParameters({
  component: CardsPlaceholderComponent,
});
const mapPlaceholderStories = storiesOf("Load Indicators|Placeholders", module).addParameters({
  component: MapPlaceholderComponent,
});

paragraphPlaceholderStories.add("Paragraph", () => <ParagraphPlaceholder />);
cardsPlaceholderStories.add("Cards", () => <CardsPlaceholder />);
mapPlaceholderStories.add("Map", () => <MapPlaceholder />);

export { paragraphPlaceholderStories, cardsPlaceholderStories, mapPlaceholderStories };
