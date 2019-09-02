import * as React from "react";

import { View, StyleSheet, Text, Animated, Keyboard } from "react-native";
import * as Icons from "src/Components/Icons";
import Colors, { colorTheme } from "src/Themes/Colors";
import { TransparentButton } from "src/Components/Buttons";
import FormContainer from "./FormContainer";

type Props = {
  fields: {
    email: {
      label: string;
      initialValue?: string;
      validate?(value: string): string | undefined;
    };
    password: {
      label: string;
      initialValue?: string;
      validate?(value: string): string | undefined;
    };
  };
  callback: {
    handleSubmit(res: { email: string; password: string }): void;
    onForgotPasswordPress?(): void;
    onRegistrationPress?(): void;
  };
  text: {
    submitLabel: string;
    forgotPasswordButtonLabel: string;
    registrationButtonLabel: string;
    separatorText: string;
  };
  theme: "light" | "dark";
  componentsSizeRatio: number;
  logo?: React.ReactNode;
};

type State = {
  subElementsOpacity: Animated.Value;
  colors: typeof colorTheme;
};

class LoginFormContainer extends React.PureComponent<Props, State> {
  keyboardDidShowListener;
  keyboardDidHideListener;

  static defaultProps = {
    text: {
      submitLabel: "sign in",
      forgotPasswordButtonLabel: "Forgot your passport?",
      registrationButtonLabel: "call for registration",
      separatorText: "or",
      theme: "light",
    },
    componentsSizeRatio: 1,
  };

  state = {
    subElementsOpacity: new Animated.Value(1),
    colors: colorTheme,
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
    const { fields } = this.props;
    const theme = this.state.colors[this.props.theme];
    const formKey = `${fields.email.initialValue}${fields.password.initialValue}`;
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        {this.renderLogoContainer()}
        <FormContainer
          fields={{
            email: {
              ...fields.email,
              keyboardType: "email-address",
            },
            password: {
              ...fields.password,
              secureTextEntry: true,
            },
          }}
          theme={this.props.theme}
          handleSubmit={this.handleSubmit}
          paddingHorizontal={0}
          paddingTop={84}
          submitLabel={this.props.text.submitLabel}
          key={formKey}
        />
        <View style={styles.buttonsContainer}>
          {this.renderForgotPasswordButton()}
          {this.renderSeparationLine()}
          {this.renderRegistrationButton()}
        </View>
      </View>
    );
  }

  private handleSubmit = (fields) => {
    const email = fields.email.value;
    const password = fields.password.value;
    this.props.callback.handleSubmit({ email, password });
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
    const theme = this.state.colors[this.props.theme];
    if (this.props.logo) {
      return this.props.logo;
    }
    return (
      <Icons.TrucknetLogo
        color={theme.defaultText}
        height={24 * this.props.componentsSizeRatio}
        width={182 * this.props.componentsSizeRatio}
      />
    );
  };

  private renderForgotPasswordButton = () => {
    const theme = this.state.colors[this.props.theme];
    if (this.props.callback.onForgotPasswordPress) {
      return (
        <TransparentButton
          height={32 * this.props.componentsSizeRatio}
          label={this.props.text.forgotPasswordButtonLabel}
          textColor={theme.defaultText}
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
    const theme = this.state.colors[this.props.theme];
    return theme.defaultText;
  };
  private setSeparatorLineColor = () => {
    const theme = this.state.colors[this.props.theme];
    return `${theme.palette.veryLightGray}`;
  };
  private renderRegistrationButton = () => {
    const theme = this.state.colors[this.props.theme];
    if (this.props.callback.onRegistrationPress) {
      return (
        <TransparentButton
          label={this.props.text.registrationButtonLabel.toUpperCase()}
          height={40 * this.props.componentsSizeRatio}
          borderWidth={1}
          borderColor={theme.themeColor}
          textColor={theme.themeColor}
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
    paddingVertical: 8,
    justifyContent: "space-around",
    alignItems: "center",
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
    backgroundColor: Colors.palette.veryLightGray,
    width: "45%",
  },
  separatorText: {
    color: Colors.palette.lightGray,
  },
});

export default LoginFormContainer;
