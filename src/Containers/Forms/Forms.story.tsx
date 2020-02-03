import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import LoginForm from "./LoginFormContainer";
import Form from "./FormContainer";
import { object } from "@storybook/addon-knobs/react";
import { action } from "@storybook/addon-actions";
import { validateEmail, validatePassword } from "src/Helpers/validateHelpers";

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
        validate: validateEmail,
      },
      password: {
        label: "Password",
        initialValue: "123123123",
        validate: validatePassword,
      },
    })}
  />
));

const formStories = storiesOf("Forms|Form", module);

formStories.add("Form", () => (
  <Form
    handleSubmit={action("Submit")}
    fields={object("fields", {
      email: { label: "email", validate: validateEmail, keyboardType: "email-address" },
      pass: { label: "pass", validate: validatePassword, secureTextEntry: true },
      phone: { label: "phone", keyboardType: "phone-pad" },
    })}
    submitLabel="Sign in"
  />
));

export default { loginFormStories, formStories };
