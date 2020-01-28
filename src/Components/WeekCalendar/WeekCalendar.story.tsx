import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import WeekCalendar from "./WeekCalendar";
import { View } from "react-native";
import { action } from "@storybook/addon-actions";

const stories = storiesOf("WeekCalendar", module);

stories.add("WeekCalendar Light Theme", () => (
  <View style={{ flex: 1 }}>
    <WeekCalendar onDayPress={action("onDayPress")} daySize={48} dayNumberFontStyle={{ fontSize: 24 }} />
  </View>
));

stories.add("WeekCalendar Dark Theme", () => (
  <View style={{ flex: 1 }}>
    <WeekCalendar onDayPress={action("onDayPress")} theme="dark" daySize={48} dayNumberFontStyle={{ fontSize: 24 }} />
  </View>
));

stories.add("WeekCalendar in container Light Theme", () => (
  <View style={{ width: 300 }}>
    <WeekCalendar onDayPress={action("onDayPress")} />
  </View>
));

stories.add("WeekCalendar in container Dark Theme", () => (
  <View style={{ width: 300 }}>
    <WeekCalendar onDayPress={action("onDayPress")} theme="dark" />
  </View>
));

export default stories;
