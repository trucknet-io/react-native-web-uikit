import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import { TransparentButton } from "src/Components/Buttons";
import { GradientButton } from "src/Components/Buttons";
import { StyleSheet } from "react-native";
import { color, text } from "@storybook/addon-knobs/react";
import Colors from "src/Themes/Colors";

const stories = storiesOf("Buttons", module);

stories.add("GradientButton", () => (
  <GradientButton
    label={text("label", "GradientButton")}
    style={styles.container}
    gradientStartColor={color("gradientStartColor", Colors.themeGradient.gradientColor1)}
    gradientEndColor={color("gradientEndColor", Colors.themeGradient.gradientColor2)}
  />
));
stories.add("TransparentButton", () => (
  <TransparentButton label={text("label", "TransparentButton")} link={text("link", "link")} style={styles.container} />
));

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    marginHorizontal: 16,
    width: "95%",
    color: Colors.defaultText,
  },
});
export default stories;
