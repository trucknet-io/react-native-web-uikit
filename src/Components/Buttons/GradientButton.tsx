import * as React from "react";
import { Text, TouchableOpacity, GestureResponderEvent } from "react-native";
import Colors from "src/Themes/Colors";
import getShadowStyle from "src/Themes/getShadowStyle";
import { styles } from "./styles";
import { defaultButtonProps } from "./commonDefaultProps";
import { ButtonProps } from "./commonTypes";

import LinearGradient from "src/Components/LinearGradient";

interface GradientButtonProps extends ButtonProps {
  gradientStartColor: string;
  gradientEndColor: string;
}

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
          this.state.shadow,
          style,
        ]}>
        <TouchableOpacity
          {...this.props}
          style={[styles.buttonContainer, { width, alignItems }, style]}
          onPressIn={this.handlePressIn}
          onPressOut={this.handlePressOut}>
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
