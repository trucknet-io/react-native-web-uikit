import * as React from "react";
import { View, StyleSheet, Text, Animated, Keyboard } from "react-native";
import * as Icons from "../Components/Icons";
import Colors from "../Themes/Colors";
import Input from "../Components/Input";
import { GradientButton, TransparentButton } from "../Components/Buttons";

export type Props = {
  emailLabel: string;
  passwordLabel: string;
  validateEmail(value: string): string | undefined;
  validatePassword(value: string): string | undefined;
  onSubmit(res: { email: string; password: string }): void;
  submitLabel: string;
  initialEmailValue?: string;
  initialPasswordValue?: string;
  forgotPasswordButtonLabel: string;
  onForgotPasswordPress?(): void;
  registrationButtonLabel: string;
  onRegistrationPress?(): void;
  separatorText?: string;
  themeColor: string;
  textColor: string;
  backgroundColor: string;
  componentsSizeRatio: number;
  logo?: React.ReactNode;
};

type State = {
  email: { value?: string; isValid: boolean };
  password: { value?: string; isValid: boolean };
  subElementsOpacity: Animated.Value;
};

class FormContainer extends React.PureComponent<Props, State> {
  keyboardDidShowListener;
  keyboardDidHideListener;
  static defaultProps = {
    submitLabel: "sign in",
    forgotPasswordButtonLabel: "Forgot your passport?",
    registrationButtonLabel: "call for registration",
    themeColor: Colors.lime,
    textColor: Colors.defaultText,
    backgroundColor: Colors.white,
    componentsSizeRatio: 1,
  };
  state = {
    email: { value: this.props.initialEmailValue, isValid: !!this.props.initialEmailValue },
    password: { value: this.props.initialPasswordValue, isValid: !!this.props.initialPasswordValue },
    subElementsOpacity: new Animated.Value(1),
  };
  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", this.hideSubElements);
    this.keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", this.showSubElements);
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  public render() {
    const { emailLabel, passwordLabel, validateEmail, validatePassword, backgroundColor, textColor } = this.props;
    return (
      <View style={[styles.container, { backgroundColor }]}>
        {this.renderLogoContainer()}
        <View style={styles.inputContainer}>
          <Input
            label={emailLabel}
            initialValue={this.props.initialEmailValue}
            validateValue={validateEmail}
            onChange={this.setEmail}
            onSuccessInputFieldColor={this.props.themeColor}
            textColor={textColor}
            keyboardType="email-address"
          />
          <Input
            secureTextEntry
            label={passwordLabel}
            initialValue={this.props.initialPasswordValue}
            validateValue={validatePassword}
            onChange={this.setPassword}
            onSuccessInputFieldColor={this.props.themeColor}
            textColor={textColor}
          />
        </View>
        <View style={styles.buttonsContainer}>
          {this.renderSubmitButton()}
          {this.renderForgotPasswordButton()}
          {this.renderSeparationLine()}
          {this.renderRegistrationButton()}
        </View>
      </View>
    );
  }

  private showSubElements = () => {
    Animated.timing(this.state.subElementsOpacity, {
      toValue: 1,
      duration: 300,
    }).start();
  };

  private hideSubElements = () => {
    Animated.timing(this.state.subElementsOpacity, {
      toValue: 0,
      duration: 300,
    }).start();
  };

  private renderLogoContainer = () => {
    return <Animated.View style={{ opacity: this.state.subElementsOpacity }}>{this.renderLogo()}</Animated.View>;
  };

  private renderLogo = () => {
    if (this.props.logo) {
      return this.props.logo;
    }
    return (
      <Icons.TrucknetLogo
        color={this.props.textColor}
        height={24 * this.props.componentsSizeRatio}
        width={182 * this.props.componentsSizeRatio}
      />
    );
  };

  private setEmail = (email) => this.setState({ email });
  private setPassword = (password) => this.setState({ password });
  private onSubmit = () => {
    const { email, password } = this.state;
    const emailValue = email.value as string;
    const passwordValue = password.value as string;
    this.props.onSubmit({ email: emailValue, password: passwordValue });
  };
  private renderSubmitButton = () => {
    const { email, password } = this.state;
    return (
      <GradientButton
        height={40 * this.props.componentsSizeRatio}
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
          height={32 * this.props.componentsSizeRatio}
          label={this.props.forgotPasswordButtonLabel}
          textColor={this.props.textColor}
          onPress={this.props.onForgotPasswordPress}
        />
      );
    }
    return <View />;
  };
  private renderSeparationLine = () => {
    if (this.props.separatorText) {
      return (
        <Animated.View style={[styles.separatorContainer, { opacity: this.state.subElementsOpacity }]}>
          <View style={[styles.line, { backgroundColor: this.setSeparatorLineColor() }]} />
          <Text style={[styles.separatorText, { color: this.setSeparatorTextColor() }]}>
            {this.props.separatorText}
          </Text>
          <View style={[styles.line, { backgroundColor: this.setSeparatorLineColor() }]} />
        </Animated.View>
      );
    }
    return <View />;
  };
  private setSeparatorTextColor = () => {
    return `${this.props.textColor}80`;
  };
  private setSeparatorLineColor = () => {
    return `${this.props.themeColor}`;
  };
  private renderRegistrationButton = () => {
    if (this.props.onRegistrationPress) {
      return (
        <TransparentButton
          label={this.props.registrationButtonLabel.toUpperCase()}
          height={40 * this.props.componentsSizeRatio}
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
    justifyContent: "space-around",
    alignItems: "center",
  },
  inputContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  buttonsContainer: { flex: 1, width: "100%", justifyContent: "space-around" },
  separatorContainer: {
    flexDirection: "row",
    width: "100%",
    height: 32,
    justifyContent: "space-between",
    alignItems: "center",
  },
  line: {
    marginTop: 2,
    height: 1,
    backgroundColor: Colors.veryLightGray,
    width: "45%",
  },
  separatorText: {
    color: Colors.lightGray,
  },
});

export default FormContainer;
