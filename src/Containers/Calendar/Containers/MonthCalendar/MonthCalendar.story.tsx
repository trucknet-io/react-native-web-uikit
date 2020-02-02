import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import MonthCalendar from "./MonthCalendar";
import { View } from "react-native";
import { action } from "@storybook/addon-actions";
import { darkColors } from "src/Themes/Colors";
import getShadowStyle from "src/Themes/getShadowStyle";

const stories = storiesOf("Calendar|Month Calendar Container", module);

stories.add("Month Calendar container Light Theme", () => (
  <View style={{ width: 450 }}>
    <MonthCalendar onSubmit={action("onSubmit")} onCancel={action("onCancel")} style={getShadowStyle()} />
  </View>
));

stories.add("Month Calendar container Dark Theme", () => (
  <View style={{ width: 450 }}>
    <MonthCalendar
      onSubmit={action("onSubmit")}
      onCancel={action("onCancel")}
      theme="dark"
      style={{ backgroundColor: darkColors.background, ...getShadowStyle() }}
    />
  </View>
));

export default stories;
