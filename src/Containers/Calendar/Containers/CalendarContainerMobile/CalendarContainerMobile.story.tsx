import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import CalendarContainerMobile from "./CalendarContainerMobile";
import { action } from "@storybook/addon-actions";
import getShadowStyle from "src/Themes/getShadowStyle";

const stories = storiesOf("Calendar|Calendar Mobile Container", module);

stories.add("Calendar Light Theme", () => (
  <CalendarContainerMobile onDateChange={action("onDayPress")} style={getShadowStyle()} />
));

stories.add("Calendar Dark Theme", () => (
  <CalendarContainerMobile onDateChange={action("onDayPress")} theme="dark" style={getShadowStyle()} />
));

export default stories;
