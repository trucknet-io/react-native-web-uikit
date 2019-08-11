import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import * as Icons from "../Components/Icons";
import Colors from "../Themes/Colors";
import Input from "../Components/Input";
import { GradientButton, TransparentButton } from "../Components/Buttons";

type Response = { email: string; password: string; isValid: boolean };

type Props = {
  emailLabel: string;
  passwordLabel: string;
  validateEmail(value: string): string | undefined;
  validatePassword(value: string): string | undefined;
  onSubmit(Response): void;
  submitLabel: string;
  initialEmailValue?: string;
  initialPasswordValue?: string;
  forgotPasswordButtonLabel?: string;
  onForgotPasswordPress?(): void;
  registrationButtonLabel?: string;
  onRegistrationPress?(): void;
  separatorText?: string;
  themeColor: string;
};

type State = {
  email: { value?: string; isValid: boolean };
  password: { value?: string; isValid: boolean };
};

class FormContainer extends React.PureComponent<Props, State> {
  static defaultProps = {
    submitLabel: "sign in",
    forgotPasswordButtonLabel: "Forgot your passport?",
    registrationButtonLabel: "call for registration",
    themeColor: Colors.lime,
  };
  state = {
    email: { value: this.props.initialEmailValue, isValid: !!this.props.initialEmailValue },
    password: { value: this.props.initialPasswordValue, isValid: !!this.props.initialPasswordValue },
  };
  public render() {
    const { emailLabel, passwordLabel, validateEmail, validatePassword } = this.props;
    return (
      <View style={styles.container}>
        <Icons.TrucknetLogo height={32} width={256} />
        <View style={styles.inputContainer}>
          <Input
            label={emailLabel}
            initialValue={this.props.initialEmailValue}
            validateValue={validateEmail}
            setValue={this.setEmail}
            fieldColor={this.props.themeColor}
          />
          <Input
            secureTextEntry
            label={passwordLabel}
            initialValue={this.props.initialPasswordValue}
            validateValue={validatePassword}
            setValue={this.setPassword}
            fieldColor={this.props.themeColor}
          />
        </View>
        {this.renderSubmitButton()}
        {this.renderForgotPasswordButton()}
        {this.renderSeparationLine()}
        {this.renderRegistrationButton()}
      </View>
    );
  }
  private setEmail = (email) => this.setState({ email });
  private setPassword = (password) => this.setState({ password });
  private onSubmit = () => {
    const { email, password } = this.state;
    this.props.onSubmit({ email: email.value, password: password.value });
  };
  private renderSubmitButton = () => {
    const { email, password } = this.state;
    return (
      <GradientButton
        disabled={!(email.isValid && password.isValid)}
        label={this.props.submitLabel.toUpperCase()}
        onPress={this.onSubmit}
      />
    );
  };
  private renderForgotPasswordButton = () => {
    if (this.props.onForgotPasswordPress) {
      return (
        <TransparentButton
          label={this.props.forgotPasswordButtonLabel}
          textColor={Colors.black}
          onPress={this.props.onForgotPasswordPress}
        />
      );
    }
    return <View />;
  };
  private renderSeparationLine = () => {
    if (this.props.separatorText) {
      return (
        <View style={styles.separatorContainer}>
          <View style={styles.line} />
          <Text style={styles.separatorText}>{this.props.separatorText}</Text>
          <View style={styles.line} />
        </View>
      );
    }
    return <View />;
  };
  private renderRegistrationButton = () => {
    if (this.props.onRegistrationPress) {
      return (
        <TransparentButton
          label={this.props.registrationButtonLabel.toUpperCase()}
          borderWidth={1}
          borderColor={this.props.themeColor}
          textColor={this.props.themeColor}
          onPress={this.props.onRegistrationPress}
        />
      );
    }
    return <View />;
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: "16%",
    paddingVertical: 32,
    backgroundColor: Colors.background,
    justifyContent: "space-around",
    alignItems: "center",
  },
  inputContainer: {
    height: 256,
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  separatorContainer: {
    flexDirection: "row",
    width: "100%",
    height: 16,
    justifyContent: "space-between",
    alignItems: "center",
  },
  line: {
    height: 1,
    backgroundColor: Colors.veryLightGray,
    width: "45%",
  },
  separatorText: {
    color: Colors.lightGray,
  },
});

export default FormContainer;
