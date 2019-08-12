import React from "react";
import { Alert } from "react-native";
import Container from "../Container";
import FormContainer from "../../Containers/FormContainer";
import { text, number, color } from "@storybook/addon-knobs/react";
import { setRequiredProp, setOptionalProp, isEmailInvalid } from "../Helpers";
import Colors from "../../Themes/Colors";

const LoginForm = () => {
  return (
    <Container>
      <FormContainer
        emailLabel={text(setRequiredProp("emailLabel"), "Email")}
        passwordLabel={text(setRequiredProp("passwordLabel"), "Password")}
        validateEmail={validateEmail}
        validatePassword={validatePassword}
        initialEmailValue={text(setOptionalProp("initialEmailValue"), "lol@lol.ru")}
        initialPasswordValue={text(setOptionalProp("initialPasswordValue"), "12345678")}
        submitLabel={text(setOptionalProp("submitLabel"), "Sign in")}
        onSubmit={handleSubmit}
        forgotPasswordButtonLabel={text(setOptionalProp("forgotPasswordButtonLabel"), "Forgot your passport?")}
        onForgotPasswordPress={() => Alert.alert("forgot password button press")}
        separatorText={text(setOptionalProp("separatorText"), "or")}
        registrationButtonLabel={text(setOptionalProp("registrationButtonLabel"), "call for registration")}
        onRegistrationPress={() => Alert.alert("registration button press")}
        backgroundColor={color(setOptionalProp("backgroundColor"), Colors.white)}
        themeColor={color(setOptionalProp("themeColor"), Colors.lime)}
        componentsSizeRatio={number(setOptionalProp("componentsSizeRatio"), 1)}
      />
    </Container>
  );
};
const handleSubmit = (value) => {
  console.log(value);
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
