import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import CalendarTablet from "./CalendarTablet";
import { action } from "@storybook/addon-actions";
import { StyleSheet, View } from "react-native";

const stories = storiesOf("Calendar|Calendar Tablet", module);

stories.add("Tablet Calendar", () => (
  <View style={styles.container}>
    <CalendarTablet onDateChange={action("onDayPress")} submitLabel="Ok" cancelLabel="Cancel" />
  </View>
));

const styles = StyleSheet.create({
  container: {
    width: "60%",
  },
});

export default stories;
