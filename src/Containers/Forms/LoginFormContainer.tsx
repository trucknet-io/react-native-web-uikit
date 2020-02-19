import * as React from "react";

import { View, StyleSheet, Animated, Keyboard } from "react-native";
import * as Icons from "src/Components/Icons";
import { TransparentButton } from "src/Components/Buttons";
import FormContainer from "./FormContainer";
import withTheme, { ThemeProps } from "src/Themes/withTheme";

interface DefaultProps {
  text: {
    submitLabel: string;
    forgotPasswordButtonLabel: string;
  };
  componentsSizeRatio: number;
}

interface Props extends ThemeProps, DefaultProps {
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
  logo?: React.ReactNode;
}

type State = {
  subElementsOpacity: Animated.Value;
};

export class LoginFormContainerComponent extends React.PureComponent<Props, State> {
  keyboardDidShowListener;
  keyboardDidHideListener;

  static defaultProps: DefaultProps = {
    text: {
      submitLabel: "sign in",
      forgotPasswordButtonLabel: "Forgot your passport?",
    },
    componentsSizeRatio: 1,
  };

  state = {
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
    const { fields, colors } = this.props;
    const formKey = `${fields.email.initialValue}${fields.password.initialValue}`;
    return (
      <View style={[styles.container, { backgroundColor: colors.containerBackground }]}>
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
    if (this.props.logo) {
      return this.props.logo;
    }
    return (
      <Icons.TrucknetLogo
        color={this.props.colors.defaultText}
        height={24 * this.props.componentsSizeRatio}
        width={182 * this.props.componentsSizeRatio}
      />
    );
  };

  private renderForgotPasswordButton = () => {
    if (this.props.callback.onForgotPasswordPress) {
      return (
        <TransparentButton
          label={this.props.text.forgotPasswordButtonLabel}
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

export default withTheme<Props, DefaultProps>()(LoginFormContainerComponent);
