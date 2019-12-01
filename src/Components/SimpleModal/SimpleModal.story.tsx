import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import { SimpleModal } from "./SimpleModal";
import { Text } from "react-native";
import { boolean } from "@storybook/addon-knobs/react";

const stories = storiesOf("Modals", module);

stories.add("Simple Modal", () => (
  <SimpleModal isVisible={boolean("isVisible", true)}>
    <Text>Simple Modal</Text>
  </SimpleModal>
));

export default stories;
