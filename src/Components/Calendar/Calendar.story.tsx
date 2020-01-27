import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import Calendar from "./Calendar";
import { View } from "react-native";
import { action } from "@storybook/addon-actions";

const stories = storiesOf("Calendar", module);

stories.add("Calendar", () => (
  <View style={{ width: 400 }}>
    <Calendar isVisible onDayPress={action("onDayPress")} />
  </View>
));

stories.add("Calendar 2", () => (
  <View style={{ width: 300 }}>
    <Calendar isVisible onDayPress={action("onDayPress")} />
  </View>
));

export default stories;
