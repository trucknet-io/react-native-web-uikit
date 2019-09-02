import React from "react";
import { TransparentButton } from "src/Components/Buttons";
import { text, color } from "@storybook/addon-knobs/react";
import { setRequiredProp, setOptionalProp } from "src/stories/Helpers";
import buttonProps from "./buttonCommonProps";
import Container from "src/stories/Container";
import Colors from "src/Themes/Colors";

const GradientButtonStory = () => (
  <Container>
    <TransparentButton
      label={text(setRequiredProp("label"), "Transparent Button")}
      textColor={color(setOptionalProp("textColor"), Colors.defaultText)}
      {...buttonProps()}
    />
  </Container>
);

export default GradientButtonStory;
