import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import CalendarContainerTablet from "./CalendarContainerTablet";
import { View, Text } from "react-native";
import { action } from "@storybook/addon-actions";
import { darkColors } from "src/Themes/Colors";

const stories = storiesOf("Calendar|Calendar Tablet Container", module);

stories.add("Tablet Calendar", () => (
  <View style={{ width: 650 }}>
    <CalendarContainerTablet onDateChange={action("onDayPress")} submitLabel="Ok" cancelLabel="Cancel" />
  </View>
));

stories.add("Tablet Calendar Dark Theme", () => (
  <View style={{ width: 650 }}>
    <CalendarContainerTablet
      onDateChange={action("onDayPress")}
      theme="dark"
      cancelLabel={<Text style={{ color: darkColors.defaultText }}>Cancel</Text>}
      submitLabel={<Text style={{ color: darkColors.defaultText }}>Ok</Text>}
    />
  </View>
));

export default stories;
