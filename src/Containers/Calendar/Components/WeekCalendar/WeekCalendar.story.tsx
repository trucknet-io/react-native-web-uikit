import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import WeekCalendar from "./WeekCalendar";
import { action } from "@storybook/addon-actions";
import { darkColors } from "src/Themes/Colors";

const stories = storiesOf("Calendar|Week Calendar", module);

stories.add("WeekCalendar Light Theme", () => <WeekCalendar onDayPress={action("onDayPress")} fontSize={20} />);

stories.add("WeekCalendar Dark Theme", () => (
  <WeekCalendar
    onDayPress={action("onDayPress")}
    theme="dark"
    fontSize={20}
    style={{ backgroundColor: darkColors.background }}
  />
));

export default stories;
