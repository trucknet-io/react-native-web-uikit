import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import CalendarContainerTablet from "./CalendarContainerTablet";
import { View } from "react-native";
import { action } from "@storybook/addon-actions";

const stories = storiesOf("Calendar|Calendar Tablet Container", module);

stories.add("Tablet Calendar", () => (
  <View style={{ width: 650 }}>
    <CalendarContainerTablet onDateChange={action("onDayPress")} submitLabel="Ok" cancelLabel="Cancel" />
  </View>
));

stories.add("Tablet Calendar Dark Theme", () => (
  <View style={{ width: 650 }}>
    <CalendarContainerTablet onDateChange={action("onDayPress")} theme="dark" cancelLabel="Cancel" submitLabel="Ok" />
  </View>
));

export default stories;
