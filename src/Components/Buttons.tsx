import * as React from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "src/Themes/Colors";
import createShadow from "src/Themes/Shadow";

import LinearGradient from "./LinearGradient";

interface LinearGradientStylesProps {
  borderRadius?: number;
  width?: string | number;
  height?: string | number;
  marginVertical?: string | number;
  marginHorizontal?: string | number;
}

interface ButtonContainerStylesProps extends LinearGradientStylesProps {
  borderWidth?: number;
  borderColor?: string;
}

interface ButtonProps extends ButtonContainerStylesProps {
  disabled?: boolean;
  textColor?: string;
  testID?: string;
  onPress?: () => void;
  onLongPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
}

const linearGradientStyles = (props: LinearGradientStylesProps) => {
  const commonStyles = {
    borderRadius: props.borderRadius || 4,
    width: props.width === undefined ? "100%" : props.width,
    height: props.height || 44,
    marginVertical: props.marginVertical,
    marginHorizontal: props.marginHorizontal,
    alignItems: "center",
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

class GradientButtonWithChildren extends React.PureComponent<GradientButtonWithChildrenProps> {
  public static defaultProps = {
    gradientStartColor: Colors.themeGradient.gradientColor1,
    gradientEndColor: Colors.themeGradient.gradientColor2,
    borderRadius: 4,
  };
  public PRESS_IN_SHADOW = 1;
  public PRESS_OUT_SHADOW = 4;

  private setShadow = (size: number) => createShadow(size);

  public state = {
    shadow: this.setShadow(this.PRESS_OUT_SHADOW),
  };

  public render() {
    const { disabled, onPress, onLongPress, gradientStartColor, gradientEndColor, borderRadius } = this.props;
    return (
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        gradientStartColor={this.setColor(gradientStartColor)}
        gradientEndColor={this.setColor(gradientEndColor)}
        style={[styles.linearGradient, linearGradientStyles(this.props), this.state.shadow, { borderRadius }]}>
        <TouchableOpacity
          testID={this.props.testID}
          style={[
            styles.buttonContainer,
            buttonContainerStyles({ ...this.props, marginVertical: 0, marginHorizontal: 0 }),
            { borderRadius },
          ]}
          onPress={onPress}
          onLongPress={onLongPress}
          onPressIn={this.handlePressIn}
          onPressOut={this.handlePressOut}
          disabled={disabled}>
          {this.props.children}
        </TouchableOpacity>
      </LinearGradient>
    );
  }

  private setColor = (gradientColor: string) => {
    if (this.props.disabled) return Colors.palette.veryVeryLightGray;
    return gradientColor;
  };

  private handlePressIn = () => {
    this.setState({ shadow: this.setShadow(this.PRESS_IN_SHADOW) }, this.props.onPressIn);
  };
  private handlePressOut = () => {
    this.setState({ shadow: this.setShadow(this.PRESS_OUT_SHADOW) }, this.props.onPressOut);
  };
}

export { GradientButtonWithChildren };

interface GradientButtonProps extends ButtonProps {
  label: string;
  gradientStartColor: string;
  gradientEndColor: string;
  disabled?: boolean;
}

export class GradientButton extends React.PureComponent<GradientButtonProps> {
  public static defaultProps = {
    gradientStartColor: Colors.themeGradient.gradientColor1,
    gradientEndColor: Colors.themeGradient.gradientColor2,
  };
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

interface TransparentButtonWithTextProps extends ButtonProps {
  link: string;
  label: string;
  linkColor?: string;
  textColor?: string;
}

export const TransparentButtonWithLink = (props: TransparentButtonWithTextProps) => {
  const { onPress, label, link, disabled, onLongPress, onPressIn, onPressOut } = props;
  return (
    <View style={[styles.buttonContainer, buttonContainerStyles(props), { flexDirection: "row" }]}>
      <Text style={[styles.buttonText, { color: props.textColor || Colors.buttonText }]}>{label}</Text>
      <TouchableOpacity
        testID={props.testID}
        disabled={disabled}
        onPressIn={onPressIn}
        onPress={onPress}
        onPressOut={onPressOut}
        onLongPress={onLongPress}>
        <Text style={[styles.buttonLinkText, { color: props.linkColor || Colors.buttonText }]}>{link}</Text>
      </TouchableOpacity>
    </View>
  );
};

interface TransparentButtonWithChildrenProps extends ButtonProps {
  children: React.ReactChild;
}

export const TransparentButtonWithChildren = (props: TransparentButtonWithChildrenProps) => {
  const { onPressIn, onPress, onPressOut, disabled, children, onLongPress } = props;

  return (
    <TouchableOpacity
      testID={props.testID}
      style={[styles.buttonContainer, buttonContainerStyles(props)]}
      onPressIn={onPressIn}
      onPress={onPress}
      onPressOut={onPressOut}
      onLongPress={onLongPress}
      disabled={disabled}>
      {children}
    </TouchableOpacity>
  );
};

interface TransparentButtonProps extends ButtonProps {
  label: string;
}

export const TransparentButton = (props: TransparentButtonProps) => {
  const { label } = props;
  return (
    <TransparentButtonWithChildren {...props}>
      <Text style={[styles.buttonLabel, { color: props.textColor || Colors.buttonText }]}>{label}</Text>
    </TransparentButtonWithChildren>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    ...createShadow(),
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
