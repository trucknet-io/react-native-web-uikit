import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import CalendarTablet from "./CalendarTablet";
import { View } from "react-native";
import { action } from "@storybook/addon-actions";

const stories = storiesOf("Calendar|Calendar Tablet", module);

stories.add("Tablet Calendar Light Theme", () => (
  <View style={{ width: 650 }}>
    <CalendarTablet onDateChange={action("onDayPress")} submitLabel="Ok" cancelLabel="Cancel" />
  </View>
));

stories.add("Tablet Calendar Dark Theme", () => (
  <View style={{ width: 650 }}>
    <CalendarTablet onDateChange={action("onDayPress")} theme="dark" cancelLabel="Cancel" submitLabel="Ok" />
  </View>
));

export default stories;
