import React from "react";
import { Alert } from "react-native";
import Container from "../Container";
import LoginFormContainer from "../../Containers/LoginFormContainer";
import { select, number, color, object } from "@storybook/addon-knobs/react";
import { setRequiredProp, setOptionalProp, isEmailInvalid } from "../Helpers";
import { ThemeProvider } from "../../Themes/themeProvider";
import { ColorThemeNameType } from "../../Themes/Colors";
import { GradientButton } from "../../Components/Buttons";
const LoginForm = () => {
  return (
    <Container>
      <LoginWrapper />
    </Container>
  );
};

type State = {
  colorThemeName: ColorThemeNameType;
};

class LoginWrapper extends React.PureComponent<{}, State> {
  public state = {
    colorThemeName: "light" as "light",
  };
  render() {
    return (
      <ThemeProvider
        value={{
          colorThemeName: this.state.colorThemeName,
        }}>
        <GradientButton label="dark" onPress={() => this.setState({ colorThemeName: "dark" })} />
        <GradientButton label="light" onPress={() => this.setState({ colorThemeName: "light" })} />
        <LoginFormContainer
          callback={object(setRequiredProp("callback"), {
            onSubmit: handleSubmit,
            onForgotPasswordPress: () => Alert.alert("forgot password button press"),
            onRegistrationPress: () => Alert.alert("registration button press"),
          })}
          initial={object(setOptionalProp("initial"), {
            email: "lol@lol.ru",
            password: "12345678",
          })}
          validate={{ email: validateEmail, password: validatePassword }}
          text={object(setOptionalProp("text"), {
            emailLabel: "Email",
            passwordLabel: "Password",
            submitLabel: "Sign in",
            forgotPasswordButtonLabel: "Forgot your passport?",
            registrationButtonLabel: "call for registration",
            separatorText: "or",
          })}
          componentsSizeRatio={number(setOptionalProp("componentsSizeRatio"), 1)}
          theme={select(setOptionalProp("theme"), { light: "light", dark: "dark" }, "light")}
        />
      </ThemeProvider>
    );
  }
}

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
