import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import { MapPlaceholder } from "./Map";
import { ParagraphPlaceholder } from "./Paragraph";
import { CardsPlaceholder } from "./Cards";

const stories = storiesOf("Load Indicators|Placeholders", module);

stories.add("Paragraph", () => <ParagraphPlaceholder />);
stories.add("Cards", () => <CardsPlaceholder />);
stories.add("Map", () => <MapPlaceholder />);

export { stories };
