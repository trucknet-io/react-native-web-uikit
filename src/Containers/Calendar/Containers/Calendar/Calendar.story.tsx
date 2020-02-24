import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import Calendar, { PureCalendarContainer } from "./Calendar";
import { action } from "@storybook/addon-actions";
import getShadowStyle from "src/Themes/getShadowStyle";

const stories = storiesOf("Calendar|Calendar", module).addParameters({ component: PureCalendarContainer });

stories.add("Calendar", () => <Calendar onDateChange={action("onDayPress")} style={getShadowStyle()} />);

export { stories };
