import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import { ProgressBar } from "../ProgressBar";

const stories = storiesOf("Progress Bar", module);

stories.add("ProgressBar", () => <ProgressBar />);

export default stories;
