import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import { SimpleModal } from "./SimpleModal";
import { Text, View } from "react-native";
import { boolean } from "@storybook/addon-knobs/react";
import Colors from "src/Themes/Colors";
import { StyleSheet } from "react-native";

const stories = storiesOf("Modals", module);

stories.add("Simple Modal", () => (
  <SimpleModal isVisible={boolean("isVisible", true)} backdropColor={Colors.shadow}>
    <View style={styles.container}>
      <Text>Simple Modal</Text>
    </View>
  </SimpleModal>
));

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
});

export default stories;
