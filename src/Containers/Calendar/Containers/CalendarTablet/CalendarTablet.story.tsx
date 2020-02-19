import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import CalendarTablet, { CalendarTabletComponent } from "./CalendarTablet";
import { action } from "@storybook/addon-actions";
import { StyleSheet, View } from "react-native";

const stories = storiesOf("Calendar|Calendar Tablet", module).addParameters({ component: CalendarTabletComponent });

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

export { stories };
