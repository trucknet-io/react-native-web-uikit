import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import LoginForm, { LoginFormContainerComponent } from "./LoginFormContainer";
import Form, { FormContainerComponent } from "./FormContainer";
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
  component: LoginFormContainerComponent,
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
      },
      password: {
        label: "Password",
        initialValue: "123123123",
        validate: validatePassword,
      },
    })}
  />
));

const formStories = storiesOf("Forms|Form", module).addParameters({
  component: FormContainerComponent,
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

export { loginFormStories, formStories };
