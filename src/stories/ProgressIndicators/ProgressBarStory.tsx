import React from "react";
import ProgressBar from "../../Components/ProgressBar";
import Container from "../Container";
import { setOptionalProp } from "../Helpers";
import { number, color } from "@storybook/addon-knobs/react";
import { colorTheme } from "../../Themes/Colors";

const ParagraphStory = () => {
  return (
    <Container>
      <ProgressBar
        height={number(setOptionalProp("height"), 5)}
        color={color(setOptionalProp("color"), colorTheme.light.themeColor)}
      />
    </Container>
  );
};

export default ParagraphStory;
