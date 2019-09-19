import React from "react";
import ProgressBar from "src/Components/ProgressBar";
import Container from "src/stories/Container";
import { setOptionalProp } from "src/stories/Helpers";
import { number, color } from "@storybook/addon-knobs/react";
import { colorTheme } from "src/Themes/Colors";

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
