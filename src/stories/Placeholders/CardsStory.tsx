import React from "react";
import CardsPlaceholder from "../../Components/Placeholders/Cards";
import { number, select } from "@storybook/addon-knobs/react";
import { setOptionalProp } from "../Helpers";

const ParagraphStory = () => {
  return (
    <CardsPlaceholder
      cards={number(setOptionalProp("lines"), 10)}
      margin={number(setOptionalProp("margin"), 12)}
      cardHeight={number(setOptionalProp("height"), 100)}
      theme={select(setOptionalProp("theme"), { light: "light", dark: "dark" }, "light")}
    />
  );
};

export default ParagraphStory;
