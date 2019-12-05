import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import ProgressLine from "./ProgressLine";
import { View } from "react-native";
import { object } from "@storybook/addon-knobs/react";

const stories = storiesOf("Progress Line", module);

stories.add("Default", () => (
  <View style={object("container", { height: 100, width: 100, borderWidth: 1, flexDirection: "row" })}>
    <ProgressLine currentProgress={50} />
  </View>
));
stories.add("No progress", () => (
  <View style={object("container", { height: 100, width: 100, borderWidth: 1, flexDirection: "row" })}>
    <ProgressLine />
  </View>
));
