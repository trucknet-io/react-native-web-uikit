import React from "react";
import CardsPlaceholder from "../../Components/Placeholders/Cards";
import { number } from "@storybook/addon-knobs/react";
import { setOptionalProp } from "../Helpers";
import Container from "../Container";

const ParagraphStory = () => {
  return (
    <CardsPlaceholder
      cards={number(setOptionalProp("lines"), 10)}
      margin={number(setOptionalProp("margin"), 12)}
      cardHeight={number(setOptionalProp("height"), 100)}
    />
  );
};

export default ParagraphStory;
