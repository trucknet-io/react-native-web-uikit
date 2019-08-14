import * as React from "react";
import { View, StyleSheet, Text, Animated, Keyboard } from "react-native";
import * as Icons from "../Components/Icons";
import Colors from "../Themes/Colors";
import Input from "../Components/Input";
import { GradientButton, TransparentButton } from "../Components/Buttons";

export type Props = {
  callback: {
    onSubmit(res: { email: string; password: string }): void;
    onForgotPasswordPress?(): void;
    onRegistrationPress?(): void;
  };
  validate: {
    email(value: string): string | undefined;
    password(value: string): string | undefined;
  };
  initial: {
    email?: string;
    password?: string;
  };
  text: {
    emailLabel: string;
    passwordLabel: string;
    submitLabel: string;
    forgotPasswordButtonLabel: string;
    registrationButtonLabel: string;
    separatorText: string;
  };
  color: {
    text: string;
    theme: string;
    background: string;
  };
  componentsSizeRatio: number;
  logo?: React.ReactNode;
};

type State = {
  fields: {
    email: { value?: string; isValid: boolean };
    password: { value?: string; isValid: boolean };
  };
  subElementsOpacity: Animated.Value;
};

class LoginFormContainer extends React.PureComponent<Props, State> {
  keyboardDidShowListener;
  keyboardDidHideListener;

  static defaultProps = {
    initial: { email: undefined, password: undefined },
    text: {
      emailLabel: "email",
      passwordLabel: "password",
      submitLabel: "sign in",
      forgotPasswordButtonLabel: "Forgot your passport?",
      registrationButtonLabel: "call for registration",
      separatorText: "or",
    },
    color: {
      theme: Colors.lime,
      text: Colors.defaultText,
      background: Colors.white,
    },
    componentsSizeRatio: 1,
  };

  private setInitialFieldsValues = () => {
    const { email, password } = this.props.initial;
    return {
      email: { value: email, isValid: !!email },
      password: { value: password, isValid: !!password },
    };
  };

  state = {
    fields: this.setInitialFieldsValues(),
    subElementsOpacity: new Animated.Value(1),
  };

  public componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", this.hideSubElements);
    this.keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", this.showSubElements);
  }

  public componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  public render() {
    const { validate, text, color, initial } = this.props;
    return (
      <View style={[styles.container, { backgroundColor: color.background }]}>
        {this.renderLogoContainer()}
        <View style={styles.inputContainer}>
          <Input
            label={text.emailLabel}
            initialValue={initial.email}
            validateValue={validate.email}
            onChange={this.setField("email")}
            onSuccessInputFieldColor={color.theme}
            textColor={color.text}
            keyboardType="email-address"
          />
          <Input
            secureTextEntry
            label={text.passwordLabel}
            initialValue={initial.password}
            validateValue={validate.password}
            onChange={this.setField("password")}
            onSuccessInputFieldColor={color.theme}
            textColor={color.text}
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

  private setField = (fieldName) => (value) => this.setState({ fields: { ...this.state.fields, [fieldName]: value } });
  private onSubmit = () => {
    const { email, password } = this.state.fields;
    const emailValue = email.value as string;
    const passwordValue = password.value as string;
    this.props.callback.onSubmit({ email: emailValue, password: passwordValue });
  };
  private renderSubmitButton = () => {
    const { email, password } = this.state.fields;
    return (
      <GradientButton
        height={40 * this.props.componentsSizeRatio}
        disabled={!(email.isValid && password.isValid)}
        label={this.props.text.submitLabel.toUpperCase()}
        onPress={this.onSubmit}
      />
    );
  };

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
        color={this.props.color.text}
        height={24 * this.props.componentsSizeRatio}
        width={182 * this.props.componentsSizeRatio}
      />
    );
  };

  private renderForgotPasswordButton = () => {
    if (this.props.callback.onForgotPasswordPress) {
      return (
        <TransparentButton
          height={32 * this.props.componentsSizeRatio}
          label={this.props.text.forgotPasswordButtonLabel}
          textColor={this.props.color.text}
          onPress={this.props.callback.onForgotPasswordPress}
        />
      );
    }
    return <View />;
  };
  private renderSeparationLine = () => {
    if (this.props.text.separatorText) {
      return (
        <Animated.View style={[styles.separatorContainer, { opacity: this.state.subElementsOpacity }]}>
          <View style={[styles.line, { backgroundColor: this.setSeparatorLineColor() }]} />
          <Text style={[styles.separatorText, { color: this.setSeparatorTextColor() }]}>
            {this.props.text.separatorText}
          </Text>
          <View style={[styles.line, { backgroundColor: this.setSeparatorLineColor() }]} />
        </Animated.View>
      );
    }
    return <View />;
  };
  private setSeparatorTextColor = () => {
    return `${this.props.color.text}80`;
  };
  private setSeparatorLineColor = () => {
    return `${this.props.color.theme}`;
  };
  private renderRegistrationButton = () => {
    if (this.props.callback.onRegistrationPress) {
      return (
        <TransparentButton
          label={this.props.text.registrationButtonLabel.toUpperCase()}
          height={40 * this.props.componentsSizeRatio}
          borderWidth={1}
          borderColor={this.props.color.theme}
          textColor={this.props.color.theme}
          onPress={this.props.callback.onRegistrationPress}
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

export default LoginFormContainer;
