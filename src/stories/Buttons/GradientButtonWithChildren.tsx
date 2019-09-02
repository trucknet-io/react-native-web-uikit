import React from "react";
import { Text } from "react-native";
import { GradientButtonWithChildren } from "src/Components/Buttons";
import Colors from "src/Themes/Colors";
import { color } from "@storybook/addon-knobs/react";
import { setRequiredProp } from "src/stories/Helpers";
import buttonProps from "./buttonCommonProps";
import Container from "src/stories/Container";

const GradientButtonStory = () => (
  <Container>
    <GradientButtonWithChildren
      gradientStartColor={color(setRequiredProp("gradientStartColor"), Colors.purpleGradient.gradientColor1)}
      gradientEndColor={color(setRequiredProp("gradientEndColor"), Colors.purpleGradient.gradientColor2)}
      {...buttonProps()}>
      <Text style={{ color: Colors.palette.white }}>Gradient Button With Children</Text>
    </GradientButtonWithChildren>
  </Container>
);

export default GradientButtonStory;
