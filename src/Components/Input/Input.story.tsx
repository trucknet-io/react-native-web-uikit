import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import InputField from "./Input";
import { action } from "@storybook/addon-actions";
import { object } from "@storybook/addon-knobs/react";

const stories = storiesOf("InputField", module);
stories.add("Input Field", () => (
  <InputField
    label="input"
    onChangeTextValidated={action("onChangeTextValidated")}
    validateValue={(value: string) => (value.length > 6 ? undefined : "value must be more than 6 symbols")}
  />
));

stories.add("Input Field with custom styles", () => (
  <InputField
    label="input"
    onChangeTextValidated={action("onChangeTextValidated")}
    validateValue={(value: string) => (value.length > 6 ? undefined : "value must be more than 6 symbols")}
    style={object("style", {
      fontSize: 30,
      paddingVertical: 8,
    })}
  />
));

export default stories;
