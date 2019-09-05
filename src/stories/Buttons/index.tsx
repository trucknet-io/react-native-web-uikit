import { storiesOf } from "@storybook/react-native";
import GradientButtonStory from "./GradientButton";
import GradientButtonWithChildrenStory from "./GradientButtonWithChildren";
import TransparentButtonStory from "./TransparentButton";
import TransparentButtonWithChildrenStory from "./TransparentButtonWithChildren";
import TransparentButtonWithLinkStory from "./TransparentButtonWithLink";
import { withKnobs } from "@storybook/addon-knobs/react";
import { withInfo } from "@storybook/addon-info";
import { importInfo } from "../Helpers";

const stories = storiesOf("Buttons", module);

stories.addDecorator(withKnobs);
stories.addDecorator(withInfo);

stories.add("GradientButton", GradientButtonStory, importInfo("GradientButton"));
stories.add("GradientButtonWithChildren", GradientButtonWithChildrenStory, importInfo("GradientButtonWithChildren"));
stories.add("TransparentButton", TransparentButtonStory, importInfo("TransparentButton"));
stories.add(
  "TransparentButtonWithChildren",
  TransparentButtonWithChildrenStory,
  importInfo("TransparentButtonWithChildren"),
);
stories.add("TransparentButtonWithLink", TransparentButtonWithLinkStory, importInfo("TransparentButtonWithLink"));

export default stories;
