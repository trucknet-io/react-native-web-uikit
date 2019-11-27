import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import GradientButtonStory from "./GradientButton";
import TransparentButtonStory from "./TransparentButton";
import { importInfo } from "src/stories/Helpers";
import { addDecorator } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs/react";
import { TransparentButton } from "src/Components/Buttons";
import { GradientButton } from "src/Components/Buttons";

// addDecorator(withKnobs);

const stories = storiesOf("Buttons", module);

stories.add("GradientButton", () => <GradientButton />);
stories.add("TransparentButton", () => <TransparentButton />);

export default stories;
