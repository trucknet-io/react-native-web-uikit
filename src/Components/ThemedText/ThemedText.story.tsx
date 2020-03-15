import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import ThemedText, { PureThemedText } from "./ThemedText";

const stories = storiesOf("Text|ThemedText", module).addParameters({ component: PureThemedText });

stories.add("Themed Text", () => <ThemedText>Themed Text</ThemedText>);

export { stories };
