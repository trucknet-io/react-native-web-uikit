import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import CalendarDay, { PureCalendarDay } from "./CalendarDay";
import { action } from "@storybook/addon-actions";

const stories = storiesOf("Calendar|Calendar Day", module).addParameters({ component: PureCalendarDay });

stories.add("Calendar Day", () => (
  <CalendarDay
    day={new Date("10/11/2020")}
    currentDate={new Date("10/10/2020")}
    onDayPress={action("onDayPress")}
    fontSize={24}
  />
));

stories.add("Calendar Current Day", () => (
  <CalendarDay
    day={new Date("10/10/2020")}
    currentDate={new Date("10/10/2020")}
    onDayPress={action("onDayPress")}
    fontSize={24}
  />
));

export { stories };
