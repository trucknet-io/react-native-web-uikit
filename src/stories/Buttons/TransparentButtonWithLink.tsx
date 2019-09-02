import React from "react";
import { TransparentButtonWithLink } from "src/Components/Buttons";
import buttonProps from "./buttonCommonProps";
import Container from "src/stories/Container";
import Colors from "src/Themes/Colors";
import { text, color } from "@storybook/addon-knobs/react";
import { setRequiredProp, setOptionalProp } from "src/stories/Helpers";

const GradientButtonStory = () => (
  <Container>
    <TransparentButtonWithLink
      label={text(setRequiredProp("label"), "Transparent Button With ")}
      link={text(setRequiredProp("link"), "Link")}
      textColor={color(setOptionalProp("textColor"), Colors.defaultText)}
      linkColor={color(setOptionalProp("linkColor"), Colors.palette.purpleDark)}
      {...buttonProps()}
    />
  </Container>
);

export default GradientButtonStory;
