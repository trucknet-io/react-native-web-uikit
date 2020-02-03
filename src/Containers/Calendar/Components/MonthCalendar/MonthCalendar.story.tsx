import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import Calendar from "./MonthCalendar";
import { View } from "react-native";
import { action } from "@storybook/addon-actions";

const stories = storiesOf("Calendar|Month Calendar", module);

stories.add("Month Calendar", () => (
  <View style={{ width: 450 }}>
    <Calendar onDayPress={action("onDayPress")} />
  </View>
));

export default stories;
