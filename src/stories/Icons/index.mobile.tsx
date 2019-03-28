import React from "react";
import { storiesOf } from "@storybook/react-native";
import IconsContainer from "../../Containers/IconsContainer";
import { withKnobs } from "@storybook/addon-knobs/react";

const stories = storiesOf("Icons", module);
stories.addDecorator(withKnobs);

stories.add("Icons", () => <IconsContainer />);

export default stories;
