import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import { importInfo } from "src/stories/Helpers";
import InputField from "./Input";
import { action } from "@storybook/addon-actions";

const stories = storiesOf("InputField", module);
stories.add(
  "InputField",
  () => (
    <InputField
      label="input"
      onChangeTextValidated={action("onChangeTextValidated")}
      validateValue={(value: string) => (value.length > 6 ? undefined : "value must be more than 6 symbols")}
    />
  ),
  importInfo("InputField"),
);

export default stories;
