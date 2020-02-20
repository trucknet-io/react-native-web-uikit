import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import Calendar, { PureMonthCalendar } from "./MonthCalendar";
import { action } from "@storybook/addon-actions";

const stories = storiesOf("Calendar|Month Calendar", module).addParameters({ component: PureMonthCalendar });

stories.add("Month Calendar", () => <Calendar onDayPress={action("onDayPress")} />);

export { stories };
