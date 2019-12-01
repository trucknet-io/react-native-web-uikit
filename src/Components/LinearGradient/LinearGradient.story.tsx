import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import LinearGradient from "./LinearGradient";
import { color, object } from "@storybook/addon-knobs/react";
import Colors from "src/Themes/Colors";

const stories = storiesOf("Gradient", module);
stories.add("Gradient", () => (
  <LinearGradient
    style={object("style", { padding: "25%" })}
    gradientStartColor={color("gradientStartColor", Colors.palette.ashLight)}
    gradientEndColor={color("gradientEndColor", Colors.palette.ashDark)}
  />
));

export default stories;
