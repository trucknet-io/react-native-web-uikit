import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import CalendarContainer from "./CalendarContainer";
import { View } from "react-native";
import { action } from "@storybook/addon-actions";

const stories = storiesOf("Calendar", module);

stories.add("Calendar Light Theme", () => (
  <View>
    <CalendarContainer onDateChange={action("onDayPress")} fontSize={20} />
  </View>
));

stories.add("Calendar Dark Theme", () => (
  <CalendarContainer onDateChange={action("onDayPress")} theme="dark" fontSize={20} />
));

stories.add("Calendar in container Light Theme", () => (
  <View style={{ width: 450 }}>
    <CalendarContainer onDateChange={action("onDayPress")} />
  </View>
));

stories.add("Calendar in container Dark Theme", () => (
  <View style={{ width: 450 }}>
    <CalendarContainer onDateChange={action("onDayPress")} theme="dark" />
  </View>
));

export default stories;
