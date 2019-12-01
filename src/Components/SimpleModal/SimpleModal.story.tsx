import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import SimpleModal from "src/Components/SimpleModal/SimpleModal";
import { action, boolean } from "@storybook/addon-actions";
import { View } from "react-native";

const stories = storiesOf("Progress Bar", module);

stories.add("ProgressBar", () => (
  <SimpleModal isVisible={boolean(`isVisible`, true)} onBackdropPress={action("onBackdropPress")}>
    <View />
  </SimpleModal>
));

export default stories;
