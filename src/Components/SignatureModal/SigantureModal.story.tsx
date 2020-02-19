import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import SignatureModal, { SignatureModalComponent } from "./SignatureModal";
import { boolean, object } from "@storybook/addon-knobs/react";
import { action } from "@storybook/addon-actions";

const stories = storiesOf("Modals|Signature Modal", module).addParameters({ component: SignatureModalComponent });
stories.add("Signature Modal", () => (
  <SignatureModal
    isVisible={boolean(`isVisible`, true)}
    onBackdropPress={action("BackdropPress")}
    onSignApply={action("onSignApply")}
    style={object("styles", { padding: "2%", top: 40 })}
  />
));

export { stories };
