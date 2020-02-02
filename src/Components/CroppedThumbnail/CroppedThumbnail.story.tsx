import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import CroppedThumbnail from "./CroppedThumbnail";
import { View, StyleSheet } from "react-native";
import { object, number } from "@storybook/addon-knobs/react";

const stories = storiesOf("Thumbnail|Cropped Thumbnail", module);

stories.add("Resize to small thumbnail by width", () => (
  <View style={styles.smallImageContainer}>
    <CroppedThumbnail
      accessibilityLabel="image"
      uriCloudName="demo"
      imageId="sample"
      width={number("width", 100)}
      crop="fit"
    />
  </View>
));

stories.add("Resize to big thumbnail by width", () => (
  <View style={styles.bigImageContainer}>
    <CroppedThumbnail
      accessibilityLabel="image"
      uriCloudName="demo"
      imageId="sample"
      width={number("width", 400)}
      crop="fit"
    />
  </View>
));

stories.add("Resize to small thumbnail by height", () => (
  <View style={styles.smallImageContainer}>
    <CroppedThumbnail
      accessibilityLabel="image"
      uriCloudName="demo"
      imageId="sample"
      height={number("height", 100)}
      crop="fit"
    />
  </View>
));

stories.add("Resize to big thumbnail by height", () => (
  <View style={styles.bigImageContainer}>
    <CroppedThumbnail
      accessibilityLabel="image"
      uriCloudName="demo"
      imageId="sample"
      height={number("height", 400)}
      crop="fit"
    />
  </View>
));

stories.add("Resize to big thumbnail in png format by height", () => (
  <View style={styles.bigImageContainer}>
    <CroppedThumbnail
      accessibilityLabel="image"
      uriCloudName="demo"
      imageId="sample"
      height={number("height", 400)}
      fetchFormat="png"
      crop="fit"
    />
  </View>
));

stories.add("Crop to small Thumbnail by width", () => (
  <View style={styles.smallImageContainer}>
    <CroppedThumbnail
      accessibilityLabel="image"
      uriCloudName="demo"
      imageId="sample"
      width={number("width", 100)}
      crop="crop"
    />
  </View>
));

stories.add("Crop to big Thumbnail by width", () => (
  <View style={styles.bigImageContainer}>
    <CroppedThumbnail
      accessibilityLabel="image"
      uriCloudName="demo"
      imageId="sample"
      width={number("width", 400)}
      crop="crop"
    />
  </View>
));

stories.add("Thumbnail with custom styles", () => (
  <CroppedThumbnail
    accessibilityLabel="image"
    uriCloudName="demo"
    imageId="sample"
    style={object("style", { width: 200, height: 200, borderWidth: 2, borderRadius: 10 })}
  />
));

const styles = StyleSheet.create({
  smallImageContainer: { width: 100, height: 100 },
  bigImageContainer: { width: 400, height: 400 },
});

export default stories;
