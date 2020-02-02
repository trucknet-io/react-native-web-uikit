import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import LoginForm from "./LoginFormContainer";
import Form from "./FormContainer";
import { object, select } from "@storybook/addon-knobs/react";
import { action } from "@storybook/addon-actions";

const loginFormStories = storiesOf("Forms|Login Form", module);
loginFormStories.add("Login Form", () => (
  <LoginForm
    callback={object("callback", {
      handleSubmit: action("Submit"),
      onForgotPasswordPress: action("forgot password button press"),
      onRegistrationPress: action("registration button press"),
    })}
    fields={object("fields", {
      email: {
        label: "Email",
        initialValue: "lol@lol.ru",
        validate: action("validate email"),
      },
      password: {
        label: "Password",
        initialValue: "123123123",
        validate: action("validate password"),
      },
    })}
    theme={select("theme", { light: "light", dark: "dark" })}
  />
));

const formStories = storiesOf("Forms|Form", module);

formStories.add("Form", () => (
  <Form
    handleSubmit={action("Submit")}
    fields={object("fields", {
      email: { label: "email", validate: action("validateEmail"), keyboardType: "email-address" },
      pass: { label: "pass", validate: action("validatePassword"), secureTextEntry: true },
      phone: { label: "phone", keyboardType: "phone-pad" },
    })}
    submitLabel="Sign in"
    theme={select("theme", { light: "light", dark: "dark" })}
  />
));

export default { loginFormStories, formStories };
