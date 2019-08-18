import React from "react";
import MapPlaceholder from "../../Components/Placeholders/MapPlaceholder";
import { number } from "@storybook/addon-knobs/react";
import { setOptionalProp } from "../Helpers";
import Container from "../Container";

const ParagraphStory = () => {
  return <MapPlaceholder lines={number(setOptionalProp("lines"), 5)} />;
};

export default ParagraphStory;
