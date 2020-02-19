import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import InputField, { InputComponent } from "./Input";
import { action } from "@storybook/addon-actions";
import { object } from "@storybook/addon-knobs/react";

const stories = storiesOf("Forms|Input Field", module).addParameters({ component: InputComponent });

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
    labelStyle={object("style", {
      fontSize: 24,
      paddingVertical: 2,
    })}
    textInputStyle={object("style", {
      fontSize: 30,
      paddingVertical: 8,
    })}
  />
));

export { stories };
