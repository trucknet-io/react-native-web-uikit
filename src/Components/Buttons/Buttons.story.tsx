import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import { TransparentButton, PureTransparentButton } from "src/Components/Buttons";
import { GradientButton, PureGradientButton } from "src/Components/Buttons";
import { color, text } from "@storybook/addon-knobs/react";
import Colors from "src/Themes/Colors";

const gradientButtonStories = storiesOf("Buttons", module).addParameters({
  component: PureGradientButton,
});

gradientButtonStories.add("Gradient Button", () => (
  <GradientButton
    label={text("label", "GradientButton")}
    gradientStartColor={color("gradientStartColor", Colors.themeGradient.gradientColor1)}
    gradientEndColor={color("gradientEndColor", Colors.themeGradient.gradientColor2)}
  />
));

const transparentButtonStories = storiesOf("Buttons|Transparent Button", module).addParameters({
  component: PureTransparentButton,
});

transparentButtonStories.add("Transparent Button", () => (
  <TransparentButton label={text("label", "TransparentButton")} />
));

transparentButtonStories.add("Transparent Button with border", () => (
  <TransparentButton label={text("label", "TransparentButton")} borderWidth={2} />
));

transparentButtonStories.add("Transparent Button with link", () => (
  <TransparentButton label={text("label", "TransparentButton")} link={text("link", "link")} />
));

export { gradientButtonStories, transparentButtonStories };
