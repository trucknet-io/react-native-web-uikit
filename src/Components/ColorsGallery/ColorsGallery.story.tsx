import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import { importInfo } from "src/stories/Helpers";
import ColorsGallery from "./ColorsGallery";
import { select } from "@storybook/addon-knobs/react";

const stories = storiesOf("ColorsGallery", module);
stories.add(
  "ColorsGallery",
  () => <ColorsGallery theme={select("theme", { light: "light", dark: "dark" })} />,
  importInfo("colorTheme"),
);

export default stories;
