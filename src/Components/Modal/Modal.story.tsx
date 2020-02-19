import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import Modal, { HybridModalComponent } from "./Modal";
import { Text, View } from "react-native";
import { boolean, object } from "@storybook/addon-knobs/react";
import Colors from "src/Themes/Colors";
import { StyleSheet } from "react-native";

const stories = storiesOf("Modals|Modal", module).addParameters({ component: HybridModalComponent });

stories.add("Modal", () => (
  <Modal isVisible={boolean("isVisible", true)} style={object("styles", { padding: "2%", top: 40 })}>
    <View style={styles.container}>
      <Text>Modal</Text>
    </View>
  </Modal>
));

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
});

export { stories };
