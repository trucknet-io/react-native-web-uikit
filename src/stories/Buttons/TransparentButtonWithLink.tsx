import React from "react";
import { TransparentButtonWithLink } from "../../Components/Buttons";
import buttonProps from "./buttonCommonProps";
import Container from "../Container";
import Colors from "../../Themes/Colors";
import { text, color } from "@storybook/addon-knobs/react";
import { setRequiredProp, setOptionalProp } from "../Helpers";

const GradientButtonStory = () => (
  <Container>
    <TransparentButtonWithLink
      label={text(setRequiredProp("label"), "Transparent Button With ")}
      link={text(setRequiredProp("link"), "Link")}
      textColor={color(setOptionalProp("textColor"), Colors.defaultText)}
      linkColor={color(setOptionalProp("linkColor"), Colors.themeDark)}
      {...buttonProps()}
    />
  </Container>
);

export default GradientButtonStory;
