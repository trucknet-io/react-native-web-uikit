import React from "react";
import { GradientButton } from "src/Components/Buttons";
import Colors from "src/Themes/Colors";
import { text, color } from "@storybook/addon-knobs/react";
import { setRequiredProp } from "src/stories/Helpers";
import buttonProps from "./buttonCommonProps";
import Container from "src/stories/Container";

const GradientButtonStory = () => (
  <Container>
    <GradientButton
      label={text(setRequiredProp("label"), "Gradient Button")}
      gradientStartColor={color(setRequiredProp("gradientStartColor"), Colors.purpleGradient.gradientColor1)}
      gradientEndColor={color(setRequiredProp("gradientEndColor"), Colors.purpleGradient.gradientColor2)}
      {...buttonProps()}
    />
  </Container>
);

export default GradientButtonStory;
