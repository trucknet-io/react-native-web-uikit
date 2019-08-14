import { storiesOf } from "@storybook/react-native";
import LoginForm from "./LoginForm";
import { withKnobs } from "@storybook/addon-knobs/react";
import { withInfo } from "@storybook/addon-info";
import { importInfo } from "../Helpers";

const stories = storiesOf("LoginForm", module);

stories.addDecorator(withKnobs);
stories.addDecorator(withInfo);

stories.add("LoginForm", LoginForm, importInfo("LoginForm"));

export default stories;
