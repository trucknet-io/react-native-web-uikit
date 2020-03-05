import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import Point, { PurePoint } from "./Point";
import colors from "src/Themes/Colors";

const stories = storiesOf("Point|Point", module).addParameters({
  component: PurePoint,
});

stories.add("Point", () => <Point color={colors.themeColor} size={64} />);

stories.add("Hollow Point", () => <Point color={colors.themeColor} size={64} hollowSize={44} />);

export { stories };
