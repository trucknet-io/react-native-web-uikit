import React from "react";
import { Alert } from "react-native";
import Container from "../Container";
import FormContainer from "../../Containers/FormContainer";
import { text, button } from "@storybook/addon-knobs/react";
import { setRequiredProp, setOptionalProp, isEmailInvalid } from "../Helpers";

const LoginForm = () => (
  <Container>
    <FormContainer
      emailLabel={text(setRequiredProp("emailLabel"), "Email")}
      passwordLabel={text(setRequiredProp("passwordLabel"), "Password")}
      initialEmailValue={text(setOptionalProp("initialEmailValue"), "lol@lol.ru")}
      initialPasswordValue={text(setOptionalProp("initialPasswordValue"), "12345678")}
      onSubmit={handleSubmit}
      onForgotPasswordPress={() => Alert.alert("forgot password button press")}
      onRegistrationPress={() => Alert.alert("registration button press")}
      validateEmail={validateEmail}
      validatePassword={validatePassword}
      separatorText="or"
    />
  </Container>
);

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
