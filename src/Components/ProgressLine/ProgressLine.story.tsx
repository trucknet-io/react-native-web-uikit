import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import ProgressLine, { PureProgressLine } from "./ProgressLine";
import { View } from "react-native";

const stories = storiesOf("Ride|Progress Line", module).addParameters({ component: PureProgressLine });

stories.add("Vertical", () => (
  <View style={{ height: 500, width: 500 }}>
    <ProgressLine currentProgress={66} />
  </View>
));
stories.add("Horizontal", () => (
  <View style={{ height: 500, width: 500 }}>
    <ProgressLine currentProgress={66} isHorizontal />
  </View>
));
