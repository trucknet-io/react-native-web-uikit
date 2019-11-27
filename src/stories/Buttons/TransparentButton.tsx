import React from "react";
import { TransparentButton } from "src/Components/Buttons";
import { text, color } from "@storybook/addon-knobs/react";
import { setRequiredProp, setOptionalProp } from "src/stories/Helpers";
import buttonProps from "./buttonCommonProps";
import Container from "src/stories/Container";
import Colors from "src/Themes/Colors";

const GradientButtonStory = () => (
    <TransparentButton
    />
);

export default GradientButtonStory;
