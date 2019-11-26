import React from "react";
import SimpleModal from "src/Components/SimpleModal";
import { boolean } from "@storybook/addon-knobs/react";
import { action } from "@storybook/addon-actions";
import { setRequiredProp } from "src/stories/Helpers";
import Container from "src/stories/Container";
import { Text, View, StyleSheet } from "react-native";
import Colors from "src/Themes/Colors";

const SignatureModalStory = () => {
  return (
    <Container>
      <SimpleModal
        isVisible={boolean(setRequiredProp(`isVisible`), true)}
        onBackdropPress={() => action("onBackdropPress")}>
        <View style={styles.container}>
          <Text>Content</Text>
        </View>
      </SimpleModal>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, alignItems: "center", justifyContent: "center" },
});

export default SignatureModalStory;
