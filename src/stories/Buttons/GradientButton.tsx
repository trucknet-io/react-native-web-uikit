import React from "react";
import { GradientButton } from "../../Components/Buttons";
import Colors from "../../Themes/Colors";
import { text, color } from "@storybook/addon-knobs/react";
import { setRequiredProp } from "../Helpers";
import buttonProps from "./buttonCommonProps";
import Container from "../Container";

const GradientButtonStory = () => (
  <Container>
    <GradientButton
      label={text(setRequiredProp("label"), "Gradient Button")}
      gradientStartColor={color(setRequiredProp("gradientStartColor"), Colors.themeGradient.gradientColor1)}
      gradientEndColor={color(setRequiredProp("gradientEndColor"), Colors.themeGradient.gradientColor2)}
      {...buttonProps()}
    />
  </Container>
);

export default GradientButtonStory;
