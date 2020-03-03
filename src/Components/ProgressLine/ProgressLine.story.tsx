import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import ProgressLine, { PureProgressLine } from "./ProgressLine";
import { View, StyleSheet } from "react-native";

const stories = storiesOf("Ride|Progress Line", module).addParameters({ component: PureProgressLine });

stories.add("Vertical", () => (
  <View style={styles.container}>
    <ProgressLine currentProgress={66} />
  </View>
));
stories.add("Horizontal", () => (
  <View style={styles.container}>
    <ProgressLine currentProgress={66} isHorizontal />
  </View>
));

const styles = StyleSheet.create({
  container: { height: 500, width: 500 },
});
