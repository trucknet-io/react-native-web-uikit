import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import ColorsGallery from "./ColorsGallery";
import { select } from "@storybook/addon-knobs/react";

const stories = storiesOf("ColorsGallery", module);
stories.add("ColorsGallery", () => <ColorsGallery theme={select("theme", { light: "light", dark: "dark" })} />);

export default stories;
