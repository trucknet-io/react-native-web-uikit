import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import CroppedThumbnail from "./CroppedThumbnail";
import { View, StyleSheet } from "react-native";
import { object } from "@storybook/addon-knobs/react";

const stories = storiesOf("Cropped Thumbnail", module);

stories.add("Thumbnail", () => (
  <View style={styles.container}>
    <CroppedThumbnail
      accessibilityLabel="image"
      uriCloudName="demo"
      imageId="sample"
      style={styles.image}
      options={{ width: 50 }}
    />
    <CroppedThumbnail
      accessibilityLabel="image"
      uriCloudName="demo"
      imageId="sample"
      style={styles.image}
      options={{ width: 100 }}
    />
    <CroppedThumbnail
      accessibilityLabel="image"
      uriCloudName="demo"
      imageId="sample"
      style={styles.image}
      options={{ width: 200 }}
    />
    <CroppedThumbnail
      accessibilityLabel="image"
      uriCloudName="demo"
      imageId="sample"
      style={styles.image}
      options={{ width: 400 }}
    />
  </View>
));

stories.add("Thumbnail with custom styles", () => (
  <CroppedThumbnail
    accessibilityLabel="image"
    uriCloudName="demo"
    imageId="sample"
    style={object("style", { width: 200, height: 200, borderWidth: 2, borderRadius: 10 })}
    options={object("options", { width: 400 })}
  />
));

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", justifyContent: "space-around", flexWrap: "wrap" },
  image: { width: 200, height: 200 },
});

export default stories;
