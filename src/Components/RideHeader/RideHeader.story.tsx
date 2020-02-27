import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import RideHeader from "./RideHeader";
import { View, StyleSheet } from "react-native";
import colors from "src/Themes/Colors";

const stories = storiesOf("RideHeader", module);

stories.add("Ride Header", () => (
  <RideHeader color={colors.themeColor} primaryText="current ride" secondaryText="Eta: 10/10/2020, 10:33" />
));

stories.add("Ride Small Header", () => (
  <View style={styles.container}>
    <RideHeader color={colors.themeColor} primaryText="current ride" secondaryText="Eta: 10/10/2020, 10:33" />
  </View>
));

stories.add("Ride Header without secondary text", () => (
  <RideHeader color={colors.themeColor} primaryText="current ride" />
));

const styles = StyleSheet.create({ container: { flexDirection: "row", alignItems: "center", width: 250 } });

export { stories };
