import { AppRegistry } from "react-native";
import { getStorybookUI, configure, addDecorator } from "@storybook/react-native";
import { name } from "../app.json";
import "./rn-addons";
import { withKnobs } from "@storybook/addon-knobs/react";
import { loadStories } from "./storyLoader";

addDecorator(withKnobs);
configure(() => {
  loadStories();
}, module);

// Refer to https://github.com/storybooks/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({});

// If you are using React Native vanilla and after installation you don't see your app name here, write it manually.
// If you use Expo you can safely remove this line.
AppRegistry.registerComponent(name, () => StorybookUIRoot);

export default StorybookUIRoot;
