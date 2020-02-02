import React from "react";
import { storiesOf } from "@storybook/react-native";
import IconsContainer from "./IconsContainer";

const Icons = () => <IconsContainer />;

const stories = storiesOf("Icons|Icons", module);

stories.add("Icons", Icons);

export default stories;
