import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import CloudinaryImage from "./CloudinaryImage";
import { View, StyleSheet } from "react-native";
import { object } from "@storybook/addon-knobs/react";

const stories = storiesOf("Image", module);

stories.add("Image", () => (
  <View style={styles.container}>
    <CloudinaryImage
      accessibilityLabel="image"
      cloudinaryCloudName="demo"
      imageId="sample"
      style={styles.image}
      options={{ width: 50 }}
    />
    <CloudinaryImage
      accessibilityLabel="image"
      cloudinaryCloudName="demo"
      imageId="sample"
      style={styles.image}
      options={{ width: 100 }}
    />
    <CloudinaryImage
      accessibilityLabel="image"
      cloudinaryCloudName="demo"
      imageId="sample"
      style={styles.image}
      options={{ width: 200 }}
    />
    <CloudinaryImage
      accessibilityLabel="image"
      cloudinaryCloudName="demo"
      imageId="sample"
      style={styles.image}
      options={{ width: 400 }}
    />
    <CloudinaryImage
      accessibilityLabel="image"
      cloudinaryCloudName="demo"
      imageId="sample"
      style={styles.image}
      options={{ rWidth: 400 }}
    />
  </View>
));

stories.add("Image with custom styles", () => (
  <CloudinaryImage
    accessibilityLabel="image"
    cloudinaryCloudName="demo"
    imageId="sample"
    style={object("style", { width: 200, height: 200, borderWidth: 2, borderRadius: 10 })}
    options={object("options", { width: 400 })}
  />
));

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  image: { width: 200, height: 200 },
});

export default stories;
