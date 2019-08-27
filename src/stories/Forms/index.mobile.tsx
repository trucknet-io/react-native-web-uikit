import { storiesOf } from "@storybook/react-native";
import { importInfo } from "../Helpers";
import LoginForm from "./LoginForm";
import Form from "./Form";
import { withKnobs } from "@storybook/addon-knobs/react";

const stories = storiesOf("Forms", module);
stories.addDecorator(withKnobs);

stories.add("Form", Form, importInfo("Form"));
stories.add("LoginForm", LoginForm, importInfo("LoginForm"));

export default stories;
