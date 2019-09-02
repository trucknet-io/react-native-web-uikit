import { storiesOf } from "@storybook/react-native";
import LoginForm from "./LoginForm";
import Form from "./Form";
import { withKnobs } from "@storybook/addon-knobs/react";
import { withInfo } from "@storybook/addon-info";
import { importInfo } from "src/stories/Helpers";

const stories = storiesOf("Forms", module);

stories.addDecorator(withKnobs);
stories.addDecorator(withInfo);

stories.add("LoginForm", LoginForm, importInfo("LoginForm"));
stories.add("Form", Form, importInfo("Form"));

export default stories;
