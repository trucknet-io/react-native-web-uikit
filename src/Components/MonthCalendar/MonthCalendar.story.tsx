import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import Calendar from "./MonthCalendar";
import { View } from "react-native";
import { action } from "@storybook/addon-actions";

const stories = storiesOf("Month Calendar", module);

stories.add("Month Calendar in container Light Theme", () => (
  <View style={{ width: 300 }}>
    <Calendar isVisible onDayPress={action("onDayPress")} />
  </View>
));

stories.add("Month Calendar in container Dark Theme", () => (
  <View style={{ width: 300 }}>
    <Calendar isVisible onDayPress={action("onDayPress")} theme="dark" />
  </View>
));

stories.add("Month Calendar Light Theme", () => <Calendar isVisible onDayPress={action("onDayPress")} />);

stories.add("Month Calendar Dark Theme", () => <Calendar isVisible onDayPress={action("onDayPress")} theme="dark" />);

export default stories;
