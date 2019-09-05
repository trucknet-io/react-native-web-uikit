import React from "react";
import MapPlaceholder from "../../Components/Placeholders/Map";
import { number, select } from "@storybook/addon-knobs/react";
import { setOptionalProp } from "../Helpers";

const ParagraphStory = () => {
  return (
    <MapPlaceholder
      lines={number(setOptionalProp("lines"), 5)}
      theme={select(setOptionalProp("theme"), { light: "light", dark: "dark" }, "light")}
    />
  );
};

export default ParagraphStory;
