import * as React from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../Themes/Colors";
import { shadow } from "../Themes/Shadow";

import LinearGradient from "react-native-linear-gradient";

interface LinearGradientStylesProps {
  borderRadius?: number;
  width?: number | string;
  height?: number | string;
  marginVertical?: number | string;
  marginHorizontal?: number | string;
}

interface ButtonContainerStylesProps extends LinearGradientStylesProps {
  borderWidth?: number;
  borderColor?: string;
}

interface ButtonProps extends ButtonContainerStylesProps {
  disabled?: boolean;
  textColor?: string;
  testID?: string;
  onPress(): void;
}

const linearGradientStyles = (props: LinearGradientStylesProps) => {
  const commonStyles = {
    borderRadius: props.borderRadius || 4,
    width: props.width === undefined ? "100%" : props.width,
    height: props.height || 44,
    marginVertical: props.marginVertical,
    marginHorizontal: props.marginHorizontal,
  };
  if (Platform.OS === "web") {
    return commonStyles;
  }
  return commonStyles;
};

const buttonContainerStyles = (props: ButtonContainerStylesProps) => ({
  width: props.width || "100%",
  height: props.height || 44,
  borderRadius: props.borderRadius || 4,
  borderWidth: props.borderWidth,
  borderColor: props.borderColor,
  marginVertical: props.marginVertical,
  marginHorizontal: props.marginHorizontal,
});

interface GradientButtonWithChildrenProps extends ButtonProps {
  gradientStartColor: string;
  gradientEndColor: string;
  children: React.ReactChild;
  disabled?: boolean;
}

export class GradientButtonWithChildren extends React.PureComponent<GradientButtonWithChildrenProps> {
  public PRESS_IN_SHADOW = 1;
  public PRESS_OUT_SHADOW = 4;

  private setShadow = (size: number) => {
    if (Platform.OS === "web") {
      return {
        boxShadow: `${size}px ${size}px ${size / 2}px rgba(0, 0, 0, 0.2)`,
      };
    }
    return { elevation: size };
  };

  public state = {
    shadow: this.setShadow(this.PRESS_OUT_SHADOW),
  };

  public render() {
    const { gradientStartColor, gradientEndColor, disabled, onPress } = this.props;

    return (
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        colors={[
          disabled ? Colors.veryVeryLightGray : gradientStartColor,
          disabled ? Colors.veryVeryLightGray : gradientEndColor,
        ]}
        // @ts-ignore
        style={[styles.linearGradient, linearGradientStyles(this.props), this.state.shadow]}>
        <TouchableOpacity
          testID={this.props.testID}
          style={[
            styles.buttonContainer,
            buttonContainerStyles({ ...this.props, marginVertical: 0, marginHorizontal: 0 }),
          ]}
          onPress={onPress}
          onPressIn={this.handlePressIn}
          onPressOut={this.handlePressOut}
          disabled={disabled}>
          {this.props.children}
        </TouchableOpacity>
      </LinearGradient>
    );
  }

  private handlePressIn = () => {
    this.setState({ shadow: this.setShadow(this.PRESS_IN_SHADOW) }, this.props.onPress);
  };
  private handlePressOut = () => {
    this.setState({ shadow: this.setShadow(this.PRESS_OUT_SHADOW) }, this.props.onPress);
  };
}

interface GradientButtonProps extends ButtonProps {
  label: string;
  gradientStartColor: string;
  gradientEndColor: string;
  disabled?: boolean;
}

export class GradientButton extends React.PureComponent<GradientButtonProps> {
  public render() {
    const { label } = this.props;
    return (
      <GradientButtonWithChildren {...this.props}>
        <Text style={[styles.buttonLabel, { color: this.setColor() }]}>{label}</Text>
      </GradientButtonWithChildren>
    );
  }

  private setColor = () => {
    if (this.props.disabled) {
      return Colors.disable;
    }
    return this.props.textColor || Colors.buttonText;
  };
}

interface TransparentButtonProps extends ButtonProps {
  label: string;
}

export const TransparentButton = (props: TransparentButtonProps) => {
  const { onPress, label, disabled } = props;
  return (
    <TouchableOpacity
      disabled={disabled}
      testID={props.testID}
      style={[styles.buttonContainer, buttonContainerStyles(props)]}
      onPress={onPress}>
      <Text style={[styles.buttonLabel, { color: props.textColor || Colors.buttonText }]}>{label}</Text>
    </TouchableOpacity>
  );
};

interface TransparentButtonWithTextProps extends ButtonProps {
  link: string;
  label: string;
  linkColor?: string;
  textColor?: string;
}

export const TransparentButtonWithLink = (props: TransparentButtonWithTextProps) => {
  const { onPress, label, link, disabled } = props;
  return (
    <View style={[styles.buttonContainer, buttonContainerStyles(props), { flexDirection: "row" }]}>
      <Text style={[styles.buttonText, { color: props.textColor || Colors.buttonText }]}>{label}</Text>
      <TouchableOpacity disabled={disabled} testID={props.testID} onPress={onPress}>
        <Text style={[styles.buttonLinkText, { color: props.linkColor || Colors.buttonText }]}>{link}</Text>
      </TouchableOpacity>
    </View>
  );
};

interface TransparentButtonWithChildrenProps extends ButtonProps {
  label: string;
  children: React.ReactChild;
}

export const TransparentButtonWithChildren = (props: TransparentButtonWithChildrenProps) => {
  const { onPress, disabled, children } = props;

  return (
    <TouchableOpacity
      testID={props.testID}
      style={[styles.buttonContainer, buttonContainerStyles(props)]}
      onPress={onPress}
      disabled={disabled}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    ...shadow,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
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
