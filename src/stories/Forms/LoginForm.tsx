import React from "react";
import { Alert } from "react-native";
import Container from "src/stories/Container";
import LoginFormContainer from "src/Containers/LoginFormContainer";
import { select, number, object } from "@storybook/addon-knobs/react";
import { setRequiredProp, setOptionalProp, isEmailInvalid } from "src/stories/Helpers";
import { action } from "@storybook/addon-actions";

const LoginForm = () => {
  return (
    <Container>
      <LoginFormContainer
        callback={object(setRequiredProp("callback"), {
          handleSubmit: action("Submit"),
          onForgotPasswordPress: () => Alert.alert("forgot password button press"),
          onRegistrationPress: () => Alert.alert("registration button press"),
        })}
        fields={object(setOptionalProp("fields"), {
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
        text={object(setOptionalProp("text"), {
          submitLabel: "Sign in",
          forgotPasswordButtonLabel: "Forgot your passport?",
          registrationButtonLabel: "call for registration",
          separatorText: "or",
        })}
        componentsSizeRatio={number(setOptionalProp("componentsSizeRatio"), 1)}
        theme={select(setOptionalProp("theme"), { light: "light", dark: "dark" }, "light")}
      />
    </Container>
  );
};

const validateEmail = (email) => {
  if (!email) {
    return "Email field is required";
  }
  if (!isEmailInvalid(email)) {
    return undefined;
  }
  return "Email format is invalid";
};

const validatePassword = (password) => {
  if (!password) {
    return "Password field is required";
  }
  if (password.length > 7) {
    return undefined;
  }
  return "Password must be at least 8 characters long";
};

export default LoginForm;
