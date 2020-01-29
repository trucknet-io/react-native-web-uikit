import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import WeekCalendar from "./WeekCalendar";
import { View } from "react-native";
import { action } from "@storybook/addon-actions";

const stories = storiesOf("WeekCalendar", module);

stories.add("WeekCalendar Light Theme", () => <WeekCalendar onDayPress={action("onDayPress")} fontSize={20} />);

stories.add("WeekCalendar Dark Theme", () => (
  <WeekCalendar onDayPress={action("onDayPress")} theme="dark" fontSize={20} />
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
