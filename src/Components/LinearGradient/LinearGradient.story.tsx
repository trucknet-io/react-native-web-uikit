import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import LinearGradient from "./LinearGradient";
import { Text } from "react-native";
import { StyleSheet } from "react-native";

const stories = storiesOf("Gradient", module);
stories.add("Gradient", () => (
  <LinearGradient style={styles.container}>
    <Text>Gradient</Text>
  </LinearGradient>
));

const styles = StyleSheet.create({
  container: { width: "100%", height: 800 },
});

export default stories;
