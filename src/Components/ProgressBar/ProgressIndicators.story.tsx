import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import { ProgressBar } from "../ProgressBar";

const stories = storiesOf("Load Indicators|Progress Bar", module).addParameters({ component: ProgressBar });

stories.add("Progress Bar", () => <ProgressBar />);

export { stories };
