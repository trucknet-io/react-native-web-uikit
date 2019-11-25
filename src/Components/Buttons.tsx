import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import Colors from "src/Themes/Colors";
import createShadow from "src/Themes/Shadow";

import LinearGradient from "./LinearGradient";

interface ButtonContainerStylesProps {
  borderRadius: number;
  width: string | number;
  height: string | number;
  marginVertical: string | number;
  marginHorizontal: string | number;
  borderWidth?: number;
  borderColor?: string;
}

interface ButtonProps extends ButtonContainerStylesProps {
  disabled?: boolean;
  textColor?: string;
  onPress?: () => void;
  onLongPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
  style?: ViewStyle;
}

const buttonContainerStyles = (props: ButtonProps) => {
  const customStyles = props.style || {};
  return {
    width: props.width || "100%",
    height: props.height || 44,
    borderRadius: props.borderRadius || 4,
    borderWidth: props.borderWidth,
    borderColor: props.borderColor,
    marginVertical: props.marginVertical,
    marginHorizontal: props.marginHorizontal,
    ...customStyles,
  };
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

interface GradientButtonProps extends ButtonProps {
  gradientStartColor: string;
  gradientEndColor: string;
  label?: React.ReactNode;
  children?: React.ReactChild;
  disabled?: boolean;
}

class GradientButtonWithCustomChildren extends React.PureComponent<GradientButtonProps> {
  public static defaultProps = {
    gradientStartColor: Colors.themeGradient.gradientColor1,
    gradientEndColor: Colors.themeGradient.gradientColor2,
    borderRadius: 4,
    width: "100%",
    height: 44,
    marginVertical: 0,
    marginHorizontal: 0,
    alignItems: "center",
  };
  public PRESS_IN_SHADOW = 1;
  public PRESS_OUT_SHADOW = 4;

  private setShadow = (size: number) => createShadow(size);

  public state = {
    shadow: this.setShadow(this.PRESS_OUT_SHADOW),
  };

  public render() {
    const {
      disabled,
      onPress,
      onLongPress,
      gradientStartColor,
      gradientEndColor,
      width,
      height,
      marginVertical,
      marginHorizontal,
    } = this.props;
    return (
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        gradientStartColor={this.setColor(gradientStartColor)}
        gradientEndColor={this.setColor(gradientEndColor)}
        style={[
          styles.linearGradient,
          { width, height, marginVertical, marginHorizontal, alignItems: "center" },
          this.state.shadow,
        ]}>
        <TouchableOpacity
          style={[
            styles.buttonContainer,
            buttonContainerStyles({ ...this.props, marginVertical: 0, marginHorizontal: 0 }),
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

class GradientButtonWithDefaultChildren extends React.PureComponent<GradientButtonProps> {
  public static defaultProps = {
    gradientStartColor: Colors.themeGradient.gradientColor1,
    gradientEndColor: Colors.themeGradient.gradientColor2,
  };
  public render() {
    const { label } = this.props;
    return (
      <GradientButtonWithCustomChildren {...this.props}>
        <Text style={[styles.buttonLabel, { color: this.setColor() }]}>{label}</Text>
      </GradientButtonWithCustomChildren>
    );
  }

  private setColor = () => {
    if (this.props.disabled) {
      return Colors.disable;
    }
    return this.props.textColor || Colors.buttonText;
  };
}

export class GradientButton extends React.PureComponent<GradientButtonProps> {
  public render() {
    if (this.props.children) {
      return <GradientButtonWithCustomChildren {...this.props} />;
    }
    return <GradientButtonWithDefaultChildren {...this.props} />;
  }
}

interface TransparentButtonProps extends ButtonProps {
  label?: string;
  textColor?: string;
  children?: React.ReactChild;
  link?: string;
  linkColor?: string;
}

const TransparentButtonWithLink = (props: TransparentButtonProps) => {
  const { onPress, label, link, disabled, onLongPress, onPressIn, onPressOut, linkColor } = props;
  return (
    <View style={[styles.buttonContainer, buttonContainerStyles(props), { flexDirection: "row" }]}>
      <Text style={[styles.buttonText, { color: props.textColor || Colors.buttonText }]}>{label}</Text>
      <TouchableOpacity
        disabled={disabled}
        onPressIn={onPressIn}
        onPress={onPress}
        onPressOut={onPressOut}
        onLongPress={onLongPress}>
        <Text style={[styles.buttonLinkText, { color: linkColor || Colors.buttonText }]}>{link}</Text>
      </TouchableOpacity>
    </View>
  );
};

class TransparentButtonWithChildren extends React.PureComponent<TransparentButtonProps> {
  public render() {
    const { onPressIn, onPress, onPressOut, disabled, children, onLongPress } = this.props;

    return (
      <TouchableOpacity
        style={[styles.buttonContainer, buttonContainerStyles(this.props)]}
        onPressIn={onPressIn}
        onPress={onPress}
        onPressOut={onPressOut}
        onLongPress={onLongPress}
        disabled={disabled}>
        {children}
      </TouchableOpacity>
    );
  }
}

const TransparentButtonWithDefaultChildren = (props: TransparentButtonProps) => {
  const { label } = props;
  return (
    <TransparentButtonWithChildren {...props}>
      <Text style={[styles.buttonLabel, { color: props.textColor || Colors.buttonText }]}>{label}</Text>
    </TransparentButtonWithChildren>
  );
};

export class TransparentButton extends React.PureComponent<TransparentButtonProps> {
  public render() {
    if (this.props.children) {
      return <TransparentButtonWithChildren {...this.props} />;
    }
    if (this.props.link) {
      return <TransparentButtonWithLink {...this.props} />;
    }
    return <TransparentButtonWithDefaultChildren {...this.props} />;
  }
}
