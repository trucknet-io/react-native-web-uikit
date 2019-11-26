import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, ViewStyle, GestureResponderEvent, FlexAlignType } from "react-native";
import Colors from "src/Themes/Colors";
import getShadowStyle from "src/Themes/Shadow";

import LinearGradient from "./LinearGradient";

interface ButtonProps {
  borderRadius: number;
  width: string | number;
  marginVertical: string | number;
  marginHorizontal: string | number;
  borderWidth: number;
  borderColor: string;
  disabled: boolean;
  textColor: string;
  alignItems: FlexAlignType;
  label?: React.ReactNode;
  children?: React.ReactChild;
  onPress?(e: GestureResponderEvent): void;
  onLongPress?(e: GestureResponderEvent): void;
  onPressIn?(e: GestureResponderEvent): void;
  onPressOut?(e: GestureResponderEvent): void;
  style?: ViewStyle;
}

interface GradientButtonProps extends ButtonProps {
  gradientStartColor: string;
  gradientEndColor: string;
}

const defaultButtonProps = {
  borderRadius: 4,
  width: "100%",
  marginVertical: 0,
  marginHorizontal: 0,
  alignItems: "center",
  borderWidth: 0,
  borderColor: 0,
  disabled: false,
  textColor: Colors.buttonText,
  style: StyleSheet.create({}),
};

export class GradientButton extends React.PureComponent<GradientButtonProps> {
  private PRESS_IN_SHADOW = 1;
  private PRESS_OUT_SHADOW = 4;

  public static defaultProps = {
    gradientStartColor: Colors.themeGradient.gradientColor1,
    gradientEndColor: Colors.themeGradient.gradientColor2,
    ...defaultButtonProps,
  };

  public state = {
    shadow: getShadowStyle(this.PRESS_OUT_SHADOW),
  };

  public render() {
    const {
      disabled,
      onPress,
      onLongPress,
      gradientStartColor,
      gradientEndColor,
      width,
      marginVertical,
      marginHorizontal,
      borderRadius,
      alignItems,
      style,
    } = this.props;
    return (
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        gradientStartColor={this.getColor(gradientStartColor)}
        gradientEndColor={this.getColor(gradientEndColor)}
        style={[
          styles.linearGradient,
          { width, marginVertical, marginHorizontal, borderRadius, alignItems },
          style,
          this.state.shadow,
        ]}>
        <TouchableOpacity
          style={[styles.buttonContainer, { width, alignItems }, style]}
          onPress={onPress}
          onLongPress={onLongPress}
          onPressIn={this.handlePressIn}
          onPressOut={this.handlePressOut}
          disabled={disabled}>
          {this.renderChildren()}
        </TouchableOpacity>
      </LinearGradient>
    );
  }

  private renderChildren = () => {
    if (this.props.children) {
      return this.props.children;
    }
    return <Text style={[styles.buttonLabel, { color: this.getTextColor() }]}>{this.props.label}</Text>;
  };

  private getTextColor = () => {
    if (this.props.disabled) {
      return Colors.disable;
    }
    return this.props.textColor || Colors.buttonText;
  };

  private getColor = (gradientColor: string) => {
    if (this.props.disabled) return Colors.palette.veryVeryLightGray;
    return gradientColor;
  };

  private handlePressIn = (e: GestureResponderEvent) => {
    this.setState({ shadow: getShadowStyle(this.PRESS_IN_SHADOW) }, () => {
      if (this.props.onPressIn) {
        this.props.onPressIn(e);
      }
    });
  };
  private handlePressOut = (e: GestureResponderEvent) => {
    this.setState({ shadow: getShadowStyle(this.PRESS_OUT_SHADOW) }, () => {
      if (this.props.onPressOut) {
        this.props.onPressOut(e);
      }
    });
  };
}

interface TransparentButtonProps extends ButtonProps {
  link?: string;
  linkColor: string;
}

export class TransparentButton extends React.PureComponent<TransparentButtonProps> {
  public static defaultProps = {
    linkColor: Colors.buttonText,
    ...defaultButtonProps,
  };
  public render() {
    const {
      onPress,
      disabled,
      onLongPress,
      onPressIn,
      onPressOut,
      width,
      marginVertical,
      marginHorizontal,
      borderRadius,
      alignItems,
      style,
    } = this.props;
    return (
      <TouchableOpacity
        disabled={disabled}
        onPressIn={onPressIn}
        onPress={onPress}
        onPressOut={onPressOut}
        onLongPress={onLongPress}
        style={[styles.buttonContainer, { width, marginVertical, marginHorizontal, borderRadius, alignItems }, style]}>
        {this.renderChildren()}
      </TouchableOpacity>
    );
  }
  private renderChildren = () => {
    if (this.props.children) {
      return this.props.children;
    }
    if (this.props.link) {
      return (
        <React.Fragment>
          <Text style={[styles.buttonText, { color: this.props.textColor }]}>{this.props.label}</Text>
          <Text style={[styles.buttonLinkText, { color: this.props.linkColor }]}>{this.props.link}</Text>
        </React.Fragment>
      );
    }
    return <Text style={[styles.buttonLabel, { color: this.props.textColor }]}>{this.props.label}</Text>;
  };
}

const styles = StyleSheet.create({
  linearGradient: {
    ...getShadowStyle(),
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: 12,
  },
  buttonText: {
    color: Colors.buttonText,
  },
  buttonLabel: {
    color: Colors.buttonText,
  },
  buttonLinkText: {
    textDecorationLine: "underline",
    color: Colors.buttonText,
  },
  text: {
    color: Colors.buttonText,
  },
});
