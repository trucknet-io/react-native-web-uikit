import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import Avatar from "./Avatar";
import { View, StyleSheet } from "react-native";
import { number, object } from "@storybook/addon-knobs/react";

const stories = storiesOf("Avatar", module);

stories.add("Avatar With Letter", () => (
  <View style={styles.container}>
    <Avatar accessibilityLabel="Avatar" size="small" name="avatar" />
    <Avatar accessibilityLabel="Avatar" size="medium" name="avatar" />
    <Avatar accessibilityLabel="Avatar" size="large" name="avatar" />
  </View>
));

stories.add("Avatar With Image", () => (
  <View style={styles.container}>
    <Avatar accessibilityLabel="Avatar" size="small" name="avatar" cloudinaryCloudName="demo" imageId="lady" />
    <Avatar accessibilityLabel="Avatar" size="medium" name="avatar" cloudinaryCloudName="demo" imageId="lady" />
    <Avatar accessibilityLabel="Avatar" size="large" name="avatar" cloudinaryCloudName="demo" imageId="lady" />
  </View>
));

stories.add("Avatar Custom Size", () => (
  <Avatar
    accessibilityLabel="Avatar"
    size={number("size", 200)}
    name="avatar"
    cloudinaryCloudName="demo"
    imageId="lady"
    styles={object("style", {})}
  />
));
stories.add("Avatar Custom Styles", () => (
  <Avatar
    accessibilityLabel="Avatar"
    size={number("size", 200)}
    name="avatar"
    styles={object("style", { borderWidth: 10, borderRadius: 50 })}
  />
));

const styles = StyleSheet.create({ container: { flexDirection: "row", alignItems: "center" } });

export default stories;
