import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import SignatureModal from "./SignatureModal";
import { boolean } from "@storybook/addon-knobs/react";
import { action } from "@storybook/addon-actions";

const stories = storiesOf("Modals|Signature Modal", module);
stories.add("Signature Modal", () => (
  <SignatureModal
    isVisible={boolean(`isVisible`, true)}
    onBackdropPress={action("BackdropPress")}
    onSignApply={action("onSignApply")}
  />
));

export default stories;
