import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import LoginForm, { PureLoginFormContainer } from "./LoginFormContainer";
import Form, { PureFormContainer } from "./FormContainer";
import { object } from "@storybook/addon-knobs/react";
import { action } from "@storybook/addon-actions";

const validateEmail = (email?: string) => {
  const emailRegex = new RegExp(
    // tslint:disable-next-line: max-line-length
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  );
  if (!email) {
    return "Email field is required";
  }
  return !emailRegex.test(email) ? "Email format is invalid" : undefined;
};

const validatePassword = (password?: string) => {
  if (!password) {
    return "Password field is required";
  }
  return password.length < 8 ? "Password must be at least 8 characters long" : undefined;
};

const loginFormStories = storiesOf("Forms|Login Form", module).addParameters({
  component: PureLoginFormContainer,
});

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
        isRequired: true,
      },
      password: {
        label: "Password",
        validate: validatePassword,
        isRequired: true,
      },
    })}
  />
));

const formStories = storiesOf("Forms|Form", module).addParameters({
  component: PureFormContainer,
});

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

formStories.add("Form Loading", () => (
  <Form
    handleSubmit={action("Submit")}
    fields={object("fields", {
      email: { label: "email", validate: validateEmail, keyboardType: "email-address" },
      pass: { label: "pass", validate: validatePassword, secureTextEntry: true },
      phone: { label: "phone", keyboardType: "phone-pad" },
    })}
    submitLabel="Sign in"
    isLoading
  />
));

export { loginFormStories, formStories };
