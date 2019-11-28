import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import { TransparentButton } from "src/Components/Buttons";
import { GradientButton } from "src/Components/Buttons";
import { color, text } from "@storybook/addon-knobs/react";
import Colors from "src/Themes/Colors";

const stories = storiesOf("Buttons", module);

stories.add("GradientButton", () => (
  <GradientButton
    label={text("label", "GradientButton")}
    gradientStartColor={color("gradientStartColor", Colors.themeGradient.gradientColor1)}
    gradientEndColor={color("gradientEndColor", Colors.themeGradient.gradientColor2)}
  />
));
stories.add("TransparentButton", () => (
  <TransparentButton label={text("label", "TransparentButton")} link={text("link", "link")} />
));

export default stories;
