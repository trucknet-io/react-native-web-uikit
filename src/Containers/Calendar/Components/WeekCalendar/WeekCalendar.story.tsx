import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import WeekCalendar, { CalendarComponent } from "./WeekCalendar";
import { action } from "@storybook/addon-actions";

const stories = storiesOf("Calendar|Week Calendar", module).addParameters({ component: CalendarComponent });

stories.add("WeekCalendar", () => <WeekCalendar onDayPress={action("onDayPress")} fontSize={20} />);

export { stories };
