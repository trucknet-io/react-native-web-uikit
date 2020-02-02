import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import Calendar from "./MonthCalendar";
import { View } from "react-native";
import { action } from "@storybook/addon-actions";
import { darkColors } from "src/Themes/Colors";

const stories = storiesOf("Calendar|Month Calendar", module);

stories.add("Month Calendar Light Theme", () => (
  <View style={{ width: 450 }}>
    <Calendar onDayPress={action("onDayPress")} />
  </View>
));

stories.add("Month Calendar Dark Theme", () => (
  <View style={{ width: 450 }}>
    <Calendar onDayPress={action("onDayPress")} theme="dark" style={{ backgroundColor: darkColors.background }} />
  </View>
));

export default stories;
