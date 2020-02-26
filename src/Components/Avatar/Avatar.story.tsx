import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import Avatar, { PureAvatar } from "./Avatar";
import { View, StyleSheet } from "react-native";
import { number, object } from "@storybook/addon-knobs/react";

const stories = storiesOf("Thumbnail|Avatar", module).addParameters({
  component: PureAvatar,
});

stories.add("Avatar with letter", () => (
  <View style={styles.container}>
    <Avatar accessibilityLabel="Avatar" size="small" name="avatar" />
    <Avatar accessibilityLabel="Avatar" size="medium" name="avatar" />
    <Avatar accessibilityLabel="Avatar" size="large" name="avatar" />
  </View>
));

stories.add("Avatar with image", () => (
  <View style={styles.container}>
    <Avatar accessibilityLabel="Avatar" size="small" name="avatar" uriCloudName="demo" imageId="lady" />
    <Avatar accessibilityLabel="Avatar" size="medium" name="avatar" uriCloudName="demo" imageId="lady" />
    <Avatar accessibilityLabel="Avatar" size="large" name="avatar" uriCloudName="demo" imageId="lady" />
  </View>
));

stories.add("Avatar custom size", () => (
  <Avatar
    accessibilityLabel="Avatar"
    size={number("size", 200)}
    name="avatar"
    uriCloudName="demo"
    imageId="lady"
    style={object("style", {})}
  />
));
stories.add("Avatar custom styles", () => (
  <Avatar
    accessibilityLabel="Avatar"
    size={number("size", 200)}
    name="avatar"
    style={object("style", { borderWidth: 10, borderRadius: 50 })}
  />
));

const styles = StyleSheet.create({ container: { flexDirection: "row", alignItems: "center" } });

export { stories };
