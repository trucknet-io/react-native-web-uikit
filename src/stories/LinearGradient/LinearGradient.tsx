import React from "react";
import { Text } from "react-native";
import LinearGradient from "src/Components/LinearGradient";
import { object, color } from "@storybook/addon-knobs/react";
import { setRequiredProp, setOptionalProp } from "src/stories/Helpers";
import Container from "src/stories/Container";
import Colors from "src/Themes/Colors";

const GradientStory = () => (
  <Container>
    <LinearGradient
      gradientStartColor={color(setRequiredProp(`gradientStartColor`), Colors.palette.ashDark)}
      gradientEndColor={color(setRequiredProp(`gradientEndColor`), Colors.palette.ashLight)}
      start={object(setOptionalProp(`start`), { x: 0, y: 1 })}
      end={object(setOptionalProp(`end`), { x: 1, y: 1 })}>
      <Text style={{ color: Colors.palette.white }}>Hi!</Text>
    </LinearGradient>
  </Container>
);

export default GradientStory;
