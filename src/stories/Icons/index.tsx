import React from "react";
import { storiesOf } from "@storybook/react-native";
import IconsContainer from "src/Containers/IconsContainer";
import { number, color } from "@storybook/addon-knobs/react";
import Colors from "src/Themes/Colors";
import { setOptionalProp, importInfo } from "src/stories/Helpers";

const Icons = () => (
  <IconsContainer
    color={color(setOptionalProp("color"), Colors.palette.purpleDark)}
    width={number(setOptionalProp("width"), undefined)}
    height={number(setOptionalProp("height"), undefined)}
  />
);

const stories = storiesOf("Icons", module);

stories.add("Icons", Icons, importInfo("Icons"));

export default stories;
