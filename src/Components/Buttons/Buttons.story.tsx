import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import { TransparentButton } from "src/Components/Buttons";
import { GradientButton } from "src/Components/Buttons";

const stories = storiesOf("Buttons", module);

stories.add("GradientButton", () => <GradientButton />);
stories.add("TransparentButton", () => <TransparentButton />);

export default stories;
