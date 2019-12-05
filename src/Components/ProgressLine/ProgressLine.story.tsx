import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import ProgressLine from "./ProgressLineContainer";
import { View } from "react-native";
import { object } from "@storybook/addon-knobs/react";

const stories = storiesOf("Progress Line", module);

stories.add("Vertical", () => (
  <View style={object("container", { height: 100, width: 100, borderWidth: 1, flexDirection: "row" })}>
    <ProgressLine currentProgress={50} direction={"vertical"} />
  </View>
));
stories.add("Horizontal", () => (
  <View style={object("container", { height: 100, width: 100, borderWidth: 1 })}>
    <ProgressLine currentProgress={50} direction={"horizontal"} />
  </View>
));
stories.add("No progress", () => (
  <View style={object("container", { height: 100, width: 100, borderWidth: 1, flexDirection: "row" })}>
    <ProgressLine direction={"vertical"} />
  </View>
));
