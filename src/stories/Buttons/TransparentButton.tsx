import React from "react";
import { TransparentButton } from "../../Components/Buttons";
import { text, color } from "@storybook/addon-knobs/react";
import { setRequiredProp, setOptionalProp } from "../Helpers";
import buttonProps from "./buttonCommonProps";
import Container from "../Container";
import Colors from "../../Themes/Colors";

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
