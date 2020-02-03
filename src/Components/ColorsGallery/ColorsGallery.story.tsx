import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import ColorsGallery from "./ColorsGallery";

const stories = storiesOf("Colors|Colors Gallery", module);
stories.add("Colors Gallery", () => <ColorsGallery />);

export default stories;
