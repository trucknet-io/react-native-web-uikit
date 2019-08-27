import React from "react";
import Container from "../Container";
import FormContainer from "../../Containers/FormContainer";
import { select, object } from "@storybook/addon-knobs/react";
import { setRequiredProp, setOptionalProp, isEmailInvalid } from "../Helpers";
import { action } from "@storybook/addon-actions";

const LoginForm = () => {
  return (
    <Container>
      <FormContainer
        onSubmit={action("Submit")}
        fields={object(setRequiredProp("fields"), {
          email: { label: "email", validate: validateEmail, keyboardType: "email-address" },
          pass: { label: "pass", validate: validatePassword, secureTextEntry: true },
          phone: { label: "phone", keyboardType: "phone-pad" },
        })}
        submitLabel="Sign in"
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
