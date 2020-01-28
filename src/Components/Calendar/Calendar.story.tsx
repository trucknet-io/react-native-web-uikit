import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import Calendar from "./Calendar";
import { View } from "react-native";
import { action } from "@storybook/addon-actions";

const stories = storiesOf("Calendar", module);

stories.add("Calendar Light Theme", () => (
  <View style={{ width: 300 }}>
    <Calendar isVisible onDayPress={action("onDayPress")} />
  </View>
));

stories.add("Calendar Dark Theme", () => (
  <View style={{ width: 300 }}>
    <Calendar isVisible onDayPress={action("onDayPress")} theme="dark" />
  </View>
));

export default stories;
