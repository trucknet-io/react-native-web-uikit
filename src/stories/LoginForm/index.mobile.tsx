import { storiesOf } from "@storybook/react-native";
import { importInfo } from "../Helpers";
import LoginForm from "./LoginForm";
import { withKnobs } from "@storybook/addon-knobs/react";

const stories = storiesOf("LoginForm", module);
stories.addDecorator(withKnobs);

stories.add("LoginForm", LoginForm, importInfo("LoginForm"));

export default stories;
