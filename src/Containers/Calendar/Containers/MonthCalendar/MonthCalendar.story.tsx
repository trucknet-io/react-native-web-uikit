import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import MonthCalendar from "./MonthCalendar";
import { action } from "@storybook/addon-actions";
import getShadowStyle from "src/Themes/getShadowStyle";

const stories = storiesOf("Calendar|Month Calendar Container", module);

stories.add("Month Calendar container", () => (
  <MonthCalendar
    submit={{ onSubmit: action("onSubmit"), submitLabel: "Ok" }}
    cancel={{ onCancel: action("onCancel"), cancelLabel: "Cancel" }}
    style={getShadowStyle()}
  />
));

export default stories;
