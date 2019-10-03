import { configure } from "@storybook/react";
import { addReadme } from "storybook-readme";
import { addDecorator } from "@storybook/react-native";
import "./addons";

addDecorator(addReadme);
function loadStories() {
  require("../src/stories");
}

configure(loadStories, module);
