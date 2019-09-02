import React from "react";
import { Text } from "react-native";
import { TransparentButtonWithChildren } from "src/Components/Buttons";
import buttonProps from "./buttonCommonProps";
import Container from "src/stories/Container";
import Colors from "src/Themes/Colors";

const GradientButtonStory = () => (
  <Container>
    <TransparentButtonWithChildren {...buttonProps()}>
      <Text style={{ color: Colors.borderColor }}>Transparent Button With Children</Text>
    </TransparentButtonWithChildren>
  </Container>
);

export default GradientButtonStory;
