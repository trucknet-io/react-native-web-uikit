import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import Calendar from "./MonthCalendar";
import { View } from "react-native";
import { action } from "@storybook/addon-actions";

const stories = storiesOf("Month Calendar", module);

stories.add("Month Calendar Light Theme", () => <Calendar onDayPress={action("onDayPress")} />);

stories.add("Month Calendar Dark Theme", () => <Calendar onDayPress={action("onDayPress")} theme="dark" />);

stories.add("Month Calendar in container Light Theme", () => (
  <View style={{ width: 450 }}>
    <Calendar onDayPress={action("onDayPress")} />
  </View>
));

stories.add("Month Calendar in container Dark Theme", () => (
  <View style={{ width: 450 }}>
    <Calendar onDayPress={action("onDayPress")} theme="dark" />
  </View>
));

export default stories;
