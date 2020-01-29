import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import CalendarDay from "./CalendarDay";
import { action } from "@storybook/addon-actions";
import { View } from "react-native";
import { darkColors } from "src/Themes/Colors";

const stories = storiesOf("CalendarDay", module);

stories.add("Calendar Day Light Theme", () => (
  <CalendarDay
    day={new Date("10/11/2020")}
    currentDate={new Date("10/10/2020")}
    onDayPress={action("onDayPress")}
    fontSize={24}
  />
));

stories.add("Calendar Day Dark Theme", () => (
  <View style={{ backgroundColor: darkColors.background }}>
    <CalendarDay
      day={new Date("10/11/2020")}
      currentDate={new Date("10/10/2020")}
      onDayPress={action("onDayPress")}
      fontSize={24}
      theme="dark"
    />
  </View>
));

stories.add("Calendar Current Day Light Theme", () => (
  <CalendarDay
    day={new Date("10/10/2020")}
    currentDate={new Date("10/10/2020")}
    onDayPress={action("onDayPress")}
    fontSize={24}
  />
));

stories.add("Calendar Current Day Dark Theme", () => (
  <View style={{ backgroundColor: darkColors.background }}>
    <CalendarDay
      day={new Date("10/10/2020")}
      currentDate={new Date("10/10/2020")}
      onDayPress={action("onDayPress")}
      fontSize={24}
      theme="dark"
    />
  </View>
));

export default stories;
