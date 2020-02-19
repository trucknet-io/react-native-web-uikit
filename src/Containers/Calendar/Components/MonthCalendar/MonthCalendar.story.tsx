import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import Calendar, { MonthCalendarComponent } from "./MonthCalendar";
import { action } from "@storybook/addon-actions";

const stories = storiesOf("Calendar|Month Calendar", module).addParameters({ component: MonthCalendarComponent });

stories.add("Month Calendar", () => <Calendar onDayPress={action("onDayPress")} />);

export { stories };
