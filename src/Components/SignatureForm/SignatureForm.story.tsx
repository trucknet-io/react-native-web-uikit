import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import SignatureForm, { PureSignatureForm } from "./SignatureForm";
import { boolean, object } from "@storybook/addon-knobs/react";
import { action } from "@storybook/addon-actions";
import { View, StyleSheet } from "react-native";

const stories = storiesOf("Forms|Signature Form", module).addParameters({ component: PureSignatureForm });
stories.add("Signature Form", () => (
  <View style={styles.container}>
    <SignatureForm
      isVisible={boolean(`isVisible`, false)}
      onBackdropPress={action("BackdropPress")}
      onSignApply={action("onSignApply")}
      style={object("styles", { padding: "2%", top: 40 })}
    />
  </View>
));

const styles = StyleSheet.create({
  container: { height: 650 },
});

export { stories };
