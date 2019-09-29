import * as React from "react";

import { View, StyleSheet, Animated, Keyboard } from "react-native";
import * as Icons from "src/Components/Icons";
import { colorTheme } from "src/Themes/Colors";
import { TransparentButton } from "src/Components/Buttons";
import FormContainer from "./FormContainer";

type Props = {
  fields: {
    email: {
      label: string;
      initialValue?: string;
      validate?(value: string): string | void;
    };
    password: {
      label: string;
      initialValue?: string;
      validate?(value: string): string | void;
    };
  };
  callback: {
    handleSubmit(res: { email: string; password: string }): void;
    onForgotPasswordPress?(): void;
  };
  text: {
    submitLabel: string;
    forgotPasswordButtonLabel: string;
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
        <View style={styles.buttonsContainer}>{this.renderForgotPasswordButton()}</View>
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
    return (
      <Animated.View style={{ opacity: this.state.subElementsOpacity, marginTop: 30 }}>
        {this.renderLogo()}
      </Animated.View>
    );
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
  buttonsContainer: { flex: 0.3, width: "100%", justifyContent: "space-around" },
});

export default LoginFormContainer;
