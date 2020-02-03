import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import Calendar from "./Calendar";
import { action } from "@storybook/addon-actions";
import getShadowStyle from "src/Themes/getShadowStyle";

const stories = storiesOf("Calendar|Calendar", module);

stories.add("Calendar", () => <Calendar onDateChange={action("onDayPress")} style={getShadowStyle()} />);

export default stories;
