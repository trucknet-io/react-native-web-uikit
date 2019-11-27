import { storiesOf } from "@storybook/react-native";
import LoginForm from "./LoginForm";
import Form from "./Form";
import { importInfo } from "src/stories/Helpers";

const stories = storiesOf("Forms", module);
stories.add("LoginForm", LoginForm, importInfo("LoginForm"));
stories.add("Form", Form, importInfo("Form"));

export default stories;
